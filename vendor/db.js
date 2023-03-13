module.exports.dbworker = class dbworker {
    constructor() {
       this.syncSql = require('sync-sql');
       this.unixTime = require('unix-time');
       this.logman = require('./logs.js');
       this.path = require('path');
        this.sett = {
          host     : '127.0.0.1',
          //host     : '192.168.0.104',
          user     : 'teyhd',
          password : '258000',
          database : 'newstest',
         // database : 'news',
          charset : 'utf8mb4_general_ci'
        }
        if(this.path.dirname(require.main.filename)=='F:\\news'){
          this.sett.database = 'newstest'
        } else {
          this.sett.database = 'news'
        }
        
      }

  }
  