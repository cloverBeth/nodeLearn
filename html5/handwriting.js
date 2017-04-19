var canvasWidth=800;
var canvasHegiht=canvasWidth;

var canvas=document.getElementById("canvas");
var context=canvas.getContext('2d');

canvas.width=canvasWidth;
canvas.height=canvasHegiht;

context.beginPath();
context.moveTo(3,3);
context.lineTo(canvasWidth-3,3);
context.lineTo(canvasWidth-3,canvasHegiht-3);
context.lineTo(3,canvasHegiht-3);
context.closePath();

context.lineWidth=6;
context.lineColor="#ff0000";
context.stroke();
