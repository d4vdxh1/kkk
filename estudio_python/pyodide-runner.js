/* Python real, bajo demanda. Este mismo archivo aloja la interfaz y el Worker.
   Publicar junto a index.html mediante HTTP(S), por ejemplo GitHub Pages.
   Runtime fijado: https://pyodide.org/en/0.29.3/usage/webworker.html */
(() => {
  'use strict';
  const CDN = 'https://cdn.jsdelivr.net/pyodide/v0.29.3/full/';
  // Código de infraestructura: el código del alumno se compila como Python,
  // nunca como JavaScript. Cada ejecución crea variables y archivos nuevos.
  const HARNESS = String.raw`
import ast, base64, contextlib, io, json, os, sys, tempfile, traceback

def _course_run(req):
    result = {'ok': False, 'stdout': '', 'error': '', 'checks': [], 'images': [], 'files': {}}
    source = req['code']
    try:
        tree = ast.parse(source, filename='tu_codigo.py')
        compiled = compile(tree, 'tu_codigo.py', 'exec')
    except BaseException:
        result['error'] = traceback.format_exc()
        return result
    if req['mode'] == 'syntax':
        result['ok'] = True
        result['stdout'] = 'Sintaxis válida. No se ejecutó el código ni se comprobó su resultado.'
        return result
    class LimitedText(io.StringIO):
        def write(self, text):
            if self.tell() + len(text) > 30000:
                raise RuntimeError('Salida demasiado extensa: límite de 30000 caracteres. Revisá el bucle.')
            return super().write(text)
    output = LimitedText()
    lines = iter(req.get('stdin', '').splitlines())
    def course_input(prompt=''):
        print(prompt, end='')
        try:
            return next(lines)
        except StopIteration:
            raise EOFError('Faltan entradas: escribí una línea por cada input() en el campo Entradas.')
    namespace = {'__name__': '__main__', 'input': course_input}
    previous = os.getcwd()
    with tempfile.TemporaryDirectory(prefix='curso_') as folder:
        os.chdir(folder)
        try:
            with open('nota.txt', 'w', encoding='utf-8') as file:
                file.write('Repasar listas')
            with open('tickets.csv', 'w', encoding='utf-8') as file:
                file.write('id,categoria,minutos,estado\n1,correo,10,Cerrado\n2,red,30,Cerrado\n3,correo,20,Cerrado\n4,impresora,,Pendiente\n5,red,40,Cerrado\n6,impresora,20,Cerrado\n')
            plt = None
            if 'matplotlib' in sys.modules or 'matplotlib' in source:
                import matplotlib
                matplotlib.use('Agg', force=True)
                import matplotlib.pyplot as plt
                plt.close('all')
            with contextlib.redirect_stdout(output), contextlib.redirect_stderr(output):
                if req.get('setup'):
                    exec(compile(req['setup'], 'datos_iniciales.py', 'exec'), namespace)
                exec(compiled, namespace)
            result['ok'] = True
            result['stdout'] = output.getvalue()
            if plt:
                for number in plt.get_fignums()[:4]:
                    buffer = io.BytesIO()
                    plt.figure(number).savefig(buffer, format='png', dpi=100, bbox_inches='tight')
                    result['images'].append(base64.b64encode(buffer.getvalue()).decode('ascii'))
                plt.close('all')
            for name in ['nota.txt', 'tickets.csv']:
                if os.path.isfile(name):
                    with open(name, encoding='utf-8') as file:
                        result['files'][name] = file.read(10000)
            # Las pruebas son didácticas, visibles y locales, no un examen seguro.
            namespace['_salida'] = result['stdout'].strip()
            namespace['_arbol'] = tree
            namespace['_ast'] = ast
            namespace['_archivos'] = result['files']
            for test in req.get('tests', []):
                try:
                    with contextlib.redirect_stdout(LimitedText()), contextlib.redirect_stderr(LimitedText()):
                        exec(compile(test['python'], 'prueba_del_ejercicio.py', 'exec'), namespace)
                    result['checks'].append({'label': test['label'], 'pass': True, 'detail': 'Cumple este criterio.'})
                except BaseException as error:
                    result['checks'].append({'label': test['label'], 'pass': False, 'detail': str(error) or type(error).__name__})
        except BaseException:
            result['stdout'] = output.getvalue()
            result['error'] = traceback.format_exc()
            result['ok'] = False
        finally:
            os.chdir(previous)
    return result

json.dumps(_course_run(json.loads(_request_json)))
`;

  if (typeof document === 'undefined') {
    let runtime;
    self.onmessage = async ({data}) => {
      const {id, request} = data;
      const status = text => self.postMessage({id, status: text});
      try {
        if (!runtime) {
          status('Descargando el intérprete de Pyodide 0.29.3… La primera carga puede tardar.');
          importScripts(CDN + 'pyodide.js');
          runtime = await loadPyodide({indexURL: CDN});
        }
        // Comprobar sintaxis antes de intentar resolver paquetes.
        runtime.globals.set('_request_json', JSON.stringify({...request, mode:'syntax'}));
        const syntax = JSON.parse(await runtime.runPythonAsync(HARNESS));
        if (!syntax.ok || request.mode === 'syntax') {
          self.postMessage({id, result: syntax}); return;
        }
        status('Preparando las librerías importadas…');
        await runtime.loadPackagesFromImports((request.setup || '') + '\n' + request.code);
        status('Ejecutando Python…');
        self.postMessage({id, executing: true});
        runtime.globals.set('_request_json', JSON.stringify(request));
        const result = JSON.parse(await runtime.runPythonAsync(HARNESS));
        self.postMessage({id, result});
      } catch (error) {
        self.postMessage({id, failure: String(error.message || error)});
      }
    };
    return;
  }

  const scriptURL = document.currentScript.src;
  const TEST = (label, python) => ({label, python});
  const dataframe = 'import pandas as pd\ndf = pd.read_csv("tickets.csv")';
  // Contratos explícitos: no exigimos que el código sea idéntico a la solución.
  const exercises = {
    2: {contract:'Asigná cantidad = 5 y precio = 12000. Mostrá el producto.', tests:[TEST('Variables y total', 'assert cantidad == 5 and precio == 12000, "Revisá cantidad y precio."\nassert _salida == "60000", "Mostrá el total 60000 con print."')]},
    3: {contract:'Normalizá "  RED  " y mostrá únicamente sus dos primeros caracteres: re.', tests:[TEST('Texto normalizado y fragmento','assert _salida == "re", "Se esperaba re, sin espacios externos y en minúsculas."')]},
    5: {contract:'Usá un while para mostrar 1, 2 y 3, cada uno en una línea, y terminar.', tests:[TEST('Recorrido completo','assert _salida.splitlines() == ["1", "2", "3"], "Mostrá 1, 2 y 3, sin repetir ni omitir valores."'),TEST('Uso de while','assert any(isinstance(n, _ast.While) for n in _ast.walk(_arbol)), "En este ejercicio practicamos while."')]},
    6: {contract:'Creá tiempos = [10,20,30], agregá 50 con append, quitá el último con pop, copiá en otra y mostrá la suma.', tests:[TEST('Lista y suma','assert tiempos == [10,20,30] and _salida == "60", "Al quitar 50 deben quedar los tres valores y sumar 60."'),TEST('Copia independiente','assert otra == tiempos and otra is not tiempos, "Usá una copia independiente, no otra = tiempos."'),TEST('Agregar y quitar','assert {"append", "pop"} <= {n.attr for n in _ast.walk(_arbol) if isinstance(n,_ast.Attribute)}, "Practicá append y pop."')]},
    7: {contract:'Guardá las categorías únicas en categorias (set) y el ticket en ticket, con estado Cerrado.', tests:[TEST('Valores únicos','assert isinstance(categorias,set) and categorias == {"red","correo"}, "categorias debe ser un set con red y correo."'),TEST('Estado actualizado','assert ticket["estado"] == "Cerrado", "Actualizá la clave estado."')]},
    8: {contract:'Definí calcular_total(precio, cantidad) y devolvé el producto. Se probará con varios valores, no solo los del ejemplo.', tests:[TEST('Caso 10 × 3','assert calcular_total(10,3) == 30, "La función debe devolver 30; print no reemplaza return."'),TEST('Caso 7 × 2','assert calcular_total(7,2) == 14, "La función debe usar ambos parámetros."'),TEST('Cantidad cero','assert calcular_total(25,0) == 0, "Con cantidad cero, el total es cero."'),TEST('Precio decimal','assert abs(calcular_total(2.5,4)-10) < 1e-9, "También debe admitir precios decimales."')]},
    9: {contract:'Mostrá [11,12,13] con for, comprensión y map (una lista por línea); después mostrá [2,3] filtrando los originales.', tests:[TEST('Las cuatro salidas','assert _salida.splitlines() == ["[11, 12, 13]"] * 3 + ["[2, 3]"], "Se esperan tres listas [11, 12, 13] y luego [2, 3]."'),TEST('Las tres técnicas','assert any(isinstance(n,_ast.For) for n in _ast.walk(_arbol)) and any(isinstance(n,_ast.ListComp) for n in _ast.walk(_arbol)) and any(isinstance(n,_ast.Call) and isinstance(n.func,_ast.Name) and n.func.id=="map" for n in _ast.walk(_arbol)), "Incluí for, comprensión y map."')]},
    10: {contract:'El archivo virtual nota.txt empieza con Repasar listas. Agregá " y tuplas" sin borrar y mostrá su contenido.', tests:[TEST('Contenido y lectura','assert _archivos["nota.txt"] == "Repasar listas y tuplas", "Conservá el texto inicial y agregá el nuevo."\nassert _salida == "Repasar listas y tuplas", "Leé y mostrá el archivo completo."')]},
    11: {contract:'Importá math y mostrá el área de un círculo de radio 2. La explicación sobre importar e instalar se autoevalúa aparte.', tests:[TEST('Área correcta','assert abs(float(_salida) - 12.566370614359172) < 1e-8, "Área = pi × radio ** 2."')]},
    12: {contract:'Creá a como array NumPy de [10,20,30]. Mostrá a + 5, a.shape y a.ndim, en ese orden.', tests:[TEST('Array de partida','assert type(a).__module__.startswith("numpy") and a.tolist() == [10,20,30], "a debe ser un array NumPy con esos tres valores."'),TEST('Operación y dimensiones','assert _salida.splitlines() == ["[15 25 35]", "(3,)", "1"], "Mostrá a + 5, la forma (3,) y una dimensión."')]},
    13: {contract:'Ya está disponible m = [[10,20],[30,40]] como array NumPy. Guardá promedio por columna en promedios y máximo por fila en maximos.', setup:'import numpy as np\nm = np.array([[10,20],[30,40]])', tests:[TEST('Promedio por columnas','assert list(promedios) == [20,30], "Usá mean(axis=0): pares 10/30 y 20/40."'),TEST('Máximo por filas','assert list(maximos) == [20,40], "Usá max(axis=1): pares 10/20 y 30/40."')]},
    14: {contract:'Ya está disponible df del ejemplo (3 filas). Guardá en filtrados las filas con minutos > 15. La explicación loc/iloc se autoevalúa.', setup:'import pandas as pd\ndf = pd.DataFrame({"categoria":["correo","red","correo"],"minutos":[10,30,20]})', tests:[TEST('Filtrado correcto','assert filtrados.equals(df[df["minutos"] > 15]), "Conservá red:30 y correo:20, con sus columnas e índices."')]},
    15: {contract:'Ya está disponible df con los 6 tickets. Guardá las filas con tiempo en limpios, el número excluido en excluidos y las medias descendentes en resumen.', setup:dataframe, tests:[TEST('Faltante excluido y registrado','assert len(limpios)==5 and limpios["minutos"].notna().all() and excluidos==1, "Excluí una fila sin convertir el faltante a cero."'),TEST('Resumen ordenado','assert list(resumen.index)==["red","impresora","correo"] and list(resumen)==[35,20,15], "Agrupá, promediá y ordená de mayor a menor."')]},
    19: {contract:'Cargá tickets.csv en df. Guardá el promedio conocido en promedio y las medias por categoría en resumen. Mostrá los conteos y dibujá un gráfico. Las conclusiones y la calidad del gráfico se revisan con rúbrica.', tests:[TEST('Seis tickets y un faltante','assert len(df)==6 and df["minutos"].isna().sum()==1, "Conservá las seis filas y el faltante."'),TEST('Conteos originales','assert df["estado"].value_counts().to_dict()=={"Cerrado":5,"Pendiente":1}, "Se esperan 5 cerrados y 1 pendiente."\nassert df["categoria"].value_counts().to_dict()=={"correo":2,"red":2,"impresora":2}, "Hay dos tickets por categoría."'),TEST('Promedio conocido','assert abs(promedio-24)<1e-9, "Dividí 120 entre cinco tiempos conocidos."'),TEST('Medias por categoría','assert resumen.to_dict()=={"correo":15,"red":35,"impresora":20}, "Revisá los grupos y conservá el faltante."')]}
  };
  let worker=null, pending=null, serial=0, timer=null;
  function terminate(message) {
    if(worker) worker.terminate();
    worker=null; clearTimeout(timer);
    if(pending){const p=pending;pending=null;p.reject(Error(message));}
  }
  function request(request, status) {
    if(pending) return Promise.reject(Error('Ya hay una ejecución en curso.'));
    return new Promise((resolve,reject)=>{
      try {
        if(!worker) worker=new Worker(scriptURL);
        const id=++serial;
        pending={id,resolve,reject};
        const arm=(ms,message)=>{clearTimeout(timer);timer=setTimeout(()=>terminate(message),ms);};
        arm(180000,'La descarga tardó más de 3 minutos. Revisá tu conexión y reintentá.');
        worker.onmessage=({data})=>{
          if(!pending||data.id!==pending.id)return;
          if(data.status){status(data.status);return;}
          if(data.executing){arm(15000,'Ejecución detenida tras 15 segundos. Revisá si hay un bucle infinito o reducí los datos.');return;}
          const p=pending;pending=null;clearTimeout(timer);
          if(data.failure){worker.terminate();worker=null;p.reject(Error(data.failure));}
          else p.resolve(data.result);
        };
        worker.onerror=e=>{e.preventDefault();terminate('No se pudo iniciar Python. Abrí el curso por GitHub Pages o un servidor HTTP, y verificá la conexión. '+(e.message||''));};
        worker.postMessage({id,request});
      } catch(e){terminate(e.message);reject(e);}
    });
  }
  const el=id=>document.getElementById(id);
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function mount() {
    if(pending) terminate('Ejecución cancelada al cambiar de sección.');
    if(state.last>=20){if(state.last===23)progress();return;}
    const i=state.last, config=exercises[i];
    const panel=document.createElement('section');panel.className='card';panel.id='pythonLab';
    state.python??={};
    const previous=state.python[i];
    panel.innerHTML='<div class="eyebrow">Python real · Pyodide</div><h2>Escribí, ejecutá y revisá</h2><p>Python se descarga al usarlo, con internet. Se ejecuta en este navegador, en un proceso separado que podés detener. Las variables y los archivos de trabajo empiezan de nuevo en cada ejecución.</p><p><strong>Ejecutar</strong> muestra resultados. <strong>Revisar sintaxis</strong> solo comprueba cómo está escrito. '+(config?'<strong>Corregir ejercicio</strong> ejecuta las pruebas de abajo; no evalúa tus explicaciones.':'Esta sesión incluye una actividad conceptual: ejecutá ejemplos libremente y usá la rúbrica para tu explicación.')+'</p>'+ (location.protocol==='file:'?'<p class="note">Abriste un archivo local. El navegador puede bloquear el proceso de Python aunque tengas internet. Para ejecutar, abrí estos dos archivos desde GitHub Pages o un servidor local HTTP.</p>':'')+'<div class="row"><button id="pyExample">Cargar ejemplo de la sesión</button><button id="pyDraft">Traer mi respuesta del ejercicio</button></div><label for="pyCode">Código Python editable (Tab conserva la navegación; Ctrl+Enter ejecuta)</label><textarea id="pyCode" maxlength="20000" spellcheck="false" autocapitalize="off" autocomplete="off" style="min-height:260px;font-family:ui-monospace,Consolas,monospace;tab-size:4">'+escape(previous?.code??S[i].code)+'</textarea><details><summary>Entradas para input() y archivos virtuales</summary><label for="pyInput">Una línea por cada llamada a input()</label><textarea id="pyInput" maxlength="10000" spellcheck="false">'+escape(previous?.stdin||'')+'</textarea><p>En cada ejecución: nota.txt contiene «Repasar listas» y tickets.csv contiene los seis tickets del proyecto. No se modifica el disco de tu computadora. Los archivos se reinician; guardá el código si querés reproducirlos. Los gráficos Matplotlib aparecen abajo como imágenes estáticas.</p></details><div class="row"><button id="pyRun" class="primary">Ejecutar Python</button><button id="pySyntax">Revisar sintaxis</button>'+(config?'<button id="pyCheck">Corregir ejercicio</button>':'')+'<button id="pyStop" disabled>Detener</button><button id="pyReset">Reiniciar laboratorio</button></div><p id="pyStatus" role="status" aria-live="polite">Python se cargará cuando lo necesites.</p><div id="pyResult"></div>'+(config?'<details><summary>Qué comprueba la corrección automática</summary><p>'+escape(config.contract)+'</p>'+(config.setup?'<p>Preparación automática solo al corregir:</p><pre>'+escape(config.setup)+'</pre>':'')+'<ul>'+config.tests.map(t=>'<li>'+escape(t.label)+'</li>').join('')+'</ul><p>Pasar las pruebas confirma estos casos, no que cualquier solución sea correcta para todos los datos. El resultado no marca la lectura ni la rúbrica como completadas.</p></details>':'');
    const target=el('exercise').closest('section');target.after(panel);
    function persist(){state.python??={};state.python[i]={code:el('pyCode').value,stdin:el('pyInput').value,result:null,attempts:state.python[i]?.attempts||0};save();}
    function busy(on){for(const id of ['pyRun','pySyntax','pyCheck','pyExample','pyDraft'])if(el(id))el(id).disabled=on;el('pyCode').readOnly=on;el('pyInput').readOnly=on;el('pyStop').disabled=!on;}
    function results(r,mode){
      el('pyResult').innerHTML='<h3>'+(mode==='syntax'?'Revisión de sintaxis':'Salida de Python')+'</h3><pre>'+escape(r.stdout||'(Sin salida de texto)')+'</pre>'+(r.error?'<div class="note"><strong>Python encontró un error</strong><p>Buscá tu_codigo.py y el número de línea. SyntaxError: forma de escribir; NameError: nombre que falta; TypeError: tipos incompatibles; IndexError: posición inexistente.</p><pre>'+escape(r.error)+'</pre></div>':'')+(r.checks.length?'<h3>Corrección por pruebas</h3><ul>'+r.checks.map(t=>'<li><strong>'+(t.pass?'✓ Cumple':'✗ Revisar')+' · '+escape(t.label)+'</strong>: '+escape(t.detail)+'</li>').join('')+'</ul>':'')+r.images.map((img,n)=>'<figure><img style="max-width:100%;height:auto" src="data:image/png;base64,'+img+'" alt="Gráfico '+(n+1)+' generado por tu código Python"><figcaption>Figura generada por Matplotlib. Revisá sus ejes, unidades y conclusiones con la rúbrica.</figcaption></figure>').join('')+(Object.keys(r.files).length?'<details><summary>Archivos virtuales después de ejecutar</summary>'+Object.entries(r.files).map(([name,body])=>'<h3>'+escape(name)+'</h3><pre>'+escape(body)+'</pre>').join('')+'</details>':'');
    }
    async function run(mode){
      const source=el('pyCode').value;
      if(!source.trim()){el('pyStatus').textContent='Escribí código Python antes de continuar.';return;}
      persist();busy(true);el('pyResult').textContent='';el('pyStatus').textContent='Preparando Python…';
      try{
        const r=await request({code:source,stdin:el('pyInput').value,mode,setup:mode==='check'?config?.setup||'':'',tests:mode==='check'?config.tests:[]},text=>{if(panel.isConnected)el('pyStatus').textContent=text;});
        if(!panel.isConnected)return;
        results(r,mode);
        const passed=r.checks.filter(t=>t.pass).length;
        el('pyStatus').textContent=!r.ok?'Hay un error de Python. Revisá el detalle.':mode==='check'?passed+' de '+r.checks.length+' pruebas cumplidas.':mode==='syntax'?'Sintaxis válida; resultado aún no comprobado.':'Ejecución terminada. Esto no significa que el ejercicio esté resuelto.';
        if(mode==='check'){
          state.python[i].attempts++;
          state.python[i].result={passed,total:config.tests.length,ok:r.ok};save();
        }
      }catch(error){if(panel.isConnected)el('pyStatus').textContent=error.message;}
      finally{if(panel.isConnected)busy(false);}
    }
    el('pyCode').oninput=()=>{persist();el('pyResult').textContent='';el('pyStatus').textContent='Código modificado. Ejecutá o corregí de nuevo.';};
    el('pyInput').oninput=()=>{persist();el('pyResult').textContent='';el('pyStatus').textContent='Entradas modificadas. Ejecutá o corregí de nuevo.';};
    el('pyCode').onkeydown=e=>{if(e.ctrlKey&&e.key==='Enter'){e.preventDefault();if(!pending)run('run');}};
    el('pyRun').onclick=()=>run('run');el('pySyntax').onclick=()=>run('syntax');if(config)el('pyCheck').onclick=()=>run('check');
    el('pyStop').onclick=()=>terminate('Ejecución detenida. El próximo intento volverá a iniciar Python.');
    el('pyExample').onclick=()=>{if(el('pyCode').value.trim()&&!confirm('¿Reemplazar el código del laboratorio por el ejemplo?'))return;el('pyCode').value=S[i].code;persist();el('pyResult').textContent='';el('pyStatus').textContent='Ejemplo cargado. Listo para ejecutar.';};
    el('pyDraft').onclick=()=>{if(!el('exercise').value.trim()){el('pyStatus').textContent='Primero escribí una respuesta en el ejercicio.';return;}if(el('pyCode').value.trim()&&!confirm('¿Reemplazar el código del laboratorio por tu respuesta?'))return;el('pyCode').value=el('exercise').value;persist();el('pyResult').textContent='';el('pyStatus').textContent='Respuesta cargada. Verificá que sea código Python antes de ejecutar.';};
    el('pyReset').onclick=()=>{if(!confirm('¿Detener Python y borrar el código y el resultado de este laboratorio?'))return;terminate('Laboratorio reiniciado.');delete state.python[i];save();panel.remove();mount();};
    if(previous?.result)el('pyStatus').textContent='Última corrección guardada: '+previous.result.passed+'/'+previous.result.total+' pruebas. Intentos: '+previous.attempts+'.';
  }
  function progress(){
    const box=document.createElement('section');box.className='card';box.innerHTML='<h2>Resultados de Python real</h2><p>Separados de la lectura y de las rúbricas. Los borradores y resultados se incluyen en la exportación JSON.</p><ul>'+Object.entries(state.python||{}).map(([i,p])=>'<li>Sesión '+(+i+1)+': '+(p.result?p.result.passed+'/'+p.result.total+' pruebas cumplidas':'sin corrección vigente')+' · '+p.attempts+' intentos.</li>').join('')+'</ul>';
    el('main').appendChild(box);
  }
  document.addEventListener('course:navigate',mount);
  document.addEventListener('course:exam-reset',mount);
  mount();
})();
