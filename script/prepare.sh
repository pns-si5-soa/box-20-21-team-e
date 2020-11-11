services_list=$(ls ../Services/)
mapfile -t services_array <<< "$services_list"

cd ../Services

for i in "${services_array[@]}"
do
    cd $i
    pwd
    rm .env
    cp ../../script/.env.docker ./.env
    cd ../
done

cd ../script

docker-compose up -d
containerName="client"
testIsUp=$( docker container inspect -f '{{.State.Running}}' $containerName )
while [ $testIsUp != "true" ]
do
    sleep 2
    testIsUp=$( docker container inspect -f '{{.State.Running}}' $containerName )
done
echo "Preparation script is done, you can launch run.sh !"