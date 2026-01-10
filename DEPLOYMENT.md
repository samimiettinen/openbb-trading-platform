# Deployment Guide - Sami Miettinen Trading Platform

## Ilmainen/Edullinen Pilvipalvelu Deployment

### 1. Frontend Deployment (Vercel) - ILMAINEN

1. **Luo GitHub repositorio:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/samimiettinen/trading-platform.git
   git push -u origin main
   ```

2. **Deploy Verceliin:**
   - Mene osoitteeseen [vercel.com](https://vercel.com)
   - Kirjaudu GitHub-tilillä
   - Klikkaa "New Project"
   - Valitse GitHub repositorio
   - Vercel tunnistaa automaattisesti Vite-projektin
   - Deploy!

3. **Ympäristömuuttujat Vercelissä:**
   - Project Settings → Environment Variables
   - Lisää: `VITE_API_BASE_URL` = `https://your-backend-url.railway.app`

### 2. Backend Deployment (Railway) - ILMAINEN 5$/kk jälkeen

1. **Mene osoitteeseen [railway.app](https://railway.app)**
2. **Kirjaudu GitHub-tilillä**
3. **Luo uusi projekti:**
   - "New Project" → "Deploy from GitHub repo"
   - Valitse repositorio
   - Railway tunnistaa automaattisesti Python-projektin

4. **Konfiguroi deployment:**
   - Railway käyttää `railway.toml` tiedostoa
   - Aseta ympäristömuuttujat Railway dashboardissa

### 3. Vaihtoehtoinen Backend (Render) - ILMAINEN

1. **Mene osoitteeseen [render.com](https://render.com)**
2. **Luo Web Service:**
   - Connect GitHub repository
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `cd backend && python -m uvicorn main:app --host 0.0.0.0 --port $PORT`

### 4. Tietokanta (jos tarvitaan)

**Ilmaiset vaihtoehdot:**
- **Supabase** (PostgreSQL) - 500MB ilmainen
- **PlanetScale** (MySQL) - 5GB ilmainen
- **Railway PostgreSQL** - sisältyy Railway-projektiin

## Kustannusarvio

### Täysin ilmainen (rajoitukset):
- **Vercel**: Ilmainen (100GB bandwidth/kk)
- **Railway**: $5/kk (500h runtime)
- **Render**: Ilmainen (750h/kk, nukkuu 15min inaktiivisuuden jälkeen)

### Edullinen tuotantokäyttö (~$10-15/kk):
- **Vercel Pro**: $20/kk (unlimited bandwidth)
- **Railway**: $5-10/kk (riippuen käytöstä)
- **Supabase**: $25/kk (8GB tietokanta)

## Deployment Komennot

### Paikallinen kehitys:
```bash
# Frontend
npm install
npm run dev

# Backend
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

### Production build:
```bash
# Frontend
npm run build

# Backend (Docker)
docker build -t trading-platform-backend .
docker run -p 8000:8000 trading-platform-backend
```

## Ympäristömuuttujat

### Frontend (.env):
```
VITE_API_BASE_URL=https://your-backend-url.railway.app
VITE_APP_NAME=Sami Miettinen Trading Platform
```

### Backend:
```
PORT=8000
OPENBB_API_KEY=your_openbb_api_key
DATABASE_URL=postgresql://...
```

## Monitoring ja Analytics

### Ilmaiset työkalut:
- **Vercel Analytics** - sisäänrakennettu
- **Railway Metrics** - sisäänrakennettu
- **Google Analytics** - ilmainen
- **Sentry** - virheenseuranta (ilmainen tier)

## Skaalaus

1. **Aloita ilmaisilla palveluilla**
2. **Siirrä Railway → AWS/GCP kun liikenne kasvaa**
3. **Lisää CDN (Cloudflare) - ilmainen**
4. **Optimoi kuvat ja assets**

## Turvallisuus

1. **HTTPS automaattisesti** (Vercel + Railway)
2. **CORS konfiguroitu** backendissä
3. **API rate limiting** (lisää tarvittaessa)
4. **Environment variables** - ei hardcode API-avaimia

## Backup ja Versionhallinta

1. **Git** - kaikki koodi GitHubissa
2. **Database backups** - automaattiset Railway/Supabasessa
3. **Deployment history** - Vercel säilyttää vanhat versiot