## TEST CASES 

# On startup
load data
show trip tiles

# trip: display
hide trip tiles
fill in trip form with data
show trip form (and: hide 'new trip button', initialize Map, show location tiles)

# trip: edit and cancel 
hide trip form
clear trip form
hide trip locations form and tiles
hide location tiles
re-init trip tiles (hide/show)

# trip: edit and save
save trip data
hide trip locations form and tiles
hide trip form (and show 'new trip' button)
clear trip form
re-init trip tiles (hide/show)

# trip: add
clear trip form
show trip form (and hide 'new trip' button)
[should work with existing data]
[should work w/o existing data]

# trip: delete
remove trip tile

# location: display
if new selection: save current location 
fill location form with data
show trip locations form

# location: edit and save 
save trip+location data  (name, id, desc)
hide location form
clear location form


# location: add 
save current location (if visible) 
clear location form
add overlay and wait for input, then
   show trip locations form

### TESTED splitter -------------------------------

# location: delete
remove current location

# location: edit and cancel  (REMOVE)
hide location form
clear location form


## ----------------------------------
Start Selenium: Terminal => webdriver-manager start   (ggf vorher webdriver-manager update)
Start Tests:    Terminal => protractor conf.js   (in ../protractor)
da keine Angular app:       browser.waitForAngularEnabled(false);