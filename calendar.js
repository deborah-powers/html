const modelCalendar = "<calendar><span></span><span></span><b>l</b><b>m</b><b>m</b><b>j</b><b>v</b><b>s</b><b>d</b></calendar>";

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
	toString(){
		var text = this.hour +'\t'+ this.tag +'\t'+ this.title +'\t'+ this.description;
		return text;
	}
	fromString (text){
		var textList = text.split ('\t');
		this.hour = textList[0];
		this.tag = textList[1];
		this.title = textList[2];
		this.description = textList[3];
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
		this.events =[];
	}
	setDayWeek (month){
		var nbDays = month.firstDay.id;
		nbDays = nbDays -1+ this.id;
		nbDays = nbDays %7;
		this.dayWeek = DayWeek.get (nbDays).name;
	}
	getEvents (events, dateTag){
		dateTag = dateTag + nbToStr (this.id);
		var event = new EventSimple();
		for (var e= events.length -1; e>=0; e--) if (dateTag == events[e][0]){
			event = new EventSimple (events[e][1], events[e][3], events[e][4], events[e][2]);
			this.events.push (event);
			events.pop (e);
		}
		return events;
	}
	toString(){
		var text = nbToStr (this.id) +' '+ this.dayWeek;
		for (var e=0; e< this.events.length; e++) text = text +'\n'+ this.events[e].toString();
		return text;
	}
	fromString (text){
		if (text.contain ('\n')){
			var textList = text.split ('\n');
			var event = null;
			for (var e=1; e< textList.length; e++){
				event = new EventSimple();
				event.fromString (textList[e]);
				this.events.push (event);
			}
			text = textList[0];
		}
		var textList = text.split (' ');
		this.id = parseInt (textList[0]);
		this.dayWeek = textList[1];
	}
	draw (monthName, parent){
		if (! parent || parent == undefined) parent = document.body;
		var paragraph = parent.createNode ('day', '<h3>'+ this.dayWeek +' '+ this.id +' '+ monthName +'</h3>');
		if (this.events.length >0) for (var e=0; e< this.events.length; e++) this.events[e].draw (paragraph);
	}
}
class MonthEnum{
	static janvier = new MonthEnum (1, 'janvier', 31);
	static fevrier = new MonthEnum (2, 'février', 28);
	static mars = new MonthEnum (3, 'mars', 31);
	static avril = new MonthEnum (4, 'avril', 30);
	static mai = new MonthEnum (5, 'mai', 31);
	static juin = new MonthEnum (6, 'juin', 30);
	static juillet = new MonthEnum (7, 'juillet', 31);
	static aout = new MonthEnum (8, 'août', 31);
	static septembre = new MonthEnum (9, 'septembre', 30);
	static octobre = new MonthEnum (10, 'octobre', 31);
	static novembre = new MonthEnum (11, 'novembre', 30);
	static decembre = new MonthEnum (12, 'décembre', 31);

	constructor (id, name, duration){
		this.id = id;
		this.name = name;
		this.duration = duration;
	}
}
class Month{
	constructor (year, id){
		this.id =0;
		this.name ="";
		this.duration =31;
		this.firstDay = DayWeek.lundi;
		this.year = year;
		this.days =[];
		this.setMonth (id);
	}
	setMonth (id){
		if (id ==1 || id== 'janvier'){ this.id =1; this.name = 'janvier'; }
		else if (id ==2 || id== 'fevrier' || id== 'février'){ this.id =2; this.name = 'février'; }
		else if (id ==3 || id== 'mars'){ this.id =3; this.name = 'janvier'; }
		else if (id ==4 || id== 'avril'){ this.id =4; this.name = 'janvier'; }
		else if (id ==5 || id== 'mai'){ this.id =5; this.name = 'janvier'; }
		else if (id ==6 || id== 'juin'){ this.id =6; this.name = 'janvier'; }
		else if (id ==7 || id== 'juillet'){ this.id =7; this.name = 'janvier'; }
		else if (id ==8 || id== 'aout' || id== 'août'){ this.id =8; this.name = 'janvier'; }
		else if (id ==9 || id== 'septembre'){ this.id =9; this.name = 'janvier'; }
		else if (id ==10 || id== 'octobre'){ this.id =10; this.name = 'janvier'; }
		else if (id ==11 || id== 'novembre'){ this.id =11; this.name = 'janvier'; }
		else if (id ==12 || id==0 || id== 'decembre' || id== 'décembre'){ this.id =12; this.name = 'janvier'; }

		this.duration =31;
		if ([4,6,9,11].contain (this.id)) this.duration =30;
		else if (this.id ==2){
			this.duration =28
			if (isYearBissextile (this.year)) this.duration =29;
		}
		this.setFisrtDay();
	}
	setFisrtDay(){
		const dayWeekYear = DayWeek.getFirstDayYear (year);
		var nbDays =0;
		for (var m=1; m< this.id; m++){
			var month = this.getById (m);
			nbDays += month.duration;
		}
		nbDays += dayWeekYear.id;
		nbDays = nbDays %7;
		this.firstDay = DayWeek.get (nbDays);
	}
	getEvents (events){
		var dateTag = this.year +'/'+ nbToStr (this.id) +'/';
		var day = new Day();
		for (var d=1; d<= this.duration; d++){
			day = new Day (d);
			events = day.getEvents (events, dateTag);
			if (day.events.length >0){
				day.setDayWeek (this);
				this.days.push (day);
	}}}
	getById (id){
		var newMonth = new Month (this.year, id);
		return newMonth;
	}
	static get (id){ return MonthEnum.janvier.getById (id); }
	draw (parent){
		if (! parent || parent == undefined) parent = document.body;
		parent.innerHTML = parent.innerHTML + modelCalendar;
		var calendar = document.getElementsByTagName ('calendar')[0];
		var titleList = calendar.getElementsByTagName ('span');
		titleList[0].innerHTML = this.name;
		titleList[1].innerHTML = this.year;
		const dayWeek = this.setFisrtDay (this.year);
		for (var c=1; c< this.firstDay.id; c++) calendar.createNode ('p', "");
		for (var c=1; c<= this.duration; c++) var day = calendar.createNode ('p', c);
		var c=0;
		var cases = calendar.getElementsByTagName ('p');
		while (cases[c].innerHTML =="") c++;
		for (var d=0; d< this.days.length; d++){
			while (cases[c].innerHTML < this.days[d].id) c++;
			if (cases[c].innerHTML == this.days[d].id){
				cases[c].className = 'full';
				cases[c].setAttribute ('day', this.days[d]);
				cases[c].setAttribute ('onClick', "openDay('" + this.name +"', '"+ encodeURI (this.days[d].toString()) +"')");
	}}}
}
function openDay (monthName, dayStr){
	dayStr = decodeURI (dayStr);
	var day = new Day();
	day.fromString (dayStr);
	day.draw (monthName);
}