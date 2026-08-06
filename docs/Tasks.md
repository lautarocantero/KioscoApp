# 🗂️ To-Do / Roadmap

**Leyenda de prioridad:** 
🔴 Alta
🟡 Media
🟢 Baja

---


________________________________________________________________________________________________
| 🧾 **Login**                                                                                   |
|-------------------------------------------------------------------------------------------------|  
| 🔴 Agregar terminos y condiciones   
| 🟢 Agregar test a los elementos que faltan, checkemailpage,forgotpassword,verification
    Actualmente no tienen porque dependen de envio de mail la mayoria.            
|_________________________________________________________________________________________________|
________________________________________________________________________________________________
| 🧾 **Ventas**                                                                                   |
|-------------------------------------------------------------------------------------------------| 
| 🔴 Agregar punto de menu para ir directo al carrito
| 🔴 Agregar barcodebutton en carrito. 
| 🔴 Separar sell de sellers totalmente, algunas cosas de sellers estan en sell.
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
| 🟢 Leer la documentación y dejarla presentable                                                   |
|____________________________________________________________________________________________________|

 ________________________________________________________________________________________________
| 📦 **Productos**                                                                                |
|--------------------------------------------------------------------------------------------------|
| 🟢 Comprobar si se puede incluir alguna forma para comparar períodos, etc. `(pausado por ahora)` |
|____________________________________________________________________________________________________|

 ________________________________________________________________________________________________
| 📦 **Presentaciones**                                                                                |
|--------------------------------------------------------------------------------------------------|
| 🟢 Al hacer presentacion, debe de aceptar cosas como 20u de unidades (marlboro por ejemplo), poner selects en lugar de inputs de texto.    |
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