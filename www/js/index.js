// Water drinking check-in application
var app = {
    // Motivational messages
    motivationalMessages: [
        '保持健康，多喝水！',
        '你真棒！继续保持！',
        '水是生命之源 💧',
        '今天也要元气满满！',
        '喝水让你更有活力！',
        '健康生活从喝水开始！',
        '给身体补充能量！',
        '你做得很好！'
    ],

    // Application Constructor
    initialize: function() {
        // Check if Cordova is available
        if (window.cordova) {
            // Running in Cordova environment
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        } else {
            // Running in browser, initialize directly
            console.log('Running in browser mode');
            this.initApp();
        }
    },

    // deviceready Event Handler
    onDeviceReady: function() {
        console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
        this.initApp();
    },

    // Initialize the application
    initApp: function() {
        // Bind event listeners
        document.getElementById('checkInBtn').addEventListener('click', this.checkIn.bind(this));
        document.getElementById('goalSettingBtn').addEventListener('click', this.openGoalModal.bind(this));
        document.getElementById('modalClose').addEventListener('click', this.closeGoalModal.bind(this));
        document.getElementById('btnCancel').addEventListener('click', this.closeGoalModal.bind(this));
        document.getElementById('btnConfirm').addEventListener('click', this.saveGoal.bind(this));

        // Bind preset buttons
        var presetButtons = document.querySelectorAll('.preset-btn');
        for (var i = 0; i < presetButtons.length; i++) {
            presetButtons[i].addEventListener('click', this.selectPreset.bind(this));
        }

        // Close modal when clicking outside
        document.getElementById('goalModal').addEventListener('click', function(e) {
            if (e.target.id === 'goalModal') {
                app.closeGoalModal();
            }
        });

        // Load and display records
        this.loadRecords();
        this.updateTodayCount();
        this.updateGoalProgress();

        // Update motivational message
        this.updateMotivationalMessage();

        // Change motivational message every 5 seconds
        var self = this;
        setInterval(function() {
            self.updateMotivationalMessage();
        }, 5000);
    },

    // Update motivational message
    updateMotivationalMessage: function() {
        var messageElement = document.getElementById('motivationalText');
        if (messageElement) {
            var randomIndex = Math.floor(Math.random() * this.motivationalMessages.length);
            messageElement.textContent = this.motivationalMessages[randomIndex];
        }
    },

    // Get all records from localStorage
    getRecords: function() {
        var records = localStorage.getItem('waterRecords');
        if (records) {
            return JSON.parse(records);
        }
        return [];
    },

    // Save records to localStorage
    saveRecords: function(records) {
        localStorage.setItem('waterRecords', JSON.stringify(records));
    },

    // Format date as YYYY-MM-DD
    formatDate: function(date) {
        var year = date.getFullYear();
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var day = String(date.getDate()).padStart(2, '0');
        return year + '-' + month + '-' + day;
    },

    // Format time as HH:MM:SS
    formatTime: function(date) {
        var hours = String(date.getHours()).padStart(2, '0');
        var minutes = String(date.getMinutes()).padStart(2, '0');
        var seconds = String(date.getSeconds()).padStart(2, '0');
        return hours + ':' + minutes + ':' + seconds;
    },

    // Check in - record a water drinking event
    checkIn: function() {
        var now = new Date();
        var record = {
            timestamp: now.getTime(),
            date: this.formatDate(now),
            time: this.formatTime(now)
        };

        // Get existing records
        var records = this.getRecords();

        // Add new record at the beginning
        records.unshift(record);

        // Save to localStorage
        this.saveRecords(records);

        // Update UI
        this.loadRecords();
        this.updateTodayCount();

        // Visual feedback
        this.showCheckInFeedback();

        // Show success message
        this.showSuccessMessage();
    },

    // Show visual feedback after check-in
    showCheckInFeedback: function() {
        var btn = document.getElementById('checkInBtn');
        btn.classList.add('success');

        // Create ripple effect
        this.createRippleEffect();

        setTimeout(function() {
            btn.classList.remove('success');
        }, 600);
    },

    // Create ripple effect
    createRippleEffect: function() {
        var btn = document.getElementById('checkInBtn');
        var ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.top = '50%';
        ripple.style.left = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleExpand 0.6s ease-out';

        btn.appendChild(ripple);

        setTimeout(function() {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    },

    // Show success message
    showSuccessMessage: function() {
        var message = document.createElement('div');
        message.textContent = '✓ 打卡成功！';
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        message.style.color = 'white';
        message.style.padding = '15px 30px';
        message.style.borderRadius = '50px';
        message.style.fontSize = '18px';
        message.style.fontWeight = 'bold';
        message.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.5)';
        message.style.zIndex = '9999';
        message.style.animation = 'successMessageFade 2s ease-out';

        document.body.appendChild(message);

        setTimeout(function() {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 2000);
    },

    // Load and display all records
    loadRecords: function() {
        var records = this.getRecords();
        var recordsList = document.getElementById('recordsList');

        if (records.length === 0) {
            recordsList.innerHTML = '<p class="empty-message">✨ 暂无记录<br>点击上方按钮开始打卡吧！</p>';
            return;
        }

        // Build HTML for records
        var html = '';
        for (var i = 0; i < records.length; i++) {
            var record = records[i];
            html += '<div class="record-item" style="animation-delay: ' + (i * 0.05) + 's">';
            html += '  <div class="record-info">';
            html += '    <div class="record-date">' + record.date + '</div>';
            html += '    <div class="record-time">' + record.time + '</div>';
            html += '  </div>';
            html += '  <button class="delete-btn" data-timestamp="' + record.timestamp + '">删除</button>';
            html += '</div>';
        }

        recordsList.innerHTML = html;

        // Bind delete buttons
        var deleteButtons = recordsList.querySelectorAll('.delete-btn');
        for (var j = 0; j < deleteButtons.length; j++) {
            deleteButtons[j].addEventListener('click', this.deleteRecord.bind(this));
        }
    },

    // Delete a record
    deleteRecord: function(event) {
        var timestamp = parseInt(event.target.getAttribute('data-timestamp'));
        var records = this.getRecords();

        // Filter out the record to delete
        var filteredRecords = [];
        for (var i = 0; i < records.length; i++) {
            if (records[i].timestamp !== timestamp) {
                filteredRecords.push(records[i]);
            }
        }

        // Save updated records
        this.saveRecords(filteredRecords);

        // Update UI
        this.loadRecords();
        this.updateTodayCount();

        // Show delete feedback
        this.showDeleteFeedback(event.target);
    },

    // Show delete feedback
    showDeleteFeedback: function(button) {
        var recordItem = button.closest('.record-item');
        if (recordItem) {
            recordItem.style.animation = 'recordSlideOut 0.3s ease-out';
            recordItem.style.opacity = '0';
        }
    },

    // Update today's count
    updateTodayCount: function() {
        var records = this.getRecords();
        var today = this.formatDate(new Date());
        var count = 0;

        for (var i = 0; i < records.length; i++) {
            if (records[i].date === today) {
                count++;
            }
        }

        var countElement = document.getElementById('todayCount');
        var oldCount = parseInt(countElement.textContent) || 0;

        // Animate count change
        if (count !== oldCount) {
            countElement.style.animation = 'none';
            setTimeout(function() {
                countElement.style.animation = 'countUpdate 0.5s ease-out';
            }, 10);
        }

        countElement.textContent = count;

        // Update motivational message based on count
        this.updateMotivationalMessageByCount(count);

        // Update goal progress
        this.updateGoalProgress();
    },

    // Update motivational message based on count
    updateMotivationalMessageByCount: function(count) {
        var messageElement = document.getElementById('motivationalText');
        if (!messageElement) return;

        var message = '';
        if (count === 0) {
            message = '今天还没有喝水哦！';
        } else if (count >= 1 && count < 4) {
            message = '不错！继续保持！';
        } else if (count >= 4 && count < 8) {
            message = '太棒了！你做得很好！';
        } else if (count >= 8) {
            message = '完美！你是喝水冠军！🏆';
        }

        messageElement.textContent = message;
    },

    // Get daily goal
    getDailyGoal: function() {
        var goal = localStorage.getItem('dailyGoal');
        return goal ? parseInt(goal) : 8; // Default 8 times
    },

    // Set daily goal
    setDailyGoal: function(goal) {
        localStorage.setItem('dailyGoal', goal.toString());
    },

    // Update goal progress
    updateGoalProgress: function() {
        var todayCount = this.getTodayCount();
        var dailyGoal = this.getDailyGoal();

        // Update goal display
        document.getElementById('goalCurrent').textContent = todayCount;
        document.getElementById('goalTarget').textContent = dailyGoal;

        // Calculate progress percentage
        var percentage = Math.min(Math.round((todayCount / dailyGoal) * 100), 100);

        // Update progress bar
        var progressFill = document.getElementById('progressFill');
        var progressText = document.getElementById('progressText');

        progressFill.style.width = percentage + '%';
        progressText.textContent = percentage + '%';

        // Mark as complete if goal reached
        if (todayCount >= dailyGoal) {
            progressFill.setAttribute('data-complete', 'true');
            progressText.style.color = 'white';
        } else {
            progressFill.removeAttribute('data-complete');
            progressText.style.color = '#333';
        }
    },

    // Get today's count
    getTodayCount: function() {
        var records = this.getRecords();
        var today = this.formatDate(new Date());
        var count = 0;

        for (var i = 0; i < records.length; i++) {
            if (records[i].date === today) {
                count++;
            }
        }

        return count;
    },

    // Open goal setting modal
    openGoalModal: function() {
        var modal = document.getElementById('goalModal');
        var input = document.getElementById('goalInput');
        var currentGoal = this.getDailyGoal();

        input.value = currentGoal;
        modal.classList.add('show');
    },

    // Close goal setting modal
    closeGoalModal: function() {
        var modal = document.getElementById('goalModal');
        modal.classList.remove('show');
    },

    // Select preset goal
    selectPreset: function(event) {
        var value = event.target.getAttribute('data-value');
        document.getElementById('goalInput').value = value;
    },

    // Save goal
    saveGoal: function() {
        var input = document.getElementById('goalInput');
        var newGoal = parseInt(input.value);

        // Validate input
        if (isNaN(newGoal) || newGoal < 1 || newGoal > 20) {
            alert('请输入1-20之间的数字');
            return;
        }

        // Save goal
        this.setDailyGoal(newGoal);

        // Update progress
        this.updateGoalProgress();

        // Close modal
        this.closeGoalModal();

        // Show success message
        this.showGoalUpdateMessage(newGoal);
    },

    // Show goal update message
    showGoalUpdateMessage: function(goal) {
        var message = document.createElement('div');
        message.textContent = '✓ 目标已更新为 ' + goal + ' 次/天';
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        message.style.color = 'white';
        message.style.padding = '15px 30px';
        message.style.borderRadius = '50px';
        message.style.fontSize = '16px';
        message.style.fontWeight = 'bold';
        message.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.5)';
        message.style.zIndex = '99999';
        message.style.animation = 'successMessageFade 2s ease-out';

        document.body.appendChild(message);

        setTimeout(function() {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 2000);
    }
};

// Initialize the app
app.initialize();

