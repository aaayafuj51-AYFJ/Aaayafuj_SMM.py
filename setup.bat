@echo off
title Aaayafuj SMM - Setup Wizard
echo ====================================================
echo    AAAYAFUJ SMM SUITE - INSTALLATION WIZARD
echo ====================================================
echo.
echo [1] Checking Python installation...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in your PATH.
    echo Please install Python from https://python.org
    pause
    exit /b
)

echo [2] Installing dependencies using python -m pip...
echo (This avoids "Fatal error in launcher" issues)
echo.
python -m pip install --upgrade pip --break-system-packages
python -m pip install -r requirements.txt --break-system-packages

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Installation failed. Please check your internet connection.
    pause
    exit /b
)

echo.
echo ====================================================
echo    INSTALLATION COMPLETE!
echo    You can now run the tool using: python main.py
echo ====================================================
echo.
pause
python main.py
