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
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    gcc \
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

RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# -------------------------
# Copy application code
# -------------------------
COPY app ./app

# -------------------------
# Expose service port (change if needed)
# -------------------------
EXPOSE 8000

# -------------------------
# Default command
# -------------------------
CMD ["python", "-m", "app.main"]


# Use the official Python image from Docker Hub
FROM python:latest

# Set the working directory inside the container
WORKDIR /app

# Copy your local application files into the container
COPY . /app

# Command to run your Python application when the container starts
CMD ["python", "./your_script_name.py"]
