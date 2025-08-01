# Backend – API REST para Calendar App

API REST desarrollada con **Node.js** y **Express** para la gestión de usuarios, autenticación segura con JWT y administración de eventos (CRUD) asociados a cada usuario.  
La base de datos usada es **MongoDB**, gestionada con **MongoDB Compass**.

---

## ⚙️ Funcionalidades principales

- Registro y login de usuarios con autenticación JWT  
- Creación, lectura, actualización y eliminación (CRUD) de eventos  
- Asociación de eventos a usuarios autenticados  
- Seguridad y control de acceso mediante tokens JWT  

---

## 🛠 Tecnologías utilizadas

- [Node.js](https://nodejs.org/)  
- [Express](https://expressjs.com/)  
- [MongoDB](https://www.mongodb.com/)  
- [JWT (JSON Web Tokens)](https://jwt.io/)  
- [MongoDB Compass](https://www.mongodb.com/products/compass) (herramienta para manejar la base de datos)  

---

## 🚀 Instalación y ejecución local

1. Clona este repositorio:

```bash
git clone https://github.com/CrisCantero15/REACT-MERN-backend.git
cd REACT-MERN-backend
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo .env en la raíz con las variables de entorno necesarias:

```
PORT=4000
DB_CNN=<cadena_de_conexion_a_MongoDB>
SECRET_JWT_SEED=<secreto_para_firmar_tokens>
```

4. Ejecuta el servidor en modo desarrollo:

```bash
npm run dev
```

La API estará disponible en http://localhost:4000

---

## 📡 Endpoints de la API

Base URL: `http://localhost:4000/api`

---

### Autenticación (`/api/auth`)

| Método | Ruta          | Descripción                     |
| ------ | ------------- | ------------------------------- |
| POST   | `/new`        | Crear un nuevo usuario (nombre, email, password requeridos)
| POST   | `/`           | Login de usuario (email y password requeridos)
| GET    | `/renew`      | Renovar token JWT

---

### Eventos (`/api/events`)

> Todas las rutas requieren enviar token JWT en el header `x-token`.

| Método | Ruta             | Descripción                     |
| ------ | ---------------- | ------------------------------  |
| GET    | `/`              | Obtener todos los eventos
| POST   | `/`              | Crear un nuevo evento (title, start, end requeridos)
| PUT    | `/:id`           | Actualizar un evento existente (title, start, end)
| DELETE | `/:id`           | Eliminar un evento

---

### Notas importantes

- En rutas protegidas, enviar el token JWT en el header `x-token`.

---

## 📬 Contacto

- Email: [cristiancanterolopez@gmail.com](mailto:cristiancanterolopez@gmail.com)
- Web personal: [www.cristiancantero.dev](https://www.cristiancantero.dev)
- GitHub: [@CrisCantero15](https://github.com/CrisCantero15)

---

Gracias por revisar este proyecto 👋
