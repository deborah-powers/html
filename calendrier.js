Array.prototype.pop = function (pos){ var trash = this.splice (pos, 1); }

HTMLElement.prototype.createNode = function (tag, text, id, clazz, value){
	var newElement = document.createElement (tag);
	if (text) newElement.innerHTML = text;
	if (clazz) newElement.className = clazz;
	if (id) newElement.id = id;
	if (value) newElement.value = value;
	this.appendChild (newElement);
	return this.children [this.children.length -1];
}
function closeDay (element){
	var events = element.parentElement.getElementsByTagName ('p');
	for (var p= events.length -1; p>=0; p--) element.parentElement.removeChild (events[p]);
	element.parentElement.style.display = 'none';
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
	getById = function (id){
		if (id ==1 || id == 'lundi') return DayWeek.lundi;
		else if (id ==2 || id == 'mardi') return DayWeek.mardi;
		else if (id ==3 || id == 'mercredi') return DayWeek.mercredi;
		else if (id ==4 || id == 'jeudi') return DayWeek.jeudi;
		else if (id ==5 || id == 'vendredi') return DayWeek.vendredi;
		else if (id ==6 || id == 'samedi') return DayWeek.samedi;
		else if (id ==7 || id ==0 || id == 'dimanche') return DayWeek.dimanche;
		else return null;
	}
	static get = function (id){
		return DayWeek.lundi.getById (id);
	}
	static getFirstDayYear = function(){
		// référence: 2020 commençait un mercredi
		const refYear = 2020;
		var nbDays = DayWeek.mercredi.id;
		nbDays +=1;
		for (var y= 2021; y< calYear; y++){
			nbDays += 1;
			if (isYearBissextile (y)) nbDays +=1;
		}
		nbDays = nbDays %7;
		return DayWeek.mercredi.getById (nbDays);
	}
}
const today = new Date();
const calYear = today.getFullYear();
const calDayYear = DayWeek.getFirstDayYear();

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
		if (id==2 && isYearBissextile (calYear)) this.duration =29;
		this.dayWeek = null;
		this.getDayWeek (calDayYear);
	}
	getById = function (id){
		if (id ==1) return MonthEnum.janvier;
		else if (id ==2) return MonthEnum.fevrier;
		else if (id ==3) return MonthEnum.mars;
		else if (id ==4) return MonthEnum.avril;
		else if (id ==5) return MonthEnum.mai;
		else if (id ==6) return MonthEnum.juin;
		else if (id ==7) return MonthEnum.juillet;
		else if (id ==8) return MonthEnum.aout;
		else if (id ==9) return MonthEnum.septembre;
		else if (id ==10) return MonthEnum.octobre;
		else if (id ==11) return MonthEnum.novembre;
		else if (id ==12) return MonthEnum.decembre;
		else return null;
	}
	static get = function (id){ return MonthEnum.janvier.getById (id); }
	nbDaySinceYearStart = function(){
		var nbDays =0;
		for (var m=1; m< this.id; m++){
			var month = this.getById (m);
			nbDays += month.duration;
		}
		return nbDays;
	}
	getDayWeek = function(){
		var nbDays = this.nbDaySinceYearStart();
		nbDays += calDayYear.id;
		nbDays = nbDays %7;
		this.dayWeek = DayWeek.get (nbDays);
	}
	draw = function(){
		var calendar = document.getElementsByClassName ('month')[0];
		var titleList = calendar.getElementsByTagName ('span');
		titleList[0].innerHTML = this.name;
		titleList[1].innerHTML = calYear;
		for (var d=1; d< this.dayWeek.id; d++) calendar.createNode ('p', "");
	}
}
class Day{
	constructor (monthId, id){
		this.monthId = monthId;
		this.id = id;
		this.events =[];
		this.dayWeek = null;
	}
	draw = function(){
		this.getDayWeek();
		var day = document.getElementsByClassName ('day')[0];
		var events = day.getElementsByTagName ('p');
		for (var p= events.length -1; p>=0; p--) day.removeChild (events[p]);
		var title = day.getElementsByTagName ('span')[0];
		title.innerHTML = this.dayWeek.name +' '+ this.id +' '+ MonthEnum.get (this.monthId).name;
		day.style.display = 'block';
		for (var d=0; d<= this.events.length; d++) day.createNode ('p', this.events[d]);
	}
	getDayWeek = function(){
	//	console.log (MonthEnum.get (this.monthId).dayWeek);
		var nbDays = MonthEnum.get (this.monthId).dayWeek.id;
		nbDays += this.id -1;
		nbDays = nbDays %7;
		this.dayWeek = DayWeek.get (nbDays);
	}
	getEvents = function (eventList){
		const dayStr = this.toString();
		for (var e= eventList.length -1; e>=0; e--) if (dayStr == eventList[e][0]){
			this.events.push (eventList[e][1]);
			eventList.pop (e);
		}
	}
	toString = function(){
		var text = this.monthId +'/';
		if (this.monthId <10) text = '0'+ text;
		if (this.id <10) text = text +'0';
		text = text + this.id;
		return text;
	}
	fromString = function (text){
		var tableau = text.split ('/');
		if (tableau.length ==2){
			this.monthId = parseInt (tableau[0]);
			this.id = parseInt (tableau[1]);
		}
		else if (tableau.length ==3){
			this.monthId = parseInt (tableau[1]);
			if (tableau[0].length ==4) this.id = parseInt (tableau[2]);
			else this.id = parseInt (tableau[0]);
		}
		this.getDayWeek();
	}
}
class Month{
	constructor (month){
		this.month = month;
		this.days =[];
		for (var d=1; d<= this.month.duration; d++){
			var day = new Day (this.month.id, d);
			day.getDayWeek();
			this.days.push (day);
	}}
	get = function (id){ return this.days[id-1]; }
	getEvents = function (eventList){ for (var d=0; d< this.days.length; d++) this.days[d].getEvents (eventList); }
	draw = function(){
		this.month.draw();
		var calendar = document.getElementsByClassName ('month')[0];
		for (var d=1; d<= this.month.duration; d++){
			var button = calendar.createNode ('button', d);
			button.setAttribute ('onClick', 'openDay(' +d+ ')');
			if (this.days[d-1].events.length >0) button.className = 'full';
		}
	}
}
const calMonth = MonthEnum.get (1+ today.getMonth());
const calendar = new Month (calMonth);
function openDay (id){ calendar.get (id).draw(); }
// console.log (calMonth);

