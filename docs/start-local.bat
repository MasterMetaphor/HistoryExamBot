@echo off
echo Starting History 2310 Study Bot Local Server...
echo.
echo The study bot will be available at: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.
python -m http.server 8000
pause
