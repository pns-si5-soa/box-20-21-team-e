echo "Start the telemetry service"
curl http://localhost:4007/start
echo "Try to launch the rocket, weather is the only random variable"
isLaunched=$(curl http://localhost:4006/rocketLaunch)
while [ isLaunched == "NO GO" ]
do
    isLaunched=$(curl http://localhost:4006/rocketLaunch)
done
echo "Rocket is launch"
echo "When the first stage tank is empty the rocket splits in two"
telemetry=$(curl http://localhost:4007/rocketData)
while [ telemetry != "DESTROYED" ]
do
    echo $telemetry
    telemetry=$(curl http://localhost:4007/rocketData)
    sleep 5
done