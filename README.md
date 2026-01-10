# Sami Miettinen Trading Platform

Bloomberg-tyylinen pörssitietojen tutkintaalusta, rakennettu OpenBB:n päälle.

## ✨ Ominaisuudet

- 📈 **Reaaliaikaiset pörssikurssit** - OpenBB:n kautta
- 📊 **Interaktiiviset kaaviot** - Recharts-kirjastolla  
- 🌙 **Tumma/vaalea teema** - Automaattinen tunnistus
- 📱 **Responsiivinen design** - Toimii kaikilla laitteilla
- 🔍 **Osakkeiden haku** - Nopea ja tarkka
- 📰 **Uutissyöte** - Osakekohtaiset uutiset
- 🏢 **Markkinakatsaus** - Indeksit ja sektorit
- ⚡ **Nopea ja kevyt** - Optimoitu suorituskyky

## 🚀 Pika-aloitus

```bash
# Kloonaa repositorio
git clone https://github.com/samimiettinen/trading-platform.git
cd trading-platform

# Asenna riippuvuudet
npm install
cd backend && pip install -r requirements.txt && cd ..

# Käynnistä kehityspalvelimet
npm run dev          # Frontend (port 3000)
cd backend && python -m uvicorn main:app --reload  # Backend (port 8000)
```

Avaa selain: http://localhost:3000

## Deployment

### Frontend (Vercel)
- Automaattinen deployment GitHub-pushien yhteydessä
- CDN ja optimointi sisäänrakennettu

### Backend (Railway/Render)
- OpenBB API palvelin
- PostgreSQL tietokanta
- Automaattinen skaalaus

## Lisenssi

MIT License - katso LICENSE tiedosto