#!/usr/bin/env node
#!/usr/bin/env nodemon

echo "============================================"
echo "RUNNING QM TOOL DEV BACKEND SERVER"
echo "============================================"

echo "CTR-C to close server. DO NOT HIT X TO CLOSE BOX"
taskkill /im node.exe
node ./app.js dev

echo "READ ME!"
echo "Still does not work? Kill all process of node.exe"
read