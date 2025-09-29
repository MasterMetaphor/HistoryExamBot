# History 2310 Study Bot - Setup Instructions

## Quick Start

### Option 1: Simple File Opening (No Server Required)
1. Navigate to the `History_2310_Study_Bot` folder
2. Double-click `index.html` to open in your web browser
3. Start using the study bot immediately!

**Note**: Study materials viewing will be limited without the server.

### Option 2: Full Server Setup (Recommended)
1. Open Command Prompt or PowerShell in the `History_2310_Study_Bot` folder
2. Run: `python server.py` (or double-click `start_server.bat` on Windows)
3. Open your browser and go to: `http://localhost:8000`
4. Enjoy the full experience with all study materials!

## What's Included

### 📁 Content Files (29 total)
- **23 PowerPoint slide extractions** - All lecture content from the course
- **6 Textbook chapters** - Complete textbook content for reference

### 🎯 Interactive Features
- **Multiple Choice Quiz Bot** with 42+ questions across 7 subjects
- **AI-Powered Paragraph Grading** with detailed feedback
- **Study Materials Browser** with full content access

### 📚 Historical Subjects Covered
1. Prehistory & Human Evolution
2. Mesopotamian Civilizations  
3. Ancient Israel & Hebrew Monotheism
4. Ancient Egypt
5. Ancient India
6. Ancient China
7. Ancient Greece

## File Structure
```
History_2310_Study_Bot/
├── index.html              # Main application
├── css/style.css          # Styling
├── js/
│   ├── quiz-data.js       # Quiz questions
│   └── study-bot.js       # Application logic
├── content/               # All extracted materials
│   ├── 2310-F25-*.txt    # PowerPoint slides
│   └── *.txt             # Textbook chapters
├── server.py              # Python server
├── start_server.bat      # Windows startup script
└── README.md             # Documentation
```

## Features Overview

### Multiple Choice Quiz
- Choose specific subjects or "All Subjects"
- 10 random questions per quiz
- Immediate feedback with explanations
- Progress tracking and detailed results

### Paragraph Grading
- Write about any historical subject
- AI-powered grading on 4 criteria:
  - Historical Accuracy (0-10)
  - Relevance to Subject (0-10) 
  - Depth of Analysis (0-10)
  - Writing Quality (0-10)
- Detailed feedback and suggestions

### Study Materials
- Browse all PowerPoint slides
- Access complete textbook chapters
- Search and view content easily
- Full-text content in modal windows

## Technical Requirements
- **Web Browser**: Chrome, Firefox, Safari, or Edge (modern versions)
- **Python**: Version 3.6+ (for server functionality)
- **No Internet Required**: Works completely offline

## Troubleshooting

### If the server won't start:
1. Make sure Python is installed: `python --version`
2. Try: `python3 server.py` instead
3. Check if port 8000 is available

### If study materials won't load:
1. Make sure you're using the server (Option 2 above)
2. Check that the `content/` folder has all the `.txt` files
3. Try refreshing the browser page

### If quizzes don't work:
1. Make sure JavaScript is enabled in your browser
2. Check the browser console for any error messages
3. Try a different browser

## For GitHub Deployment
1. Upload all files to a GitHub repository
2. Enable GitHub Pages in repository settings
3. The application will be available at: `https://yourusername.github.io/repository-name`

## Support
This study bot is designed specifically for History 2310 course content. All materials have been extracted using OCR and text processing from the original PowerPoint and Word documents.

**Happy Studying! 📚✨**

