#!/usr/bin/env node
var fs = require('fs')

if(!process.argv[2]||!process.argv[3]){
    throw 'no callsign or wsjt path'
}
var callsign = process.argv[2].split('=');
var wsjtpath = process.argv[3].split('=');

//转adif的
fs.readFile(wsjtpath[1]+'wsjtx.log', function (err, data) {
    if (err) {
        console.log(err.stack);
        return;
    }

    data=data.toString();
    var eachQSO = data.split("\n");
    var string = '<eoh>\n'
    for(let i = 0; i<eachQSO.length-1;i++){
        itema = eachQSO[i].split(',');
        string = string + '<call:'+itema[4].length+'>'+ itema[4]+' <mode:'+itema[7].length+'>'+itema[7]+' <gridsquare:'+itema[5].length+'>'+itema[5]+' <rst_sent:'+itema[8].length+'>'+itema[8]+' <rst_rcvd:'+itema[9].length+'>'+itema[9]+' <qso_date:8>'+itema[0].replace(/-/g, "")+' <time_on:6>'+itema[1].replace(/:/g, "")+' <qso_date_off:8>'+itema[0].replace(/-/g, "")+' <time_off:6>'+itema[3].replace(/:/g, "")+' <freq:'+itema[6].length +'>'+ itema[6]+' <station_callsign:'+callsign[1].length+'>'+callsign[1]+' <eor>\n'
    }
    fs.writeFile(wsjtpath[1]+'wsjtx-recovery.adi', string, 'utf-8', function (err) {
        if (err) {
            console.log(err.stack);
        } else {
            console.log('recover success');
        }
    });
});