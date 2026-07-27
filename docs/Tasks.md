# 🗂️ To-Do / Roadmap

**Leyenda de prioridad:** 
🔴 Alta
🟡 Media
🟢 Baja

---

________________________________________________________________________________________________
| 🧾 **Ventas**                                                                                   |
|--------------------------------------------------------------------------------------------------|    
| 🟢 En form header resolver el status config con 3 status posibles      |                            |
| 🟢 Actualmente `seller` tiene por alguna razón la data de `sells` — modificar y desacoplar       |
| 🔴 Refactorizar todo el módulo                                                                   |
|____________________________________________________________________________________________________|

 ________________________________________________________________________________________________
| 👤 **Vendedores**                                                                               |
|--------------------------------------------------------------------------------------------------|
| 🔴 Actualmente `seller` tiene por alguna razón la data de `sells` — modificar y desacoplar       |
| 🔴 Modificar datos para que no sean los mismos que `auth`, también los campos                    |
|____________________________________________________________________________________________________|

 ________________________________________________________________________________________________
| ⚙️ **General**                                                                                  |
|--------------------------------------------------------------------------------------------------|
| 🔴 Comprobar que los `delete dialogs` no se ven bien en `xs`                                     |
| 🟢 Refactorizar todo                                                                              |
| 🟢 Leer la documentación y dejarla presentable                                                   |
| 🟢 Agregar componente para las situaciones donde algo no carga o llega sin datos (early return)  |
| 🟢 Agregar skeletons                                                                              |
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