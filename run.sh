echo "--- SCENARIO 1 ---"
echo "The Mission Successful scenario"
echo ""

echo "Start the telemetry service"
isTelemetryStarted=$(curl -s http://localhost:4007/start)
echo $isTelemetryStarted
echo ""
sleep 2

echo "Start the rocket telemetry service"
isRocketTelemetryStarted=$(curl -s http://localhost:4011/start)
echo $isRocketTelemetryStarted
echo ""
sleep 2

echo "Start the web casting service"
isWebCastingStarted=$(curl -s http://localhost:4010/start)
echo $isWebCastingStarted
echo ""
sleep 2

echo "Start the payload service for the mission"
isPayloadServiceStarted=$(curl -s http://localhost:4008/sendPayloadInformation)
echo $isPayloadServiceStarted
echo ""


echo "Try to launch the rocket, weather is the only random variable"
isLaunched=$(curl -s http://localhost:4006/rocketLaunch)
while [ isLaunched == "\"NO GO\"" ]
do
    echo $isLaunched
    isLaunched=$(curl -s http://localhost:4006/rocketLaunch)
done
echo ""
echo "Rocket is launch"
echo "When the first stage tank percentage is at 10%, the rocket splits in two"
echo ""
telemetry=$(curl -s http://localhost:4007/rocketData)
while [[ $telemetry != *"MISSION SUCCESSFUL !"* ]]
do
    echo $telemetry
    telemetry=$(curl -s http://localhost:4007/rocketData)
    sleep 5
done
echo ""
echo $telemetry
echo ""

echo "Erase Telemetry and Payload DB"
isTelemetryDBErased=$(curl -s http://localhost:4007/reset)
echo $isTelemetryDBErased
echo ""
isPayloadDBErased=$(curl -s http://localhost:4008/sendPayloadInformation/reset)
echo $isPayloadDBErased
echo ""

docker-compose down
sleep 2
docker-compose up -d
sleep 5

# ------------------

echo "--- SCENARIO 2 ---"
echo "The Mission Failed scenario"
echo ""

echo "Start the telemetry service"
isTelemetryStarted=$(curl -s http://localhost:4007/start)
echo $isTelemetryStarted
echo ""
sleep 2

echo "Start the rocket telemetry service"
isRocketTelemetryStarted=$(curl -s http://localhost:4011/start)
echo $isRocketTelemetryStarted
echo ""
sleep 2

echo "Start the web casting service"
isWebCastingStarted=$(curl -s http://localhost:4010/start)
echo $isWebCastingStarted
echo ""
sleep 2

echo "Start the payload service for the mission"
isPayloadServiceStarted=$(curl -s http://localhost:4008/sendPayloadInformation)
echo $isPayloadServiceStarted
echo ""

echo "Try to launch the rocket, weather is the only random variable"
isLaunched2=$(curl -s http://localhost:4006/rocketLaunch)
while [ isLaunched2 == "\"NO GO\"" ]
do
    echo $isLaunched2
    isLaunched2=$(curl -s http://localhost:4006/rocketLaunch)
done
echo "Rocket is launch"

echo "After a few seconds we stop the Chief Rocket Department, the rocket is no longer connected to the ground and is supposed to self-destruct"
echo ""
telemetry2=$(curl -s http://localhost:4007/rocketData)
echo $telemetry2
sleep 5
telemetry2=$(curl -s http://localhost:4007/rocketData)
echo $telemetry2
sleep 5
echo "We stop the chief rocket department"
echo ""
docker stop chief-rocket-department
telemetry2=$(curl -s http://localhost:4007/rocketData)
while [[ $telemetry2 != *"MISSION FAILED !"* ]]
do
    echo $telemetry2
    telemetry2=$(curl -s http://localhost:4007/rocketData)
    sleep 5
done
echo ""
echo $telemetry2
echo ""

echo "Erase Telemetry and Payload DB"
isTelemetryDBErased=$(curl -s http://localhost:4007/reset)
echo $isTelemetryDBErased
echo ""
isPayloadDBErased=$(curl -s http://localhost:4008/sendPayloadInformation/reset)
echo $isPayloadDBErased
echo ""