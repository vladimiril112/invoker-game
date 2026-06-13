// Книга заклинаний Инвокера (без лишних режимов)
const SPELL_RECIPES = {
    "QQQ": "Cold Snap",
    "QQW": "Ghost Walk",
    "QQE": "Ice Wall",
    "WWW": "EMP",
    "WWQ": "Tornado",
    "WWE": "Alacrity",
    "EEE": "Sun Strike",
    "EEQ": "Forge Spirit",
    "EEW": "Chaos Meteor",
    "QWE": "Deafening Blast"
};

const spellsList = Object.values(SPELL_RECIPES);

let currentOrbs = []; 
let score = 0;
let targetSpell = "";

// Старт игры
generateNewTarget();

// Ловим нажатия клавиш
window.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    
    // Нажатие сфер
    if (["q", "w", "e"].includes(key)) {
        if (currentOrbs.length >= 3) {
            currentOrbs.shift(); // Удаляем самую старую сферу из начала
        }
        currentOrbs.push(key.toUpperCase()); // Добавляем новую в конец
        updateUI();
    }
    
    // Нажатие Invoke (R)
    if (key === "r") {
        invokeSpell();
    }
});

// Обновление отображения сфер на экране
function updateUI() {
    // Чистим старые классы анимации сфер
    for (let i = 0; i < 3; i++) {
        const visualSlot = document.getElementById(`orb-slot-${i}`);
        const textSlot = document.getElementById(`orb${i}`);
        
        visualSlot.className = "orb-visual"; 
        textSlot.textContent = "—";
        textSlot.style.color = "#c5c6c7";

        // Если сфера в этом слоте есть — подсвечиваем её
        if (currentOrbs[i]) {
            const orbType = currentOrbs[i];
            visualSlot.classList.add(`orb-${orbType}`);
            textSlot.textContent = orbType;
            textSlot.style.color = orbType === 'Q' ? '#00d2ff' : orbType === 'W' ? '#ea00ff' : '#ff7b00';
        }
    }
}

// Проверка комбинации
function invokeSpell() {
    if (currentOrbs.length < 3) return;
    
    // Сортируем текущие сферы по алфавиту для сверки с базой рецептов
    const currentKey = [...currentOrbs].sort().join("");
    const invokedSpell = SPELL_RECIPES[currentKey];
    
    if (invokedSpell) {
        document.getElementById("current-spell").textContent = invokedSpell;
        
        // Если угадали заклинание из задания
        if (invokedSpell === targetSpell) {
            score++;
            document.getElementById("score-counter").textContent = score;
            generateNewTarget();
        }
    }
}

// Генерация случайного задания
function generateNewTarget() {
    const randomIndex = Math.floor(Math.random() * spellsList.length);
    targetSpell = spellsList[randomIndex];
    document.getElementById("target-spell-name").textContent = targetSpell;
}
