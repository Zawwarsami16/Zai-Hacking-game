// achievements.js — Achievements system by ZAWWAR
const ACHIEVEMENTS = [
    {
        id: 1,
        name: 'First Scan',
        description: 'Complete Mission 1',
        condition: { type: 'mission', id: 1 },
        reward: '100 EXP'
    },
    {
        id: 2,
        name: 'Password Cracker',
        description: 'Complete Mission 6',
        condition: { type: 'mission', id: 6 },
        reward: 'Hydra tool unlocked'
    },
    {
        id: 3,
        name: 'SQL Master',
        description: 'Complete Mission 16',
        condition: { type: 'mission', id: 16 },
        reward: 'SQL injection mastery'
    },
    {
        id: 4,
        name: 'Network Ninja',
        description: 'Complete all Phase 3 missions',
        condition: { type: 'phase', phase: 3 },
        reward: '+20% network skill'
    },
    {
        id: 5,
        name: 'Elite Hacker',
        description: 'Reach Level 50',
        condition: { type: 'level', level: 50 },
        reward: 'Elite status unlocked'
    },
    {
        id: 6,
        name: 'Legend',
        description: 'Complete all 100+ missions',
        condition: { type: 'all_missions' },
        reward: 'Legendary hacker title'
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ACHIEVEMENTS;
}