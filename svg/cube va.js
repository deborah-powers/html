/*
script pour animer un cube en svg.
le cube à des cotés de 20 unités.

animer le toit de haut en bas

coté = 20
diag = coté * r(2)
r(2) = 1.4142135623730951 = Math.sqrt(2)
*/
const cote =20;
const diag = cote * Math.sqrt(2);

var toitPolygon = svg.getElementById ('toit');
var toitPoints = toitPolygon.getPoints();
console.log (toitPoints);






