FROM maven:3.8.5-openjdk-17

WORKDIR /mcs-app
COPY . .

RUN mvn clean install -DskipTests

CMD ./mvnw spring-boot:run
