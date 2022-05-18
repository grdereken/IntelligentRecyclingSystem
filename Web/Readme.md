## Web εφαρμογή για την διάχείριση χρηστών
- node, https://nodejs.org/en/
- knex, http://knexjs.org/
- sqlite3, https://www.sqlite.org/
- DB Browser, https://sqlitebrowser.org

Τα βήματα για να χρηισιμοποιήσεις το api είναι τα εξης
- Πρώτο βήμα: Δημιουργείς τον χρήστη. Για να δημιουργήσεις τον χρήστη θα πρέπει να στείλεις το συγκεκριμένο
http get request http://ip/register/username=(username)&password=(password)
example: 192.168.1.253/register/username=nikos&password=1234
Στο ip πρέπει να μπει η ip του server. Άμα η συσκευή που στέλνει το request βρισκεται στο ίδιο δίκτυο με
το server πρεπει να μπει το local ip.
Στο username το οποίο είναι σε παρένθεση μπαίνει το username του χρήστη που θέλετε να φτιάξετε και στο password
μπαίνει το password του χρήστη.
Προσοχή! Άμα το username ειναι ήδη πιασμένο από άλλο χρήστη τότε το http request δεν θα φτιάξει νέο 

- Δεύτερο Βήμα: Για να ξέρει το server σε ποιον χρήστη θα δώσει τους πόντους θα πρέπει η συσκευή του χρήστη
να στέιλει το συγκeκριμένο http get request στο server 
http://ip/setActiveUser/?username=(username)&password=(password)
Στο username το οποίο είναι σε παρένθεση μπαίνει το username του χρήστη που θέλετε να πάρει τους πόντους
Στο password βάζετε το password ου χρήστη.

- Τρίτο Βήμα: Τωρα που ο server ξέρει σε ποιον χρήστη θα δώσει τους πόντους πρεπει να μάθει τον αριθμό των πόντων
που να δώσει στον χρήστη. Για να 
