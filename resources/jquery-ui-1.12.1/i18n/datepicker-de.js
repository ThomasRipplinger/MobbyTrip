/* German initialisation for the jQuery UI date picker plugin. */
( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "../widgets/datepicker" ], factory );
	} else {

		// Browser globals
		factory( jQuery.datepicker );
	}
}( function( datepicker ) {

datepicker.regional.de = {
	closeText: "Schliessen",
	prevText: "zürück",
	nextText: "weiter",
	currentText: "Heute",
	monthNames: [ "Januar", "Februar", "März", "April", "Mai", "Juni",
		"Juli", "August", "September", "Oktober", "November", "Dezember" ],
	monthNamesShort: [ "Jan.", "Feb.", "Mrz.", "Apr.", "Mai", "Jun",
		"Jul.", "Aug,", "Sept.", "Okt.", "Nov.", "Dez." ],
	dayNames: [ "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag" ],
	dayNamesShort: [ "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa" ],
	dayNamesMin: [ "So","Mo","Di","Mi","Do","Fr","Sa" ],
	weekHeader: "Wo.",
	dateFormat: "dd/mm/yy",
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: "" };
datepicker.setDefaults( datepicker.regional.de );

return datepicker.regional.de;

} ) );
