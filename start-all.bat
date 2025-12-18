@echo off
title Event Management System - Start All Services

echo ----------------------------------------
echo STARTING EUREKA DISCOVERY SERVICE (8761)
echo ----------------------------------------
start cmd /k "cd backend\eurekadiscovery-service && mvn spring-boot:run"

timeout /t 5

echo ----------------------------------------
echo STARTING API GATEWAY (8080)
echo ----------------------------------------
start cmd /k "cd backend\apigateway && mvn spring-boot:run"

echo ----------------------------------------
echo STARTING AUTH MICROSERVICE (8081)
echo ----------------------------------------
start cmd /k "cd backend\authmicroservice && mvn spring-boot:run"

echo ----------------------------------------
echo STARTING EVENT MICROSERVICE (8082)
echo ----------------------------------------
start cmd /k "cd backend\eventmicroservice && mvn spring-boot:run"

echo ----------------------------------------
echo STARTING PARTICIPANT MICROSERVICE (8083)
echo ----------------------------------------
start cmd /k "cd backend\participantmicroservice && mvn spring-boot:run"

echo ----------------------------------------
echo STARTING NOTIFICATION MICROSERVICE (8084)
echo ----------------------------------------
start cmd /k "cd backend\notificationmicroservice && mvn spring-boot:run"

echo ----------------------------------------
echo STARTING ANGULAR FRONTEND (4200)
echo ----------------------------------------
start cmd /k "cd events-frontend && npm start"

echo ----------------------------------------
echo ALL SERVICES STARTED!
echo ----------------------------------------
echo Services:
echo - Eureka Discovery: http://localhost:8761
echo - API Gateway: http://localhost:8080
echo - Auth Service: http://localhost:8081
echo - Event Service: http://localhost:8082
echo - Participant Service: http://localhost:8083
echo - Notification Service: http://localhost:8084
echo - Frontend: http://localhost:4200
echo ----------------------------------------

pause