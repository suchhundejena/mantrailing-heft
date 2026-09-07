// Training Data Structure
const trainingData = {
    beginner: {
        title: '1️⃣ Anfänger',
        sections: {
            'Grundlagen': [
                'Entdeckertrails',
                'Anriechen aus dem Glas',
                'Kommandos verinnerlicht',
                'Anzeigeverhalten',
                'Startritual – Checkliste'
            ],
            'Start-Ritual': [
                'Geruch wird getauscht',
                'Futter an VP übergeben',
                'Hund ruhig Geschirr anziehen',
                'Trainerin außer Sicht – Hundetyp',
                'Hund ruhig zum Start führen',
                'Leine sortieren',
                'Arbeitssignal',
                'Geruch anreichen',
                'Startkommando'
            ],
            'Erste Schwierigkeiten': [
                'Splitting',
                'Kleine Kreuzung',
                'Spurdifferenzierung',
                'Atypischer Abgang',
                'Kleiner Platz',
                'Straßenüberquerung',
                'Kleiner Loop',
                'Kleines P'
            ],
            'Streckenlängen': [
                '200–300 m',
                '400–500 m'
            ],
            'Kreuzungsarbeit & Leinenhandling': [
                'Seminar Kreuzungsarbeit',
                'Seminar Körperarbeit',
                'Abschlussprüfung Leinenhandling'
            ]
        }
    },
    advanced: {
        title: '2️⃣ Fortgeschritten',
        sections: {
            'Streckenlängen': [
                '500–750 m',
                '750–1000 m',
                '1000–1500 m'
            ],
            'Streckenverlauf & Formen': [
                'Pool Gehpool/Stehpool',
                'Hin und Back',
                'Großer Loop',
                'Großes P',
                'Offenes P',
                'Acht',
                'Spitzer Winkel',
                'U-Form',
                'Zeitsprung'
            ],
            'Umgebung & Gelände': [
                'Tunnel',
                'Kreisverkehr',
                'Brücke',
                'Großer Platz',
                'Große Kreuzung'
            ],
            'Kontamination & Spurdifferenzierungen': [
                'Touch & Go',
                'Spur vs Witterung',
                'Alte Spuren 90°',
                'Alte Spuren diffus'
            ],
            'Trailtypen': [
                'Nachttrail',
                'Fahrradtrail',
                'Freitrail',
                'Stottertrail',
                'Drehtrail',
                'Pacmantrail',
                'Citytrail',
                'Thermiktrail',
                'Pettrail'
            ],
            'Geruchsartikel': [
                'Anriechen unbeweglicher GA',
                'Kontaminierter GA'
            ],
            'Start-Varianten': [
                'Start in Kreuzung',
                'Start entgegen Trailrichtung',
                'Start abseits der Spur',
                'Start auf großem Platz',
                'Startdifferenzierung'
            ],
            'Vorbereitung – Alte Trails': [
                'Loop um Gebäude',
                'P um Gebäude'
            ],
            'Alte Trails': [
                '6 Stunden',
                '12 Stunden',
                '24 Stunden',
                '48 Stunden',
                '72 Stunden'
            ],
            'VP-Varianten': [
                'Hochversteck',
                'Tiefversteck',
                'Liegende VP',
                'Gehende VP',
                'VP im Auto',
                'VP nicht zugänglich',
                'VP-Differenzierung'
            ],
            'Negativ-Training': [
                'Hund aus Trail nehmen',
                'Hartes Negativ',
                'Negativ-Ende Auto weg',
                'Weiches Negativ'
            ],
            'Indoor': [
                'Indoor – reinarbeiten',
                'Indoor – eine Ebene',
                'Indoor – Start indoor, VP outdoor',
                'Indoor – zwei Ebenen',
                'Indoor – Kreuzung',
                'Indoor – alte Spuren',
                'Indoor – VP auf andere Ebene',
                'Indoor – Negativ',
                'Indoor – Abschluss'
            ]
        }
    },
    expert: {
        title: '3️⃣ Experte',
        sections: {
            'Extreme Streckenlängen': [
                '1500–2000 m',
                '2000–3000 m',
                '3000+ m'
            ],
            'Extreme Altersunterschiede': [
                '3 Tage',
                '4 Tage',
                '5 Tage',
                '1 Woche'
            ],
            'Spezielle Umgebungen': [
                'Wald',
                'Wasser',
                'Berge',
                'Stadt',
                'Industriegebiet',
                'Landwirtschaft'
            ],
            'Extreme Schwierigkeiten': [
                'Extreme Kreuzungen',
                'Starke Kontamination',
                'Mehrere VP',
                'Wechselnde VP',
                'Mobile VP'
            ],
            'Wettkampf-Training': [
                'Wettkampf Niveau 1',
                'Wettkampf Niveau 2',
                'Wettkampf Niveau 3',
                'Wettkampf Niveau 4'
            ]
        }
    }
};

// Initialize App
function initApp() {
    renderChapters();
    loadData();
    updateStats();
}

// Render Chapters
function renderChapters() {
    const container = document.getElementById('chapters');
    container.innerHTML = '';

    Object.entries(trainingData).forEach(([key, chapter]) => {
        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'chapter';
        chapterDiv.innerHTML = `
            <div class="chapter-header" onclick="toggleChapter('${key}')">
                <span>${chapter.title}</span>
                <span id="arrow-${key}">▼</span>
            </div>
            <div class="chapter-content" id="content-${key}">
                ${renderSections(key, chapter.sections)}
            </div>
        `;
        container.appendChild(chapterDiv);
    });
}

// Render Sections
function renderSections(chapterKey, sections) {
    return Object.entries(sections)
        .map(([sectionTitle, exercises]) => `
            <div class="section-subtitle">${sectionTitle}</div>
            ${exercises.map((exercise, idx) => `
                <div class="exercise" id="exercise-${chapterKey}-${sectionTitle}-${idx}">
                    <div class="exercise-header">
                        <input type="checkbox" class="exercise-checkbox" onchange="updateExercise('${chapterKey}', '${sectionTitle}', ${idx})">
                        <div class="exercise-name">${exercise}</div>
                    </div>
                    <div class="exercise-fields">
                        <div class="exercise-field">
                            <label>📅 Datum</label>
                            <input type="date" class="exercise-date" data-key="${chapterKey}-${sectionTitle}-${idx}-date">
                        </div>
                        <div class="exercise-field">
                            <label>👨‍🏫 Trainer*in</label>
                            <input type="text" class="exercise-trainer" data-key="${chapterKey}-${sectionTitle}-${idx}-trainer" placeholder="Name">
                        </div>
                    </div>
                    <div class="exercise-fields">
                        <div class="exercise-field" style="grid-column: 1 / -1;">
                            <label>📝 Bemerkung</label>
                            <textarea class="exercise-note" data-key="${chapterKey}-${sectionTitle}-${idx}-note" placeholder="Anmerkungen zum Training..."></textarea>
                        </div>
                    </div>
                </div>
            `).join('')
        `).join('');
}

// Toggle Chapter
function toggleChapter(key) {
    const content = document.getElementById(`content-${key}`);
    const arrow = document.getElementById(`arrow-${key}`);
    
    content.classList.toggle('open');
    arrow.textContent = content.classList.contains('open') ? '▲' : '▼';
}

// Update Exercise
function updateExercise(chapterKey, sectionTitle, idx) {
    const exerciseId = `exercise-${chapterKey}-${sectionTitle}-${idx}`;
    const element = document.getElementById(exerciseId);
    const checkbox = element.querySelector('.exercise-checkbox');
    
    if (checkbox.checked) {
        element.classList.add('completed');
    } else {
        element.classList.remove('completed');
    }
    
    updateStats();
}

// Update Statistics
function updateStats() {
    const total = document.querySelectorAll('.exercise-checkbox').length;
    const completed = document.querySelectorAll('.exercise-checkbox:checked').length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    document.getElementById('progress').style.width = percentage + '%';
    document.getElementById('progress-text').textContent = percentage + '%';

    const statsHtml = `
        <div class="stat-card">
            <h3>${total}</h3>
            <p>Gesamt Übungen</p>
        </div>
        <div class="stat-card" style="background: linear-gradient(135deg, #27ae60 0%, #52be80 100%);">
            <h3>${completed}</h3>
            <p>Abgeschlossen</p>
        </div>
        <div class="stat-card" style="background: linear-gradient(135deg, #f39c12 0%, #f5b041 100%);">
            <h3>${total - completed}</h3>
            <p>Ausstehend</p>
        </div>
    `;

    document.getElementById('stats').innerHTML = statsHtml;
}

// Save Data
function saveData() {
    const data = {
        personalData: {
            dogName: document.getElementById('dog-name').value,
            handlerName: document.getElementById('handler-name').value,
            startDate: document.getElementById('start-date').value,
            trainerName: document.getElementById('trainer-name').value,
            dogType: document.getElementById('dog-type').value
        },
        exercises: {}
    };

    // Collect all exercise data
    document.querySelectorAll('.exercise').forEach(exercise => {
        const checkbox = exercise.querySelector('.exercise-checkbox');
        const dateInput = exercise.querySelector('.exercise-date');
        const trainerInput = exercise.querySelector('.exercise-trainer');
        const noteInput = exercise.querySelector('.exercise-note');
        const key = dateInput.dataset.key.replace('-date', '');

        data.exercises[key] = {
            completed: checkbox.checked,
            date: dateInput.value,
            trainer: trainerInput.value,
            note: noteInput.value
        };
    });

    localStorage.setItem('mantrailingData', JSON.stringify(data));
    showAlert('✅ Daten erfolgreich gespeichert!', 'success');
}

// Load Data
function loadData() {
    const saved = localStorage.getItem('mantrailingData');
    if (!saved) return;

    const data = JSON.parse(saved);

    // Load personal data
    if (data.personalData) {
        document.getElementById('dog-name').value = data.personalData.dogName || '';
        document.getElementById('handler-name').value = data.personalData.handlerName || '';
        document.getElementById('start-date').value = data.personalData.startDate || '';
        document.getElementById('trainer-name').value = data.personalData.trainerName || '';
        document.getElementById('dog-type').value = data.personalData.dogType || '';
    }

    // Load exercise data
    if (data.exercises) {
        Object.entries(data.exercises).forEach(([key, value]) => {
            const dateInput = document.querySelector(`.exercise-date[data-key="${key}-date"]`);
            const trainerInput = document.querySelector(`.exercise-trainer[data-key="${key}-trainer"]`);
            const noteInput = document.querySelector(`.exercise-note[data-key="${key}-note"]`);
            const checkbox = document.querySelector(`.exercise-checkbox[onchange*="'${key.substring(0, key.lastIndexOf('-'))}'"]`);

            if (dateInput) dateInput.value = value.date || '';
            if (trainerInput) trainerInput.value = value.trainer || '';
            if (noteInput) noteInput.value = value.note || '';
            
            if (checkbox) {
                checkbox.checked = value.completed || false;
                const exercise = checkbox.closest('.exercise');
                if (value.completed) {
                    exercise.classList.add('completed');
                }
            }
        });
    }

    updateStats();
}

// Clear All Data
function clearAll() {
    if (confirm('⚠️ Möchtest du wirklich alle Daten löschen?')) {
        localStorage.removeItem('mantrailingData');
        location.reload();
    }
}

// Show Alert
function showAlert(message, type = 'info') {
    const alert = document.getElementById('alert');
    alert.textContent = message;
    alert.className = `alert show alert-${type}`;
    setTimeout(() => alert.classList.remove('show'), 3000);
}

// Export to PDF
function exportPDF() {
    const dogName = document.getElementById('dog-name').value || 'Hund';
    const fileName = `Mantrailing_${dogName}_${new Date().toISOString().slice(0, 10)}.txt`;
    
    let content = `MANTRAILING AUSBILDUNGSHEFT\n`;
    content += `${'='.repeat(50)}\n\n`;
    
    content += `PERSÖNLICHE DATEN\n`;
    content += `${'─'.repeat(50)}\n`;
    content += `Hund: ${document.getElementById('dog-name').value}\n`;
    content += `Halter*in: ${document.getElementById('handler-name').value}\n`;
    content += `Beginn: ${document.getElementById('start-date').value}\n`;
    content += `Trainer*in: ${document.getElementById('trainer-name').value}\n`;
    content += `Hundetyp: ${document.getElementById('dog-type').value}\n\n`;
    
    // Add chapter data
    Object.entries(trainingData).forEach(([chapterKey, chapter]) => {
        content += `\n${chapter.title}\n`;
        content += `${'─'.repeat(50)}\n`;
        
        Object.entries(chapter.sections).forEach(([sectionTitle, exercises]) => {
            content += `\n${sectionTitle}:\n`;
            exercises.forEach((exercise, idx) => {
                const key = `${chapterKey}-${sectionTitle}-${idx}`;
                const dateInput = document.querySelector(`.exercise-date[data-key="${key}-date"]`);
                const trainerInput = document.querySelector(`.exercise-trainer[data-key="${key}-trainer"]`);
                const noteInput = document.querySelector(`.exercise-note[data-key="${key}-note"]`);
                const checkbox = document.querySelector(`[data-key="${key}-date"]`)?.closest('.exercise')?.querySelector('.exercise-checkbox');
                
                const status = checkbox && checkbox.checked ? '✅' : '☐';
                content += `  ${status} ${exercise}\n`;
                if (dateInput && dateInput.value) content += `     Datum: ${dateInput.value}\n`;
                if (trainerInput && trainerInput.value) content += `     Trainer: ${trainerInput.value}\n`;
                if (noteInput && noteInput.value) content += `     Notiz: ${noteInput.value}\n`;
            });
        });
    });
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showAlert('📥 Datei erfolgreich heruntergeladen!', 'success');
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', initApp);

// Auto-save on changes
document.addEventListener('change', () => {
    saveData();
});