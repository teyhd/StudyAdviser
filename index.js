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


var XLSX = require("xlsx");
//const fs = require('fs');
const path = require('path');
const fs = require('fs-extra');
const { isNull } = require("util");
var appDir = path.dirname(require.main.filename);

var files = fs.readdirSync(path.join(appDir,"reports"))
      console.log(files);  
       /* files.find(function(item, index, array) {
          if(item == 'Инструкция.docx'){
            array.splice(index, 1); 
          }})*/
      
// Or
var lesname = ""
for (let i = 0; i < files.length; i++) {
 lesname += readall(files[i])
}
//console.log(pup);
//console.log(pup['неАврамклва']);

//console.log(user);
//readall("7А.xls")
function readall(nameis) {
console.log(`Обработка файла: ${nameis}`);
var lesstn = ""
var workbook = XLSX.readFile(path.join(appDir,"reports",nameis));
var jsons = XLSX.utils.sheet_to_json(workbook.Sheets.Лист1, { header: "A" });
//console.dir(JSON.stringify(jsons).match(/"[a-zA-Z]+":"ФИО"/gm)); //МОЖНО УЗНАТЬ СКОЛЬКО СТРАНИЦ
//console.dir(JSON.stringify(jsons).match(/[^,]+\s[0-9]{1,2}"/gm)); //МОЖНО УЗНАТЬ Что-то еще
console.log(`Количество строк: ${jsons.length}`);
let startIndexVal = null
for (let k = 0; k < jsons.length; k++) {
   startIndexVal = getKeyByValue(jsons[k], "За период")
  if (startIndexVal!=undefined) {
    startIndexVal = k
    break;
  }
}
if (startIndexVal==null) {
  console.log(`Ошибка обработки файла! Не найдена страница за период.`);
  return 0
}
console.log(`Строка "За период": №${startIndexVal}`);
var pages = []
for (let i = startIndexVal; i < jsons.length; i++) {
  let NameColumn = getKeyByValue(jsons[i], "ФИО")
  if (NameColumn!=undefined) {
    pages.push([i,NameColumn])
   // pages[i] = NameColumn
  }
// console.log(i);
 // console.dir(jsons[i]);
 // console.log(getKeyByValue(jsons[i], "ФИО"));
 fs.writeFileSync(path.join(appDir,`Предметы.txt`), `\n,${JSON.stringify(jsons[i])}`,{ encoding: "utf-8", flag: "a" });
}
pages.push([jsons.length])
var PupilsInfo = []
for (let i = 0; i < pages.length-1; i++) {
 // console.log(jsons[pages[i][0]]);

  for (let k = pages[i][0]; k < pages[i+1][0]; k++) {
    //const element = jsons[k];
    let fio = jsons[k][pages[i][1]]
    if (fio) {
     // console.log(k,fio);
     if (!PupilsInfo[fio]) {
      PupilsInfo[fio] = []
     }
     //console.log();
     for (var key in jsons[k]) {
      if (Object.hasOwnProperty.call(jsons[k], key)) {
        //let TO = JSON.parse(`{"${key}":"${jsons[k][key]}"}`)
        let TO = {pole:jsons[pages[i][0]][key],zn:jsons[k][key]} 
        if (jsons[k][key]<3 && jsons[pages[i][0]][key] !="№ п/п" && jsons[pages[i][0]][key] !="Рейтинг") {
          console.log(`\nПРОБЛЕМНЫЙ РЕбЕНОК!`);
          console.warn(`${fio} ${jsons[pages[i][0]][key]} ${jsons[k][key]}`);
          console.log(`ПРОБЛЕМНЫЙ РЕбЕНОК!\n`);
        }
        PupilsInfo[fio].push(TO)
      }
     }
     if (fio=="ИГНАТЬЕВА Вероника Олеговна") {
      fs.writeFileSync(path.join(appDir,`ИГНАТЬЕВА.txt`), `\n${JSON.stringify(jsons[k])}`,{ encoding: "utf-8", flag: "a" });
     }
     

    }
    
  }
  
  //console.log(pages[i+1]);
}

//console.log('\n\n\n');

  //console.log(typeof PupilsInfo);
  for (let key in PupilsInfo) {
    if (Object.hasOwnProperty.call(PupilsInfo, key)) {
      let element = PupilsInfo[key].reduce(
        (obj, item) => Object.assign(obj, { [item.pole]: item.zn }), {});
        PupilsInfo[key] = element
        fs.writeFileSync(path.join(appDir,`test.txt`), `\n${JSON.stringify(element)}`,{ encoding: "utf-8", flag: "a" });
    }
  }
//console.log(PupilsInfo);

//console.log(jsons[pages[0][0]]);
/* Создание таблицы
var worksheet = XLSX.utils.json_to_sheet(jsons);
var workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
XLSX.writeFile(workbook, "Presidents.xls");
*/
return lesstn
}


//fs.writeFileSync(path.join(appDir,`Предметы.txt`),lesname ,{ encoding: "utf-8"});
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
