#!/usr/bin/env node
#!/usr/bin/env nodemon

echo "============================================"
echo "RUNNING QM TOOL BACKEND SERVER"
echo "============================================"

echo "CTR-C to close server. DO NOT HIT X TO CLOSE BOX"
node ./app.js prod
read