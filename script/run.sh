scenario=1


if [ $scenario = 1 ]
then
echo "-------------  Scenario 1  -------------"

echo "Start the telemetry service"
curl -s http://localhost:4007/start
echo "Try to launch the rocket, weather is the only random variable"
isLaunched=$(curl -s http://localhost:4006/rocketLaunch)
echo $isLaunched
while [ isLaunched == "\"NO GO\"" ]
do
    echo $isLaunched
    isLaunched=$(curl -s http://localhost:4006/rocketLaunch)
done
echo "Rocket is launch"
echo "When the first stage tank is empty the rocket splits in two"
telemetry=$(curl -s http://localhost:4001/data)
while [ telemetry != "SUCCESS" ]
do
    echo $telemetry
    telemetry=$(curl -s http://localhost:4001/data)
    sleep 5
done
echo "Mission successful !"
fi

if [ $scenario = 2 ]
then
echo "-------------  Scenario 2  -------------"

echo "Start the telemetry service"
curl -s http://localhost:4007/start
echo "Try to launch the rocket, weather is the only random variable"
isLaunched=$(curl -s http://localhost:4006/rocketLaunch)
while [ isLaunched == "\"NO GO\"" ]
do
    echo $isLaunched
    isLaunched=$(curl -s http://localhost:4006/rocketLaunch)
done
echo "Rocket is launch"
echo "When the first stage tank is empty the rocket splits in two"
telemetry=$(curl -s http://localhost:4007/rocketData)
while [ telemetry != "FAIL" ]
do
    echo $telemetry
    telemetry=$(curl -s http://localhost:4007/rocketData)
    sleep 5
done
fi

if [ $scenario = 3 ]
then
echo "-------------  Scenario 3  -------------"

echo "Start the telemetry service"
curl -s http://localhost:4007/start
echo "Try to launch the rocket, weather is the only random variable"
isLaunched=$(curl -s http://localhost:4006/rocketLaunch)
while [ isLaunched == "\"NO GO\"" ]
do
    echo $isLaunched
    isLaunched=$(curl -s http://localhost:4006/rocketLaunch)
done
echo "Rocket is launch"
echo "When the first stage tank is empty the rocket splits in two"
telemetry=$(curl -s http://localhost:4007/rocketData)
while [ telemetry != "DESTROYED" ]
do
    echo $telemetry
    telemetry=$(curl -s http://localhost:4007/rocketData)
    sleep 5
done
fi