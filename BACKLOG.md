
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

## ----- DONE ------
- add procedural logging (using logging lib?)
- remove 'save trip' button - only keep 'OK' (there is no cancel - would complicate the entrire UX, rather save each ministep)
- save each ministep: after create location, on close location form, on select other location form
- delete location

Merge branch to mainline if test OK
    https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging
    git branch myBranch
    git checkout myBranch
    ...

- create new location: Ort als Pin anzeigen in der Trip Übersicht
- OnLocationMarkerPositionChanged: get adress of new marker position
- OnTripMarkerPositionChanged: ...?
- if no data: add 2 demo tiles
- getLocationIndexById: remove tripIndex (make locationId unique)
- async map request processing // test w/o internet (Funktion auch offline sicherstellen)
- Farbschema geradeziehen, besseres Startbild, 
  color schema (http://www.paletton.com/index.html#uid=75q1M0kiCFn8GVde7NVmtwSqXtg)
- Test mit testing framework ?
- Felder nur bei Bedarf anzeigen: ... => Auswahl weiterer Felder

add photo to trip-details form
add trip: bei "enter" nicht Cancel aktivieren...!
bei "anlegen ok" kurz einen grünen Haken od. OK erscheinen lassen
convert online map to img and download / link img ?


### ------PRIO 2 ------------------------------
- Prio2: zentrale Datenspeicherung
- Prio2: Pins mit Route verbinden
- Prio2: Route mit anderen teilen
domain: triplogbook.online / Reisebuch.online    (mobbyTrip.de / .com)
### ENDE Roadmap ###


--------------------------------------------------------------------------------------
##EVENTS

# On form load
load data
show tiles


# add trip
clear trip form
show trip form (and hide 'new trip' button)

# save trip form
save trip data
hide trip locations form and tiles
hide trip form (and show 'new trip' button)
clear trip form
re-init trip tiles (hide/show)

# cancel trip form
hide trip form
clear trip form
hide trip locations form and tiles
hide location tiles
re-init trip tiles (hide/show)

# show trip
hide trip tiles
fill in trip form with data
show trip form (and: hide 'new trip button', initialize Map, show location tiles)

# add new location
save current location (if visible) 
clear location form
add overlay and wait for input, then
   show trip locations form

# select trip location
if new selection: save current location 
fill location form with data
show trip locations form

# save location form
save trip+location data  (name, id, desc)
hide location form
clear location form

# close location form
hide location form
clear location form

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

  