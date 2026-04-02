@echo off
echo 🚀 Trinacria Hub - Push su GitHub
echo.

REM Controlla se Git è installato
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git non è installato!
    echo.
    echo 📥 Scarica Git da: https://git-scm.com/download/win
    echo 📦 Installalo e riavvia questo script
    echo.
    pause
    exit /b 1
)

echo ✅ Git trovato!
echo.

REM Inizializza repository
echo 📦 Inizializzo repository Git...
git init
git add .
git commit -m "🎉 Initial commit: Trinacria Hub E-commerce

✨ Features:
- Frontend React con Tailwind CSS
- Backend FastAPI con autenticazione JWT  
- Hero section con sfondo Etna
- Logo personalizzato trasparente
- Admin panel completo
- Design responsive e moderno

🛍️ E-commerce di abbigliamento di lusso con brand internazionali"

echo.
echo 🔗 Ora aggiungi il tuo repository remoto:
echo    git remote add origin https://github.com/tignusupipa/trinacria.git
echo.
echo 🚀 E poi pusha:
echo    git branch -M main
echo    git push -u origin main
echo.
echo ✅ Progetto pronto per il deployment su Vercel!
echo.
pause
