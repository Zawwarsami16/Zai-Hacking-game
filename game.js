// ============================================
// HACKER'S LEGACY - COMPLETE EDITION
// The Ultimate Hacking RPG
// Created by ZAWWAR
// ============================================

// ============================================
// GAME STATE
// ============================================

let gameState = {
    // Player stats
    level: 1,
    exp: 0,
    completedMissions: [],
    
    // Story state
    currentAct: 1,
    currentChapter: 1,
    path: 'unselected',
    pathChoices: [],
    
    // Game state
    isAdmin: false,
    currentMission: null,
    currentPath: '/',
    slot: 0,
    pendingReplay: null,
    
    // Mission tracking
    hintCount: 0,
    missionStartTime: null,
    attempts: 0,
    
    // Achievements
    achievements: [],
    discoveredSecrets: [],
    
    // Story flags
    metGhost: false,
    chosePath: false,
    betrayedBy: null,
    allies: [],
    enemies: [],
    
    // End game flags
    ending: null,
    endingCondition: null,
    
    // Directories
    directories: {
        '/': { type: 'dir', children: ['home', 'missions', 'library', 'journal', 'map'] },
        '/home': { type: 'dir', children: ['profile.txt', 'stats.txt', 'achievements.txt'] },
        '/missions': { type: 'dir', children: [] },
        '/library': { type: 'dir', children: ['knowledge.txt', 'paths.txt', 'tools.txt'] },
        '/journal': { type: 'dir', children: ['story.txt', 'characters.txt', 'clues.txt'] },
        '/map': { type: 'dir', children: ['act1.txt', 'act2.txt', 'act3.txt', 'act4.txt', 'act5.txt'] }
    }
};

let missions = [];
let saveSlots = [{}, {}, {}, {}, {}];

// DOM elements
const introModal = document.getElementById('introModal');
const terminal = document.getElementById('terminal');
const terminalContent = document.getElementById('terminalContent');
const output = document.getElementById('output');
const input = document.getElementById('commandInput');
const prompt = document.getElementById('prompt');
const startBtn = document.getElementById('startGame');
const clock = document.getElementById('clock');

let _scrollScheduled = false;
function scrollToBottom() {
    if (!terminalContent || _scrollScheduled) return;
    _scrollScheduled = true;
    requestAnimationFrame(() => {
        _scrollScheduled = false;
        terminalContent.scrollTop = terminalContent.scrollHeight;
    });
}

function forceScrollToBottom() {
    if (!terminalContent) return;
    // run multiple frames to catch any post-append layout shifts (animations, fonts, etc.)
    terminalContent.scrollTop = terminalContent.scrollHeight;
    requestAnimationFrame(() => {
        terminalContent.scrollTop = terminalContent.scrollHeight;
        requestAnimationFrame(() => {
            terminalContent.scrollTop = terminalContent.scrollHeight;
        });
    });
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

setInterval(() => {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
}, 1000);

function appendLine(text, color) {
    const line = document.createElement('div');
    line.textContent = text;
    if (color) line.style.color = color;
    output.appendChild(line);
    scrollToBottom();
}

function print(text)        { appendLine(text); }
function printError(text)   { appendLine(text, 'var(--red)'); }
function printSuccess(text) { appendLine(text, 'var(--green)'); }
function printInfo(text)    { appendLine(text, 'var(--blue)'); }
function printWarning(text) { appendLine(text, 'var(--yellow)'); }
function printPurple(text)  { appendLine(text, 'var(--purple)'); }
function printOrange(text)  { appendLine(text, 'var(--orange)'); }
function printDim(text)     { appendLine(text, 'var(--green-dim)'); }

function printCommand(cmd) {
    const line = document.createElement('div');
    line.innerHTML = `<span class="prompt">${escapeHtml(prompt.textContent)}</span> ${escapeHtml(cmd)}`;
    output.appendChild(line);
    scrollToBottom();
}

function nextStepHint() {
    if (!gameState.chosePath) {
        printDim("→ tip: type 'path' to choose your destiny.");
    } else if (gameState.completedMissions.length === 0) {
        printDim("→ tip: type 'start 1' to begin your first mission.");
    }
}

// ============================================
// GAME MANUAL
// ============================================

function showReadme() {
    print('╔══════════════════════════════════════════════════════╗');
    print('║              HACKER\'S LEGACY - README                ║');
    print('║                 Complete Game Manual                  ║');
    print('║                  Created by ZAWWAR                    ║');
    print('╚══════════════════════════════════════════════════════╝');
    print('');
    print('📚 OVERVIEW');
    print('══════════════════════════════════════════════════════');
    print('HACKER\'S LEGACY is an epic hacking RPG set in 2077.');
    print('100 missions across 5 acts, with 3 paths and 9 endings.');
    print('');
    print('🎮 HOW TO PLAY');
    print('══════════════════════════════════════════════════════');
    print('• Type \'help\' to see all commands');
    print('• Type \'path\' to choose your destiny');
    print('• Type \'missions\' to see available missions');
    print('• Type \'start 1\' to begin your journey');
    print('• Type \'status\' to check your progress');
    print('• Type \'map\' to see your journey map');
    print('• Type \'journal\' to read your story log');
    print('• Type \'achievements\' to track your medals');
    print('• Type \'slots\' to save/load your game');
    print('');
    print('📜 THE STORY');
    print('══════════════════════════════════════════════════════');
    print('ACT I: THE AWAKENING - Learn the basics');
    print('ACT II: THE CONSPIRACY - XSS, CSRF, SSRF, XXE');
    print('ACT III: THE WAR - Command injection, file upload');
    print('ACT IV: THE RECKONING - Metasploit, privilege escalation');
    print('ACT V: THE ENDING - Reverse engineering, bug bounty');
    print('');
    print('⚔️ THREE PATHS');
    print('══════════════════════════════════════════════════════');
    print('⚪ WHITE HAT - Protect the innocent');
    print('⚫ BLACK HAT - Rule the shadows');
    print('🔘 GREY HAT - Balance the scales');
    print('');
    print('🔥 DARK KNOWLEDGE');
    print('══════════════════════════════════════════════════════');
    print('Every mission contains hidden knowledge that AI won\'t tell you.');
    print('');
    print('📌 QUICK REFERENCE');
    print('══════════════════════════════════════════════════════');
    print('help       Show this menu');
    print('ls         List directory contents');
    print('cd <dir>   Change directory');
    print('pwd        Show current path');
    print('cat <file> View file contents');
    print('missions   List available missions');
    print('start <N>  Start mission N');
    print('status     Show your stats');
    print('path       Choose your path');
    print('map        View journey map');
    print('journal    Read your story log');
    print('achievements View achievements');
    print('slots      View save slots');
    print('save <N>   Save to slot N');
    print('load <N>   Load from slot N');
    print('admin      Enter god mode');
    print('clear      Clear terminal');
    print('readme     Show this manual');
    print('');
    print('🎯 YOUR JOURNEY BEGINS NOW');
    print('══════════════════════════════════════════════════════');
    print('Type \'path\' to choose your destiny.');
    print('Type \'start 1\' to begin.');
}

// ============================================
// STORY FUNCTIONS
// ============================================

function showCurrentAct() {
    const acts = [
        "ACT I: THE AWAKENING - A mysterious figure contacts you.",
        "ACT II: THE CONSPIRACY - You discover a global conspiracy.",
        "ACT III: THE WAR - Full-scale cyberwar between factions.",
        "ACT IV: THE RECKONING - The final confrontation approaches.",
        "ACT V: THE ENDING - Your choices determine the future."
    ];
    printPurple(`\n⚡ CURRENT STORY: ${acts[gameState.currentAct - 1]}`);
    printPurple(`Chapter ${gameState.currentChapter}: Progress ${Math.floor(gameState.completedMissions.length / 20 * 100)}%`);
}

function showMap() {
    print('╔══════════════════════════════════════╗');
    print('║           THE JOURNEY MAP           ║');
    print('╠══════════════════════════════════════╣');
    
    const acts = [
        { name: 'ACT I: AWAKENING', missions: '1-20', status: gameState.currentAct >= 1 ? '✅' : '🔒' },
        { name: 'ACT II: CONSPIRACY', missions: '21-40', status: gameState.currentAct >= 2 ? '✅' : '🔒' },
        { name: 'ACT III: WAR', missions: '41-60', status: gameState.currentAct >= 3 ? '✅' : '🔒' },
        { name: 'ACT IV: RECKONING', missions: '61-80', status: gameState.currentAct >= 4 ? '✅' : '🔒' },
        { name: 'ACT V: ENDING', missions: '81-100', status: gameState.currentAct >= 5 ? '✅' : '🔒' }
    ];
    
    acts.forEach(act => {
        print(`║ ${act.status} ${act.name.padEnd(20)} [${act.missions}] ║`);
    });
    print('╚══════════════════════════════════════╝');
}

function showPathProgress() {
    const pathMissions = missions.filter(m => m.path === gameState.path || m.path === 'all');
    const completed = pathMissions.filter(m => gameState.completedMissions.includes(m.id)).length;
    printInfo(`\n${gameState.path.toUpperCase()} HAT Path: ${completed}/${pathMissions.length} missions`);
}

function showJournal() {
    printPurple('\n📔 JOURNAL ENTRIES');
    printPurple('══════════════════════════════════════');
    
    if (gameState.completedMissions.length === 0) {
        print('Your journal is empty. Complete missions to unlock entries.');
    } else {
        missions.filter(m => gameState.completedMissions.includes(m.id))
               .forEach(m => {
                   print(`\n📌 MISSION ${m.id}: ${m.name}`);
                   print(`   ${m.story.substring(0, 100)}...`);
               });
    }
    printPurple('══════════════════════════════════════\n');
}

// ============================================
// PROMPT UPDATE
// ============================================

function updatePrompt() {
    let path = gameState.currentPath;
    if (gameState.currentMission) {
        prompt.textContent = `mission${gameState.currentMission.id}@legacy:${path}$`;
    } else if (gameState.path !== 'unselected') {
        prompt.textContent = `${gameState.path}@legacy:${path}$`;
    } else {
        prompt.textContent = `guest@legacy:${path}$`;
    }
}

// ============================================
// DIRECTORY COMMANDS
// ============================================

function handleCd(args) {
    if (args.length === 0) {
        gameState.currentPath = '/';
        updatePrompt();
        return;
    }

    let target = args[0];
    let newPath;

    if (target === '..') {
        let parts = gameState.currentPath.split('/').filter(p => p);
        parts.pop();
        newPath = '/' + parts.join('/');
        if (newPath === '') newPath = '/';
    } else if (target.startsWith('/')) {
        newPath = target;
    } else {
        newPath = gameState.currentPath + '/' + target;
    }

    newPath = newPath.replace(/\/+/g, '/');

    if (gameState.directories[newPath] && gameState.directories[newPath].type === 'dir') {
        gameState.currentPath = newPath;
        updatePrompt();
        
        if (newPath === '/map') showMap();
        else if (newPath === '/journal') showJournal();
    } else {
        printError(`cd: no such directory: ${target}`);
    }
}

function handleLs() {
    const current = gameState.directories[gameState.currentPath];
    if (!current || current.type !== 'dir') {
        printError('ls: not a directory');
        return;
    }

    current.children.forEach(item => {
        const fullPath = gameState.currentPath + '/' + item;
        const type = gameState.directories[fullPath]?.type === 'dir' ? '📁' : '📄';
        print(`${type} ${item}`);
    });
}

function handlePwd() {
    print(gameState.currentPath);
}

function handleCat(args) {
    if (args.length === 0) {
        printError('cat: missing file operand');
        return;
    }

    let target = args[0];
    let filePath = target.startsWith('/') ? target : gameState.currentPath + '/' + target;
    filePath = filePath.replace(/\/+/g, '/');

    const file = gameState.directories[filePath];
    if (!file || file.type !== 'file') {
        printError(`cat: ${target}: No such file`);
        return;
    }

    print(file.content);
}

// ============================================
// SAVE/LOAD SYSTEM
// ============================================

function loadSaveSlots() {
    for (let i = 0; i < 5; i++) {
        const saved = localStorage.getItem(`slot_${i}`);
        if (!saved) continue;
        try {
            saveSlots[i] = JSON.parse(saved);
        } catch (e) {
            // Slot is corrupt (manual edit, half-written write, format change).
            // Drop it rather than poisoning the rest of the load loop, and keep
            // the localStorage value around in a parallel key for forensics so
            // the player can recover by hand if they care.
            console.warn(`save slot ${i} unparseable, quarantining:`, e);
            localStorage.setItem(`slot_${i}__corrupt_${Date.now()}`, saved);
            localStorage.removeItem(`slot_${i}`);
        }
    }
}

function saveToSlot(slot) {
    gameState.slot = slot;
    const data = {
        level: gameState.level,
        exp: gameState.exp,
        completedMissions: gameState.completedMissions,
        path: gameState.path,
        currentAct: gameState.currentAct,
        currentChapter: gameState.currentChapter,
        metGhost: gameState.metGhost,
        chosePath: gameState.chosePath,
        achievements: gameState.achievements,
        isAdmin: gameState.isAdmin,
        savedAt: Date.now()
    };
    localStorage.setItem(`slot_${slot}`, JSON.stringify(data));
    saveSlots[slot] = data;
    printSuccess(`✅ Saved to slot ${slot + 1}`);
}

function loadFromSlot(slot) {
    const data = saveSlots[slot];
    if (data) {
        gameState.level = data.level || 1;
        gameState.exp = data.exp || 0;
        gameState.completedMissions = data.completedMissions || [];
        gameState.path = data.path || 'unselected';
        gameState.currentAct = data.currentAct || 1;
        gameState.currentChapter = data.currentChapter || 1;
        gameState.metGhost = data.metGhost || false;
        gameState.chosePath = data.chosePath || false;
        gameState.achievements = data.achievements || [];
        gameState.isAdmin = data.isAdmin || false;
        gameState.slot = slot;
        gameState.currentMission = null;
        gameState.pendingReplay = null;
        updatePrompt();
        printSuccess(`✅ Loaded slot ${slot + 1}`);
        showCurrentAct();
    } else {
        printError(`❌ Slot ${slot + 1} is empty`);
    }
}

function showSlots() {
    print('╔══════════════════════════════════════╗');
    print('║           SAVE SLOTS                 ║');
    print('╠══════════════════════════════════════╣');
    saveSlots.forEach((slot, index) => {
        if (slot && slot.level) {
            print(`║ Slot ${index + 1}: Level ${slot.level} | Path: ${slot.path} ║`);
        } else {
            print(`║ Slot ${index + 1}: EMPTY                       ║`);
        }
    });
    print('╚══════════════════════════════════════╝');
    print('Use: save <slot> or load <slot>');
}

// ============================================
// PATH SELECTION
// ============================================

function choosePath() {
    print('╔══════════════════════════════════════╗');
    print('║         CHOOSE YOUR PATH             ║');
    print('╠══════════════════════════════════════╣');
    print('║ 1. WHITE HAT - The Guardian         ║');
    print('║ 2. BLACK HAT - The Shadow           ║');
    print('║ 3. GREY HAT - The Vigilante         ║');
    print('╚══════════════════════════════════════╝');
    print('\n💭 GHOST: "Choose wisely. This decision cannot be undone."');
    printInfo('\n→ Type  path 1  (or path1) to confirm WHITE HAT');
    printInfo('→ Type  path 2  (or path2) to confirm BLACK HAT');
    printInfo('→ Type  path 3  (or path3) to confirm GREY HAT');
    gameState.awaitingPath = true;
}

function setPath(num) {
    if (gameState.chosePath) {
        printError('❌ Path already chosen.');
        return;
    }
    
    const paths = {
        1: { name: 'white', message: 'PATH CHOSEN: WHITE HAT' },
        2: { name: 'black', message: 'PATH CHOSEN: BLACK HAT' },
        3: { name: 'grey', message: 'PATH CHOSEN: GREY HAT' }
    };
    
    if (paths[num]) {
        gameState.path = paths[num].name;
        gameState.chosePath = true;
        printSuccess(`\n✅ ${paths[num].message}`);
        updatePrompt();
        printDim("→ now type 'start 1' to begin your first mission.");
    } else {
        printError('❌ Invalid path.');
    }
}

// ============================================
// MISSION HANDLING
// ============================================

function startMission(id) {
    const mission = missions.find(m => m.id === id);
    if (!mission) {
        printError(`❌ Mission ${id} not found`);
        return;
    }
    
    if (mission.path !== 'all' && mission.path !== gameState.path && gameState.path !== 'unselected') {
        printError(`❌ This mission is for ${mission.path.toUpperCase()} HAT path only.`);
        return;
    }
    
    if (mission.requiredLevel > gameState.level) {
        printError(`❌ Need Level ${mission.requiredLevel} to start this mission.`);
        return;
    }
    
    if (gameState.completedMissions.includes(id)) {
        printWarning(`\n⚠️ Mission ${id} already completed.`);
        printInfo(`📊 Current Level: ${gameState.level}`);
        
        const nextMission = missions.find(m => 
            m.requiredLevel <= gameState.level && 
            !gameState.completedMissions.includes(m.id)
        );
        
        if (nextMission) {
            printInfo(`🎯 Next Mission: ${nextMission.id} - ${nextMission.name}`);
            printInfo(`💡 Type 'start ${nextMission.id}' to continue.`);
        } else {
            printInfo(`🎉 All available missions completed! Check 'map' for next act.`);
        }
        
        print('\n🔄 Replay this mission? (y/n)');
        gameState.pendingReplay = id;
        return;
    }
    
    if (mission.nextMission && !gameState.completedMissions.includes(id - 1) && id > 1) {
        printError('❌ Complete previous mission first.');
        return;
    }
    
    gameState.currentMission = mission;
    gameState.hintCount = 0;
    gameState.missionStartTime = Date.now();
    gameState.attempts = 0;
    updatePrompt();
    
    if (id === 1 && !gameState.metGhost) gameState.metGhost = true;
    if (mission.act) gameState.currentAct = mission.act;
    if (mission.chapter) gameState.currentChapter = mission.chapter;
    
    print('╔══════════════════════════════════════╗');
    print(`║ MISSION ${mission.id}: ${mission.name} ║`);
    print('╠══════════════════════════════════════╣');
    print(`║ ${mission.description} ║`);
    print('╚══════════════════════════════════════╝');
    print(`\n📖 ${mission.story}`);
    print(`\n🎯 TARGET: ${mission.target}`);
    print(`\n💻 Type your command. Use 'hint' if stuck.`);
    print(`\n[Attempts: 0/3]`);
}

function handleMissionCommand(cmd) {
    if (!gameState.currentMission) return false;
    
    gameState.attempts++;
    
    if (cmd === 'hint') {
        gameState.hintCount++;
        if (gameState.hintCount === 1) printInfo(`💡 HINT 1: ${gameState.currentMission.hint1}`);
        else if (gameState.hintCount === 2) printInfo(`💡 HINT 2: ${gameState.currentMission.hint2}`);
        else if (gameState.hintCount >= 3) {
            printWarning(`⚠️ FINAL ANSWER: ${gameState.currentMission.command}`);
            printInfo(`📘 EXPLANATION: ${gameState.currentMission.explanation}`);
        }
        return true;
    }
    
    if (cmd === 'exit') {
        gameState.currentMission = null;
        gameState.currentPath = '/';
        updatePrompt();
        print('Exited mission.');
        return true;
    }
    
    if (cmd === 'status') {
        const timeElapsed = Math.floor((Date.now() - gameState.missionStartTime) / 1000);
        printInfo(`Attempts: ${gameState.attempts}/3 | Time: ${timeElapsed}s | Hints: ${gameState.hintCount}/3`);
        return true;
    }
    
    if (cmd === gameState.currentMission.command) {
        const timeElapsed = Math.floor((Date.now() - gameState.missionStartTime) / 1000);
        const level = gameState.currentMission.requiredLevel;
        
        const baseReward = level * 800;
        const timeBonus = Math.max(0, 300 - timeElapsed) * 2;
        const attemptBonus = Math.max(0, 3 - gameState.attempts) * 50;
        
        let totalReward = baseReward + timeBonus + attemptBonus;
        
        const expNeededForNextLevel = gameState.level * 1000;
        const maxAllowed = expNeededForNextLevel - gameState.exp + 200;
        if (totalReward > maxAllowed) totalReward = maxAllowed;
        
        if (!gameState.completedMissions.includes(gameState.currentMission.id)) {
            gameState.completedMissions.push(gameState.currentMission.id);
        }
        gameState.exp += totalReward;

        let leveledUp = false;
        while (gameState.exp >= gameState.level * 1000 && gameState.level < 100) {
            gameState.exp -= gameState.level * 1000;
            gameState.level++;
            leveledUp = true;
        }
        
        printSuccess(`\n✅ MISSION COMPLETE! +${totalReward} EXP`);
        print(`📤 OUTPUT:\n${gameState.currentMission.output}`);
        printInfo(`⏱️ Time bonus: +${timeBonus} EXP | 🎯 Attempt bonus: +${attemptBonus} EXP`);
        
        if (gameState.currentMission.darkKnowledge) {
            printInfo(`\n🔥 DARK KNOWLEDGE:\n${gameState.currentMission.darkKnowledge}`);
        }
        
        if (leveledUp) {
            printSuccess(`\n⬆️ LEVEL UP! You are now Level ${gameState.level}`);
        }
        
        gameState.currentMission = null;
        gameState.currentPath = '/';
        updatePrompt();

        // Auto-suggest next mission
        const next = missions.find(m =>
            m.requiredLevel <= gameState.level &&
            !gameState.completedMissions.includes(m.id) &&
            (m.path === 'all' || m.path === gameState.path || gameState.path === 'unselected')
        );
        if (next) {
            printDim(`→ next up: mission ${next.id}: ${next.name}. type 'start ${next.id}' to continue.`);
        } else {
            printDim(`→ no more missions at your level. try 'map' to see progress.`);
        }
        return true;
    } else {
        printError(`❌ Wrong command. Attempt ${gameState.attempts}/3`);
        if (gameState.attempts >= 3) {
            printWarning(`⚠️ Command: ${gameState.currentMission.command}`);
        }
        return true;
    }
}

// ============================================
// ACHIEVEMENT SYSTEM
// ============================================

function checkAchievements() {
    const achievements = [
        { id: 1, name: 'First Blood', condition: () => gameState.completedMissions.length >= 1 },
        { id: 2, name: 'Path Chosen', condition: () => gameState.chosePath },
        { id: 3, name: 'Ghost Seeker', condition: () => gameState.metGhost },
        { id: 4, name: 'Level 10', condition: () => gameState.level >= 10 },
        { id: 5, name: 'Level 25', condition: () => gameState.level >= 25 },
        { id: 6, name: 'Level 50', condition: () => gameState.level >= 50 },
        { id: 7, name: 'Level 75', condition: () => gameState.level >= 75 },
        { id: 8, name: 'Level 100', condition: () => gameState.level >= 100 },
        { id: 9, name: 'Mission Master', condition: () => gameState.completedMissions.length >= 50 },
        { id: 10, name: 'Legend', condition: () => gameState.completedMissions.length >= 100 }
    ];
    
    achievements.forEach(ach => {
        if (ach.condition() && !gameState.achievements.includes(ach.id)) {
            gameState.achievements.push(ach.id);
            printSuccess(`🏆 ACHIEVEMENT UNLOCKED: ${ach.name}`);
        }
    });
}

function showAchievements() {
    print('╔══════════════════════════════════════╗');
    print('║           ACHIEVEMENTS               ║');
    print('╠══════════════════════════════════════╣');
    
    const list = [
        { id: 1, name: 'First Blood', desc: 'Complete first mission' },
        { id: 2, name: 'Path Chosen', desc: 'Choose your path' },
        { id: 3, name: 'Ghost Seeker', desc: 'Meet Ghost' },
        { id: 4, name: 'Level 10', desc: 'Reach Level 10' },
        { id: 5, name: 'Level 25', desc: 'Reach Level 25' },
        { id: 6, name: 'Level 50', desc: 'Reach Level 50' },
        { id: 7, name: 'Level 75', desc: 'Reach Level 75' },
        { id: 8, name: 'Level 100', desc: 'Reach Level 100' },
        { id: 9, name: 'Mission Master', desc: 'Complete 50 missions' },
        { id: 10, name: 'Legend', desc: 'Complete 100 missions' }
    ];
    
    list.forEach(ach => {
        const unlocked = gameState.achievements.includes(ach.id) ? '✅' : '🔒';
        print(`║ ${unlocked} ${ach.name.padEnd(20)} ${ach.desc.padEnd(20)} ║`);
    });
    print('╚══════════════════════════════════════╝');
}

// ============================================
// COMMAND HANDLER
// ============================================

function handleCommand(cmd) {
    // Handle replay response
    if (gameState.pendingReplay) {
        if (cmd === 'y' || cmd === 'yes') {
            const missionId = gameState.pendingReplay;
            gameState.pendingReplay = null;

            gameState.currentMission = missions.find(m => m.id === missionId);
            gameState.hintCount = 0;
            gameState.missionStartTime = Date.now();
            gameState.attempts = 0;
            updatePrompt();

            const m = gameState.currentMission;
            print('╔══════════════════════════════════════╗');
            print(`║ REPLAY: MISSION ${m.id}: ${m.name} ║`);
            print('╠══════════════════════════════════════╣');
            print(`║ ${m.description} ║`);
            print('╚══════════════════════════════════════╝');
            print(`\n📖 ${m.story}`);
            print(`\n💻 Type your command. (Replay - no EXP)`);
            return;
        } else {
            // Any other input cancels the replay prompt cleanly
            gameState.pendingReplay = null;
            if (cmd !== 'n' && cmd !== 'no') {
                printInfo('Replay cancelled. Continuing…');
            } else {
                print('Replay cancelled.');
                return;
            }
        }
    }
    
    const parts = cmd.toLowerCase().split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    if (gameState.currentMission && handleMissionCommand(cmd)) return;

    switch(command) {
        case 'help':
            print('╔══════════════════════════════════════╗');
            print('║           COMMANDS                   ║');
            print('╠══════════════════════════════════════╣');
            print('║ help       - This menu              ║');
            print('║ ls         - List directory         ║');
            print('║ cd <dir>   - Change directory       ║');
            print('║ pwd        - Show current path      ║');
            print('║ cat <file> - View file              ║');
            print('║ missions   - List available missions║');
            print('║ start <N>  - Start mission N        ║');
            print('║ status     - Your stats             ║');
            print('║ path       - Choose your path       ║');
            print('║ map        - View journey map       ║');
            print('║ journal    - Read your journal      ║');
            print('║ achievements- View achievements     ║');
            print('║ slots      - View save slots        ║');
            print('║ save <N>   - Save to slot N         ║');
            print('║ load <N>   - Load from slot N       ║');
            print('║ admin <pin>- Admin login            ║');
            print('║ readme     - Game manual            ║');
            print('║ clear      - Clear screen           ║');
            print('╚══════════════════════════════════════╝');
            print('shortcuts: ↑/↓ history · ctrl+L clear');
            nextStepHint();
            break;

        case 'ls': handleLs(); break;
        case 'cd': handleCd(args); break;
        case 'pwd': handlePwd(); break;
        case 'cat': handleCat(args); break;
        
        case 'missions':
            const avail = missions.filter(m => 
                m.requiredLevel <= gameState.level && 
                !gameState.completedMissions.includes(m.id) &&
                (m.path === 'all' || m.path === gameState.path || gameState.path === 'unselected')
            );
            
            if (avail.length === 0) {
                printInfo('No new missions available.');
                return;
            }
            
            print('╔══════════════════════════════════════╗');
            print('║        AVAILABLE MISSIONS            ║');
            print('╠══════════════════════════════════════╣');
            avail.slice(0, 10).forEach(m => {
                const icon = m.path === 'all' ? '🌐' : m.path === 'white' ? '⚪' : m.path === 'black' ? '⚫' : '🔘';
                print(`║ ${icon} ${m.id}. ${m.name.padEnd(25)} [Lvl ${m.requiredLevel}] ║`);
            });
            print('╚══════════════════════════════════════╝');
            break;

        case 'start':
            const id = parseInt(args[0]);
            if (isNaN(id)) printError('❌ Usage: start <mission_id>');
            else startMission(id);
            break;

        case 'status':
            print('╔══════════════════════════════════════╗');
            print('║              STATUS                  ║');
            print('╠══════════════════════════════════════╣');
            print(`║ Level: ${gameState.level}${' '.repeat(27)} ║`);
            print(`║ EXP: ${gameState.exp}/${gameState.level * 1000}${' '.repeat(15)} ║`);
            print(`║ Missions: ${gameState.completedMissions.length}/100${' '.repeat(14)} ║`);
            print(`║ Path: ${gameState.path === 'unselected' ? 'None' : gameState.path.toUpperCase()}${' '.repeat(27)} ║`);
            print(`║ Act: ${gameState.currentAct} | Chapter: ${gameState.currentChapter}${' '.repeat(16)} ║`);
            print('╚══════════════════════════════════════╝');
            break;

        case 'path':
            if (gameState.chosePath) {
                printInfo(`Current path: ${gameState.path.toUpperCase()} HAT`);
            } else if (args[0] === '1' || args[0] === '2' || args[0] === '3') {
                setPath(parseInt(args[0]));
                gameState.awaitingPath = false;
            } else {
                choosePath();
            }
            break;

        case 'path1': setPath(1); gameState.awaitingPath = false; break;
        case 'path2': setPath(2); gameState.awaitingPath = false; break;
        case 'path3': setPath(3); gameState.awaitingPath = false; break;

        case '1':
        case '2':
        case '3':
            if (gameState.awaitingPath && !gameState.chosePath) {
                setPath(parseInt(command));
                gameState.awaitingPath = false;
            } else {
                printError(`❌ Unknown command: ${command}`);
                printInfo('Type "help" for available commands.');
            }
            break;

        case 'map': showMap(); break;
        case 'journal': showJournal(); break;
        case 'achievements': showAchievements(); break;
        case 'slots': showSlots(); break;
        case 'readme': showReadme(); break;

        case 'save':
            const saveSlot = parseInt(args[0]) - 1;
            if (!isNaN(saveSlot) && saveSlot >= 0 && saveSlot < 5) saveToSlot(saveSlot);
            else printError('❌ Usage: save <slot> (1-5)');
            break;

        case 'load':
            const loadSlot = parseInt(args[0]) - 1;
            if (!isNaN(loadSlot) && loadSlot >= 0 && loadSlot < 5) loadFromSlot(loadSlot);
            else printError('❌ Usage: load <slot> (1-5)');
            break;

        case 'admin':
            if (!args.length) {
                printInfo('Usage: admin <pin>');
                printInfo('Hint: PIN was set when you started this game.');
                break;
            }
            if (args[0] === '427568') {
                gameState.isAdmin = true;
                printSuccess('✅ Admin mode activated');
                printInfo('Commands: goto <level>, unlock_all, complete_act <act>');
            } else {
                printError('❌ Wrong PIN');
            }
            break;

        case 'goto':
            if (!gameState.isAdmin) { printError('❌ Admin required'); return; }
            const lvl = parseInt(args[0]);
            if (!isNaN(lvl) && lvl >= 1 && lvl <= 100) {
                gameState.level = lvl;
                gameState.exp = 0;
                printSuccess(`✅ Teleported to Level ${lvl}`);
            } else {
                printError('❌ Usage: goto <level> (1-100)');
            }
            break;

        case 'unlock_all':
            if (!gameState.isAdmin) { printError('❌ Admin required'); return; }
            gameState.completedMissions = missions.map(m => m.id);
            gameState.level = 100;
            gameState.exp = 0;
            printSuccess('✅ All missions completed');
            break;

        case 'complete_act':
            if (!gameState.isAdmin) { printError('❌ Admin required'); return; }
            const act = parseInt(args[0]);
            if (!isNaN(act) && act >= 1 && act <= 5) {
                missions.filter(m => m.act === act).forEach(m => {
                    if (!gameState.completedMissions.includes(m.id)) gameState.completedMissions.push(m.id);
                });
                printSuccess(`✅ Act ${act} completed`);
            } else printError('❌ Usage: complete_act <1-5>');
            break;

        case 'clear':
            output.innerHTML = '';
            break;

        default:
            printError(`❌ Unknown command: ${command}`);
            printInfo('Type "help" for available commands.');
    }
    
    checkAchievements();
}

// ============================================
// INITIALIZATION
// ============================================

window.addEventListener('load', () => {
    if (window.MISSIONS) {
        missions = window.MISSIONS;
        console.log(`✅ Loaded ${missions.length} missions`);

        const missionChildren = [];
        missions.forEach(m => {
            const dir = `/missions/level${m.id}`;
            missionChildren.push(`level${m.id}`);
            if (!gameState.directories[dir]) {
                gameState.directories[dir] = { type: 'dir', children: ['story.txt', 'info.txt', 'dark.txt'] };
                gameState.directories[`${dir}/story.txt`] = { type: 'file', content: `MISSION ${m.id}: ${m.name}\n\n${m.story}` };
                gameState.directories[`${dir}/info.txt`] = { type: 'file', content: `Command: ${m.command}\n\nHINTS:\n1. ${m.hint1}\n2. ${m.hint2}` };
                gameState.directories[`${dir}/dark.txt`] = { type: 'file', content: `🔥 DARK KNOWLEDGE:\n${m.darkKnowledge}` };
            }
        });
        gameState.directories['/missions'].children = missionChildren;
    }

    // Populate the static lore files referenced in initial directory tree
    const lore = {
        '/home/profile.txt': () => `HACKER PROFILE\n\nHandle: guest\nLevel: ${gameState.level}\nEXP: ${gameState.exp}\nPath: ${gameState.path}\nMissions completed: ${gameState.completedMissions.length}/100`,
        '/home/stats.txt': () => `STATS\n\nLevel: ${gameState.level}\nEXP: ${gameState.exp}/${gameState.level * 1000}\nAct: ${gameState.currentAct}\nChapter: ${gameState.currentChapter}\nAchievements: ${gameState.achievements.length}/10`,
        '/home/achievements.txt': () => `ACHIEVEMENTS UNLOCKED: ${gameState.achievements.length}/10\n\nUse 'achievements' for full list.`,
        '/library/knowledge.txt': 'KNOWLEDGE BASE\n\nThe grid is older than you think. Every system has a backdoor.\nEvery firewall has a seam. Look closely.',
        '/library/paths.txt': 'THE THREE PATHS\n\nWHITE — Build the wall. Defend the innocent.\nBLACK — Tear it down. Take what you can.\nGREY — Walk the line. Truth above all.',
        '/library/tools.txt': 'TOOLS OF THE TRADE\n\nnmap · hydra · sqlmap · burpsuite · metasploit · john · hashcat · wireshark · aircrack-ng · nikto',
        '/journal/story.txt': 'YOUR STORY\n\n2077. The grid is connected. You were nothing — until tonight.\nA message arrived. Ghost found you.\nThe choice is yours: fix the system, exploit it, or burn it down.',
        '/journal/characters.txt': 'CHARACTERS\n\nGHOST — Mysterious mentor. No one has seen their face.\nNYX — Black-hat queen. Dangerous and brilliant.\nVECTOR — White-hat veteran. Builds walls others rely on.',
        '/journal/clues.txt': 'CLUES\n\nThe grid was not built. It evolved.\nFollow the data. Trust no one in shadows.',
        '/map/act1.txt': 'ACT I: THE AWAKENING\n\nMissions 1-20. Learn the basics. Meet Ghost.',
        '/map/act2.txt': 'ACT II: THE CONSPIRACY\n\nMissions 21-40. Web exploits. XSS, CSRF, SSRF, XXE.',
        '/map/act3.txt': 'ACT III: THE WAR\n\nMissions 41-60. Command injection. File upload. Full-scale combat.',
        '/map/act4.txt': 'ACT IV: THE RECKONING\n\nMissions 61-80. Metasploit. Privilege escalation. The final approach.',
        '/map/act5.txt': 'ACT V: THE ENDING\n\nMissions 81-100. Reverse engineering. Bug bounty. Your legacy.'
    };
    for (const [path, content] of Object.entries(lore)) {
        gameState.directories[path] = {
            type: 'file',
            get content() { return typeof content === 'function' ? content() : content; }
        };
    }

    loadSaveSlots();
});

function bootSequence() {
    const lines = [
        { t: 'NEURAL_LINK established …',   d: 0,    fn: printDim },
        { t: 'GRID handshake … OK',          d: 240,  fn: printDim },
        { t: 'authenticating guest@legacy …', d: 450, fn: printDim },
        { t: '╔══════════════════════════════════════════════════════╗', d: 700, fn: print },
        { t: "║              HACKER'S LEGACY                         ║", d: 720, fn: print },
        { t: '║              THE SAGA — 2077                         ║', d: 740, fn: print },
        { t: '╚══════════════════════════════════════════════════════╝', d: 760, fn: print },
        { t: `📚 ${missions.length} missions loaded across 5 acts.`,    d: 1000, fn: printInfo },
        { t: '',                                                       d: 1100, fn: print },
        { t: '💭 Ghost whispers: "The grid awaits. Choose wisely."',   d: 1200, fn: printPurple },
        { t: '',                                                       d: 1300, fn: print },
        { t: "type 'help' for commands  ·  'path' to choose your destiny", d: 1400, fn: printDim }
    ];
    lines.forEach((l) => setTimeout(() => l.fn(l.t), l.d));
    setTimeout(() => input.focus(), 1450);
}

startBtn.addEventListener('click', () => {
    introModal.style.display = 'none';
    terminal.style.display = 'flex';
    bootSequence();
});

// Click anywhere on the terminal to refocus the input
if (terminal) {
    terminal.addEventListener('click', (e) => {
        const tag = (e.target && e.target.tagName) || '';
        if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'BUTTON') {
            input.focus();
        }
    });
}

// Auto-scroll on focus (mobile keyboard pop-up)
input.addEventListener('focus', () => {
    setTimeout(forceScrollToBottom, 100);
    setTimeout(forceScrollToBottom, 350);
});

// Re-scroll when the visible viewport resizes (mobile keyboard show/hide)
if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', forceScrollToBottom);
}

// Final safety net: if any new node lands in output, ensure we end at the bottom
const _outputObserver = new MutationObserver(() => scrollToBottom());
if (output) _outputObserver.observe(output, { childList: true });

// Up/Down arrow command history
const cmdHistory = [];
let historyIdx = -1;

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value.trim();
        if (cmd) {
            cmdHistory.push(cmd);
            if (cmdHistory.length > 100) cmdHistory.shift();
            historyIdx = cmdHistory.length;
            printCommand(cmd);
            handleCommand(cmd);
            input.value = '';
            forceScrollToBottom();
        }
    } else if (e.key === 'ArrowUp') {
        if (cmdHistory.length === 0) return;
        e.preventDefault();
        historyIdx = Math.max(0, historyIdx - 1);
        input.value = cmdHistory[historyIdx] || '';
        // move caret to end
        requestAnimationFrame(() => input.setSelectionRange(input.value.length, input.value.length));
    } else if (e.key === 'ArrowDown') {
        if (cmdHistory.length === 0) return;
        e.preventDefault();
        historyIdx = Math.min(cmdHistory.length, historyIdx + 1);
        input.value = cmdHistory[historyIdx] || '';
        requestAnimationFrame(() => input.setSelectionRange(input.value.length, input.value.length));
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        output.innerHTML = '';
    }
});

terminal.addEventListener('click', () => input.focus());