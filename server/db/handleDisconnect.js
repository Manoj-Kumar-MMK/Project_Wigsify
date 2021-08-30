
const mysql = require('mysql');
const db_connect = require('./dbObj');

const handleDisconnect = ()=>{

    db.on('error', function (error) {
        if (!error.fatal) return;
        if (error.code !== 'PROTOCOL_CONNECTION_LOST') throw err;

        console.error('>[+] Re-connecting lost MySQL connection: ');

        db = mysql.createConnection(db_connect);
        handleDisconnect();
        db.connect((err)=>{

            if(err) console.log("[-]reconnection also failed ");

        });
    });

}

module.exports = handleDisconnect