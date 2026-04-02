# 🚀 Deployment su Vercel

## Prerequisiti
- Account Vercel (vercel.com)
- Account GitHub/GitLab/Bitbucket
- Repository Git con il codice

## 📋 Checklist Pre-Deployment

### ✅ File Necessari Presenti:
- [x] `frontend/package.json` - Dipendenze React
- [x] `backend/requirements.txt` - Dipendenze Python
- [x] `vercel.json` - Configurazione Vercel
- [x] `api/index.py` - Entry point API
- [x] `.gitignore` - Esclusioni corrette

### ✅ Configurazioni Verificate:
- [x] Backend porta 8003 (ma Vercel gestisce automaticamente)
- [x] Frontend React configurato per build
- [x] API routes configurate in vercel.json
- [x] Variabili ambiente pronte

## 🌐 Deployment Steps

### 1. Push su Repository Git
```bash
# Se non hai Git installato, installalo prima
# Poi nella cartella del progetto:
git init
git add .
git commit -m "Ready for Vercel deployment"
git branch -M main
git remote add origin <URL-REPOSITORY>
git push -u origin main
```

### 2. Deploy su Vercel
1. Vai su [vercel.com](https://vercel.com)
2. Login con GitHub/GitLab/Bitbucket
3. Clicca "New Project"
4. Seleziona il repository `trinacria-hub-project`
5. Vercel rileverà automaticamente la configurazione

### 3. Configurazione Environment Variables
Nel dashboard Vercel, aggiungi queste variabili:
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=trinacria_hub
JWT_SECRET=a9f2b8c4d1e5f7890123456789abcdef0123456789abcdef0123456789abcdef
ADMIN_EMAIL=admin@trinacriahub.com
ADMIN_PASSWORD=TrinacriA2024!
FRONTEND_URL=https://your-domain.vercel.app
```

## 🔧 Configurazione Automatica Vercel

Vercel rileverà automaticamente:
- **Frontend**: React app in `/frontend`
- **Backend**: Python API in `/api`
- **Build**: `npm run build` per il frontend
- **Routes**: API su `/api/*`, resto su frontend

## 📱 Accesso Post-Deployment

Dopo il deployment:
- **Sito**: `https://your-domain.vercel.app`
- **API**: `https://your-domain.vercel.app/api/*`
- **Admin**: `https://your-domain.vercel.app/admin/login`

## 🧪 Testing Post-Deployment

1. **Test Homepage**: Controlla sfondo Etna e logo
2. **Test Catalogo**: Verifica prodotti demo
3. **Test Admin Login**: 
   - Email: `admin@trinacriahub.com`
   - Password: `TrinacriA2024!`
4. **Test Responsive**: Mobile/Desktop/Tablet

## 🐛 Troubleshooting

### Se il frontend non si carica:
- Controlla `package.json` in `/frontend`
- Verifica che `npm run build` funzioni localmente

### Se l'API non risponde:
- Controlla `api/index.py`
- Verifica le routes in `vercel.json`
- Controlla le environment variables

### Se il logo non appare:
- Verifica che `/frontend/public/logo-chiaro.png` esista
- Controlla i percorsi nei componenti React

## 🔄 Comandi Utili

```bash
# Test build locale
cd frontend && npm run build

# Test backend locale  
cd backend && python simple_server.py

# Test completo locale
npm run dev
```

## ✅ Success Indicators

Il deployment è riuscito se vedi:
- Homepage con sfondo Etna
- Logo personalizzato visibile
- Catalogo prodotti funzionante
- Admin login accessibile
- Design responsive

---

**Nota**: Il backend usa dati in-memory per demo, quindi i dati non persisteranno tra i deployment.
