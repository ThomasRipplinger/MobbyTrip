
get bootstrap
data structures for trips w. demo data
data structures for locations w. demo data
initial project
jumbotron and trip tiles for landing page
single trip tile
trip tile margins optimieren (Bootstrap grid ...)
womo foto suchen und als Jumbotron Hintergrund
save single trip locally
load single trip from local store
load json data into trip list
Form "add new trip" 
- erscheint unter Jumbotron mit 
  Ort Start/Ende, Startdatum, Dauer, Beschreibung
- Nach Schließen erscheint neue Kachel 
banner kleiner machen(Höhe)
add "desc." to trip form - als Textbox über die ganze Höhe
neue Kachel am Anfang zeigen
display trip details
- trip detail Struktur: Geomap, Camping Info, Sights, Foto Gallery
- show detail form
- Selektierte Tripkachel bleibt, andere Kacheln verschwinden
- nach Schließen: Layout der Landing page wieder herstellen
save project in github 
desc NEBEN dem anderen Form anzeigen
Statt Start/Ende: ZIEL, damit dann Map anzeigeh
Fix Load demo Data error
- add trip => fill in form, trip is saved locally (all trips are saved locally)
- delete trip
Code auf mehrere Dateien aufsplitten
delete trip
TESTS schreiben für: trip save and load 
save and load data (locally)
- fix "delete tile" issue (ID problem)
- create each tile with own unique ID => support fade out of all tiles...
show trip form 
close both trip and detail form 
BUG: save legt neuen Trip an auch bei "Edit"
ID einführen (z.B. ID#Counter) und verwenden für 'delete trip'
trip data anzeigen nach Anwahl "trip anschauen" 
trip form edit and save
Refactor all interfaces, remove index from interfaces
add procedural logging (using logging lib)
fix init problem
link all trip locations with route
delete location
save each ministep: after create location, on close location form, on select other location form
move location (order)
logging window bei Bedarf - popUpAppender.show()
scrolling-Verhalten verbessern
fix sporadic route-calc and waypoint problem => output direction service status in text field
fix route refresh display problem
Location: Datum anzeigen incl. Wochentag
Location tile:Umbau zu Cards
Location: Datum speichern 
Location Card: Tag anzeigen 
Refresh Location Tiles after "OK"
Location: Übernachtung / Zwischenstopp anzeigen 
bug: trip löschen geht nicht
bug: toggle 'new trip' geht nicht
trip save ohne name - sperren
bug: leerzeichen in ortsname geht nicht
convert trip + locations to objects 
BUG: trip metadata saving does not work
BUG: Loading of existing loc. does not work 
BUG: switch to other location destroys all trip location data
Unit Testing mit Jasmine for TRIP
Protractor testing for TRIP
Unit Testing mit Jasmine for LOCATION
Protractor testing for LOCATION
optimize scrolling behaviour: scolling for locations only works once
Location is not opened after creation  /// Location not openend when selected
BUG: open/close trip messes up locations...
BUG: saving location data does not work, modify location data does not work
BUG: delete location does not work
BUG: saving location does not work with "trip save"
BUG: location änderen auf '' nicht abgefangen
Fix Protractor test script
Closing locations form - no soft scroll behaviour
BUG: save new location does not work
## ----- DONE ------
BUG: moving location order does not work
BUG: route calculation does not work
create new location: Ort als Pin anzeigen in der Trip Übersicht
bug: reset der map overview bei neuem trip geht nicht
Location Card: Strecke => berechnete Werte anzeigen 

Remove all wait(...) from Protractor tests 
complete Protractor tests with corner cases (modify location name, reorder location, delete location)
set up build and deploy pipleline => publish after tests are OK

use strict
refactor / remove "filltripformwithdata"
refactor: const vs. let vs. var
use carousel for locations http://kenwheeler.github.io/slick/

## ----- nice to have ----
Display info message if adress could not be resolved
Locations und Gesamtübersicht gleichzeitig anzeigbar machen => vertikal anordnen, map rechts daneben
test w/o internet (Funktion auch offline sicherstellen)
OnLocationMarkerPositionChanged: get adress of new marker position
OnTripMarkerPositionChanged: ...?
getLocationIndexById: remove tripIndex (make locationId unique)
save photos via drag/drop, see https://www.html5rocks.com/en/tutorials/file/dndfiles/
local backup (?) see https://www.jotform.com/blog/html5-filesystem-api-create-files-store-locally-using-javascript-webkit/ 
Location: Unterschied Übernachtung / Zwischenstopp anzeigen (fettdruck?)
highlight selected location after move
remove 'save trip' button - only keep 'OK' (there is no cancel - would complicate the entrire UX, rather save each ministep)
if no data: add 2 demo tiles
Farbschema geradeziehen, besseres Startbild, 
color schema (http://www.paletton.com/index.html#uid=75q1M0kiCFn8GVde7NVmtwSqXtg)
Felder nur bei Bedarf anzeigen: ... => Auswahl weiterer Felder
add photo to trip-details form
add trip: bei "enter" nicht Cancel aktivieren...!
convert online map to img and download / link img ?

### ------ LEVEL 2 ------------------------------
- Prio2: zentrale Datenspeicherung
- Prio2: Pins mit Route verbinden
- Prio2: Route mit anderen teilen
domain: 
# TravelScripter.com
# Reiselogger.de

TripScripter.com
ReiseScript.de
travelscript.online   (plan & go   // planning made easy)
travelskript.com  (mit k)

reisescript.de    

reiselog.online / 
travelscript.online / 
triplogbook.online / Reisebuch.online / travellog.online / reisescript.online    (mobbyTrip.de / .com)

### MVP 0.1 ---
Webseite muss laufen ohne Fehler
Öffentlich erreichbar (domain)
Sharing via export/import von trips
### MVP 0.2 ---
tbd: einzelne Locations sharen bzw. in anderen Trip reinmergen
Zentrale Speicherung 
- geht das ohne Login-System (Missbrauch, wer darf löschen etc.)? 
- vorhandene Logins mitnutzen (google, fb... => sieht unsicher aus)
- Fotos speichern - Missbrauch, Kosten für Speicher, ...

---------------------------------------------------------
## saving strategy
for trip (header) data: 
  all trips are part of one overall array
  saving is done per single trip, with 'save trip' button
  by adding to overall trip data array (which has been loaded at startup)
  initialized with saving the first trip
for locations:
  locations are an array per trip
  saving along with each trip
  saving each ministep: after create location, on close location form, on select other location form
  initialized with saving a new trip

##Git
    https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging
    create branch:      git branch myBranch
    switch to branch:   git checkout myBranch
    merge single file from other branch to current: 
                        git patch <branch> filename   (use --patch if file exists in current branch)


## jquery
    // iterate over collection of tiles 
    var $tripTiles = $('.triptile')    // get collection 
    for (var i = 0; i < $tripTiles.length; i++) { var $tile = $tripTiles.eq(i); ...}