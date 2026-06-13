// Оригинальные и точные рецепты заклинаний Инвокера из Dota 2
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
            currentOrbs.shift(); // Удаляем самую старую сферу из начала очереди
        }
        currentOrbs.push(key.toUpperCase()); // Добавляем новую сферу в конец
        updateUI();
    }
    
    // Нажатие Invoke (R)
    if (key === "r") {
        invokeSpell();
    }
});

// Обновление отображения сфер на экране
function updateUI() {
    for (let i = 0; i < 3; i++) {
        const visualSlot = document.getElementById(`orb-slot-${i}`);
        const textSlot = document.getElementById(`orb${i}`);
        
        // Сброс стилей
        visualSlot.className = "orb-visual"; 
        textSlot.textContent = "—";
        textSlot.style.color = "#c5c6c7";

        // Если в слоте есть сфера, красим её в правильный цвет
        if (currentOrbs[i]) {
            const orbType = currentOrbs[i];
            visualSlot.classList.add(`orb-${orbType}`);
            textSlot.textContent = orbType;
            textSlot.style.color = orbType === 'Q' ? '#00d2ff' : orbType === 'W' ? '#ea00ff' : '#ff7b00';
        }
    }
}

// Каст заклинания
function invokeSpell() {
    if (currentOrbs.length < 3) return;
    
    // Сортируем текущие сферы по алфавиту, чтобы они совпали с ключами в SPELL_RECIPES
    const currentKey = [...currentOrbs].sort().join("");
    const invokedSpell = SPELL_RECIPES[currentKey];
    
    if (invokedSpell) {
        document.getElementById("current-spell").textContent = invokedSpell;
        
        // Если вызванное заклинание совпало с заданием
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
