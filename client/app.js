// export CLUSTER_DISCOVERY_URL='mongodb://localhost:5002/meteor'


// Register a service to the cluster
// export CLUSTER_ENDPOINT_URL='http://localhost:3000'
// export CLUSTER_SERVICE='qollionic'
// export CLUSTER_PUBLIC_SERVICES="qollserver"

//QollServerConn = Cluster.discoverConnection('qollserver');


// Cluster.connect("mongodb://localhost:3001/meteor");
// Cluster.register("qollionic");
// Cluster.allowPublicAccess("qollserver");

SearchConn = Cluster.discoverConnection('qollserver');

RawQollForId = new Mongo.Collection('raw-qoll-for-id', SearchConn);


// subscribe to a collection, get data and print it as part of the test
//SearchConn.subscribe('QBANK_SUMMARY_PUBLISHER', {});
QbSummary = new Mongo.Collection('qbank_summary', SearchConn);
IReceivedQuestionaire = new Mongo.Collection('recvd-questionaire', SearchConn);
ISentQuestionaire = new Mongo.Collection("sent-by-me-questionaire", SearchConn);
IStoredQuestionaire = new Mongo.Collection('stored-by-me-questionaire', SearchConn);
QollForQuestionaireId = new Mongo.Collection('qoll-for-questionaire-id', SearchConn);

QollForIds = new Mongo.Collection('qolls_for_ids', SearchConn);
AllMyActiveQolls = new Mongo.Collection('all_my_active_qolls', SearchConn);


// FetchImages = new Mongo.Collection('images', SearchConn);

// qlog.info('Printing QbSummary - ' + JSON.stringify(QbSummary.find().fetch()));