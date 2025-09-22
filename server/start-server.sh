#!/bin/bash

# Check if port 8080 is in use
PID=$(lsof -ti:8080)

if [ -n "$PID" ]; then
    echo "Port 8080 is in use by process $PID. Killing it..."
    sudo kill -9 $PID
    echo "Process $PID killed."
else
    echo "Port 8080 is free."
fi

# Now start the Spring Boot application
echo "Starting Spring Boot application..."
mvn spring-boot::run  # or 'java -jar target/your-app.jar'
