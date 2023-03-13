/*

var ActiveDirectory = require('activedirectory2');
var config = { url: 'ldap://panspb.local',
               baseDN: 'dc=panspb,dc=local',
               username: 'v.diakonov@panspb.local',
               password: '147258000' }
var ad = new ActiveDirectory(config);
//console.dir(ad);
var sAMAccountName = 'v.diakonov';
ad.getGroupMembershipForUser(sAMAccountName, function(err, groups) {
    if (err) {
      console.log('ERROR: ' +JSON.stringify(err));
      return;
    }
   
    if (! groups) console.log('User: ' + sAMAccountName + ' not found.');
    else{
        for (let i = 0; i < groups.length; i++) {
           // console.dir(groups[i].cn);
        }
    } 
  });

var groupName = 'Сотр*';
 
var ad = new ActiveDirectory(config);

ad.getUsersForGroup(groupName, function(err, users) {
  if (err) {
    console.log('ERROR: ' +JSON.stringify(err));
    return;
  }
 
  if (! users) console.log('Group: ' + groupName + ' not found.');
  else {
    for (let i = 0; i < users.length; i++) {
        //console.dir(users[i].displayName);
        //getallgroups(users[i].displayName)
    }
   console.dir(users.length);
  }
});
function getallgroups(displayName) {

    var query = `displayName=${displayName}`;
 
    var ad = new ActiveDirectory(config);
    ad.findUsers(query, true, function(err, users) {
      if (err) {
        console.log('ERROR: ' +JSON.stringify(err));
        return;
      }
     
      if ((! users) || (users.length == 0)) console.log('No users found.');
      else {
        for (let i = 0; i < users.length; i++) {
              console.dir(users[i].cn);
              for (let k = 0; k < users[i].groups.length; k++) {
                console.dir(users[i].groups[k].cn);
             }
              
          }
      //  console.dir(users.length);
      }
    });    
}


var url= 'ldap://panspb.local'
var opts = {
    baseDN: 'CN=Дьяконов Владислав Сергеевич,OU=Без политики,DC=panspb,DC=local',
    //filter: 'cn=*Влад*'
  };
*/

const logman = require('./vendor/logs.js');
process.on('uncaughtException', (err) => {
  logman.log('Глобальный косяк приложения!!! ', err.stack);
}); //Если все пошло по пизде, спасет ситуацию
const express = require('express');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
const session = require('express-session');
var cookieParser = require('cookie-parser');
var unixTime = require('unix-time');
const path = require('path');
const fs = require('fs-extra');

const db = require('./vendor/db.js');
const dbworker = new db.dbworker();

const { json } = require('express');
var appDir = path.dirname(require.main.filename);
const TEMPFOLDER = path.join(appDir,'public/temp');
var PORT = process.env.PORT || 80; 
const app = express();
var i_count = 1
const hbs = exphbs.create({
defaultLayout: 'main',
extname: 'hbs',
helpers: {
  OK: function(){
    i_count = 1
  },
  I_C: function (opts){
    let anso = ''
    for (let i = 0; i < i_count; i++) {
      anso = anso + "I"
    }
    i_count++
    return anso
  },
  if_eq: function (a, b, opts) {
      if (a == b){ // Or === depending on your needs
         // logman.log(opts);
          return opts.fn(this);
       } else
          return opts.inverse(this);
  },
  if_more: function (a, b, opts) {
    if (a >= b){ // Or === depending on your needs
       // logman.log(opts);
        return opts.fn(this);
     } else
        return opts.inverse(this);
}
}
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views','views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
//app.use(fileUpload());
app.use(session({resave:false,saveUninitialized:false, secret: 'keyboard cat', cookie: {  }}))
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : TEMPFOLDER,
  defCharset: 'utf8',
  defParamCharset: 'utf8'
}));

app.get('/',(req,res)=>{
let currentDate = new Date();
let firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
let lastDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7));

  const cons = [
    { name: "11.03 Понедельник", 
      schedule: [
          {
          time:"14:30 - 15:00",
          subj:"Алгебра 7",
          teacher:"Яборова А. Д.",
          where:"312"},{
          time:"15:10 - 15:50",
          subj:"Русский 7",
          teacher:"Кириллова Я. В.",
          where:"230"}
        ],
        col: 1
    },
    { name: "14.03 Вторник", 
    schedule: [
        {mpdate:"11.03",
        time:"12:30 - 17:40",
        subj:"Алгебра 7",
        teacher:"Яборова А. Д.",
        where:"518"}
      ],
      col:1
    },    { name: "15.03\nСреда", 
    schedule: [
        {mpdate:"11.03",
        time:"12:30 - 17:40",
        subj:"Алгебра 7",
        teacher:"Яборова А. Д.",
        where:"518"},{mpdate:"11.03",
        time:"12:30 - 17:40",
        subj:"Русский 7",
        teacher:"Кириллова Я. В.",
        where:"518"},{mpdate:"11.03",
        time:"12:30 - 17:40",
        subj:"Русский 7",
        teacher:"Кириллова Я. В.",
        where:"518"}
      ],
      col:1
    }
  ];

  var statics = [
    {
      mpdate:"11.03",
      subj:"Алгебра 7",
      teacher:"Яборова А. Д.",
      timestart:"14:20",
      timestop:"15:00",
      comm: "Без замечаний",
      files: "Материал.Docx",
      kl: "11.03 16:53",
      stk: "11.03 17:00",
    },
    {
      mpdate:"11.03",
      subj:"Русский 7",
      teacher:"Кириллова Я. В.",
      timestart:"15:10",
      timestop:"15:50",
      comm: "Пришла сонная, материал по заданной главе не выучила!",
      files: "Материал.Docx",
      kl: "11.03 16:53",
      stk: "11.03 17:00",
    },
    {
      mpdate:"11.03",
      subj:"Русский 7",
      teacher:"Кириллова Я. В.",
      timestart:"16:10",
      timestop:"16:50",
      comm: "Опоздала на занятие",
      files: "Материал.Docx",
      kl: "11.03 16:53",
      stk: "11.03 17:00",
    },
  ]
  cons.forEach(e => {
    e.col = e.schedule.length + 1
  });
  res.render('index',{
    title: 'Индивидуальный маршрут',
    fio: "АЛЬБЕКОВА Виктория Владимировна",
    start:firstDayOfWeek.toLocaleDateString(),
    stop: lastDayOfWeek.toLocaleDateString(),
    cons: cons,
    statics:statics
  });
})
app.get('/t',(req,res)=>{
  res.render('teacher',{
    title: 'ЛК педагога',
  })
})
app.get('/manual',(req,res)=>{
  res.render('manual',{
    title: 'Инструкция',
  })
})
async function start(){
  try {
      app.listen(PORT,()=> {
        logman.log('Сервер консультаций - запущен')
        logman.log('Порт:',PORT);
      })
  } catch (e) {
      logman.log(e);
  }
}
function getcurip(str) {
let arr = str.split(':');
arr = arr[arr.length-1];
return arr;
}

start()
