@echo off
echo ============================================
echo  EduFlow Backend Startup
echo ============================================
cd /d %~dp0
set MAVEN_OPTS=--enable-native-access=ALL-UNNAMED
echo Starting Spring Boot on port 8080...
mvnw.cmd spring-boot:run
pause
