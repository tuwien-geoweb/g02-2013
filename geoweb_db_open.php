<?php

// Öffnen einer SQLite3-Datenbank (geoweb)

// Festlegung des Filenamens (Pfades) der Datenbank 
// (kein User/Passwort bei SQLite erforderlich) 
$dbname = '/scratch/users/geoweb2013/htdocs/g02/g02_spatial_db.sqlite';

// Datenbank öffnen mit new SQLite3(Filename, Flag)
// Flag: 
// SQLITE3_OPEN_READWRITE (Lese-/Schreibrecht, falls nicht angegeben) 
// SQLITE3_OPEN_READONLY (nur Leserecht) oder 
// SQLITE3_OPEN_CREATE (erstellt Datenbank, falls sie nicht existiert). 

$db = new SQLite3($dbname);
$db->loadExtension('libspatialite.so');

?> 


