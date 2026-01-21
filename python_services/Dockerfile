# -------------------------
# Base image
# -------------------------
FROM python:3.9-slim

# -------------------------
# Environment variables
# -------------------------
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    POETRY_VIRTUALENVS_CREATE=false

# -------------------------
# System dependencies
# -------------------------
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    gcc \
    # python3-venv \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# -------------------------
# Working directory
# -------------------------
WORKDIR /app


# -------------------------
# Install Python deps first (better caching)
# -------------------------
COPY requirements.txt .

# RUN pip install --upgrade pip \
#     && pip install -r requirements.txt
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# -------------------------
# Copy application code
# -------------------------
COPY . .

# -------------------------
# Expose service port (change if needed)
# -------------------------
EXPOSE 5000

# -------------------------
# Default command
# -------------------------
# CMD ["python", "-m", "app.main"]

# Command to run your Python application when the container starts
RUN chmod +x run.sh
CMD ["python", "./run.sh"]

