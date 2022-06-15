# IntelligentRecyclingSystem

## Ευφυές Σύστημα Ανταποδοτικης Ανακυκλωσης (Intelligent Reciprocal Recycling System)

## ΓΕΛ Καλαμπάκας 

## Περιγραφή: 
Η ανακύκλωση εδώ και αρκετά χρόνια αποτελεί σημαντικός παράγοντας για την προστασία του περιβάλλοντος. Έστω και αργά έγινε κατανοητό ότι οι πρώτες ύλες θα τελειώσουν και χρειάζεται να αναπτυχθούν λύσεις επαναχρησιμοποίησης των “άχρηστων” πια προϊόντων, των συσκευασιών και άλλων υλικών.
Η συμμετοχή στην ανακύκλωση πέρα από ηθική υποχρέωση όλων απαιτεί και κόπο και είναι καλή ιδέα να ανταμείβονται όσοι αφιερώνουν χρόνο να ανακυκλώνουν αντικείμενα που είτε χρησιμοποιούν οι ίδιοι είτε όχι.
Το σύστημα που σχεδίασε η ομάδα ΕΛΛΑΚ του Γενικού Λυκείου Καλαμπάκας θα δίνει δυνατότητα στους μαθητές να ανακυκλώνουν βασικά υλικά που χρησιμοποιούν στο σχολείο. Θα ταυτοποιείται ο χρήστης με ένα κωδικό με τη χρήση εφαρμογής κινητού τηλεφώνου και στη συνέχεια το σύστημα θα δέχεται το αντικείμενο προς ανακύκλωση. Αφού αναγνωριστεί και τοποθετηθεί στον κατάλληλο κάδο θα προσμετρώνται στον συγκεκριμένο χρήστη πόντοι οι οποίοι θα αντιστοιχούν σε διάφορα δώρα π.χ. από τα βιβλιοπωλεία της πόλης ή το κυλικείο του σχολείου.

### Υποσύστημα ταυτοποίησης των χρηστών και επιβράβευσης

Αρχικά υπήρχε η ιδέα οι μαθητές να ταυτοποιούνται με QR code, αλλά για να αποφευχθεί η αγορά ενός QR scanner προτιμήθηκε ένας άλλος απλούστερος τρόπος, με χρήση ενός κωδικού που εισάγει ο χρήστης σε μια εφαρμογή στο κινητό.

Στο χώρο του συστήματος ανακύκλωσης υπάρχει ασύρματο δίκτυο LykRecycling στο οποίο συνδέεται ο χρήστης με το κινητό του. Στη συνέχεια πληκτρολογεί το όνομα χρήστη και τον κωδικό του στην εφαρμογή της ανακύκλωσης (MobRecycling) του τηλεφώνου.
 Η εφαρμογή συνδέεται στον εξυπηρετητή ιστοσελίδων (web server) του συστήματος στον οποίο γίνεται η ταυτοποίηση του χρήστη. Τα δεδομένα των χρηστών διατηρούνται σε βάση δεδομένων. Στον εξυπηρετητή εκτελείται μία εφαρμογή (WebRecycling) που διαχειρίζεται του χρήστες,
δημιουργεί και αποθηκεύει σε βάση δεδομένων του κωδικούς των μαθητών,
ταυτοποιεί τον μαθητή, ενώ  σε περίπτωση που δεν είναι στην βάση δεδομένων του προτρέπει να εγγραφεί στον υπεύθυνο του συστήματος,
δέχεται τους πόντους από τον μηχανισμό της ανακύκλωσης που ελέγχεται με τον μικροελεγκτή arduino και αυξάνει τους πόντους του ενεργού χρήστη.
Το υποσύστημα τοποθέτησης του αντικειμένου αποστέλλει στον εξυπηρετητή και στην  WebRecycling εφαρμογή τους πόντους ανάλογα με ποιο αντικείμενο τοποθετεί ο ταυτοποιημένος χρήστης. Το πρόγραμμα που εκτελεί το arduino αφού ανιχνευσει το αντικείμενο στέλνει σειριακά τους πόντους σε ένα πρόγραμμα πελάτη (webclient) που τρέχει στην κάρτα Esp32 CAM.  Το τελευταίο επικοινωνεί με τον εξυπηρετητή για την ενημέρωση των πόντων.

<img src="/images/ellak2022process.png">

Για την ανάπτυξη της εφαρμογής του κινητού τηλεφώνου χρησιμοποιήθηκαν τα ελεύθερα λογισμικά:
* android studio, https://developer.android.com/studio
* gradle, https://gradle.org/
* volley, https://google.github.io/volley/

Για τον web server και την ανάπτυξη της web εφαρμογής WebRecycling χρησιμοποιήθηκαν τα ελεύθερα λογισμικά:
* node, https://nodejs.org/en/
* knex, http://knexjs.org/
* sqlite3, https://www.sqlite.org/
* DB Browser, https://sqlitebrowser.org

### Υποσύστημα αναγνώρισης αντικειμένων και τοποθέτησής τους στους κάδους.
Μετά την ταυτοποίηση του χρήστη, ενεργοποιείται το υποσύστημα που αναμένει το αντικείμενο και αφού το δεχτεί το αναγνωρίζει και το τοποθετεί στο αντίστοιχο κάδο. Σε αυτή την φάση το σύστημα εμπιστεύεται τον χρήστη που είναι ταυτοποιημένος και με την χρήση αισθητήρων απόστασης ανοίγει την κατάλληλη θύρα ανακύκλωσης για την τοποθέτηση του αντικειμένου και ανιχνεύει αν αυτό τοποθετήθηκε. Στη συνέχεια με την διαδικασία που περιγράφηκε επιβραβεύει τον χρήστη.

Σε δεύτερη φάση θα μπορούσε να επεκταθεί χρησιμοποιώντας αισθητήρες αγωγιμότητας με την χρήση των οποίων θα ξεχωρίζονται τα διαφορετικά υλικά ή ακόμη καλύτερα ίσως με αναγνώριση εικόνας με την χρήση της κάμερας ESP32-CAM και των ελεύθερων λογισμικών TensorFlow, OpenCV.

Ο εξοπλισμός που θα χρειαστούμε είναι:

* 1 Arduino UNO R3 ATmega328P (20 Ευρώ)
* Καλώδια, leds, κουμπιά, αντιστάσεις (5 Ευρώ)
* Πλακέτες διασύνδεσης - Breadboard (5 Ευρώ)
* 20x4 2004 LCD Display Module Serial Interface (10 Ευρώ)
* 3 αισθητήρες υπερήχων,  ElecFreaks HC-SR04 Ultrasonic Module Distance (5 Ευρώ)
* 3 x servo Motor (15 Ευρώ)
* 1 Camera ESP2-CAM (15 Ευρώ)
* Basic 20x4 Character LCD - White on Blue 5V (I2C Protocol) (10 Ευρώ)
* Power adapter with DC connector (5 Ευρώ)

Συνολικό κόστος 90€

Για τον προγραμματισμό της κάμερας ESP32 CAM σε σύνδεση απευθείας με το Arduino βοήθησε η παρακάτω πηγή, όπου παρουσιάζεται η συνδεσμολογία της κάμερας με το arduino και ένας ενδεικτικός κώδικας που μετατρέπει την κάμερα σε web server με δυνατότητες λήψης εικόνας και αναγνώρισης προσώπου. https://www.youtube.com/watch?v=q-KIpFIbRMk
<img src="/images/progesp32.JPG" width=500>

Αναλυτική περιγραφή του ολοκληρωμένου κυκλώματος της κάμερας υπάρχει στην διεύθυνση
https://randomnerdtutorials.com/esp32-cam-ai-thinker-pinout/

Στο σύστημά μας θα χρησιμοποιήσουμε τις δυνατότητες του Esp32-CAM για να αποστέλλει δεδομένα στο web server και άρα θα λειτουργεί ως web client. Για την επικοινωνία του Arduino με το webclient που τρέχει στο ESP32-CAM θα χρησιμοποιηθεί η σειριακή μετάδοση(pins Tx, Rx).
https://www.programmingelectronics.com/serial-read/

### Φωτογραφίες από τις συναντήσεις και τους πειραματισμούς της ομάδας:
<img src="/images/ellak2022process.png">

### Κύκλωμα Arduino
<img src="/images/ellaK2022circuit.png">

### <a href=ellak2022b.mp4">Βίντεο Λειτουργίας</a>


