<?php 
  $name = $_REQUEST['name'];  // $_REQUEST enthält die Benutzerangaben 
  $email = $_REQUEST['email']; 
  $message = $_REQUEST['message'];
  $lon = $_REQUEST['lon'];
  $lat = $_REQUEST['lat']; 

  if (isset($_REQUEST['geschlecht']))  
     {$anrede=$_REQUEST['geschlecht'];} // Frau/Herr 
  else  
     {$anrede=" ";} 
      
  if (isset($_REQUEST['team']))  
     {$team="geoweb-Mitglied"; 
      $teamflag=1;}  
  else  
     {$team="geoweb-extern"; 
      $teamflag=0;} 

  // Daten zusätzlich in Datenbank speichern (siehe auch PhpSql-Abschnitt) 
  // Tabelle feedback muss in Datenbank angelegt sein  
  // (Beispiel-Tabelle siehe geoweb/2013/ifip/ifip_db.sqlite-Datenbank) 
   
  include 'geoweb_db_open.php'; // ifip_db.sqlite-Datenbank öffnen 

  // Daten in Tabelle feedback einfügen mit SQL-Befehl  
  // INSERT INTO <tabelle> (felder, ...) VALUES (werte, ...)  
  // Die Werte sind bei Textfelder in (einfache) Hochkomma zu setzen,  
  // bei Zahlen ohne Hochkomma (hier nur bei teamflag) 
  // SQL-String zusammensetzen 
  $sql = "INSERT INTO feedback (f_name,f_mail,f_anrede,f_msg,f_geoweb,f_datum, geom)"; 
  $sql = $sql . " VALUES ('" . $name . "','" . $email . "','" . $anrede .  
         "','" . $message . "'," . $teamflag . ",'" . date("d-m-Y") . "', GeomFromText('POINT(" . $lon . " " . $lat . ")', 4326))"; 

  // SQL-String an Datenbank-Server schicken (Beispiel SQLite-Datenbank:  
  $db->exec($sql) or die ('Fehler bei Speichern: '.$db->lastErrorMsg()); 
   
  include 'geoweb_db_close.php'; // Datenbank schließen 

 header( "Location: feedback_danke.html" );exit; 
       
/* Alternativ: Aufruf einer Html-Seite für Danksagung */  
/* header( "Location: http://xxx.yyy/feedback_thank.htm" );exit; */ 

?>
