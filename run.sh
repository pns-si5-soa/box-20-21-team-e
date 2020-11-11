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
echo "Rocket is launch"
echo "When the first stage tank percentage is at 10%, the rocket splits in two"
telemetry=$(curl -s http://localhost:4007/rocketData)
while [ telemetry != "\"MISSION SUCCESSFUL !\"" ]
do
    echo $telemetry
    telemetry=$(curl -s http://localhost:4007/rocketData)
    sleep 5
done