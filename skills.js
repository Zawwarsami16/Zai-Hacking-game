// skills.js — Skill tree by ZAWWAR
const SKILLS = {
    bruteforce: {
        name: 'Bruteforce',
        description: 'Password cracking and injection attacks',
        levels: [
            { level: 1, name: 'Novice', effect: '5% faster cracks' },
            { level: 2, name: 'Apprentice', effect: '10% success rate' },
            { level: 3, name: 'Professional', effect: 'Custom wordlists' },
            { level: 4, name: 'Expert', effect: 'WAF bypass techniques' },
            { level: 5, name: 'Master', effect: 'Zero-day password attacks' }
        ]
    },
    network: {
        name: 'Network',
        description: 'Scanning, sniffing, and exploitation',
        levels: [
            { level: 1, name: 'Novice', effect: 'Basic nmap' },
            { level: 2, name: 'Apprentice', effect: 'Firewall evasion' },
            { level: 3, name: 'Professional', effect: 'IDS bypass' },
            { level: 4, name: 'Expert', effect: 'Packet crafting' },
            { level: 5, name: 'Master', effect: 'Zero-day network exploits' }
        ]
    },
    crypto: {
        name: 'Cryptography',
        description: 'Hash cracking and encryption',
        levels: [
            { level: 1, name: 'Novice', effect: 'Hash identification' },
            { level: 2, name: 'Apprentice', effect: 'Dictionary attacks' },
            { level: 3, name: 'Professional', effect: 'GPU optimization' },
            { level: 4, name: 'Expert', effect: 'Rainbow tables' },
            { level: 5, name: 'Master', effect: 'Cryptanalysis' }
        ]
    },
    stealth: {
        name: 'Stealth',
        description: 'Hide your tracks, avoid detection',
        levels: [
            { level: 1, name: 'Novice', effect: 'Proxy basics' },
            { level: 2, name: 'Apprentice', effect: 'VPN + Tor' },
            { level: 3, name: 'Professional', effect: 'Log cleaning' },
            { level: 4, name: 'Expert', effect: 'Timestomping' },
            { level: 5, name: 'Master', effect: 'Anti-forensics' }
        ]
    },
    web: {
        name: 'Web Application',
        description: 'Web vulnerabilities',
        levels: [
            { level: 1, name: 'Novice', effect: 'SQLi basics' },
            { level: 2, name: 'Apprentice', effect: 'XSS attacks' },
            { level: 3, name: 'Professional', effect: 'CSRF, SSRF' },
            { level: 4, name: 'Expert', effect: 'XXE, LFI/RFI' },
            { level: 5, name: 'Master', effect: 'RCE chains' }
        ]
    },
    wireless: {
        name: 'Wireless',
        description: 'WiFi and Bluetooth attacks',
        levels: [
            { level: 1, name: 'Novice', effect: 'WiFi scanning' },
            { level: 2, name: 'Apprentice', effect: 'WPA2 cracking' },
            { level: 3, name: 'Professional', effect: 'Evil twin' },
            { level: 4, name: 'Expert', effect: 'WPA3 exploits' },
            { level: 5, name: 'Master', effect: 'Bluetooth/SDR' }
        ]
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SKILLS;
}