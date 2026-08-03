# 🗂️ To-Do / Roadmap

**Leyenda de prioridad:** 
🔴 Alta
🟡 Media
🟢 Baja

---

 ________________________________________________________________________________________________
| 📦 **Presentaciones**                                                                                |
|--------------------------------------------------------------------------------------------------|
| 🟢 Hacer que las presentaciones no demanden si o si el codigo de barras, no todos tienen     |
| |
|____________________________________________________________________________________________________|
________________________________________________________________________________________________
| 🧾 **Login**                                                                                   |
|-------------------------------------------------------------------------------------------------|  
| 🟢 Agregar terminos y condiciones                    
|_________________________________________________________________________________________________|
________________________________________________________________________________________________
| 🧾 **Ventas**                                                                                   |
|-------------------------------------------------------------------------------------------------| 
| 🟢 cuando no hay stock de una sola presentacion por peso, aparece 0. contemplar que hacer
| 🟢 dividir entre cantidad (100,200) y valor (gramos, kilos)                                     
|_________________________________________________________________________________________________|

 ________________________________________________________________________________________________
| 👤 **Vendedores**                                                                               |
|--------------------------------------------------------------------------------------------------|
| 🔴 Modificar datos para que no sean los mismos que `auth`, también los campos                    |
|____________________________________________________________________________________________________|

 ________________________________________________________________________________________________
| ⚙️ **General**                                                                                  |
|--------------------------------------------------------------------------------------------------|
| 🟢 los form card deben de mostrar con un snackbar o algo que fallo la peticion, ahora solo muestrea la validacion.                                                |
| 🟢 Comentar secciones no disponibles aun o poner algo                                                  |
| 🟢 Leer la documentación y dejarla presentable                                                   |
| 🟢 Agregar componente para las situaciones donde algo no carga o llega sin datos (early return)  |
| 🟢 Agregar skeletons                                                                              |
| 🟢 Mejorar login y Register                                                                            |
|____________________________________________________________________________________________________|

 ________________________________________________________________________________________________
| 📌 **Sidebar**                                                                                  |
|--------------------------------------------------------------------------------------------------|
| 🟢 Implementar colores para los menús y color picker                                             |
|____________________________________________________________________________________________________|

 ________________________________________________________________________________________________
| 📦 **Productos**                                                                                |
|--------------------------------------------------------------------------------------------------|
| 🟢 Hacer que la card de stock funcione, implementar cambios en backend `(pausado por ahora)`     |
| 🟢 Comprobar si se puede incluir alguna forma para comparar períodos, etc. `(pausado por ahora)` |
|____________________________________________________________________________________________________|

## ✅ Checklist — Revisión general de componente

Antes de dar por cerrado un componente, verificar:

1. ¿Es atómico?
2. ¿Usa hooks y lógica de otros archivos?
3. ¿Tiene un skeleton?
4. ¿Tiene un empty state?
5. ¿Usa enums?
6. ¿Usa interfaces y tipos, y **no** declaración explícita?
7. ¿Las interfaces son `Props` e interfaces respectivamente?
8. ¿Usa los colores del theme y no los inventa?