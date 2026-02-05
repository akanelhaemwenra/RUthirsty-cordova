// Water drinking check-in application
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
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

        // Load and display records
        this.loadRecords();
        this.updateTodayCount();
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
    },

    // Show visual feedback after check-in
    showCheckInFeedback: function() {
        var btn = document.getElementById('checkInBtn');
        btn.style.transform = 'scale(1.1)';
        setTimeout(function() {
            btn.style.transform = 'scale(1)';
        }, 200);
    },

    // Load and display all records
    loadRecords: function() {
        var records = this.getRecords();
        var recordsList = document.getElementById('recordsList');

        if (records.length === 0) {
            recordsList.innerHTML = '<p class="empty-message">暂无记录，点击上方按钮开始打卡吧！</p>';
            return;
        }

        // Build HTML for records
        var html = '';
        for (var i = 0; i < records.length; i++) {
            var record = records[i];
            html += '<div class="record-item">';
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

        document.getElementById('todayCount').textContent = count;
    }
};

// Initialize the app
app.initialize();
