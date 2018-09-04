
## TRIPS
# create and delete trip id
# create and delete location id

--- DONE splitter --- 


## EVENTS

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
