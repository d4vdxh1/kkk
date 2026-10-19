# Python desde cero: plan de estudio y prompt para una página interactiva

Preparado para David · 19 de octubre de 2026

## 1. Objetivo y alcance

Aprender a explicar, leer y aplicar los temas de la fotografía con palabras sencillas. El resultado futuro será una página educativa pequeña, en un único `index.html`, con HTML5, CSS y JavaScript; Three.js se usará únicamente en una visualización de datos. Este documento es el plan y el prompt: todavía no es la página.

La imagen indica un mínimo de 70 % en Python y/o R y una evaluación separada de SQL. Este recorrido cubre Python; no prepara SQL ni R. No conocemos las preguntas, duración ni ponderación del examen real. El simulacro propuesto es una práctica propia, no una reproducción de ese examen.

Meta de preparación: resolver al menos el 80 % de dos prácticas distintas y explicar los errores sin mirar la solución. Ese margen es una meta de estudio, no una garantía de aprobación.

### Temario de la foto y ubicación

| Tema solicitado | Sesiones |
|---|---|
| Conceptos básicos de Data Science | 1 y 19 |
| Uso básico de Jupyter Notebooks | 2 |
| Características del lenguaje y Python básico | 3–6 |
| Cadenas y secuencias | 4 y 7 |
| Listas, tuplas, sets y diccionarios | 7–8 |
| Funciones | 9 |
| Archivos | 11 |
| Lambdas y `map()` | 10 |
| List comprehensions | 10 |
| Librerías e importaciones | 12 |
| Math | 12 |
| NumPy | 13–14 |
| Pandas | 15–16 |
| Matplotlib | 17 |
| Conceptos básicos de SciPy y scikit-learn | 18–19 |
| Integración y evaluación | 20 |

Variables, operadores, condiciones, bucles y lectura de errores son prerrequisitos agregados para que lo demás se entienda. No hace falta estudiar clases, desarrollo web, redes neuronales ni matemática avanzada para comenzar este recorrido.

## 2. Cómo estudiar

Propuesta flexible: **20 sesiones de 45 minutos**, unas 15 horas iniciales, distribuidas en cuatro semanas de cinco sesiones. Un principiante puede necesitar repetir sesiones; el calendario no es una fecha límite. Si solo tenés 20 minutos, dividí una sesión en dos bloques y retomá donde quedaste.

En cada sesión:

1. **5 minutos:** recordar lo anterior sin consultar apuntes.
2. **10 minutos:** leer una explicación y un ejemplo comentado.
3. **15 minutos:** predecir una salida, probar y modificar el ejemplo.
4. **10 minutos:** resolver un ejercicio sin copiar.
5. **5 minutos:** explicar con tus palabras lo aprendido y anotar una duda.

Regla de avance: acertar dos de tres comprobaciones y resolver el ejercicio principal. Si no sale, revisar una pista y volver a intentar con otros datos. Repasar cada tema al día siguiente, tres días después y una semana después como pauta práctica flexible.

No alcanza con reconocer una respuesta: alterná explicar, predecir, escribir y corregir. Las soluciones deben estar ocultas hasta intentar el ejercicio.

## 3. Recorrido de aprendizaje

### Sesión 1 — Qué es Data Science

**Idea sencilla:** usar datos para responder una pregunta. Un dato es un registro; el análisis lo convierte en información útil. No todo análisis usa inteligencia artificial.

**Aprender:** filas, columnas, observaciones, variables numéricas y categóricas; pregunta → recopilación → limpieza → análisis → comunicación. Introducir promedio, mediana y datos faltantes con números pequeños.

**Ejemplo:** con tiempos de atención de 10, 20 y 30 minutos, el promedio es 20. Pregunta útil: “¿Qué categoría de tickets demora más?”. Aclarar que una asociación entre datos no demuestra una causa.

**Práctica:** proponer una pregunta sobre seis tickets ficticios e identificar los datos necesarios para responderla.

**Interacción futura:** ordenar tarjetas con los pasos de un análisis y clasificar columnas como numéricas o categóricas.

**Podés avanzar si:** distinguís dato, pregunta y conclusión.

### Sesión 2 — Jupyter Notebook

**Idea sencilla:** un cuaderno que mezcla explicaciones con celdas de código y resultados. Python es el lenguaje; Jupyter es una herramienta para trabajar con él.

**Aprender:** celda de código y Markdown, ejecutar con Shift+Enter, kernel como proceso que mantiene variables, guardar `.ipynb`, reiniciar y ejecutar todas las celdas en orden. Probar la opción oficial [Try Jupyter](https://jupyter.org/try) sin instalar inicialmente.

**Práctica:** ejecutar `cantidad = 3` en una celda y `print(cantidad + 2)` en otra. Reiniciar el kernel e intentar ejecutar solo la segunda: explicar por qué falta `cantidad`.

**Interacción futura:** dos celdas guiadas con un indicador de variables existentes. Se identificará como simulación, no como Jupyter real.

**Podés avanzar si:** comprendés que el orden de ejecución puede diferir del orden visual.

### Sesión 3 — Primeras instrucciones

**Idea sencilla:** un programa es una secuencia de instrucciones. Una variable es un nombre asociado a un valor.

**Aprender:** Python de propósito general, sintaxis legible, ejecución mediante intérprete, tipado dinámico, importancia de la indentación; `int`, `float`, `str`, `bool`, `None`, asignación, `print()`, `type()` y comentarios.

```python
cantidad = 3             # Número entero
precio = 12000          # Precio por unidad
print(cantidad * precio) # Resultado: 36000
```

**Práctica:** modificar la cantidad a 5 y predecir el resultado antes de ejecutar.

**Interacción:** mostrar cómo cambia el valor asociado a cada nombre al avanzar línea por línea.

**Error a reconocer:** `3` es un número; `"3"` es texto. Python no convierte automáticamente cualquier combinación de tipos.

### Sesión 4 — Cadenas y entrada de datos

**Idea sencilla:** una cadena es texto, tratado como una secuencia de caracteres.

**Aprender:** comillas, `len()`, índice desde cero, slicing con límite final excluido, `strip()`, `lower()`, `upper()`, `split()`, f-strings, `input()`, `int()` y `float()`.

```python
nombre = "  David  "
limpio = nombre.strip()
print(f"Hola, {limpio}")  # Hola, David
print(limpio[0])          # D
print(limpio[0:3])        # Dav
```

**Práctica:** normalizar `"  CORREO  "` a `"correo"`. Explicar por qué `input()` devuelve texto aunque escribas dígitos.

**Interacción:** seleccionar índices y fragmentos sobre letras visibles.

**Error:** intentar modificar un carácter de una cadena por índice; las cadenas son inmutables.

### Sesión 5 — Operadores y decisiones

**Idea sencilla:** una condición permite elegir qué instrucciones ejecutar.

**Aprender:** `+`, `-`, `*`, `/`, `//`, `%`, `**`; comparaciones, `and`, `or`, `not`, `if`, `elif`, `else`, `=` frente a `==`.

```python
nota = 75
if nota >= 70:
    print("Aprobado")
else:
    print("Seguir practicando")
```

**Práctica:** probar 69, 70 y 100. Agregar una comprobación de que la nota esté entre 0 y 100.

**Interacción:** cambiar la nota y resaltar la rama elegida.

**Podés avanzar si:** explicás por qué 70 sí cumple `>= 70`.

### Sesión 6 — Repeticiones y errores

**Idea sencilla:** un bucle repite trabajo; `for` recorre elementos y `while` continúa mientras una condición sea verdadera.

**Aprender:** `range()`, acumulador, contador, actualización de variables y lectura de la última línea de un error. Reconocer `SyntaxError`, `NameError`, `TypeError` e `IndexError` sin memorizar definiciones largas.

```python
total = 0
for minutos in [10, 20, 30]:
    total = total + minutos
print(total)  # 60
```

**Práctica:** reescribir un contador de 1 a 3 con `while` y explicar cómo evitás que sea infinito.

**Interacción:** tabla por vuelta: elemento actual y total acumulado. Botones anterior, siguiente y reiniciar.

### Sesión 7 — Secuencias, listas y tuplas

**Idea sencilla:** una secuencia mantiene posiciones; una lista permite cambios y una tupla no permite reemplazar sus elementos.

**Aprender:** indexación, slicing, pertenencia con `in`, `append()`, `pop()`, `len()`, `sum()`, recorrido y desempaquetado simple. `sort()` modifica la lista; `sorted()` devuelve una lista ordenada nueva.

```python
tiempos = [10, 20, 30]
tiempos.append(40)
print(tiempos[1])  # 20
coordenada = (2, 5)
```

**Práctica:** agregar 50, quitar el último valor y obtener la suma. Elegir lista para tickets que se agregan y tupla para un par fijo de coordenadas.

**Interacción:** bloques numerados que muestran cambios de posiciones.

**Error:** creer que `otra = tiempos` crea una copia independiente; presentar `.copy()` con una lista plana.

### Sesión 8 — Sets y diccionarios

**Idea sencilla:** un set sirve para elementos únicos; un diccionario relaciona claves con valores.

```python
categorias = {"correo", "red", "correo"}
print(len(categorias))  # 2
ticket = {"id": 1, "estado": "Pendiente"}
print(ticket["estado"])  # Pendiente
```

**Aprender:** `set()`, eliminación de duplicados, unión e intersección; acceso por clave, `.get()`, actualización y `.items()`. No depender del orden de presentación de un set. `{}` crea un diccionario vacío, no un set.

**Práctica:** quitar categorías repetidas y cambiar el estado de un ticket.

**Interacción:** selector “¿Qué estructura usarías?” con explicación de cada elección.

### Sesión 9 — Funciones

**Idea sencilla:** una función reúne instrucciones para reutilizarlas con diferentes datos.

**Aprender:** `def`, llamada, parámetro, argumento, `return`, variable local; diferencia entre mostrar un resultado y devolverlo.

```python
def convertir_a_horas(minutos):
    return minutos / 60

horas = convertir_a_horas(90)
print(horas)  # 1.5
```

**Práctica:** escribir `calcular_total(precio, cantidad)` y comprobarla con dos casos.

**Interacción:** entrada → pasos de la función → valor devuelto. Mostrar que `print()` no reemplaza a `return`.

### Sesión 10 — Lambda, map y comprensiones

**Idea sencilla:** son formas de expresar transformaciones de datos. Primero comprender el bucle equivalente.

```python
numeros = [1, 2, 3]

# Forma explícita
dobles = []
for n in numeros:
    dobles.append(n * 2)

# Comprensión: construye una lista
dobles = [n * 2 for n in numeros]

# map aplica una función; list consume su resultado
dobles = list(map(lambda n: n * 2, numeros))
print(dobles)  # [2, 4, 6]
```

Una lambda expresa una función breve de una sola expresión. `map()` devuelve un iterador, no directamente una lista. Una comprensión puede filtrar: `[n for n in numeros if n > 1]`.

**Práctica:** producir `[11, 12, 13]` de tres maneras; después conservar solo números mayores que 1.

**Interacción:** comparar las tres formas sobre los mismos valores, paso por paso.

### Sesión 11 — Archivos

**Idea sencilla:** las variables viven en la ejecución; un archivo permite guardar datos para después.

**Aprender:** rutas, modos `r`, `w`, `a`, `with open(...)`, UTF-8, lectura y escritura; reconocer texto, CSV y JSON. Introducir `try/except FileNotFoundError` con un caso concreto.

```python
with open("nota.txt", "w", encoding="utf-8") as archivo:
    archivo.write("Repasar listas")

with open("nota.txt", "r", encoding="utf-8") as archivo:
    print(archivo.read())
```

**Práctica:** guardar y recuperar una nota. Explicar que `w` reemplaza el contenido previo.

**Interacción:** archivo virtual visible con botones leer, sobrescribir y agregar. Aclarar que la simulación no escribe libremente en el disco del usuario.

### Sesión 12 — Librerías y math

**Idea sencilla:** una librería aporta herramientas ya hechas. Importar permite utilizarlas; instalar y utilizar son pasos distintos.

**Aprender:** módulo, paquete, `import`, alias y biblioteca estándar frente a paquetes externos. `math` forma parte de Python; NumPy y pandas son externos. Si se trabaja localmente, usar un entorno virtual y seguir las instrucciones oficiales de instalación; la página no necesita instalar paquetes Python.

```python
import math
print(math.sqrt(81))  # 9.0
print(math.floor(3.8))  # 3
print(math.ceil(3.2))   # 4
```

**Práctica:** obtener el área de un círculo de radio 2 con `math.pi`. Distinguir redondear hacia abajo y hacia arriba.

**Interacción:** calculadora guiada que presenta también el código Python equivalente.

### Sesión 13 — NumPy: arrays

**Idea sencilla:** un array es una estructura para trabajar con datos numéricos de forma organizada y realizar operaciones sobre muchos valores.

**Aprender:** `np.array`, `shape`, `ndim`, `dtype`, índices y diferencia con una lista.

```python
import numpy as np
a = np.array([10, 20, 30])
print(a * 2)  # [20 40 60]
print([10, 20, 30] * 2)  # [10, 20, 30, 10, 20, 30]
```

**Práctica:** sumar 5 a cada tiempo. Explicar por qué la multiplicación de la lista hace otra cosa.

**Interacción:** comparar repetición de bloques y multiplicación de valores.

### Sesión 14 — NumPy: matrices y filtros

**Aprender:** matriz como tabla de números, `reshape`, selección por fila/columna, máscaras booleanas, `sum`, `mean`, `min`, `max` y `axis` con ejemplos pequeños.

```python
import numpy as np
m = np.array([[10, 20], [30, 40]])
print(m.shape)          # (2, 2)
print(m.mean())         # 25.0
print(m.sum(axis=0))    # [40 60]: un total por columna
print(m.sum(axis=1))    # [30 70]: un total por fila
print(m[m > 20])        # [30 40]
```

**Práctica:** explicar cada suma señalando las celdas que intervienen.

**Interacción:** matriz coloreada con selector de operación. No introducir álgebra matricial avanzada.

### Sesión 15 — Pandas: tablas

**Idea sencilla:** un DataFrame se parece a una hoja de cálculo que podés consultar con código. Una Series representa datos de una dimensión con etiquetas.

**Aprender:** crear DataFrame, `read_csv`, `head`, `shape`, `info`, seleccionar columnas, `loc` e `iloc`.

```python
import pandas as pd
df = pd.DataFrame({
    "categoria": ["correo", "red", "correo"],
    "minutos": [10, 30, 20]
})
print(df["minutos"].mean())  # 20.0
```

**Práctica:** mostrar solo filas con más de 15 minutos. Distinguir selección por etiqueta y por posición.

**Interacción:** tabla que resalta filas y columnas elegidas y el código equivalente.

### Sesión 16 — Pandas: limpiar y resumir

**Aprender:** `isna`, `dropna`, `fillna`, duplicados, `sort_values`, `value_counts`, `groupby` y agregaciones simples.

**Práctica:** con los datos finales, contar faltantes, calcular promedios por categoría y ordenar de mayor a menor.

**Criterio:** un dato faltante no significa cero. Elegir cómo tratarlo y explicar la decisión; no rellenarlo automáticamente. Al eliminar filas, registrar cuántas se excluyeron.

**Interacción:** vista antes/después de cada operación, con número de filas y explicación del cambio.

### Sesión 17 — Matplotlib

**Idea sencilla:** transforma datos en gráficos para facilitar su interpretación.

**Aprender:** barras para comparar categorías, líneas para evolución ordenada e histograma para distribución. Títulos, ejes, unidades, `fig`, `ax` y `plt.show()`.

```python
import matplotlib.pyplot as plt
fig, ax = plt.subplots()
ax.bar(["Correo", "Red"], [15, 35])
ax.set_title("Tiempo medio por categoría")
ax.set_ylabel("Minutos")
plt.show()
```

**Práctica:** elegir un gráfico para categorías de tickets y otro para cantidad de tickets por día. Justificar la elección.

**Interacción:** cambiar datos y observar una vista previa generada con JavaScript, identificada como representación didáctica del gráfico esperado.

### Sesión 18 — SciPy

**Idea sencilla:** agrega herramientas científicas como estadística, optimización e integración, apoyándose en NumPy.

**Alcance:** reconocer para qué sirve y entender un ejemplo; no aprender fórmulas avanzadas.

```python
from scipy import stats
resultado = stats.describe([10, 20, 30])
print(resultado.nobs)  # 3
print(resultado.mean)  # 20.0
```

**Práctica:** distinguir una raíz cuadrada con `math`, una operación sobre arrays con NumPy y un resumen estadístico con SciPy.

**Interacción:** elegir herramienta según el problema y recibir una explicación.

### Sesión 19 — scikit-learn y aprendizaje automático

**Idea sencilla:** aprender patrones a partir de ejemplos para predecir resultados de otros casos.

**Aprender:** características `X`, objetivo `y`, clasificación frente a regresión, entrenamiento/prueba, `fit`, `predict`, métricas y sobreajuste. Presentar `train_test_split` conceptualmente. Separar datos antes de ajustar transformaciones para evitar filtración de información.

**Ejemplo conceptual:** predecir minutos es regresión; predecir una categoría es clasificación. Evaluar con los mismos ejemplos usados para aprender puede dar una impresión demasiado optimista.

**Práctica:** identificar entradas y objetivo en un problema inventado. Explicar por qué seis tickets sirven para practicar tablas, pero no para afirmar que un predictor sea confiable.

**Interacción:** puntos de entrenamiento y prueba con colores diferentes. Una escena opcional de Three.js mostrará tres características como coordenadas; incluir alternativa 2D y tabla. No usar el eje 3D para insinuar que un modelo es mejor.

### Sesión 20 — Proyecto pequeño y simulacro

**Proyecto:** analizar seis tickets ficticios, sin datos personales ni de la empresa.

```csv
id,categoria,minutos,estado
1,correo,10,Cerrado
2,red,30,Cerrado
3,correo,20,Cerrado
4,impresora,,Pendiente
5,red,40,Cerrado
6,impresora,20,Cerrado
```

Tareas:

1. Cargar la tabla y reconocer tipos de datos.
2. Contar tickets por categoría y estado.
3. Encontrar el tiempo faltante sin convertirlo a cero.
4. Calcular el promedio usando solo tiempos conocidos.
5. Calcular promedios por categoría y graficarlos.
6. Escribir dos conclusiones y una limitación.

**Resultados para corregir:** 6 tickets, 5 cerrados, 1 pendiente, 1 tiempo faltante; 2 tickets por categoría. Promedio conocido: 24 minutos. Por categoría: correo 15, red 35, impresora 20. El promedio de impresora proviene de un solo tiempo conocido. No usar estos seis registros para generalizar sobre una organización.

**Simulacro propuesto:** 20 puntos, un punto por ítem: 5 conceptos, 7 predicciones de salida, 4 correcciones de errores y 4 tareas pequeñas. Corregir cada punto con criterio explícito. 14/20 reproduce el umbral del 70 % mostrado en la foto; la meta personal es 16/20 en dos variantes. No conocemos la distribución del examen real.

## 4. Mapa rápido para recordar

| Herramienta | Explicación breve | Pregunta que ayuda a responder |
|---|---|---|
| Python | Lenguaje para dar instrucciones | ¿Cómo expreso los pasos? |
| Jupyter | Cuaderno de texto, código y resultados | ¿Cómo exploro y documento? |
| Lista | Secuencia modificable | ¿Cómo guardo elementos ordenados? |
| Tupla | Secuencia cuyos elementos no se reemplazan | ¿Cómo represento un grupo fijo? |
| Set | Conjunto de elementos únicos | ¿Qué valores distintos hay? |
| Diccionario | Relación entre claves y valores | ¿Qué valor corresponde a esta clave? |
| math | Funciones matemáticas estándar | ¿Cómo calculo una raíz? |
| NumPy | Arrays y operaciones numéricas | ¿Cómo calculo sobre muchos números? |
| pandas | Tablas y análisis de datos | ¿Cómo filtro, limpio y agrupo? |
| Matplotlib | Gráficos | ¿Cómo muestro el resultado? |
| SciPy | Herramientas científicas | ¿Cómo aplico un método científico disponible? |
| scikit-learn | Modelos y evaluación de aprendizaje automático | ¿Cómo entreno y evalúo una predicción? |

## 5. Diseño de la página futura

### Estructura mínima

Una sola página, sin login, servidor, base de datos ni navegación a otras páginas. Menú de sesiones, contenido central y botones anterior/siguiente. En móvil, menú desplegable. Colores sólidos, buen contraste y tipografía de sistema; sin efectos decorativos constantes.

Cada sesión tendrá: objetivo, explicación breve, ejemplo comentado, salida esperada, recorrido por pasos, ejercicio, pistas progresivas, solución desplegable, error común y tres comprobaciones. El estudiante podrá volver a cualquier tema sin bloqueos artificiales.

Guardar progreso y último tema en `localStorage`, cuando esté disponible. Mostrar progreso de lectura separado del desempeño. Si falla el guardado, permitir seguir y avisar claramente. Exportar/importar progreso como JSON será un respaldo pequeño; no necesita cuentas ni sincronización.

### Qué significa interactiva

La primera versión usará simulaciones JavaScript con entradas limitadas y operaciones definidas: no un editor que finja ejecutar Python arbitrario. Los ejemplos de Python serán copiables y tendrán salidas verificadas. Ofrecer enlace a Jupyter para practicar con un intérprete real.

Three.js se limitará a una escena explicativa opcional. Cargarlo desde una CDN implica necesitar conexión para esa escena: un solo archivo entregado no equivale a cero dependencias. Si la carga o WebGL fallan, mostrar la alternativa 2D y conservar el resto del curso. No agregar Pyodide en esta primera versión; un intérprete real en navegador amplía tamaño y complejidad.

### Prioridades

- Obligatorio: contenido completo, ejercicios, retroalimentación, navegación, progreso y accesibilidad.
- Visualizaciones principales: índices, bucles, estructuras, transformaciones, matrices y tablas.
- Complemento acotado: escena 3D de características numéricas.
- Fuera de alcance: chatbot, API de IA, backend, perfiles, certificados, editor completo, ranking, plataforma de cursos y despliegue obligatorio.

## 6. Prompt listo para copiar a Codex

Copiá el siguiente bloque y adjuntá este Markdown a la conversación de Codex.

```text
Actuá como docente de Python para principiantes y desarrollador frontend.

Usá el documento adjunto “Plan_Python_y_Prompt.md” como especificación del
contenido y del alcance. Construí la página; no entregues solamente otro plan.

OBJETIVO
Crear un curso personal sencillo, en español, que permita comprender los temas
de Python y análisis de datos del documento. El alumno ve estos temas por
primera vez. Explicá términos antes de usarlos, con frases cortas, analogías
precisas, ejemplos comentados y dificultad progresiva. Conservá las 20 sesiones
y todos los temas de la matriz de cobertura. Usá datos ficticios de tickets,
precios o notas, sin información real de personas o empresas.

ENTREGA Y LÍMITES
Entregá un único archivo index.html con HTML5, CSS y JavaScript embebidos.
No uses React, Next.js, Tailwind, npm, compilación, backend, base de datos,
cuentas, API de IA ni archivos locales auxiliares. No publiques el sitio.
La página debe abrirse directamente en el navegador y ser útil sin conexión.
La única dependencia externa permitida es Three.js para una escena opcional:
cargala bajo demanda desde una CDN, fijando una versión verificada. Indicá
que esa escena requiere internet. Si no carga o WebGL no está disponible,
mostrá una alternativa 2D y una tabla equivalente. No bloquees la navegación.
No prometas que una dependencia por CDN queda embebida u opera sin conexión.

CONTENIDO
Desarrollá las 20 sesiones del documento. Cada sesión debe incluir:
1. Objetivo observable y explicación sencilla.
2. Ejemplo válido de Python, con comentarios y salida esperada.
3. Explicación por línea, sin introducir conceptos aún no explicados.
4. Actividad o visualización que ayude a entender el concepto.
5. Ejercicio propio, dos pistas progresivas y solución oculta inicialmente.
6. Error frecuente explicado.
7. Tres comprobaciones con respuesta y justificación.
Las comprobaciones pueden combinar predicción, completar, seleccionar y
ordenar; no hagas todo de opción múltiple. Las alternativas incorrectas deben
recibir explicaciones específicas. No muestres la solución antes del intento.
Incluí el proyecto de seis tickets y los resultados correctos del documento.
Creá dos variantes de simulacro de 20 puntos, según la distribución propuesta,
con instrucciones, criterios de corrección y revisión de errores.
Las respuestas abiertas deben tener rúbrica de autoevaluación identificada;
no finjas corrección automática de código o explicaciones libres.
Incluí glosario y enlaces oficiales del documento.

INTERACCIONES
Implementá controles útiles para:
- Seguir variables y acumuladores línea por línea.
- Elegir índices y slicing de cadenas/listas.
- Comparar lista, tupla, set y diccionario.
- Comparar for, comprensión y map/lambda con los mismos datos.
- Simular lectura/escritura sobre un archivo virtual visible.
- Mostrar diferencias entre una lista y un array NumPy.
- Seleccionar ejes, filtros y agregaciones de matrices pequeñas.
- Filtrar y agrupar una tabla tipo DataFrame.
- Modificar datos de gráficos 2D con etiquetas y unidades.
- Distinguir entrenamiento y prueba.
La escena opcional Three.js mostrará tres características numéricas como
coordenadas. Incorporá etiquetas, leyenda y controles sencillos de vista;
no uses animación permanente ni adornos 3D en el resto del curso.
Toda interacción tendrá reinicio y una explicación textual equivalente.

HONESTIDAD Y EXACTITUD
Esta versión usa simulaciones JavaScript de ejercicios acotados. Identificalas
como “Simulación guiada”. No presentes un textarea como intérprete Python ni
uses eval o new Function para ejecutar texto del usuario. No agregues Pyodide.
Diferenciá salida Python real verificada de representación visual equivalente.
Mostrá código copiable y enlace a Jupyter para practicar Python de verdad.
Respetá: índices desde cero; final del slicing excluido; print distinto de
return; map devuelve iterador; sets sin orden garantizado; {} es diccionario;
lista * 2 repite y array * 2 multiplica; axis=0 agrega por columnas y axis=1
por filas en los ejemplos matriciales; faltante no es cero; entrenamiento y
prueba separados. No uses seis registros como evidencia de calidad predictiva.
No prometas aprobar ni inventes características del examen real.

DISEÑO Y ESTADO
Diseño profesional y tranquilo, colores sólidos, tipografía de sistema,
contenido legible y pocas acciones simultáneas. Menú lateral en escritorio y
selector en móvil; botones anterior/siguiente; bloques de código con copia.
Usá HTML semántico, foco visible, etiquetas, teclado y contraste adecuado.
Respetá prefers-reduced-motion. No dependas solo del color ni de arrastrar.
Guardá último tema, sesiones completadas e intentos en localStorage con
versión de esquema y try/catch. No marques un tema aprendido solo por abrirlo.
Separá lectura completada de resultados. Permití exportar/importar progreso
JSON con validación y restablecerlo con confirmación para no borrar por error.
Si no hay almacenamiento, el curso debe seguir funcionando en memoria.

ORGANIZACIÓN Y VALIDACIÓN
Mantené todo dentro de index.html, pero separá internamente los datos de las
sesiones, las funciones de interfaz, las simulaciones y la persistencia.
No dejes TODOs, botones vacíos, contenido de relleno ni “próximamente”.
Verificá ejemplos y resultados con Python real si está disponible; si falta
alguna librería o navegador, indicá qué comprobaciones no pudiste ejecutar.
Comprobá navegación por teclado y móvil, pistas, soluciones, puntajes,
reinicios, progreso tras recarga, importación inválida y funcionamiento con
Three.js bloqueado. Validá todos los resultados del proyecto de tickets.
Revisá que la simulación y el código presentado coincidan en cada caso.
Entregá index.html e instrucciones breves para abrirlo. Informá limitaciones
reales sin afirmar verificaciones que no realizaste.
```

## 7. Fuentes oficiales y cómo usarlas

Consulta: 19 de octubre de 2026. El orden, los ejercicios y el diseño son una propuesta didáctica propia. La documentación sirve como referencia; no es necesario leerla completa antes de comenzar. El tutorial oficial de Python presupone cierta base de programación, por eso este plan agrega pasos introductorios.

| Fuente | Uso en el recorrido |
|---|---|
| [Tutorial oficial de Python en español](https://docs.python.org/es/3/tutorial/) | Lenguaje y conceptos generales |
| [Control de flujo y funciones](https://docs.python.org/es/3/tutorial/controlflow.html) | Condiciones, bucles, funciones y lambda |
| [Estructuras de datos](https://docs.python.org/es/3/tutorial/datastructures.html) | Colecciones y comprensiones |
| [Entrada, salida y archivos](https://docs.python.org/es/3/tutorial/inputoutput.html) | Formato de texto y persistencia |
| [math](https://docs.python.org/3/library/math.html) | Matemática estándar |
| [Try Jupyter](https://jupyter.org/try) | Primer contacto con notebooks |
| [NumPy para principiantes](https://numpy.org/doc/stable/user/absolute_beginners.html) | Arrays, dimensiones y operaciones |
| [Tutoriales iniciales de pandas](https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html) | Tablas, selección y agregaciones |
| [Tutoriales de Matplotlib](https://matplotlib.org/stable/tutorials/index.html) | Gráficos y estructura de figuras |
| [Guía de SciPy](https://docs.scipy.org/doc/scipy/tutorial/index.html) | Alcance de herramientas científicas |
| [Primeros pasos de scikit-learn](https://scikit-learn.org/stable/getting_started.html) | Ajuste, predicción y evaluación |
| [Manual de Three.js](https://threejs.org/manual/) | Referencia técnica para quien construya la página |

## 8. Primer paso concreto

Empezá por las sesiones 1 y 2. Antes de avanzar, explicá qué pregunta querés responder con datos y ejecutá dos celdas en Jupyter. La página interactiva será un apoyo; escribir y modificar Python real seguirá siendo parte de la práctica.
