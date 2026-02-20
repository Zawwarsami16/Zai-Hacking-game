// endings.js — Path endings by ZAWWAR
const ENDINGS = {
    white: [
        {
            name: 'Security Architect',
            description: 'You become Chief Information Security Officer at Fortune 500. Your TED talk has 2M views.',
            condition: { missions_completed: 30, skill_levels: { network: 5, web: 5 } }
        },
        {
            name: 'Bug Bounty Legend',
            description: 'You discovered 10 CVEs and made $500k from bug bounties. HackerOne hall of fame.',
            condition: { cves_found: 10 }
        },
        {
            name: 'Security Consultant',
            description: 'You started your own security firm. You mentor the next generation of hackers.',
            condition: { helped_others: 10 }
        }
    ],
    black: [
        {
            name: 'Cybercrime Kingpin',
            description: 'You built a $10M empire. Feds are after you, but you have 3 passports and a yacht.',
            condition: { money_earned: 10000000 }
        },
        {
            name: 'Prison',
            description: 'You were caught. 10 years federal prison. But you wrote a memoir that became a movie.',
            condition: { caught_count: 3 }
        },
        {
            name: 'Ghost',
            description: 'You vanished. No one knows you exist. Your hacks are legends. You are the ghost.',
            condition: { caught_count: 0, missions_completed: 50 }
        }
    ],
    grey: [
        {
            name: 'Anonymous Legend',
            description: 'Your leak changed the world. Governments fell. You are a hero to millions.',
            condition: { biggest_leak: true }
        },
        {
            name: 'Whistleblower',
            description: 'You revealed the truth. You are in prison, but they cant silence your legacy.',
            condition: { whistleblower: true }
        },
        {
            name: 'Martyr',
            description: 'You died for the cause. Your face is on T-shirts. You are immortal.',
            condition: { died_for_cause: true }
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ENDINGS;
}