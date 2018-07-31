#!/usr/bin/env node
#!/usr/bin/env nodemon

echo "============================================"
echo "RUNNING QM TOOL BACKEND SERVER"
echo "============================================"

echo "CTR-C to close server. DO NOT HIT X TO CLOSE BOX"
taskkill /im node.exe
node ./app.js prod

echo "READ ME!"
echo "Still does not work? Kill all process of node.exe"
read