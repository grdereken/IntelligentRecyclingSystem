#include <LiquidCrystal_I2C.h>

#include <LiquidCrystal.h>

#include <Wire.h>

#include <Servo.h>

const int plasticEchoPin = 2;
const int plasticTrigPin = 3;
const int aloumEchoPin = 4;
const int aloumTrigPin = 5;
const int paperEchoPin = 6;
const int paperTrigPin = 7;
const int plasticServoPin = 8;
const int aloumServoPin = 9;
const int paperServoPin = 10;

const int ledPin = 11;

float plasticdistance;
float aloumdistance;
float paperdistance;

LiquidCrystal_I2C lcd(0x27, 20, 4);
Servo plasticservo, aloumservo, paperservo;
const int maxDistance = 15; // Unit of measurment is centimeters

String activeUser = "";
String activePoints = "";

void setup() {
  pinMode(plasticTrigPin, OUTPUT);
  pinMode(plasticEchoPin, INPUT);
  pinMode(aloumTrigPin, OUTPUT);
  pinMode(aloumEchoPin, INPUT);
  pinMode(paperTrigPin, OUTPUT);
  pinMode(paperEchoPin, INPUT);
  pinMode(ledPin, OUTPUT);
  aloumservo.write(130);
  paperservo.write(130);
  plasticservo.write(130);
  plasticservo.attach(plasticServoPin);
  aloumservo.attach(aloumServoPin);
  paperservo.attach(paperServoPin);
  delay(2000);
  Serial.begin(9600);
  lcd.begin();
  lcd.backlight();
  digitalWrite(ledPin, LOW);
  delay(3000);

}


int timeSinceLastUserPoll = millis();
void loop() {
 if(millis() - timeSinceLastUserPoll >= 3000) {
    activeUser = getActiveUser();
    activePoints = getPoints();
    
    timeSinceLastUserPoll = millis();
  }

  while (!hasActiveUser()) {
    activeUser = getActiveUser();
    activePoints = getPoints();
    delay(3000);
  }
  
  showUser(activeUser, activePoints);
  
  int timewaiting = 0;
  do {
    plasticdistance = calculateDistance(plasticTrigPin, plasticEchoPin);
    aloumdistance = calculateDistance(aloumTrigPin, aloumEchoPin);
    paperdistance = calculateDistance(paperTrigPin, paperEchoPin);
    delay(100);
    timewaiting = timewaiting + 100;
      }
    while (plasticdistance > maxDistance && aloumdistance > maxDistance && paperdistance > maxDistance && timewaiting < 10000);
 
  //showdistances();
  if (timewaiting >= 10000) {
    return delaymessage();
  }
  check_and_open(plasticdistance, plasticTrigPin, plasticEchoPin, plasticservo);
  check_and_open(aloumdistance, aloumTrigPin, aloumEchoPin, aloumservo);
  check_and_open(paperdistance, paperTrigPin, paperEchoPin, paperservo);
}

void check_and_open(int distance, int trigpin, int echopin, Servo s) {
  if (distance < maxDistance) {
    delay(1);
    s.write(0);
    do {
      delay(1);
    } while (calculateDistance(trigpin, echopin) < maxDistance);
    
    delay(800);
    
    s.write(130);

    showUser(activeUser, String(activePoints.toInt() + 1)); //We want the screen to be responsive and addPoints() is slow
    activePoints = addPoints("1");
  }
}

int calculateDistance(int trigPin, int echoPin) {
  const float speedOfSound = 0.034;
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  float duration = pulseIn(echoPin, HIGH);
  float distance = duration * (speedOfSound / 2); // Its the distance from the sensor to the part that the sensor detected

  return distance;
}

String getActiveUser() {
  Serial.print("GetActiveUser");
  
  while(Serial.available() == 0);

  activeUser = Serial.readStringUntil('\0');
  return activeUser;
}

bool hasActiveUser() {
  return activeUser != "";
}

String addPoints(String points) {
  Serial.print(points);
  
  while(Serial.available() == 0);
  
  return Serial.readStringUntil('\0');
}

String getPoints() {
  Serial.print("GetPoints");
  
  while(Serial.available() == 0);
  
  return Serial.readStringUntil('\0');
}

void showUser(String activeU, String points) {
  digitalWrite(ledPin, HIGH);
  lcd.clear();
  
  lcd.setCursor(0, 0);
  lcd.print("--------------------");
  
  lcd.setCursor(0, 1);
  lcd.print("IRRS");
  
  lcd.setCursor(0, 2);
  lcd.print("Welcome, "  + activeU);
  
  lcd.setCursor(0, 3);
  lcd.print("You have " + points + " points"); 
}

void delaymessage() {
  lcd.clear();
  
  lcd.setCursor(0, 0);
  lcd.print("--------------------");
  
  lcd.setCursor(0, 1);
  lcd.print("No trash thrown");
  
  lcd.setCursor(0, 2);
  lcd.print("Waiting...");
  
  lcd.setCursor(0, 3);
  lcd.print("--------------------");
  
  delay(2000);
}

void showdistances() {
  Serial.print("plastic distance ");
  Serial.println(plasticdistance);
  Serial.print("aloum distance ");
  Serial.println(aloumdistance);
  Serial.print("paper distance ");
  Serial.println(paperdistance);
}

/*
Αρχικοποίηση μεταβλητών
Αρχικοποίηση εκκίνησης

Μήνυμα Καλωσορίσματος - Αναμονη
Αναμονή για χρήστη
Αν χρήστης
    Καλωσόρισμα για Χρήστη
    Aνάβει το led
   Αναμονή για 10 δευτερόλεπτα για αντικείμενο
    Αν αντικείμενο
  προσθήκη πόντων
  εμφάνιση μηνύματος
        περίμενε 5 δευτ
   αλλιώς
      περίμενε 5 δευτ
      Εμφάνιση μηνύματος δεν έγινε ανακύκλωση
   Τέλος_αν
Αντικείμενο
Αν αισθ_απόστ = χαρτί τότε
  προσθήκη 5 πόντου
Αλλιως_αν αισθ_απόστ = πλαστικό τότε
 προσθήκη 10 πόντου
Αλλιως_αν αισθ_απόστ = αλουμ τότε
 προσθήκη 10 πόντου
Τέλος_αν

Θα μπορούσε το κινητό να εμφανίζει και τους πόντους και αν κέρδισε ο χρήστης.
Αναμονή για χρήστη

Διάβαζε από την σειριακή_είσοδο μέχρι να πάρεις μήνυμα ενεργοποίησης

Εφαρμογή κινητού  web server web client ενεργοποίηση εφαρμογής

Arduino με σειριακή είσοδο στέλνει εντολή προσθήκης πόντων στο web client  web server  ΒΔ



#include <LiquidCrystal.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>



LiquidCrystal_I2C lcd(0x27, 20, 4);
#define echoPin 3
#define trigPin 2
#define redPin 13
#define greenPin 12
long duration;
int distance;
void setup() {
    pinMode(redPin, OUTPUT);
 pinMode(greenPin, OUTPUT); 
 pinMode(trigPin, OUTPUT);
 pinMode(echoPin, INPUT);
 lcd.init();
 pinMode(buttonPinY, INPUT);
 pinMode(buttonPinN, INPUT);
 Serial.begin(9600);
 lcd.setCursor(0, 0);
 lcd.backlight();
}

void loop() {
    waitforactivation();//Μήνυμα Καλωσορίσματος - Αναμονή για χρήστη
    initialization();//Αν χρήστης Καλωσόρισμα για Χρήστη- Aνάβει το led
    if (user)
      display welcome message
    delay(10000);
    take distance1, distance2, distance3
    if (distance1) {
     proper message
     points
    else if 
      else {
        giveanswer("Possible" , "covid symptom", "Be careful");
  }}
    
   
   Αναμονή για 10 δευτερόλεπτα για αντικείμενο
    Αν αντικείμενο
  προσθήκη πόντων
  εμφάνιση μηνύματος
        περίμενε 5 δευτ
   αλλιώς
      περίμενε 5 δευτ
      Εμφάνιση μηνύματος δεν έγινε ανακύκλωση
   Τέλος_αν
Αντικείμενο
Αν αισθ_απόστ = χαρτί τότε
  προσθήκη 5 πόντου
Αλλιως_αν αισθ_απόστ = πλαστικό τότε
 προσθήκη 10 πόντου
Αλλιως_αν αισθ_απόστ = αλουμ τότε
 προσθήκη 10 πόντου
Τέλος_αν
    
}

void waituserchoice(){
  do {
    delay(1);
    buttonStateY = digitalRead(buttonPinY);
    buttonStateN = digitalRead(buttonPinN);
  }
  while (buttonStateY == LOW && buttonStateN == LOW); 
    }

void initialization(){
 digitalWrite(redPin, LOW);
  do {
  lcd.clear();
  delay(1);
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2; 
  Serial.println("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");
  }
 while (distance > 30);
 if (distance <= 30) {
  digitalWrite(greenPin, HIGH);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("--------------------");
  lcd.setCursor(7, 1);
  lcd.print("IRRS");
  delay(100);
  lcd.setCursor(7, 2);
  lcd.print("Welcome");
  lcd.setCursor(0, 3);
  lcd.print("--------------------"); 
  delay(2000);}
}

void letsbegin(){
 lcd.clear();
 lcd.setCursor(1, 1);
 lcd.print("Put the object to ");
 lcd.setCursor(1, 2);
 lcd.print("the proper position");
 delay(10000);
 /*lcd.clear();
 lcd.setCursor(2, 1);
 lcd.print("Ok, let us begin");
 lcd.setCursor(2, 2);
 lcd.print("Press to start");
 delay(3000);
}
*/
