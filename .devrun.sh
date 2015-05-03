MONGO_URL=mongodb://localhost:3001/meteor \
CLUSTER_DISCOVERY_URL=mongodb://localhost:3001/meteor \
CLUSTER_SERVICE="qollionic" \
CLUSTER_PUBLIC_SERVICES="qollserver" \
ROOT_URL=http://www.mydomainname.com \
sudo meteor run android-device --verbose --port 5000 --settings settings.json



## CLUSTER_ENDPOINT_URL=http://localhost:3000 \




sudo MONGO_URL=mongodb://localhost:3001/meteor CLUSTER_ENDPOINT_URL=http://localhost:3000 meteor run android-device --verbose --port 5000 --settings settings.json
