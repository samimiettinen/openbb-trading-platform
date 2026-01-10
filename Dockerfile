# Backend Dockerfile (Railway/Render deployment)
FROM python:3.11-slim

WORKDIR /app

# Kopioi requirements ja asenna riippuvuudet
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopioi backend-koodi
COPY backend/ ./backend/

# Aseta PYTHONPATH
ENV PYTHONPATH=/app/backend

# Expose port
EXPOSE 8000

# Käynnistä sovellus
CMD ["python", "-m", "uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]