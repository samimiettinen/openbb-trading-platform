# Aloitusohje - Sami Miettinen Trading Platform

## 🚀 Pika-aloitus

### 1. Kloonaa ja asenna

```bash
# Kloonaa repositorio
git clone https://github.com/samimiettinen/trading-platform.git
cd trading-platform

# Asenna frontend riippuvuudet
npm install

# Asenna backend riippuvuudet
cd backend
pip install -r requirements.txt
cd ..
```

### 2. Käynnistä kehityspalvelimet

**Terminal 1 - Backend:**
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Avaa selain osoitteessa: http://localhost:3000

## 📁 Projektin rakenne

```
samimiettinen-trading-platform/
├── src/                    # React frontend
│   ├── components/         # UI komponentit
│   ├── contexts/          # React contexts
│   ├── services/          # API integraatio
│   └── main.tsx           # App entry point
├── backend/               # FastAPI backend
│   ├── main.py           # API endpoints
│   └── requirements.txt  # Python riippuvuudet
├── public/               # Staattiset tiedostot
└── package.json          # Node.js konfiguraatio
```

## 🔧 Konfiguraatio

### Ympäristömuuttujat

Kopioi `.env.example` → `.env`:
```bash
cp .env.example .env
```

Muokkaa `.env` tiedostoa:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=Sami Miettinen Trading Platform
```

### OpenBB Konfiguraatio

Backend käyttää OpenBB:tä oikean datan hakemiseen:

```bash
# Asenna OpenBB
pip install "openbb[all]"

# Testaa asennus
python -c "from openbb import obb; print('OpenBB toimii!')"
```

## 🎨 Ominaisuudet

### ✅ Valmiit ominaisuudet:
- 📊 Interaktiiviset kaaviot (Recharts)
- 🌙 Tumma/vaalea teema
- 📱 Responsiivinen design
- 🔍 Osakkeiden haku
- 📈 Reaaliaikainen data (OpenBB)
- 📰 Uutissyöte
- 🏢 Markkinakatsaus

### 🚧 Kehitettävät ominaisuudet:
- 💾 Tietokannan integraatio
- 👤 Käyttäjätilit
- 📊 Lisää kaaviotyyppejä
- 🔔 Hälytykset
- 📱 PWA-tuki

## 🌐 Deployment

### Nopea deployment:

1. **Frontend (Vercel):**
   - Push koodi GitHubiin
   - Yhdistä Vercel GitHub-tiliin
   - Deploy automaattisesti

2. **Backend (Railway):**
   - Yhdistä Railway GitHub-tiliin
   - Valitse repositorio
   - Deploy automaattisesti

Katso yksityiskohtaiset ohjeet: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🛠️ Kehitys

### Uuden komponentin lisääminen:

```bash
# Luo uusi komponentti
touch src/components/NewComponent.tsx
```

```tsx
import React from 'react'

interface NewComponentProps {
  // Props tyypit
}

export function NewComponent({ }: NewComponentProps) {
  return (
    <div className="card">
      {/* Komponentti sisältö */}
    </div>
  )
}
```

### API endpoint lisääminen:

```python
# backend/main.py
@app.get("/api/new-endpoint")
async def new_endpoint():
    return {"message": "Uusi endpoint"}
```

### Tyylien muokkaaminen:

Muokkaa `tailwind.config.js` tai `src/index.css` tiedostoja.

## 🐛 Yleisiä ongelmia

### OpenBB ei toimi:
```bash
pip install --upgrade "openbb[all]"
```

### CORS virheet:
Tarkista että backend pyörii portissa 8000 ja frontend 3000.

### Tyylien ongelmat:
```bash
npm run build  # Tarkista build virheet
```

## 📚 Hyödylliset linkit

- [React dokumentaatio](https://react.dev)
- [FastAPI dokumentaatio](https://fastapi.tiangolo.com)
- [OpenBB dokumentaatio](https://docs.openbb.co)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)

## 🤝 Kehitykseen osallistuminen

1. Fork repositorio
2. Luo feature branch: `git checkout -b feature/amazing-feature`
3. Commit muutokset: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Avaa Pull Request

## 📞 Tuki

Jos kohtaat ongelmia:
1. Tarkista [Issues](https://github.com/samimiettinen/trading-platform/issues)
2. Luo uusi issue
3. Ota yhteyttä: sami@example.com

---

**Onnea Bloomberg-kilpailijan rakentamisessa! 🚀📈**