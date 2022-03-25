function closing (element){
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
	nexDay = function (nbDays){
		nbDays = nbDays %7;
		if (nbDays ==0) return this;
		else {
			var id = this.id + nbDays;
			id = id %7;
			return this.get (id);
	}}
	lastDay = function (nbDays){
		nbDays = nbDays %7;
		if (nbDays ==0) return this;
		else {
			var id = this.id - nbDays;
			id = id %7;
			if (id <=0) id +=7;
			return this.get (id);
	}}
}