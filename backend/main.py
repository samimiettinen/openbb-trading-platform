from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from datetime import datetime, timedelta
import os
from typing import Optional, List, Dict, Any

# OpenBB import - tämä vaatii OpenBB:n asennuksen
try:
    from openbb import obb
    OPENBB_AVAILABLE = True
except ImportError:
    OPENBB_AVAILABLE = False
    print("OpenBB ei ole asennettu. Käytetään mock-dataa.")

app = FastAPI(
    title="Sami Miettinen Trading Platform API",
    description="Bloomberg-tyylinen pörssitietojen API OpenBB:n avulla",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-domain.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock data fallback
MOCK_STOCK_DATA = {
    "AAPL": {"name": "Apple Inc.", "price": 150.25, "change": 2.15, "volume": 45200000},
    "MSFT": {"name": "Microsoft Corp.", "price": 310.80, "change": -1.25, "volume": 28100000},
    "GOOGL": {"name": "Alphabet Inc.", "price": 2750.45, "change": 15.30, "volume": 1200000},
    "AMZN": {"name": "Amazon.com Inc.", "price": 3200.15, "change": -8.75, "volume": 2800000},
    "TSLA": {"name": "Tesla Inc.", "price": 850.60, "change": 25.40, "volume": 15600000},
}

@app.get("/")
async def root():
    return {
        "message": "Sami Miettinen Trading Platform API",
        "version": "1.0.0",
        "openbb_available": OPENBB_AVAILABLE
    }

@app.get("/api/stock/{symbol}")
async def get_stock_info(symbol: str):
    """Hae osakkeen perustiedot"""
    symbol = symbol.upper()
    
    if OPENBB_AVAILABLE:
        try:
            # Käytä OpenBB:tä oikean datan hakemiseen
            quote = obb.equity.price.quote(symbol)
            if quote.results:
                data = quote.results[0]
                return {
                    "symbol": symbol,
                    "name": getattr(data, 'name', f"{symbol} Inc."),
                    "price": getattr(data, 'last_price', 0),
                    "change": getattr(data, 'change', 0),
                    "change_percent": getattr(data, 'change_percent', 0),
                    "volume": getattr(data, 'volume', 0),
                    "market_cap": getattr(data, 'market_cap', 0),
                    "timestamp": datetime.now().isoformat()
                }
        except Exception as e:
            print(f"OpenBB virhe: {e}")
    
    # Fallback mock data
    if symbol in MOCK_STOCK_DATA:
        stock = MOCK_STOCK_DATA[symbol]
        return {
            "symbol": symbol,
            "name": stock["name"],
            "price": stock["price"],
            "change": stock["change"],
            "change_percent": (stock["change"] / stock["price"]) * 100,
            "volume": stock["volume"],
            "market_cap": stock["price"] * 1000000000,  # Mock market cap
            "timestamp": datetime.now().isoformat()
        }
    
    raise HTTPException(status_code=404, detail=f"Osaketta {symbol} ei löytynyt")

@app.get("/api/stock/{symbol}/historical")
async def get_historical_data(
    symbol: str, 
    period: str = "1mo",
    interval: str = "1d"
):
    """Hae osakkeen historiallinen data"""
    symbol = symbol.upper()
    
    if OPENBB_AVAILABLE:
        try:
            # Määritä aikaväli
            end_date = datetime.now()
            if period == "1d":
                start_date = end_date - timedelta(days=1)
            elif period == "1w":
                start_date = end_date - timedelta(weeks=1)
            elif period == "1mo":
                start_date = end_date - timedelta(days=30)
            elif period == "3mo":
                start_date = end_date - timedelta(days=90)
            elif period == "1y":
                start_date = end_date - timedelta(days=365)
            else:
                start_date = end_date - timedelta(days=30)
            
            # Hae historiallinen data OpenBB:llä
            historical = obb.equity.price.historical(
                symbol=symbol,
                start_date=start_date.strftime("%Y-%m-%d"),
                end_date=end_date.strftime("%Y-%m-%d")
            )
            
            if historical.results:
                data = []
                for row in historical.results:
                    data.append({
                        "date": row.date.isoformat() if hasattr(row, 'date') else datetime.now().isoformat(),
                        "open": getattr(row, 'open', 0),
                        "high": getattr(row, 'high', 0),
                        "low": getattr(row, 'low', 0),
                        "close": getattr(row, 'close', 0),
                        "volume": getattr(row, 'volume', 0)
                    })
                return {"symbol": symbol, "data": data}
        except Exception as e:
            print(f"OpenBB historiallinen data virhe: {e}")
    
    # Mock historical data
    import random
    base_price = MOCK_STOCK_DATA.get(symbol, {"price": 100})["price"]
    data = []
    
    for i in range(30):
        date = datetime.now() - timedelta(days=29-i)
        price_variation = random.uniform(-0.05, 0.05)
        price = base_price * (1 + price_variation)
        
        data.append({
            "date": date.isoformat(),
            "open": price * 0.99,
            "high": price * 1.02,
            "low": price * 0.98,
            "close": price,
            "volume": random.randint(1000000, 50000000)
        })
    
    return {"symbol": symbol, "data": data}

@app.get("/api/market/overview")
async def get_market_overview():
    """Hae markkinakatsaus"""
    # Mock market data
    return {
        "indices": [
            {"name": "S&P 500", "symbol": "SPX", "price": 4150.25, "change": 15.30, "change_percent": 0.37},
            {"name": "Dow Jones", "symbol": "DJI", "price": 33850.45, "change": -125.80, "change_percent": -0.37},
            {"name": "NASDAQ", "symbol": "IXIC", "price": 12750.90, "change": 45.60, "change_percent": 0.36},
        ],
        "sectors": [
            {"name": "Teknologia", "change_percent": 1.25},
            {"name": "Terveydenhuolto", "change_percent": 0.85},
            {"name": "Rahoitus", "change_percent": -0.45},
            {"name": "Energia", "change_percent": 2.15},
        ],
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/news/{symbol}")
async def get_stock_news(symbol: str, limit: int = 10):
    """Hae osakkeen uutiset"""
    # Mock news data
    news = [
        {
            "id": 1,
            "title": f"{symbol} julkistaa uusia tuotteita",
            "summary": f"Yhtiö {symbol} on julkistanut uusia tuotteita, jotka voivat vaikuttaa osakekurssiin positiivisesti.",
            "source": "TechCrunch",
            "published_at": (datetime.now() - timedelta(hours=2)).isoformat(),
            "sentiment": "positive",
            "url": "https://example.com/news/1"
        },
        {
            "id": 2,
            "title": f"Analyytikot nostavat {symbol}-osakkeen tavoitehintaa",
            "summary": "Useat investointipankit ovat nostaneet osakkeen tavoitehintaa vahvojen tulosodotusten vuoksi.",
            "source": "Reuters",
            "published_at": (datetime.now() - timedelta(hours=4)).isoformat(),
            "sentiment": "positive",
            "url": "https://example.com/news/2"
        }
    ]
    
    return {"symbol": symbol, "news": news[:limit]}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)