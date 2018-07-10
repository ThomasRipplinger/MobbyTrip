
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
- fix "delete tile" issue (ID problem?)
- create each tile with own unique ID => support fade out of all tiles...
show trip form 
close both trip and detail form 
BUG: save legt neuen Trip an auch bei "Edit"
ID einführen (z.B. ID#Counter) und verwenden für 'delete trip'
trip data anzeigen nach Anwahl "trip anschauen" 
trip form edit and save
## ----- DONE ------
- add new location based on maps selection
- Neuen Ort via Google Maps anlegen, als Pin anzeigen in der Trip Übersicht

- TEST: async map request processing // test w/o internet
- delete location
- Form "Trip Details" aufbauen
- nach "Trip anlegen": Ort hinzufügen anbieten
- Tripdetails: speichern/laden 
- Farbschema geradeziehen, besseres Startbild, 
- 2 Demotrips anlegen  
- Funktion auch offline sicherstellen
!== null  vs  !== undefined


### --------------------
- Prio2: zentrale Datenspeicherung
- Prio2: Pins mit Route verbinden
- Prio2: Route mit anderen teilen
### ENDE Roadmap ###

domain: triplogbook.online / Reisebuch.online    (mobbyTrip.de / .com)

#create new location
- Button "add location" rechts von der Map
- bei "Speichern": add to data structure
- save data locally
- delete location

#save and load location list
- Test mit testing framework ?
- Felder nur bei Bedarf anzeigen: ... => Auswahl weiterer Felder

#integrate google maps for route overview - lade map mit Basis "Reiseziel", Umkreis 100km
#integrate google maps for locations - lade map mit Basis "Reiseziel", Umkreis 20km

#edit Trip data
#add photo to trip-details form
#link trip location to trip list
bei "enter" nicht Cancel aktivieren...!
bei "anlegen ok" kurz einen grünen Haken od. OK erscheinen lassen
alle Tiles gleich hoch machen
select color schema (http://www.paletton.com/index.html#uid=75q1M0kiCFn8GVde7NVmtwSqXtg)
Logo 'womoTrips' zweifarbig (Header?)
trip details and location page w. demo data
add camping info (adress, phone, cost, comment, rating)
add photo carousel
convert online map to img and download / link img


##EVENTS

# form load
load data
****if no data: add 2 demo tiles
show tiles

# add trip
hide 'new trip button'
clear trip form
show trip form

# show trip
hide 'new trip button'
fill in trip form with data
show trip form
show location tiles

# show trip locations
remove tiles
show trip locations form

# save trip form
save trip data
hide trip form
hide trip locations form
hide location tiles
show tiles
clear trip form
show 'new trip button'

# cancel trip form
hide trip form
hide trip locations form
hide location tiles
show tiles
clear trip form
show 'new trip button'

# add location
*** cancel current location if visible
*** clear location form
*** open location form

# show location
*** cancel current location if visible
*** fill location form with data
*** open location form

# save location form
save trip/location data
hide location form
clear location form

# cancel location form
hide location form
clear location form
