# 🚀 Surrogate: image-based similarity search

## 🛠 Prerequisites
- **Python** >= 3.10
- **Poetry**
- **Node.js** (optional, for additional frontend-extensions)
---

## 📂 Project Structure
```
surrogate/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── embeddings.py
│   │   ├── models.py
│   │   └── routes.py
│   ├── static/
│   │   ├── index.html
│   │   ├── scripts.js
│   │   └── styles.css
│   └── pyproject.toml
└── README.md
```

---

## 🔧 Installation & Deployment
```
cd backend
poetry install
```

---

## 🚀 Run application

```
cd backend
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
Open your browser and switch to `http://localhost:8000`