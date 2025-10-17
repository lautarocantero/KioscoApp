# Kiosco

Sistema de gestión para ventas minoristas y tiendas de abarrotes. Actualmente en desarrollo, enfocado en facilitar el control de ventas, productos y operaciones diarias.

## 📝 Descripción

Kiosco es una aplicación web diseñada para pequeños negocios, como kioscos o tiendas de abarrotes. Permitirá administrar productos, registrar ventas y llevar un control básico del inventario.

## 🛠️ Tecnologías Utilizadas

- **React** (base del frontend)
- **Typescript** (tipado)
- **Bootstrap** (estilos y componentes UI)
- **Mui** (componentes UI)

> _Se irán agregando nuevas tecnologías y herramientas a medida que el proyecto avance._

🏛️ Arquitectura – Screaming Architecture

Este proyecto sigue los principios de Screaming Architecture, donde la estructura está orientada al dominio y no a las tecnologías.

📂 Estructura del Proyecto
src/
├── app/ # Configuración de rutas, layout principal y providers globales
├── auth/ # Módulo de autenticación y autorización
├── core/ # Configuración global, servicios base, helpers
├── inventory/ # Lógica y pantallas de inventario (stock, almacenes)
├── products/ # Gestión de productos (CRUD, categorías, precios)
├── sales/ # Ventas, tickets y reportes
├── shared/ # Componentes y utilidades reutilizables
├── users/ # Gestión de usuarios y roles
├── assets/ # Imágenes y recursos estáticos
└── main.tsx # Punto de entrada

🗂️ Estructura Interna por Módulo
products/
├── components/ # Componentes UI específicos del dominio
├── pages/ # Pantallas o rutas del módulo
├── hooks/ # Custom hooks del dominio
├── services/ # Lógica de datos / API
└── types/ # Modelos y tipados

## 🚧 Estado del Proyecto

**En desarrollo** – Actualmente se están construyendo las primeras funcionalidades y estructura inicial.

## 📦 Instalación y Uso

```bash
# Clonar el repositorio
git clone https://github.com/usuario/kiosco.git

# Instalar dependencias
yarn

# Iniciar el entorno de desarrollo
yarn dev
```

## ✨ Características (Planeadas)

- Registro y listado de productos
- Control de ventas diarias
- Gestión básica de inventario
- Interfaz simple y responsive

## 📸 Capturas (Próximamente)

_Se agregarán imágenes cuando haya pantallas desarrolladas._

## 🤝 Contribuciones

Este proyecto está abierto a mejoras. En el futuro, se podrán proponer nuevas funcionalidades mediante _issues_ y _pull requests_.

## 📅 Roadmap Futuro

- Integración con base de datos (Firebase / Supabase / MongoDB)
- Reportes de ventas y estadísticas
- Autenticación de usuarios

## 👤 Autor

Desarrollado por **Lautaro Cantero**

_Este README se actualizará a medida que el proyecto avance._
