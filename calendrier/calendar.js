/* afficher un calendrier (mois)
dans la vue: <cal-month month='mai' year='2022'></cal-month>
dépendances: tag.js, text.js et structure.css pour afficher les jour ayant un évenement
séparer l'objet calendar / Month, qui affiche un calendrier vide et l'objet eventList, qui contient la liste des évènement. eventList peut utiliser un calendar.
*/
String.prototype.addZero = function(){
	if (this.length >=2) return this;
	else return '0'+ this;
}
Number.prototype.addZero = function(){
	var nb= this.toString();
	nb= nb.addZero();
	return nb;
}
function isYearBissextile (year){
	var yearBissextile = false;
	if (year %4 ==0){
		yearBissextile = true;
		if (year %100 ==0){
			yearBissextile = false;
			if (year %400 ==0) yearBissextile = true;
	}}
	return yearBissextile;
}
class DayWeek{
	static lundi = new DayWeek (1, 'lundi');
	static mardi = new DayWeek (2, 'mardi');
	static mercredi = new DayWeek (3, 'mercredi');
	static jeudi = new DayWeek (4, 'jeudi');
	static vendredi = new DayWeek (5, 'vendredi');
	static samedi = new DayWeek (6, 'samedi');
	static dimanche = new DayWeek (7, 'dimanche');

	constructor (id, name){
		this.id = id;
		this.name = name;
	}
	getById (id){
		if (typeof (id) == 'number') id= id%7;
		if (id ==1 || id == 'lundi') return DayWeek.lundi;
		else if (id ==2 || id == 'mardi') return DayWeek.mardi;
		else if (id ==3 || id == 'mercredi') return DayWeek.mercredi;
		else if (id ==4 || id == 'jeudi') return DayWeek.jeudi;
		else if (id ==5 || id == 'vendredi') return DayWeek.vendredi;
		else if (id ==6 || id == 'samedi') return DayWeek.samedi;
		else if (id ==7 || id ==0 || id == 'dimanche') return DayWeek.dimanche;
		else return null;
	}
	static get (id){ return DayWeek.lundi.getById (id); }
	static getFirstDayYear (year){
		// référence: 2020 commençait un mercredi
		const refYear = 2020;
		var nbDays = DayWeek.mercredi.id;
		nbDays +=2;
		for (var y= 2021; y< year; y++){
			nbDays += 1;
			if (isYearBissextile (y)) nbDays +=1;
		}
		nbDays = nbDays %7;
		return DayWeek.mercredi.getById (nbDays);
	}
}
const calendarTemplate = `<div>
	<button onClick='monthChange(this.parentElement.parentElement, false)'><</button><span></span><button onClick='monthChange(this.parentElement.parentElement, true)'>></button>
	<button onClick='yearChange(this.parentElement.parentElement, false)'><</button><span></span><button onClick='yearChange(this.parentElement.parentElement, true)'>></button>
</div><div>
	<b>l</b><b>m</b><b>m</b><b>j</b><b>v</b><b>s</b><b>d</b>
</div>`;
const calendarStyle =`
	cal-month {
		display: block;
		text-align: center;
	}
	cal-month div:nth-child(1) {
		height: 2em;
		display: grid;
		grid-template-columns: 1fr 6fr 1fr 1fr 3fr 1fr;
	}
	cal-month div:nth-child(2){
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
		align-items: stretch;
		justify-items: stretch;
	}
	cal-month div:nth-child(2) >* { margin: 0; }
	cal-month div:nth-child(2) p.full { background-color: var(--fond-color, #EEE); }
	day { display: block; }
	day >p> span { display: inline-block; }
	day >p> span:nth-child(1) { width: 4em; }
	day button { float: right; }
	day p.important { background-color: var(--fond-color, #EEE); }`;

class Month{
	static janvier = new Month (1, 31, 'janvier', 2022);
	static fevrier = new Month (2, 28, 'février', 2022);
	static mars = new Month (3, 31, 'mars', 2022);
	static avril = new Month (4, 30, 'avril', 2022);
	static mai = new Month (5, 31, 'mai', 2022);
	static juin = new Month (6, 30, 'juin', 2022);
	static juillet = new Month (7, 31, 'juillet', 2022);
	static aout = new Month (8, 31, 'août', 2022);
	static septembre = new Month (9, 30, 'septembre', 2022);
	static octobre = new Month (10, 31, 'octobre', 2022);
	static novembre = new Month (11, 30, 'novembre', 2022);
	static decembre = new Month (12, 31, 'décembre', 2022);

	constructor (id, duration, name, year){
		this.year = year;
		this.id =id;
		this.name = name;
		this.duration = duration;
		this.firstDay = DayWeek.lundi;
		this.setFisrtDay();
		if (this.id ==2 && isYearBissextile (this.year)) this.duration =29;
	}
	static setYear (year){
		this.janvier.year = year;
		this.janvier.setFisrtDay();
		this.fevrier.year = year;
		this.fevrier.setFisrtDay();
		this.mars.year = year;
		this.mars.setFisrtDay();
		this.avril.year = year;
		this.avril.setFisrtDay();
		this.mai.year = year;
		this.mai.setFisrtDay();
		this.juin.year = year;
		this.juin.setFisrtDay();
		this.juillet.year = year;
		this.juillet.setFisrtDay();
		this.aout.year = year;
		this.aout.setFisrtDay();
		this.septembre.year = year;
		this.septembre.setFisrtDay();
		this.octobre.year = year;
		this.octobre.setFisrtDay();
		this.novembre.year = year;
		this.novembre.setFisrtDay();
		this.decembre.year = year;
		this.decembre.setFisrtDay();
		if (isYearBissextile (year)) this.fevrier.duration =29;
		else this.fevrier.duration =28;
	}
	setFisrtDay(){
		var nbDays =0;
		for (var m=1; m< this.id; m++){
			var month = new Month (m, this.year);
			nbDays += month.duration;
		}
		var firstDayYear = DayWeek.getFirstDayYear (this.year);
		nbDays += firstDayYear.id;
		nbDays = nbDays %7;
		this.firstDay = DayWeek.get (nbDays);
	}
	getNext(){ return Month.getById (this.id +1); }
	getLast(){ return Month.getById (this.id -1); }
	static getById (id){
		if (id ==1 || id ==13 || id== 'janvier'){ return Month.janvier; }
		else if (id ==2 || id== 'fevrier' || id== 'février'){ return Month.fevrier; }
		else if (id ==3 || id== 'mars'){ return Month.mars; }
		else if (id ==4 || id== 'avril'){ return Month.avril; }
		else if (id ==5 || id== 'mai'){ return Month.mai; }
		else if (id ==6 || id== 'juin'){ return Month.juin; }
		else if (id ==7 || id== 'juillet'){ return Month.juillet; }
		else if (id ==8 || id== 'aout' || id== 'août'){ return Month.aout; }
		else if (id ==9 || id== 'septembre'){ return Month.septembre; }
		else if (id ==10 || id== 'octobre'){ return Month.octobre; }
		else if (id ==11 || id== 'novembre'){ return Month.novembre; }
		else if (id ==12 || id==0 || id== 'decembre' || id== 'décembre'){ return Month.decembre; }
		else return null;
	}
}
class HTMLCalMonthElement extends HTMLElement{
	constructor(){
		super();
		this.month = null;
	}
	connectedCallback(){
		// appelée après le constructeur
		var year = parseInt (this.getAttribute ('year'));
		Month.setYear (year);
		var month = this.getAttribute ('month');
		this.month = Month.getById (month);
		if (! exists (this.month)) this.innerHTML = 'erreur, vous avez entré un mauvais mois.';
		else this.draw();
	}
	draw(){
		this.innerHTML = calendarTemplate;
		var titleList = this.getElementsByTagName ('span');
		titleList[0].innerHTML = this.month.name;
		titleList[1].innerHTML = this.month.year;
		var blockList = this.getElementsByTagName ('div');
		var day = null;
		for (var c=1; c< this.month.firstDay.id; c++) blockList[1].createNode ('p', "");
		for (var c=1; c<= this.month.duration; c++) day = blockList[1].createNode ('p', c);
		this.removeAttribute ('year');
		this.removeAttribute ('month');
		document.setStyle (calendarStyle);
	}
	isEvent (eventList){
		const key = this.month.year +'/'+ this.month.id.addZero() +'/';
		var eventListMonth ={};
		for (var e=0; e< eventList.length; e++) if (eventList[e][0].indexOf (key) >=0){
			var nvKey = eventList[e][0].replace (key);
			if (! exists (eventListMonth [nvKey]))
				eventListMonth [nvKey] = eventList[e][1] +'\t'+ eventList[e][2] +'\t'+ eventList[e][3] +'\n';
			else eventListMonth [nvKey] = eventListMonth [nvKey] + eventList[e][1] +'\t'+ eventList[e][2] +'\t'+ eventList[e][3] +'\n';
		}
		var dayList = this.getElementsByTagName ('p');
		for (var d=0; d< dayList.length; d++){
			var nvKey = eventListMonth [dayList[d].innerHTML.addZero()];
				if (exists (nvKey)){
					dayList[d].className = 'full';
					dayList[d].setAttribute ('events', nvKey);
					dayList[d].addEventListener ('click', openDay);
		}}
	}
}
customElements.define ('cal-month', HTMLCalMonthElement);

function monthChange (calendar, next){
	var monthTag = calendar.getElementsByTagName ('span')[0];
	var month = Month.getById (monthTag.innerHTML);
	if (next) month = month.getNext();
	else month = month.getLast();
	calendar.month = month;
	calendar.draw();
}
function yearChange (calendar, next){
	var yearTag = calendar.getElementsByTagName ('span')[1];
	var year = parseInt (yearTag.innerHTML);
	if (next) year +=1;
	else year -=1;
	Month.setYear (year);
	calendar.draw();
}
const dayTemplate = "<h2><span></span><button onClick='closeDay(this.parentElement.parentElement)'>X</button></h2>";
function openDay (event){
	var table = event.target.getAttribute ('events').fromTsv();
	var container = event.target.parentElement.parentElement.parentElement;
	var todayTemplate = dayTemplate.replace ('<span></span>', '<span>' + 'coucou' + '</span>');
	var day = container.createNode ('day', 'coucou');
	var eventTemplate ="";
	for (var e=0; e< table.length; e++){
		eventTemplate = '<p><span>' + table[e][0] + '</span><span>' + table[e][2] + '</span></p>';
		if (table[e][1] == 'important') eventTemplate = eventTemplate.replace ('<p>', "<p class='important'>");
		todayTemplate = todayTemplate + eventTemplate;
	}
	day.innerHTML = todayTemplate;
}
function closeDay (element){ element.parentElement.removeChild (element); }
