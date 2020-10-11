docker-compose up -d
containerName="client"
testIsUp=$( docker container inspect -f '{{.State.Running}}' $containerName )
while [ $testIsUp != "true" ]
do
    sleep 2
done
echo "Preparation script is done, you can launch run.sh !"