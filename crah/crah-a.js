/*/ page 1, temps travaillé cette semaine
var container = document.getElementById ('trEX_TIME_DTL$0_row1');
var jours = container.getElementsByTagName ('input');
for (var j=6; j< jours.length -1; j++) jours[j].value = '7,40';
// page 2, repos quotidien
container = document.getElementById ('UC_EX_TDLY_FR$scroll$0');
jours = container.getElementsByTagName ('select');
for (var j=0; j< jours.length; j++){
	if ('UC_DAILYREST1$0 UC_DAILYREST7$0 UC_DAILYREST1$1 UC_DAILYREST7$1 UC_DAILYREST1$2 UC_DAILYREST7$2'.includes (jours[j].id))
		jours[j].selectedIndex = 1;
	else if ('UC_DAILYREST2$0 UC_DAILYREST3$0 UC_DAILYREST4$0 UC_DAILYREST5$0 UC_DAILYREST6$0 UC_DAILYREST2$1 UC_DAILYREST3$1 UC_DAILYREST4$1 UC_DAILYREST5$1 UC_DAILYREST6$1 UC_DAILYREST2$2 UC_DAILYREST3$2 UC_DAILYREST4$2 UC_DAILYREST5$2 UC_DAILYREST6$2'
			.includes (jours[j].id))
		jours[j].selectedIndex = 3;
}
// page 2, durée de la pause déjeuné
container = document.getElementById ('trUC_EX_TDLY_FR2$0_row1');
jours = container.getElementsByTagName ('input');
for (var j=1; j< jours.length -1; j++) jours[j].value = '1';
// page 2, localisation
container = document.getElementById ('UC_EX_TDLY_FR1$scroll$0');
jours = container.getElementsByTagName ('select');
for (var j=0; j< jours.length; j++){
	if ('UC_LOCATION_A2$0 UC_LOCATION_A5$0 UC_LOCATION_A2$1 UC_LOCATION_A5$1'.includes (jours[j].id))
		jours[j].selectedIndex = 6;
	else if ('UC_LOCATION_A3$0 UC_LOCATION_A4$0 UC_LOCATION_A6$0 UC_LOCATION_A3$1 UC_LOCATION_A4$1 UC_LOCATION_A6$1'.includes (jours[j].id))
		jours[j].selectedIndex = 5;
}*/
// sciforma
const divs = document.getElementsByTagName ('div');
for (var d=0; d< divs.length; d++) if (divs[d].innerText !="" && divs[d].innerText != 'Tous')
	console.log (d, divs[d].innerText);
