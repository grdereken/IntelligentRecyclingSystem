#include <WiFi.h>
#include <HTTPClient.h>
#include "Config.h"

//Options are now in the config file
const String accessPointSsid  = ACCESSPOINTSSID;
const String accessPointPassword = ACCESSPOINTPASSWORD;

const String hostIP = HOSTIP;
const int hostHttpPort = HOSTHTTPPORT;
String host = hostIP + ":" + hostHttpPort;

const String adminPassword = ADMINPASSWORD;

void setup() {
  Serial.begin(9600);
  Serial.setTimeout(10);

  WiFi.begin(accessPointSsid.c_str(), accessPointPassword.c_str());
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}
  
void loop() {
  WiFiClient client;
  if (!client.connect(hostIP.c_str(), hostHttpPort)) {
    Serial.println("connection failed");
    return;
  }
  
  if(Serial.available() > 0){
    String command = Serial.readString();
    if(command == "GetActiveUser") {
      handleGetActiveUserCommand();
    } else if(command == "GetPoints") {
      handleGetActiveUserPointsCommand();
    } else {
      handleAddPointsCommand(command);
    }
  }
}

void handleGetActiveUserCommand() {
  Serial.print(getActiveUser());
}

void handleAddPointsCommand(String points) {
  Serial.print(addPoints(points));
}

void handleGetActiveUserPointsCommand() {
  Serial.print(getActiveUserPoints());
}

String sendRequest(String url){
  HTTPClient http;
  http.begin(url);

  http.GET();
  return http.getString();
}

String buildGetActiveUserUrl() {
  String url = "http://" + host + "/getActiveUser/";
  return url;
}

String buildAddPointsUrl(String points){
  String url = "http://" + host + "/addActiveUserPoints/";
  url += "?points=" + points;
  url += "&adminPassword=" + adminPassword;
  
  return url;
}

String buildGetActiveUserPointsUrl() {
  String url = "http://" + host + "/getActiveUserPoints/";
  return url;
}

String getActiveUser() {
  String url = buildGetActiveUserUrl();
  return sendRequest(url);
}

String getActiveUserPoints() {
  String url = buildGetActiveUserPointsUrl();
  return sendRequest(url);
}

String addPoints(String points){
  String url = buildAddPointsUrl(points);
  return sendRequest(url);
}
