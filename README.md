# 🚀 Surrogate: image-based similarity search

## 🛠 Prerequisites
- **Python** >= 3.10
- **Poetry**
- **Node.js** (optional, for additional frontend-extensions)
---

## 📂 Project Structure
```
surrogate/
├── surrogate/
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
└── LICENSE
```

---

## 🔧 Installation & Deployment
```
poetry install
```

---

## 🚀 Run application
```
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
Open your browser and switch to `http://0.0.0.0:8000`