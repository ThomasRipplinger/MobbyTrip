
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

### Roadmap zu MVO ###
- Trip anlegen, löschen, Headerdaten: OK
- Neue Location via Google Maps anlegen, als Pin anzeigen in der Trip Übersicht: TODO
- Farbschema geradeziehen, besseres Startbild, Alignment etc.
- Tripdetails: dito: ** speichern/laden + Form styling: TODO
- 2 Demotrips anlegen  
### --------------------
- Prio2: zentrale Datenspeicherung
- Prio2: Pins mit Route verbinden
- Prio2: Route mit anderen teilen
### ENDE Roadmap ###

tripDetail: horizontale Laufleiste oben mit "Locations" - alle leer, mit "+"
trip detail form, support edit and save
bei Anwahl: edit "Location", bei blurr: Init Map im Detail-Bereich
Sektionen im Detail Bereich zum Aufklappen (wenn Inhalt: aufgeklappt darstellen) https://getbootstrap.com/docs/4.1/components/collapse/#accordion-example
style tripDetail form
fix map location init problem
domain: triplogbook.online / Reisebuch.online    (mobbyTrip.de / .com)

#create new location
- Button "add location" rechts von der Map
- bei "Speichern": add to data structure
- save data locally

#save and load location list
- Test mit testing framework ?
- Felder nur bei Bedarf anzeigen: ... => Auswahl weiterer Felder

#integrate google maps for route overview - lade map mit Basis "Reiseziel", Umkreis 100km
#integrate google maps for locations - lade map mit Basis "Reiseziel", Umkreis 20km

#edit Trip data
#add photo to trip-details form
#link trip location to trip list
neue Kachel hervorheben
neue Kachel langsam ein-sliden
bei "enter" nicht Cancel aktivieren...!
bei "anlegen ok" kurz einen grünen Haken od. OK erscheinen lassen
alle Tiles gleich hoch machen
Layout verschönern (Farbschema, Schriftart?)
select typeface
select color schema (http://www.paletton.com/index.html#uid=75q1M0kiCFn8GVde7NVmtwSqXtg)
Logo 'womoTrips' zweifarbig (Header?)
trip details and location page w. demo data
add camping info (adress, phone, cost, comment, rating)
add photo carousel
edit/delete location
convert online map to img and download / link img