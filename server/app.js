
Cluster.connect("mongodb://localhost:3001/meteor");
Cluster.register("qollionic");
Cluster.allowPublicAccess("qollserver");

qollServerConn = Cluster.discoverConnection("qollserver");
var myEmails = qollServerConn.call("fetch_my_emails", "meteorhacks");
console.log("here is list of", myEmails);