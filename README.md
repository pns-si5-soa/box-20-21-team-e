# blue-origin-x-20-21-soa-20-21-e
blue-origin-x-20-21-soa-20-21-e created by GitHub Classroom

Service-oriented Architecture Lab

Objectives:
- Build and maintain a working ecosystem of microservices(working each week)
- Integrate micro-services using an Event-driven Architecture.
- Deliver and deploy a reproducible environment with Docker.
- Plan for and implement future requirements and features around your architecture.
- Identify the (very-)Minimal Viable Product that fulfills the requirements.

URL statiques :
- http://localhost:4001/ the rocket
- http://localhost:4002/ Chief Rocket Department (Elon)
- http://localhost:4003/ Mission Commander (MissionCommander)
- http://localhost:4004/ Weather Department (Tory)
- http://localhost:4005/ Weather Supplier
- http://localhost:4006/ MissionCommander Interface
- http://localhost:4007/ Telemetry
- http://localhost:4008/ Payload Department
- http://localhost:4009/ Client
- http://localhost:4010/ Webcasting
- http://localhost:4011/ RocketTelemetry
- http://localhost:4012/ RocketPoll

Notes : The description of the scénarios can be found in the report.
In summary, in the first scenario we perform a successful launch and in the second scenario we simulate a failure leading to the self-destruction of the rocket.
The launch of the prepare.sh script can take a little time, especially because of the zookeeper and kafka images which take a long time to download.
As we have not implemented the ability to launch multiple rockets, a docker-compose down then a docker-compose up are executed between the two scenarios, to be sure to have clean data.

Team : Maël Delaby, Fabrice Simon, Othmane Mazouz, Maël Vaillant--Beuchot

Distribution of points (400) :
- Maël Delaby : 105
- Fabrice Simon : 105
- Othmane Mazouz : 85
- Maël Vaillant--Beuchot : 105