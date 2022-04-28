var calendarEventList =[];

function exists (object){
	if (object == null || object == undefined) return false;
	else if (typeof (object) == Array && object.length ==0) return false;
	else return true;
}
function nbToStr (nb){
	nbStr = nb.toString();
	while (nbStr.length <2) nbStr = '0'+ nbStr;
	return nbStr;
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
function dayContainEvent (dateTag, dayNb, eventList){
	dateTag = dateTag + nbToStr (dayNb);
	var contain = false;
	for (var e=0; e< eventList.length; e++) if (eventList[e][0].indexOf (dateTag) >=0) contain = true;
	return contain;
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
class EventSimple{
	constructor (hour, title, description, tag){
		this.hour = hour;
		this.title = title;
		this.description ="";
		this.tag ="";
		if (description) this.description = description;
		if (tag) this.tag = tag;
	}
	draw (parent){
		if (! parent || parent == undefined) parent = document.body;
		var paragraph = parent.createNode ('p', this.title +': '+ this.description);
		if (this.tag) paragraph.className = this.tag;
	}
}
class Day{
	constructor (id){
		this.id = id;
		this.dayWeek ="";
		this.eventList =[];
	}
	setDayWeek (year, monthId){
		var firstDay = DayWeek.getFirstDayYear (year);
		var month = new Month (monthId, firstDay);
		var nbDays = month.firstDay.id;
		nbDays = nbDays + this.id;
		nbDays = nbDays %7;
		this.dayWeek = DayWeek.get (nbDays).name;
	}
	draw (eventList, dateTag, monthName, parent){
		// récupérer les évenements
		var event = new EventSimple();
		for (var e= eventList.length -1; e>=0; e--) if (dateTag == eventList[e][0]){
			event = new EventSimple (eventList[e][1], eventList[e][3], eventList[e][4], eventList[e][2]);
			this.eventList.push (event);
		}
		// dessiner le calendrier
		if (! exists (parent)) parent = document.body;
		var paragraph = parent.createNode ('day', '<h3>'+ this.dayWeek +' '+ this.id +' '+ monthName + "</h3><button onClick='closeDay(this.parentElement)'>X</button>");
		if (this.eventList.length >0) for (var e=0; e< this.eventList.length; e++) this.eventList[e].draw (paragraph);
	}
}
function openDay (monthName, dayStr){
	var dayLst = dayStr.split ('/');
	var year = parseInt (dayLst[0]);
	var day = new Day (parseInt (dayLst[2]), year);
	day.setDayWeek (year, parseInt (dayLst[1]))
	day.draw (calendarEventList, dayStr, monthName);
}
class Month{
	constructor (id, year){
		if (! exists (id) || id<1 || id>12){
			console.error ('cet id ne correspond pas à un mois:', id);
			return;
		}
		this.year = year;
		this.id =id;
		this.name =""
		this.duration =31;
		this.firstDay = DayWeek.lundi;
		this.setMonth();
		this.setFisrtDay();
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
	setMonth(){
		this.duration =31;
		if ([4,6,9,11].indexOf (this.id) >=0) this.duration =30;
		else if (this.id ==2){
			this.duration =28;
			if (isYearBissextile (this.year)) this.duration =29;
		}
		if (this.id ==1){ this.name = 'janvier'; }
		else if (this.id ==2){ this.name = 'février'; }
		else if (this.id ==3){ this.name = 'mars'; }
		else if (this.id ==4){ this.name = 'avril'; }
		else if (this.id ==5){ this.name = 'mai'; }
		else if (this.id ==6){ this.name = 'juin'; }
		else if (this.id ==7){ this.name = 'juillet'; }
		else if (this.id ==8){ this.name = 'août'; }
		else if (this.id ==9){ this.name = 'septembre'; }
		else if (this.id ==10){ this.name = 'octobre'; }
		else if (this.id ==11){ this.name = 'novembre'; }
		else if (this.id ==12 || this.id ==0){ this.name = 'décembre'; }
	}
	getNext(){ return this.getById (this.id +1); }
	getLast(){ return this.getById (this.id -1); }
	getById (id){
		if (id ==1 || id ==13 || id== 'janvier'){ return new Month (1); }
		else if (id ==2 || id== 'fevrier' || id== 'février'){ return new Month (2); }
		else if (id ==3 || id== 'mars'){ return new Month (3); }
		else if (id ==4 || id== 'avril'){ return new Month (4); }
		else if (id ==5 || id== 'mai'){ return new Month (5); }
		else if (id ==6 || id== 'juin'){ return new Month (6); }
		else if (id ==7 || id== 'juillet'){ return new Month (7); }
		else if (id ==8 || id== 'aout' || id== 'août'){ return new Month (8); }
		else if (id ==9 || id== 'septembre'){ return new Month (9); }
		else if (id ==10 || id== 'octobre'){ return new Month (10); }
		else if (id ==11 || id== 'novembre'){ return new Month (11); }
		else if (id ==12 || id==0 || id== 'decembre' || id== 'décembre'){ return new Month (12); }
		else return null;
	}
	draw (eventList, year, parent){
		if (! exists (parent)) parent = document.body;
		var calendar = parent.getElementsByTagName ('calendar')[0];
		if (! exists (calendar)){
			parent.innerHTML = parent.innerHTML + modelCalendar;
			calendar = parent.getElementsByTagName ('calendar')[0];
		}
		var dateTag = year +'/'+ nbToStr (this.id) +'/';
		var titleList = calendar.getElementsByTagName ('span');
		titleList[0].innerHTML = this.name;
		titleList[1].innerHTML = year;
		for (var c=1; c< this.firstDay.id; c++) calendar.createNode ('p', "");
		for (var c=1; c<= this.duration; c++){
			var day = calendar.createNode ('p', c);
			if (dayContainEvent (dateTag, c, eventList)){
				day.className = 'full';
				day.setAttribute ('onClick', "openDay('" + this.name +"', '"+ dateTag + nbToStr (c) +"')");
	}}}
}
function monthChange (calendar, next){
	var monthTag = calendar.getElementsByTagName ('span')[0];
	var year = calendar.getElementsByTagName ('span')[1].innerHTML;
	year = parseInt (year);
	var month = new Month (1, year);
	month = month.getById (monthTag.innerHTML);
	if (next) month = month.getNext();
	else month = month.getLast();
	calendar.innerHTML = "<button onClick='monthChange(this.parentElement, false)'><</button><span></span><button onClick='monthChange(this.parentElement, true)'>></button><span></span><b>l</b><b>m</b><b>m</b><b>j</b><b>v</b><b>s</b><b>d</b>";
	month.draw (calendarEventList, year, calendar.parentElement);
}