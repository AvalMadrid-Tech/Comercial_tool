# Comercial Tool

Proyecto dividido en **backend (Flask + SQL Server)** y **frontend (React con Create React App)**.

---

## 🚀 Requisitos previos

- **Debian 12/13** o Ubuntu equivalente
- Python 3.11+ (incluye venv y pip)
- Node.js 20+ y npm
- SQL Server accesible
- Docker (opcional para despliegues)

---

## 📦 Instalación del backend

### 1. Dependencias del sistema

```bash
sudo apt update
sudo apt install -y curl gnupg apt-transport-https unixodbc-dev
```

### 2. Instalar drivers de SQL Server (ODBC)

```bash
# Clave GPG de Microsoft
curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor -o /usr/share/keyrings/microsoft.gpg

# Repositorio Microsoft (usar Debian 12 "bookworm", compatible con Debian 13)
echo "deb [signed-by=/usr/share/keyrings/microsoft.gpg] https://packages.microsoft.com/debian/12/prod bookworm main" | sudo tee /etc/apt/sources.list.d/microsoft-prod.list

# Instalar drivers
sudo apt update
sudo apt install -y msodbcsql18 mssql-tools18
```

Verificar que `libodbc.so.2` existe:

```bash
ldconfig -p | grep odbc
```

### 3. Crear entorno virtual y dependencias

```bash
cd ~/desarrollo_avalmadrid/Comercial_tool/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 4. Configuración Flask

Definir variable de entorno:

```bash
export FLASK_APP=app
```

Levantar servidor:

```bash
flask run
```

Backend disponible en:
```
http://127.0.0.1:5000
```

---

## 📦 Instalación del frontend (React)

### 1. Instalar Node.js y npm

```bash
sudo apt update
sudo apt install -y curl gnupg
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Verificar:

```bash
node -v
npm -v
```

### 2. Instalar dependencias y levantar app

```bash
cd ~/desarrollo_avalmadrid/Comercial_tool/frontend
npm install
npm start
```

Frontend disponible en:
```
http://localhost:3000
```

### 3. Construir para producción

```bash
npm run build
```

---

## 🔌 Conexión a SQL Server

El backend usa `pyodbc` con los drivers ODBC de Microsoft.

Ejemplo:

```python
import pyodbc

conn = pyodbc.connect(
    "DRIVER={ODBC Driver 18 for SQL Server};"
    "SERVER=mi-servidor-sql;"
    "DATABASE=mi_basededatos;"
    "UID=mi_usuario;"
    "PWD=mi_password;"
    "TrustServerCertificate=yes;"
)
```

---

## 📖 Documentación de la API (Swagger)

Se recomienda integrar **Swagger** para documentar y probar los endpoints del backend:

1. Instalar Flasgger:
   ```bash
   pip install flasgger
   ```

2. Ejemplo mínimo en `app.py`:
   ```python
   from flask import Flask
   from flasgger import Swagger

   app = Flask(__name__)
   swagger = Swagger(app)

   @app.route('/ping')
   def ping():
       """
       Test endpoint
       ---
       responses:
         200:
           description: Pong!
       """
       return "Pong!"
   ```

3. Acceder a la UI:
   ```
   http://127.0.0.1:5000/apidocs/
   ```

---

## ✅ Checklist rápido

- [ ] Drivers ODBC instalados (`msodbcsql18`, `unixodbc-dev`)
- [ ] Entorno virtual creado e instaladas dependencias (`pip install -r requirements.txt`)
- [ ] Backend corre con `flask run`
- [ ] Node.js y npm instalados (`node -v`, `npm -v`)
- [ ] Frontend corre con `npm start`
- [ ] Documentación disponible en `/apidocs` (si usas Swagger)