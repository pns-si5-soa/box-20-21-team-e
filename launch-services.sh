echo "Installation of pm2"
npm install -g pm2
services_list=$(ls Services/)
mapfile -t services_array <<< "$services_list"

cd Services

for i in "${services_array[@]}"
do
    echo "-----------------------"
    echo $i
    cd $i
    npm install
    pm2 start server.js -n $i
    cd ../
done

pm2 list
echo "All services launch successfully"