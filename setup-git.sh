#!/bin/bash

# Script per inizializzare il repository Git di Trinacria Hub

echo "🚀 Inizializzazione repository Git per Trinacria Hub..."

# Inizializza il repository Git
git init

# Aggiungi tutti i file (esclusi quelli in .gitignore)
git add .

# Crea il commit iniziale
git commit -m "🎉 Initial commit: Trinacria Hub E-commerce

✨ Features:
- Frontend React con Tailwind CSS
- Backend FastAPI con autenticazione JWT
- Hero section con sfondo Etna
- Logo personalizzato trasparente
- Admin panel completo
- Design responsive e moderno

🛍️ E-commerce di abbigliamento di lusso con brand internazionali"

echo "✅ Repository Git inizializzato con successo!"
echo ""
echo "📝 Prossimi passi:"
echo "1. Aggiungi il repository remoto:"
echo "   git remote add origin <URL-REPOSITORY>"
echo ""
echo "2. Push su GitHub:"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "🌟 Il progetto è pronto per essere condiviso!"
