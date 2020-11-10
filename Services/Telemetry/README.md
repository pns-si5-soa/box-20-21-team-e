# Telemetry

Listen to the RocketData Kafka topic and store the data from the rocket in a Database.

PORT: 4007

Routes:

- GET '/start': Start the telemetry
- GET '/reset': Restart the DB of telemetry
- GET '/rocketData': Get the current telemetry of the rocket