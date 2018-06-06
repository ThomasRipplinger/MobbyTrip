
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
desc NEBEN dem anderen Form anzeigen
Statt Start/Ende: ZIEL, damit dann Map anzeigeh
Fix Load demo Data error
## ----- DONE ------
Workflow:
- add trip => fill in form, trip is saved locally (all trips are saved locally)
- show trip => show form, support edit and save
- delete trip
Ab dann weiter mit locations etc

#create new location
- Button "add location" rechts von der Map
- bei "Speichern": add to data structure
- save data locally

#save and load location list

# integrate google maps for route overview - lade map mit Basis "Reiseziel", Umkreis 100km
#integrate google maps for locations - lade map mit Basis "Reiseziel", Umkreis 20km

#edit Trip data
#add photo to trip-details form
#link trip location to trip list
# save and load data (locally)
trip data anzeigen nach Anwahl "trip anschauen" 
neue Kachel hervorheben
neue Kachel langsam ein-sliden
bei "enter" nicht Cancel aktivieren...!
bei "anlegen ok" kurz einen grünen Haken od. OK erscheinen lassen
make trip ID unique, use datetime
alle Tiles gleich hoch machen
Layout verschönern (Farbschema, Schriftart?)
select typeface
select color schema
Logo 'womoTrips' zweifarbig (Header?)
delete trip
trip details and location page w. demo data
add camping info (adress, phone, cost, comment, rating)
add photo carousel
edit/delete location
save project in github 
convert online map to img and download / link img

