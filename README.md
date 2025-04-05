# 🚀 Surrogate: image-based similarity search

## 🛠 Prerequisites
- **Python** >= 3.10
- **Poetry** (install instructions: https://python-poetry.org/docs/)
- **Node.js** (optional, for additional frontend-extensions. To install: `sudo apt install nodejs`)
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
cd surrogate
poetry install
```

---

## 🚀 Run application
```
cd surrogate
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
Open your browser and switch to `http://0.0.0.0:8000`.