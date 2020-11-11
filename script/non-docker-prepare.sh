echo "Installation of pm2"
npm install -g pm2
services_list=$(ls ../Services/)
mapfile -t services_array <<< "$services_list"

cd ../Services

for i in "${services_array[@]}"
do
    echo "-----------------------"
    echo $i
    cd $i
    rm .env
    cp ../../script/.env.dev ./.env
    npm install
    pm2 start server.js -n $i
    cd ../
done

echo "All services launch successfully"