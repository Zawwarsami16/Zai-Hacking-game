// admin.js — Admin god mode by ZAWWAR (Secret PIN: 427568)
const ADMIN = {
    pin: '427568',
    isAuthenticated: false,
    
    authenticate: function(inputPin) {
        this.isAuthenticated = (inputPin === this.pin);
        return this.isAuthenticated;
    },
    
    commands: {
        'goto': function(level) {
            if (!ADMIN.isAuthenticated) return '❌ Admin access required';
            game.level = parseInt(level);
            game.saveCurrentSlot();
            return `✅ Teleported to Level ${level}`;
        },
        
        'unlock_all': function() {
            if (!ADMIN.isAuthenticated) return '❌ Admin access required';
            for (let tool in game.tools) {
                game.tools[tool].unlocked = true;
            }
            game.saveCurrentSlot();
            return '✅ All tools unlocked';
        },
        
        'set_level': function(level) {
            if (!ADMIN.isAuthenticated) return '❌ Admin access required';
            game.level = parseInt(level);
            game.saveCurrentSlot();
            return `✅ Level set to ${level}`;
        },
        
        'set_exp': function(exp) {
            if (!ADMIN.isAuthenticated) return '❌ Admin access required';
            game.exp = parseInt(exp);
            game.saveCurrentSlot();
            return `✅ EXP set to ${exp}`;
        },
        
        'complete_all': function() {
            if (!ADMIN.isAuthenticated) return '❌ Admin access required';
            game.missions.forEach(m => m.completed = true);
            game.saveCurrentSlot();
            return '✅ All missions completed';
        }
    }
};

// Admin login handler
function showAdminLogin() {
    document.getElementById('adminModal').style.display = 'flex';
    document.getElementById('adminPin').value = '';
    document.getElementById('adminError').textContent = '';
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ADMIN;
}