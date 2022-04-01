// récupérer le fichier tsv
String.prototype.contain = function (word){
	if (this.indexOf (word) >=0) return true;
	else return false;
}
String.prototype.replace = function (wordOld, wordNew){
	if (this.indexOf (wordOld) >=0){
		if (! wordNew) wordNew ="";
		var tabText = this.split (wordOld);
		return tabText.join (wordNew);
	}
	else return this;
}
String.prototype.strip = function(){
	var toStrip = '\n \t/';
	var text ="";
	for (var l=0; l< this.length; l++) text = text + this[l];
	var i=0, j=1;
	while (toStrip.contain (text[0])) text = text.slice (1);
	while (toStrip.contain (text [text.length -1])) text = text.slice (0, text.length -1);
	return text;
}
String.prototype.cleanTsv = function(){
	var textRes = this.replace ('\r');
	textRes = textRes.strip();
	while (textRes.contain ('  ')) textRes = textRes.replace ('  ', ' ');
	textRes = textRes.replace ('\n ', '\n');
	textRes = textRes.replace (' \n', '\n');
	while (textRes.contain ('\t\t')) textRes = textRes.replace ('\t\t', '\t');
	textRes = textRes.replace ('\t\n', '\n');
	while (textRes.contain ('\n\n')) textRes = textRes.replace ('\n\n', '\n');
	textRes = textRes.strip();
	var listRes =[];
	if (textRes){
		listRes = textRes.split ('\n');
		for (var l=0; l< listRes.length; l++) listRes[l] = listRes[l].split ('\t');
	}
	return listRes;
}
function fromTsv (fileName, callback){
	var xhttp = new XMLHttpRequest();
	if (callback){
		xhttp.responseType = 'text';
		xhttp.onreadystatechange = function(){ if (xhttp.status ==0 || xhttp.status ==200) callback (this.responseText.cleanTsv()); };
		xhttp.open ('GET', fileName, true);
		xhttp.send();
	}
	else{
		xhttp.open ('GET', fileName, false);
		xhttp.send();
		console.log (xhttp);
		var listRes =[];
		if (xhttp.status ==0 || xhttp.status ==200) listRes = xhttp.responseText.cleanTsv();
		return listRes;
	}
}
// dessiner les calendriers
HTMLElement.prototype.closeCalendar = function(){
	// <button onclick='this.closeCalendar()'>X</button>
	var listEvent = this.parentElement.getElementsByTagName ('p');
	for (var e= listEvent.length -1; e>=0; e--) this.parentElement.removeChild (listEvent[e]);
	var title = this.parentElement.getElementsByTagName ('h3')[0];
	title.innerHTML ="";
}
HTMLElement.prototype.createNode = function (tag, text){
	var newElement = document.createElement (tag);
	if (text) newElement.innerHTML = text;
	this.appendChild (newElement);
	return this.children [this.children.length -1];
}
Array.prototype.pop = function (pos){ var trash = this.splice (pos, 1); }
// dessiner l'agenda
var stylePage = document.head.getElementsByTagName ('style')[0];
if (! stylePage || stylePage == undefined) stylePage = document.head.createNode ('style', "");

const templateAgendaCss =`
agenda {
	display: grid;
	grid-template-columns: 8em 4em 1fr;
}
agenda.day { grid-template-columns: 4em 1fr; }
agenda h3 {
	grid-column-start: 1;
	grid-column-end: 4;
}
agenda.day h3 { grid-column-end: 3; }
`;
const templateAgendaHtml = '<agenda><h3></h3></agenda>';

class EventGroup{
	constructor (year, month, day){
		this.events =[];
		this.year =0;
		this.month =0;
		this.day =0;
		if (year) this.year = year;
		if (month) this.month = month;
		if (day) this.day = day;
	}
	fromDateString = function (dateString){
		dateString = dateString.replace (':', '/');
		dateString = dateString.replace (' ', '/');
		var dateTable = dateString.split ('/');
		for (var d=0; d< dateTable.length; d++) dateTable[d] = parseInt (dateTable[d]);
		this.year = dateTable[0];
		this.month = dateTable[1];
		this.day = dateTable[2];
	}
	toDateString = function(){
		var dateString = '/';
		var tmpString ="";
		if (this.day){
			tmpString = this.day.toString();
			if (tmpString.length ==1) tmpString = '0'+ tmpString;
			dateString = '/'+ tmpString;
		}
		if (this.month){
			tmpString = this.month.toString();
			if (tmpString.length ==1) tmpString = '0'+ tmpString;
			dateString = '/'+ tmpString + dateString;
		}
		if (this.year){
			tmpString = this.year.toString();
			dateString = tmpString + dateString;
		}
		return dateString;
	}
	fromEvents = function (events){
		var dateString = this.toDateString();
		for (var e= events.length -1; e>=0; e--) if (events[e][0].contain (dateString)){
			this.events.push (events[e]);
			events.pop (e);
		}
		return events;
	}
	draw = function (events, container){
		var tagList =[];
		stylePage.innerHTML = stylePage.innerHTML + templateAgendaCss;
		if (container){
			container.innerHTML = container.innerHTML + templateAgendaHtml;
			tagList = container.getElementsByTagName ('agenda');
		}else{
			document.body.innerHTML = document.body.innerHTML + templateAgendaHtml;
			tagList = document.getElementsByTagName ('agenda');
		}
		var tag = tagList [tagList.length -1];
		var title = tag.getElementsByTagName ('h3')[0];
		title.innerHTML = this.toDateString();
		if (this.day){
			tag.className = 'day';
			for (var e=0; e< this.events.length; e++){
				tag.createNode ('p', this.events[e][1]);
				tag.createNode ('p', this.events[e][2]);
		}}
		else for (var e=0; e< this.events.length; e++){
			tag.createNode ('p', this.events[e][0]);
			tag.createNode ('p', this.events[e][1]);
			tag.createNode ('p', this.events[e][2]);
	}}
}
function drawAgenda (eventList){
	while (eventList.length >0){
		var groupEvent = new EventGroup (2022, 0, 0);
		groupEvent.fromDateString (eventList[0][0]);
		eventList = groupEvent.fromEvents (eventList);
		groupEvent.draw();
}}