# -------------------------
# Stage 1: Build with Maven
# -------------------------
FROM maven:3.9.6-eclipse-temurin-22 AS build

WORKDIR /app

# Copy pom.xml and download dependencies first (for caching)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code
COPY src ./src

# Package the application (skip tests for faster builds, optional)
RUN mvn clean package -DskipTests

# -------------------------
# Stage 2: Run with JDK
# -------------------------
FROM eclipse-temurin:22-jdk AS runtime

WORKDIR /app

# Copy only the built JAR from the previous stage
COPY --from=build /app/target/*.jar app.jar

# Expose port (default Spring Boot port)
EXPOSE 8080

# Run the JAR
ENTRYPOINT ["java","-jar","app.jar"]