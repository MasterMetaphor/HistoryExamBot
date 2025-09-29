# History 2310 Study Bot

An interactive study assistant for History 2310: Early World History. This web application provides multiple choice quizzes, paragraph grading exercises, and access to study materials.

## Features

### 🎯 Multiple Choice Quiz
- **Subject-specific quizzes**: Choose from 7 major historical subjects
- **Random question selection**: Each quiz contains 10 randomly selected questions
- **Immediate feedback**: Get explanations for each answer
- **Progress tracking**: Visual progress bar and question counter
- **Detailed results**: See which questions you got right or wrong

### ✍️ Paragraph Grading Exercise
- **AI-powered grading**: Get detailed feedback on your writing
- **Subject-specific guidelines**: Writing prompts tailored to each historical subject
- **Multi-criteria assessment**: Graded on historical accuracy, relevance, depth, and writing quality
- **Constructive feedback**: Detailed suggestions for improvement

### 📚 Study Materials
- **PowerPoint slides**: Access to all 23 extracted PowerPoint presentations
- **Textbook chapters**: Complete textbook content for reference
- **Easy navigation**: Quick access to all study materials

## Historical Subjects Covered

1. **Prehistory & Human Evolution**
   - Big Bang and cosmic timeline
   - Human evolution and early species
   - Agricultural Revolution
   - Early human migrations

2. **Mesopotamian Civilizations**
   - Sumerian city-states
   - Development of writing
   - First empires and law codes
   - Cultural achievements

3. **Ancient Israel & Hebrew Monotheism**
   - Development of monotheism
   - Biblical history and figures
   - Diaspora and cultural impact
   - Phoenician contributions

4. **Ancient Egypt**
   - Nile River civilization
   - Pharaonic rule and divine kingship
   - Pyramids and monumental architecture
   - Religious beliefs and practices

5. **Ancient India**
   - Indus Valley civilization
   - Development of Hinduism and Buddhism
   - Mauryan and Gupta empires
   - Scientific and mathematical contributions

6. **Ancient China**
   - Dynastic cycles and Mandate of Heaven
   - Confucianism and Daoism
   - Qin and Han dynasties
   - Technological innovations

7. **Ancient Greece**
   - Development of democracy
   - Greek philosophy and science
   - Persian Wars and Alexander the Great
   - Hellenistic period

## Technical Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **No Backend Required**: Runs entirely in the browser
- **Fast Performance**: Optimized for quick loading and smooth interactions
- **Accessibility**: Keyboard navigation and screen reader friendly

## Getting Started

### Option 1: GitHub Pages (Recommended)
1. **Fork this repository** to your GitHub account
2. **Enable GitHub Pages** in repository settings
3. **Access your study bot** at: `https://yourusername.github.io/history-2310-study-bot/`

### Option 2: Local Development
1. **Clone or Download**: Get the files from this repository
2. **For full functionality** (including downloads): Run `start-local.bat` or `python -m http.server 8000`
3. **Open in Browser**: Go to `http://localhost:8000`
4. **Start Studying**: Choose your preferred study method and begin!

**Note**: Opening `index.html` directly works for quizzes and paragraph grading, but downloads require a local server.

### Option 3: Local Server (Optional)
1. **Navigate to the folder**: `cd History_2310_Study_Bot`
2. **Start server**: `python -m http.server 8000`
3. **Open browser**: Go to `http://localhost:8000`

## File Structure

```
History_2310_Study_Bot/
├── index.html              # Main application page
├── css/
│   └── style.css          # Application styles
├── js/
│   ├── quiz-data.js       # Quiz questions and data
│   └── study-bot.js       # Main application logic
├── content/               # Extracted study materials
│   ├── *.txt             # PowerPoint slide content
│   └── *.txt             # Textbook chapter content
└── README.md             # This file
```

## Study Tips

### For Multiple Choice Quizzes:
- Take quizzes on specific subjects to focus your study
- Review explanations for both correct and incorrect answers
- Use the "All Subjects" option to test overall knowledge
- Retake quizzes to reinforce learning

### For Paragraph Writing:
- Read the subject guidelines carefully before writing
- Aim for at least 100 words for meaningful assessment
- Focus on historical accuracy and relevance to the topic
- Use specific examples and evidence to support your points
- Review the feedback to identify areas for improvement

### For Study Materials:
- Use PowerPoint slides for quick review of key concepts
- Reference textbook chapters for detailed information
- Combine materials with quiz practice for comprehensive study

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

This study bot is designed specifically for History 2310 course content. If you have suggestions for improvements or additional features, please feel free to contribute!

## License

This project is created for educational purposes. All course content remains the property of the respective institutions and authors.

---

**Happy Studying! 📚✨**
