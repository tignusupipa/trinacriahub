# Trinacria Hub - E-commerce di Abbigliamento di Lusso

Un elegante e-commerce per la vendita di abbigliamento, scarpe e accessori dei migliori brand internazionali, con un pannello admin completo per la gestione dei prodotti.

## 🛍️ Caratteristiche

### Frontend (React + Tailwind CSS)
- **Design Elegante**: Minimalista e moderno con colori ispirati alla Sicilia
- **Homepage**: Hero section con sfondo Etna e logo personalizzato
- **Catalogo**: Filtri a cascata (Categoria → Brand) con ricerca avanzata
- **Dettagli Prodotto**: Visualizzazione completa con contatto WhatsApp/Email
- **Responsive**: Ottimizzato per desktop, tablet e mobile
- **Animazioni**: Transizioni fluide e micro-interazioni

### Backend (FastAPI + MongoDB)
- **Autenticazione JWT**: Login sicuro per admin con whitelist email
- **CRUD Prodotti**: Gestione completa del catalogo
- **API RESTful**: Endpoints ben strutturati per prodotti e filtri
- **Database MongoDB**: Scalabile e performante
- **Validazione**: Input validation con Pydantic

### Admin Panel
- **Dashboard**: Statistiche e overview dei prodotti
- **Gestione Prodotti**: Aggiungi, modifica, elimina prodotti
- **Upload Immagini**: Gestione URL immagini
- **Filtri Avanzati**: Ricerca e filtri per categoria/brand
- **Design Minimalista**: Interfaccia pulita e professionale

## 🚀 Quick Start

### Prerequisiti
- Node.js 18+
- Python 3.8+
- MongoDB (locale o Atlas)
- Git

### 1. Clona il progetto
```bash
git clone <repository-url>
cd trinacria-hub
```

### 2. Setup Backend
```bash
cd backend
pip install -r requirements.txt
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```

### 4. Configura Environment
Crea i file `.env` nelle rispettive cartelle:

**Backend (.env)**:
```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="trinacria_hub"
CORS_ORIGINS="http://localhost:3000,http://localhost:5173"
JWT_SECRET="your-secret-key"
ADMIN_EMAIL="admin@trinacriahub.com"
ADMIN_PASSWORD="TrinacriA2024!"
FRONTEND_URL="http://localhost:3000"
```

**Frontend (.env)**:
```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

### 5. Avvia MongoDB
```bash
# Se usi MongoDB locale
mongod

# Oppure usa MongoDB Atlas (cloud)
```

### 6. Popola il Database
```bash
cd backend
python seed_data.py
```

### 7. Avvia le Applicazioni

**Backend**:
```bash
cd backend
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

**Frontend**:
```bash
cd frontend
npm start
```

L'applicazione sarà disponibile su:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Admin: http://localhost:3000/admin/login

## 👤 Accesso Admin

**Credenziali Demo**:
- Email: `admin@trinacriahub.com`
- Password: `TrinacriA2024!`

**Email autorizzate** (configurabili nel backend):
- admin@trinacriahub.com
- mangi@trinacriahub.com
- staff@trinacriahub.com

## 📁 Struttura del Progetto

```
trinacria-hub/
├── backend/
│   ├── server.py              # API FastAPI
│   ├── seed_data.py           # Script per dati demo
│   ├── requirements.txt       # Dipendenze Python
│   └── .env                  # Variabili ambiente backend
├── frontend/
│   ├── public/
│   │   └── index.html        # HTML template
│   ├── src/
│   │   ├── components/       # Componenti React
│   │   ├── contexts/         # React Context
│   │   ├── pages/            # Pagine dell'app
│   │   ├── App.js            # App principale
│   │   └── index.css         # Stili globali
│   ├── package.json          # Dipendenze Node
│   ├── tailwind.config.js    # Config Tailwind
│   └── .env                  # Variabili ambiente frontend
└── README.md
```

## 🎨 Design System

### Colori
- **Primary**: `#8C1D18` (Rosso Sicilia)
- **Background**: `#FAFAFA` (Bianco avorio)
- **Foreground**: `#09090B` (Nero profondo)
- **Accent**: `#D4AF37` (Oro)

### Font
- **Headings**: Cormorant Garamond (serif elegante)
- **Body**: Outfit (sans-serif moderno)

### Componenti
- Header con glassmorphism
- Product cards con hover effects
- Admin panel con design minimalista
- Responsive grid layouts

## 🛠️ Tecnologie

### Frontend
- **React 19**: UI framework
- **React Router**: Routing client-side
- **Tailwind CSS**: Utility-first CSS
- **Axios**: HTTP client
- **Lucide React**: Icone

### Backend
- **FastAPI**: Web framework Python
- **MongoDB**: Database NoSQL
- **Motor**: Async MongoDB driver
- **JWT**: Autenticazione
- **Bcrypt**: Password hashing
- **Pydantic**: Data validation

## 📦 Prodotti Demo

Il sistema include 20+ prodotti demo di brand come:
- **Nike**: Air Max, Air Force, Dri-FIT
- **Adidas**: Ultraboost, 3-Stripes, Track Jacket
- **Gucci**: Horsebit bag, Silk shirt, Leather slippers
- **Prada**: Re-Edition bag, Monolith boots
- **Versace**: Medusa sandals, Barocco print
- **Dolce & Gabbana**: Sicily bag, Majolica dress
- E altri brand di lusso...

## 🔄 Funzionalità Principali

### Catalogo
- Filtri a cascata (Categoria → Brand)
- Ricerca full-text
- Grid/List view toggle
- Ordinamento prodotti
- Paginazione

### Gestione Ordini
- Contatto via WhatsApp con pre-compilazione messaggio
- Contatto via email
- Dettagli prodotto completi

### Admin Panel
- Dashboard con statistiche
- CRUD prodotti completo
- Upload immagini (URL)
- Filtri e ricerca avanzati
- Gestione categorie e brand

## 🔒 Sicurezza

- JWT tokens per autenticazione
- Password hashing con bcrypt
- Whitelist email per admin access
- CORS configuration
- Input validation
- SQL injection prevention

## 🚀 Deployment

### Backend (Render/Heroku)
```bash
# Installa dipendenze
pip install -r requirements.txt

# Avvia server
uvicorn server:app --host 0.0.0.0 --port $PORT
```

### Frontend (Netlify/Vercel)
```bash
# Build
npm run build

# Deploy la cartella /build
```

### Database
- **MongoDB Atlas**: Consigliato per produzione
- **MongoDB locale**: Per sviluppo

## 🤝 Contributi

1. Fork il progetto
2. Crea branch feature (`git checkout -b feature/NuovaFunzionalità`)
3. Commit changes (`git commit -m 'Add nuova funzionalità'`)
4. Push al branch (`git push origin feature/NuovaFunzionalità`)
5. Apri Pull Request

## 📄 Licenza

Questo progetto è protetto da licenza. Contattare per informazioni commerciali.

## 📞 Supporto

Per supporto tecnico o informazioni:
- Email: info@trinacriahub.com
- WhatsApp: +39 333 123 4567

---

**Trinacria Hub** - Eleganza Siciliana nel Mondo della Moda 🌟
