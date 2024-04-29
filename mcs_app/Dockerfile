FROM openjdk:17-oracle

WORKDIR /mcs-app
COPY . .

# the JAR file path
ARG JAR_FILE=target/*.jar

# Copy the JAR file from the build context into the Docker image
COPY ${JAR_FILE} application.jar

RUN apt-get update -y && apt-get upgrade -y



# Set the default command to run the Java application
ENTRYPOINT ["java", "-Xmx2048M", "-jar", "/application.jar"]