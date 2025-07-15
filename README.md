# 📋 Task Manager App

Organizá tu productividad como un profesional con **Task Manager App**, una aplicación web full stack moderna que permite crear, editar, listar y gestionar tareas personales con autenticación segura. Todo diseñado bajo un enfoque escalable y modular, ideal para equipos o uso personal.

---

## 🚀 ¿Qué es Task Manager App?

**Task Manager App** es una herramienta de gestión de tareas construida con tecnologías modernas que permite:

- ✅ Registrar usuarios de forma segura con JWT
- ✅ Iniciar sesión y mantener sesión persistente
- ✅ Crear nuevas tareas
- ✅ Editar tareas existentes
- ✅ Cambiar el estado de las tareas: `pending`, `in progress`, `completed`
- ✅ Eliminar tareas de forma permanente
- ✅ Ver tareas por usuario autenticado

---

## 🛠️ Tecnologías utilizadas

### Frontend:
- **React** + **TypeScript**
- **TailwindCSS** para estilos rápidos y modernos
- **Axios** para peticiones HTTP
- **React Router DOM** para navegación entre vistas
- **Vite** para desarrollo ágil

### Backend:
- **Node.js** + **Express**
- **TypeScript** para tipado estricto
- **JWT** (JSON Web Tokens) para autenticación segura
- **Sequelize ORM** para interactuar con la base de datos

### Base de datos:
- **MySQL** como sistema relacional robusto
- **Sequelize** para migraciones, asociaciones y consultas tipadas

### Control de versiones:
- **Git** + **GitHub**  
  Proyecto gestionado con ramas limpias y commits significativos.

---

### 📦 Estructura del proyecto

📁 task-manager-server/
├── src/
│ ├── config/ # Configuración de Sequelize y DB
│ ├── controllers/ # Lógica de negocio
│ ├── models/ # Modelos Sequelize: User y Task
│ ├── middlewares/ # JWT y protección de rutas
│ ├── routes/ # Endpoints organizados por funcionalidad
│ └── index.ts # Entrada principal del servidor
📁 task-ui/
├── src/
│ ├── components/ # Formularios reutilizables, listas de tareas
│ ├── pages/ # Vistas: login, registro, dashboard, editar tarea
│ └── main.tsx # Entrada del frontend

---

### 🔐 Seguridad y autenticación

- Todas las rutas protegidas utilizan un **middleware de autenticación con JWT**.
- Los tokens se almacenan y validan correctamente en el cliente.
- Las tareas son accesibles únicamente por su propietario autenticado.

---

### 🧠 Metodologías aplicadas

- **Desarrollo basado en componentes reutilizables (React)**
- **Separación de responsabilidades (MVC):** Controllers, Models, Routes
- **Clean Code y tipado estricto (TypeScript)**
- **ORM + Relaciones claras entre modelos (`User` → `Task`)**
- **Validaciones y manejo de errores controlado**
- **Control de versiones con Git siguiendo buenas prácticas**

---

## 🧪 Cómo probar el proyecto localmente

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu_usuario/task-manager-app.git
cd task-manager-server
npm install

cd ../task-ui
npm install

### 2. Instalar dependencias
cd task-manager-server
npm install

cd ../task-ui
npm install

### 3. Ejecutar Backend y Frontend
# Terminal 1 - Backend
cd task-manager-server
npm run dev

# Terminal 2 - Frontend
cd task-ui
npm start
