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
// lesname += readall(files[i])
}

readall("5А.xls")
function readall(nameis) {
    var lesstn = ""
var workbook = XLSX.readFile(path.join(appDir,"reports",nameis));
//console.log(workbook.Sheets.Лист1.E12);
for (let i = 0; i < workbook.Strings.length; i++) {
    //console.dir(workbook.Strings[i]);    
}
//3-4 строка период отчета
//console.dir(workbook.Strings[11]);
var jsons = XLSX.utils.sheet_to_json(workbook.Sheets.Лист1, { header: "A" });
console.dir(JSON.stringify(jsons).match(/ФИО/gm)); //МОЖНО УЗНАТЬ СКОЛЬКО СТРАНИЦ

for (var prop in jsons[5]) {
    if (prop!="C" && prop!="E" && prop!="L" && prop!="M" ) {
        lesstn += `\n${JSON.stringify(jsons[5][prop]).replace(/["]/gi,'')}`

       // fs.writeFileSync(path.join(appDir,`Предметы.txt`), `\n${JSON.stringify(jsons[5][prop]).replace(/["]/gi,'')}`,{ encoding: "utf-8", flag: "a" });
    }
  }
fs.writeFileSync(path.join(appDir,"log",`${nameis}.txt`), JSON.stringify(jsons));

var worksheet = XLSX.utils.json_to_sheet(jsons);
var workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
//XLSX.writeFile(workbook, "Presidents.xls");

return lesstn
}

fs.writeFileSync(path.join(appDir,`Предметы.txt`),lesname ,{ encoding: "utf-8"});