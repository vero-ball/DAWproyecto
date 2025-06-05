# AsociaciónApp

Aplicación web para a xestión de socios e actividades dunha asociación.  
Inclúe frontend en Angular 19 e backend en Node.js con base de datos MongoDB.

---

## 🧩 Tecnoloxías

- **Frontend**: [Angular 19](https://angular.io/) (sen módulos), [TailwindCSS](https://tailwindcss.com/)
- **Backend**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Base de datos**: [MongoDB](https://www.mongodb.com/)
- **ORM**: [Mongoose](https://mongoosejs.com/)

---

## 📁 Estrutura do proxecto

```
AsociacionApp/
├── frontend/       # Aplicación Angular (SPA)
├── backend/        # API REST con Express e MongoDB
└── README.md
```

---

## 🚀 Como executar o proxecto

### 🔧 Requisitos previos

- Node.js 18 ou superior
- Angular CLI instalado globalmente
- MongoDB (local ou en Atlas)

---

### ▶️ Backend

```bash
cd backend
npm install
cp .env.example .env  # Crea o teu ficheiro de configuración
npm start
```

Por defecto, o backend escoita en `http://localhost:5000`

---

### 💻 Frontend

```bash
cd frontend
npm install
ng serve
```

Por defecto, a aplicación execútase en `http://localhost:4200`

---

## 📦 Variables de entorno

Crea un ficheiro `.env` dentro de `backend/` con este contido:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/nome-bd
```

---

## 🛠️ Funcionalidades previstas

- Xestión de socios (CRUD)
- Xestión de actividades (CRUD)
- Panel de administración
- Filtros por datas, tipo de actividade, etc.
- Posible subida de documentos ou imaxes (segura, con multer)

---

## 📌 Estado do proxecto

🔧 En desenvolvemento activo  
✔️ Estrutura base completada (Angular + Node.js)  
📅 Próximas tarefas: deseño de modelos, rutas REST, primeira interface

---

## 🧑‍💻 Autoría

**vero-ball**  
GitHub: [@vero-ball](https://github.com/vero-ball)

---

## 📄 Licenza

MIT
