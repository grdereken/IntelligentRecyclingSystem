#include <WiFi.h>
#include <HTTPClient.h>

const String ssid = "1lykkalamp2";
const String password = "123456789";
const String host = "10.184.10.253";
const String httpHeader = " HTTP/1.1\r\n";
const int httpPort = 80;

void setup() {
  Serial.begin(9600);

  
  WiFi.begin(ssid.c_str(), password.c_str());
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
  if (!client.connect(host.c_str(), httpPort)) {
    Serial.println("connection failed");
    return;
  }
  
  if(Serial.available() > 0){
    String command = Serial.readStringUntil('\0');
    if(command == "GetActiveUser") {
      handleActiveUserCommand();
    } else if(command == "GetPoints") {
      handleGetPointsCommand();
    } else {
      handleAddPointsCommand(command);
    }
  }
}

void handleActiveUserCommand() {
  Serial.print(getActiveUser());
}

void handleAddPointsCommand(String points) {
  Serial.print(addPoints(points));
}

void handleGetPointsCommand() {
  Serial.print(getPoints());
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
  String url = "http://" + host + "/addPoints/";
  url += "?points=";
  url += points; 
  return url;
}

String buildGetPointsUrl() {
  String url = "http://" + host + "/getPoints/";
  return url;
}

String getActiveUser() {
  String url = buildGetActiveUserUrl();
  return sendRequest(url);
}

String getPoints() {
  String url = buildGetPointsUrl();
  return sendRequest(url);
}

String addPoints(String points){
  String url = buildAddPointsUrl(points);
  return sendRequest(url);
}

