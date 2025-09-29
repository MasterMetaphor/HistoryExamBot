// History 2310 Study Bot JavaScript

class StudyBot {
    constructor() {
        this.currentQuiz = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswers = [];
        this.currentSubject = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadStudyMaterials();
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Quiz controls
        document.getElementById('startQuiz').addEventListener('click', () => {
            this.startQuiz();
        });

        document.getElementById('nextQuestion').addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('submitQuiz').addEventListener('click', () => {
            this.submitQuiz();
        });

        document.getElementById('retakeQuiz').addEventListener('click', () => {
            this.retakeQuiz();
        });

        // Paragraph grading
        document.querySelectorAll('.subject-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectSubject(e.target.dataset.subject);
            });
        });

        document.getElementById('gradeParagraph').addEventListener('click', () => {
            this.gradeParagraph();
        });

        document.getElementById('clearParagraph').addEventListener('click', () => {
            this.clearParagraph();
        });

        document.getElementById('writeAnother').addEventListener('click', () => {
            this.writeAnotherParagraph();
        });

        // Word count for paragraph
        document.getElementById('paragraphText').addEventListener('input', (e) => {
            this.updateWordCount(e.target.value);
        });

        // Study materials
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const materialItem = e.target.closest('.material-item');
                const fileName = materialItem.dataset.file;
                this.viewMaterial(fileName);
            });
        });

        // Modal controls
        document.querySelector('.close-btn').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('materialModal').addEventListener('click', (e) => {
            if (e.target.id === 'materialModal') {
                this.closeModal();
            }
        });
    }

    switchTab(tabName) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Remove active class from all tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab content
        document.getElementById(tabName).classList.add('active');

        // Add active class to selected tab button
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    }

    startQuiz() {
        const subject = document.getElementById('subjectSelect').value;
        
        if (subject === 'all') {
            // Combine all questions
            this.currentQuiz = [];
            Object.values(quizData).forEach(subjectQuestions => {
                this.currentQuiz = this.currentQuiz.concat(subjectQuestions);
            });
        } else {
            this.currentQuiz = [...quizData[subject]];
        }

        // Shuffle questions
        this.currentQuiz = this.shuffleArray(this.currentQuiz); // NO LIMIT
        
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswers = [];

        // Show quiz area
        document.getElementById('quizArea').style.display = 'block';
        document.getElementById('resultsArea').style.display = 'none';
        
        this.displayQuestion();
    }

    displayQuestion() {
        const question = this.currentQuiz[this.currentQuestionIndex];
        const isLastQuestion = this.currentQuestionIndex === this.currentQuiz.length - 1;

        // Update question counter
        document.getElementById('currentQuestion').textContent = this.currentQuestionIndex + 1;
        document.getElementById('totalQuestions').textContent = this.currentQuiz.length;

        // Update progress bar
        const progress = ((this.currentQuestionIndex + 1) / this.currentQuiz.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;

        // Display question
        document.getElementById('questionText').textContent = question.question;

        // Remove any existing explanation
        const existingExplanation = document.querySelector('.explanation-box');
        if (existingExplanation) {
            existingExplanation.remove();
        }

        // Display options
        const optionsContainer = document.getElementById('optionsContainer');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.innerHTML = `
                <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                <div class="option-text">${option}</div>
            `;
            
            optionElement.addEventListener('click', () => {
                this.selectAnswer(index);
            });

            optionsContainer.appendChild(optionElement);
        });

        // Update button visibility
        document.getElementById('nextQuestion').style.display = isLastQuestion ? 'none' : 'block';
        document.getElementById('submitQuiz').style.display = isLastQuestion ? 'block' : 'none';
    }

    selectAnswer(answerIndex) {
        // Remove previous selections
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
        });

        // Add selection to current option
        document.querySelectorAll('.option')[answerIndex].classList.add('selected');

        // Store answer
        this.selectedAnswers[this.currentQuestionIndex] = answerIndex;

        // Show immediate feedback
        this.showAnswerFeedback(answerIndex);
    }

    showAnswerFeedback(selectedIndex) {
        const question = this.currentQuiz[this.currentQuestionIndex];
        const options = document.querySelectorAll('.option');
        
        // Show correct answer
        options[question.correct].classList.add('correct');
        
        // Show if selected answer is incorrect
        if (selectedIndex !== question.correct) {
            options[selectedIndex].classList.add('incorrect');
        }

        // Disable further clicking
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });

        // Show explanation
        this.showExplanation(question.explanation);
    }

    showExplanation(explanation) {
        // Remove existing explanation if any
        const existingExplanation = document.querySelector('.explanation-box');
        if (existingExplanation) {
            existingExplanation.remove();
        }

        // Create explanation box
        const explanationBox = document.createElement('div');
        explanationBox.className = 'explanation-box';
        explanationBox.innerHTML = `
            <div class="explanation-content">
                <h4>Explanation:</h4>
                <p>${explanation}</p>
            </div>
        `;

        // Insert after question container
        const questionContainer = document.querySelector('.question-container');
        questionContainer.insertAdjacentElement('afterend', explanationBox);
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.currentQuiz.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        }
    }

    submitQuiz() {
        // Calculate score
        this.score = 0;
        this.currentQuiz.forEach((question, index) => {
            if (this.selectedAnswers[index] === question.correct) {
                this.score++;
            }
        });

        // Display results
        this.displayResults();
    }

    displayResults() {
        const percentage = Math.round((this.score / this.currentQuiz.length) * 100);
        
        document.getElementById('scorePercentage').textContent = `${percentage}%`;
        document.getElementById('correctAnswers').textContent = this.score;
        document.getElementById('totalAnswers').textContent = this.currentQuiz.length;

        // Detailed results
        const detailedResults = document.getElementById('detailedResults');
        detailedResults.innerHTML = '';

        this.currentQuiz.forEach((question, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            
            const isCorrect = this.selectedAnswers[index] === question.correct;
            const selectedAnswer = this.selectedAnswers[index] !== undefined ? 
                question.options[this.selectedAnswers[index]] : 'No answer';
            const correctAnswer = question.options[question.correct];

            resultItem.innerHTML = `
                <div class="result-question">
                    <strong>Question ${index + 1}:</strong> ${question.question}
                </div>
                <div class="result-answers">
                    <div class="result-answer ${isCorrect ? 'correct' : 'incorrect'}">
                        <strong>Your answer:</strong> ${selectedAnswer}
                    </div>
                    ${!isCorrect ? `<div class="result-answer correct">
                        <strong>Correct answer:</strong> ${correctAnswer}
                    </div>` : ''}
                </div>
                <div class="result-explanation">
                    <strong>Explanation:</strong> ${question.explanation}
                </div>
            `;

            detailedResults.appendChild(resultItem);
        });

        // Show results area
        document.getElementById('quizArea').style.display = 'none';
        document.getElementById('resultsArea').style.display = 'block';
    }

    retakeQuiz() {
        document.getElementById('quizArea').style.display = 'none';
        document.getElementById('resultsArea').style.display = 'none';
        document.getElementById('startQuiz').click();
    }

    selectSubject(subject) {
        this.currentSubject = subject;
        
        // Hide subject selection
        document.querySelector('.subject-selection').style.display = 'none';
        
        // Show paragraph area
        document.getElementById('paragraphArea').style.display = 'block';
        
        // Update subject name
        const subjectNames = {
            prehistory: 'Prehistory & Human Evolution',
            mesopotamia: 'Mesopotamian Civilizations',
            israel: 'Ancient Israel & Hebrew Monotheism',
            egypt: 'Ancient Egypt',
            india: 'Ancient India',
            china: 'Ancient China',
            greece: 'Ancient Greece'
        };
        
        document.getElementById('selectedSubjectName').textContent = subjectNames[subject];
        
        // Update guidelines
        const guidelines = subjectGuidelines[subject];
        const guidelinesList = document.getElementById('subjectGuidelines');
        guidelinesList.innerHTML = '';
        
        guidelines.forEach(guideline => {
            const li = document.createElement('li');
            li.textContent = guideline;
            guidelinesList.appendChild(li);
        });
    }

    updateWordCount(text) {
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        document.getElementById('wordCount').textContent = words.length;
    }

    gradeParagraph() {
        const text = document.getElementById('paragraphText').value.trim();
        
        if (text.length < 100) {
            alert('Please write at least 100 words for a meaningful assessment.');
            return;
        }

        // Simple word count and keyword analysis instead of complex grading
        const wordCount = this.countWords(text);
        const keywords = this.getSubjectKeywords(this.currentSubject);
        const keywordsUsed = this.checkKeywordsUsed(text, keywords);
        
        // Display results
        this.displaySimpleResults(wordCount, keywordsUsed, keywords);
    }

    countWords(text) {
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        return words.length;
    }
    
    checkKeywordsUsed(text, keywords) {
        const textLower = text.toLowerCase();
        const keywordsUsed = [];
        
        keywords.forEach(keyword => {
            if (textLower.includes(keyword.toLowerCase())) {
                keywordsUsed.push(keyword);
            }
        });
        
        return keywordsUsed;
    }

    // No advanced ML grading needed

    getSubjectKeywords(subject) {
        const keywords = {
            prehistory: ['evolution', 'hominid', 'agriculture', 'hunter-gatherer', 'paleolithic', 'neolithic', 'lucy', 'big bang'],
            mesopotamia: ['sumerian', 'cuneiform', 'hammurabi', 'ziggurat', 'tigris', 'euphrates', 'gilgamesh', 'babylon'],
            israel: ['monotheism', 'abraham', 'moses', 'exodus', 'covenant', 'diaspora', 'hebrew', 'jerusalem'],
            egypt: ['nile', 'pharaoh', 'pyramid', 'hieroglyphics', 'mummification', 'afterlife', 'hatshepsut', 'akhenaten'],
            india: ['hinduism', 'buddhism', 'caste', 'mauryan', 'ashoka', 'gupta', 'karma', 'dharma'],
            china: ['confucianism', 'daoism', 'mandate of heaven', 'qin', 'han', 'great wall', 'silk road'],
            greece: ['democracy', 'philosophy', 'socrates', 'plato', 'aristotle', 'persian wars', 'alexander', 'hellenistic']
        };
        
        return keywords[subject] || [];
    }

    calculateRelevance(text, keywords) {
        const textLower = text.toLowerCase();
        let matches = 0;
        
        keywords.forEach(keyword => {
            if (textLower.includes(keyword)) {
                matches++;
            }
        });
        
        // If no keywords found, give very low score
        if (matches === 0) {
            return 1;
        }
        
        return Math.min(10, (matches / keywords.length) * 10);
    }

    calculateAccuracy(text, subject) {
        const textLower = text.toLowerCase();
        let accuracyScore = 2; // Start with lower base score
        
        // Check for historical accuracy indicators
        const accuracyIndicators = {
            prehistory: ['million years', 'bce', 'archaeological', 'fossil', 'radiocarbon', 'paleolithic', 'neolithic'],
            mesopotamia: ['city-state', 'empire', 'law code', 'writing system', 'temple', 'ziggurat'],
            israel: ['monotheism', 'covenant', 'exodus', 'diaspora', 'temple', 'jerusalem'],
            egypt: ['pharaoh', 'pyramid', 'nile', 'hieroglyphics', 'mummification', 'afterlife'],
            india: ['caste', 'dharma', 'karma', 'buddhism', 'hinduism', 'empire'],
            china: ['dynasty', 'mandate of heaven', 'confucianism', 'daoism', 'great wall'],
            greece: ['democracy', 'philosophy', 'city-state', 'persian wars', 'hellenistic']
        };
        
        const indicators = accuracyIndicators[subject] || [];
        indicators.forEach(indicator => {
            if (textLower.includes(indicator)) {
                accuracyScore += 0.5;
            }
        });
        
        return Math.min(10, accuracyScore);
    }

    calculateDepth(text, wordCount) {
        let depthScore = 3; // Base score
        
        // Check for analytical depth indicators
        const depthIndicators = [
            'because', 'therefore', 'however', 'although', 'furthermore', 'moreover',
            'consequently', 'as a result', 'in contrast', 'similarly', 'likewise',
            'for example', 'for instance', 'specifically', 'particularly'
        ];
        
        const textLower = text.toLowerCase();
        depthIndicators.forEach(indicator => {
            if (textLower.includes(indicator)) {
                depthScore += 0.3;
            }
        });
        
        // Word count factor
        if (wordCount >= 150) depthScore += 1;
        if (wordCount >= 200) depthScore += 1;
        if (wordCount >= 300) depthScore += 1;
        
        // Check for specific examples and details
        if (textLower.includes('for example') || textLower.includes('for instance')) {
            depthScore += 1;
        }
        
        return Math.min(10, depthScore);
    }

    calculateWritingQuality(text, wordCount) {
        let writingScore = 5; // Base score
        
        // Check for good writing indicators
        const goodWritingIndicators = [
            'first', 'second', 'third', 'finally', 'in conclusion',
            'introduction', 'development', 'analysis', 'evidence'
        ];
        
        const textLower = text.toLowerCase();
        goodWritingIndicators.forEach(indicator => {
            if (textLower.includes(indicator)) {
                writingScore += 0.2;
            }
        });
        
        // Check for proper sentence structure
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const avgSentenceLength = text.split(/\s+/).length / sentences.length;
        
        if (avgSentenceLength >= 10 && avgSentenceLength <= 25) {
            writingScore += 1; // Good sentence length
        }
        
        // Check for variety in sentence starters
        const sentenceStarters = sentences.map(s => s.trim().split(' ')[0].toLowerCase());
        const uniqueStarters = new Set(sentenceStarters);
        if (uniqueStarters.size > sentences.length * 0.3) {
            writingScore += 1; // Good variety
        }
        
        // Word count factor
        if (wordCount >= 100) writingScore += 1;
        if (wordCount >= 150) writingScore += 1;
        
        return Math.min(10, writingScore);
    }

    displaySimpleResults(wordCount, keywordsUsed, allKeywords) {
        // Create a simplified results display
        const percentKeywordsUsed = Math.round((keywordsUsed.length / allKeywords.length) * 100);
        
        // Update the HTML content for results
        document.getElementById('gradeFeedback').innerHTML = `
            <div class="simple-results">
                <p><strong>Word Count:</strong> ${wordCount} words</p>
                <p><strong>Keywords Used:</strong> ${keywordsUsed.length} of ${allKeywords.length} (${percentKeywordsUsed}%)</p>
                <div class="keyword-list">
                    <p><strong>Keywords for this subject:</strong></p>
                    <ul>
                        ${allKeywords.map(keyword => 
                            `<li class="${keywordsUsed.includes(keyword) ? 'used' : 'unused'}">${
                                keywordsUsed.includes(keyword) ? 
                                '<i class="fas fa-check-circle"></i> ' : 
                                '<i class="fas fa-times-circle"></i> '
                            }${keyword}</li>`
                        ).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        // Update any remaining elements from the old grading system to be hidden or display simple info
        document.getElementById('accuracyBar').style.width = '0%';
        document.getElementById('relevanceBar').style.width = '0%';
        document.getElementById('depthBar').style.width = '0%';
        document.getElementById('writingBar').style.width = '0%';
        
        document.getElementById('accuracyScore').textContent = '--';
        document.getElementById('relevanceScore').textContent = '--';
        document.getElementById('depthScore').textContent = '--';
        document.getElementById('writingScore').textContent = '--';
        
        document.getElementById('overallGrade').textContent = `${wordCount} words, ${keywordsUsed.length}/${allKeywords.length} keywords`;
        
        // Show results
        document.getElementById('gradingResults').style.display = 'block';
    }

    clearParagraph() {
        document.getElementById('paragraphText').value = '';
        document.getElementById('wordCount').textContent = '0';
    }

    writeAnotherParagraph() {
        document.getElementById('paragraphArea').style.display = 'none';
        document.getElementById('gradingResults').style.display = 'none';
        document.querySelector('.subject-selection').style.display = 'block';
        this.clearParagraph();
    }

    loadStudyMaterials() {
        // This would load study materials from the content folder
        // For now, we'll just set up the event listeners
    }

    viewMaterial(fileName) {
        const modal = document.getElementById('materialModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        
        const materialName = fileName.replace('.txt', '').replace(/_/g, ' ');
        modalTitle.textContent = materialName;
        
        // Get summary based on file name
        const summary = this.getMaterialSummary(fileName);
        
        modalContent.innerHTML = `
            <div class="material-summary">
                <h4>Summary:</h4>
                <p>${summary}</p>
                <div class="material-actions">
                    <a href="content/${fileName}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i> View Full Content
                    </a>
                    <button onclick="downloadFile('${fileName}')" class="btn btn-secondary">
                        <i class="fas fa-download"></i> Download File
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.modal').style.display='none'">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    getMaterialSummary(fileName) {
        const summaries = {
            '2310-F25-01-In_the_Beginning.txt': 'Covers the Big Bang theory, human evolution from Australopithecus to Homo sapiens, the development of early human species including Neanderthals and Denisovans, and the timeline from cosmic origins to early human development.',
            '2310-F25-02-Paleolithic_and_Neolithic_Humanity.txt': 'Examines Paleolithic hunter-gatherer societies, the transition to Neolithic agriculture, early settlements like Jericho and Çatalhöyük, and the Agricultural Revolution that transformed human society.',
            '2310-F25-03-Mesopotamia-I.txt': 'Introduces the world\'s first civilization in Mesopotamia, covering Sumerian city-states, the development of cuneiform writing, the Epic of Gilgamesh, and early urban civilization.',
            '2310-F25-04-Mesopotamia-II.txt': 'Continues Mesopotamian history with the Akkadian Empire under Sargon, Hammurabi\'s Law Code, Assyrian military expansion, and the Neo-Babylonian Empire under Nebuchadnezzar.',
            '2310-F25-05-AncientIsrael.txt': 'Explores the development of Hebrew monotheism, the biblical patriarchs Abraham and Moses, the Exodus from Egypt, the Kingdom of Israel, and the Babylonian exile.',
            '2310-F25-06-AncientEgypt-I.txt': 'Covers the unification of Egypt under Narmer, the Old Kingdom and Pyramid Age, divine kingship, hieroglyphic writing, and the construction of the Great Pyramids.',
            '2310-F25-07-AncientEgypt-II.txt': 'Examines the Middle and New Kingdoms, famous pharaohs like Hatshepsut and Akhenaten, Egyptian religion and mummification, and Egypt\'s interactions with neighboring powers.',
            '2310-F25-08-AncientIndia-I.txt': 'Introduces the Indus Valley civilization at Harappa and Mohenjo-daro, the mysterious decline of this early urban culture, and the arrival of Indo-Aryan peoples.',
            '2310-F25-09-AncientIndia-II.txt': 'Covers the development of Hinduism, the caste system, the Vedic Age, and the emergence of early Indian religious and social structures.',
            '2310-F25-10-AncientIndia-III.txt': 'Examines the life of Siddhartha Gautama (Buddha), the development of Buddhism, the Four Noble Truths, and the spread of Buddhist teachings.',
            '2310-F25-11-AncientIndia-IV.txt': 'Covers the Mauryan Empire under Chandragupta and Ashoka, the Gupta Empire\'s golden age, and India\'s contributions to mathematics, science, and philosophy.',
            '2310-F25-12-AncientChina-I.txt': 'Introduces early Chinese dynasties, the Xia and Shang periods, oracle bones, bronze technology, and the development of early Chinese civilization.',
            '2310-F25-13-AncientChina-II.txt': 'Covers the Zhou Dynasty, the Mandate of Heaven concept, the Warring States period, and the philosophical foundations of Chinese thought.',
            '2310-F25-14-AncientChina-III.txt': 'Examines the Qin Dynasty\'s unification of China, the First Emperor\'s achievements including the Great Wall, and the Han Dynasty\'s golden age.',
            '2310-F25-15-MinoanCivilization.txt': 'Explores the Minoan civilization on Crete, their advanced palace culture at Knossos, maritime trade, and the mysterious decline of this Bronze Age civilization.',
            '2310-F25-16-MycenaeanCivilization.txt': 'Covers the Mycenaean Greeks, their warrior culture, the Trojan War, Linear B writing, and the collapse of Bronze Age civilizations.',
            '2310-F25-17-GreekDarkAges.txt': 'Examines the Greek Dark Ages, the decline of Mycenaean civilization, the emergence of new Greek communities, and the transition to the Archaic period.',
            '2310-F25-18-ArchaicGreece-I.txt': 'Covers the rise of Greek city-states (poleis), the development of Greek alphabet, early colonization, and the emergence of Greek political institutions.',
            '2310-F25-19-ArchaicGreece-II.txt': 'Examines the development of Sparta\'s military society, the dual kingship system, and the unique Spartan way of life and education.',
            '2310-F25-20-ArchaicGreece-III.txt': 'Covers the development of Athenian democracy, the reforms of Solon and Cleisthenes, and the emergence of democratic institutions in Athens.',
            '2310-F25-21-ArchaicGreece-IV.txt': 'Examines the Persian Wars, the battles of Marathon and Thermopylae, the Greek victory at Salamis, and the rise of Athens as a naval power.',
            '2310-F25-22-AncientPersia.txt': 'Covers the rise of the Persian Empire under Cyrus the Great, the administrative system of Darius, Persian religion and culture, and Persian interactions with Greece.',
            '2310-S25-23-PersianWars.txt': 'Detailed examination of the Persian Wars, including the Ionian Revolt, the campaigns of Darius and Xerxes, and the Greek victories that preserved Greek independence.',
            '0.txt': 'Complete World History textbook covering cultures, states, and societies from prehistory to 1500 CE.',
            '1.txt': 'Chapter 1: Prehistory - Human evolution, early human species, the development of agriculture, and the transition from hunting-gathering to settled communities.',
            '2.txt': 'Chapter 2: Early Middle Eastern and Northeast African Civilizations - Mesopotamia, Egypt, and the development of the world\'s first civilizations.',
            '3.txt': 'Chapter 3: Ancient and Early Medieval India - Indus Valley civilization, Hinduism, Buddhism, and the great Indian empires.',
            '4.txt': 'Chapter 4: China and East Asia to the Ming Dynasty - Chinese dynasties, Confucianism, Daoism, and Chinese technological innovations.',
            '5.txt': 'Chapter 5: The Greek World from the Bronze Age to the Roman Conquest - Greek civilization, democracy, philosophy, and the Hellenistic period.'
        };
        
        return summaries[fileName] || 'Study material covering important historical topics and developments. Click to view full content.';
    }

    closeModal() {
        document.getElementById('materialModal').style.display = 'none';
    }

    // Download function for study materials
    async downloadFile(fileName) {
        try {
            const response = await fetch(`content/${fileName}`);
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else {
                // Fallback: open in new tab if download fails
                window.open(`content/${fileName}`, '_blank');
            }
        } catch (error) {
            // Fallback: open in new tab if fetch fails
            window.open(`content/${fileName}`, '_blank');
        }
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

// Initialize the study bot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.studyBot = new StudyBot();
});

// Global download function
function downloadFile(fileName) {
    // Create a temporary link element with download attribute
    const link = document.createElement('a');
    link.href = `content/${fileName}`;
    link.download = fileName;
    link.target = '_blank';
    
    // Add to DOM, click, then remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // If that doesn't work, try opening in new tab
    setTimeout(() => {
        window.open(`content/${fileName}`, '_blank');
    }, 100);
}
