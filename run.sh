echo "Start the telemetry service"
curl http://localhost:4007/start
echo "Try to launch the rocket, weather is the only random variable"
curl http://localhost:4006/rocketLaunch