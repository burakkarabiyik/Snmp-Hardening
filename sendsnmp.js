module.exports=function functionName(komut,community,ip,callback) {
var snmp = require ("net-snmp");
var session = snmp.createSession (ip, community);

var oids = [komut];

session.get (oids, function (error, varbinds) {
    if (error) {
        console.error (error);
    } else {
        for (var i = 0; i < varbinds.length; i++)
            if (snmp.isVarbindError (varbinds[i]))
                console.error (snmp.varbindError (varbinds[i]))
            else
                console.log (varbinds[i].oid + " = " + varbinds[i].value);
    }
callback(null,"");
    // If done, close the session
    session.close ();
});

session.trap (snmp.TrapType.LinkDown, function (error) {
    if (error)
        console.error (error);
});
}
