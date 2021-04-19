/* pas de alert
*/
console.log (
	'host:\t', window.location.hostname,
	'\npath:\t', window.location.pathname,
	'\nhash:\t', window.location.hash,
	'\nquery:\t', window.location.search
);
document.head.innerHTML ="";
document.body.style.border = "5px solid green";
document.body.style.backgroundColor = "pink";
document.body.innerHTML = '<h1>nouveau titre !</h1>' + document.body.innerHTML;
