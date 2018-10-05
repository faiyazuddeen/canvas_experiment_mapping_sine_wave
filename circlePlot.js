(function(){var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    centerX = -width / 4,
    centerY = 0,
    radius = 175,
    angle = 0,
    x, y;
    context.translate(width / 2, height / 2);
    context.scale(1, -1);
    context.font = "20px Georgia";
    context.lineWidth = 5;

     window.onRadiusChange = function() {
        radius = document.getElementById("Radius").value;
        drawCircle();
    }
    function clearAll() {
        context.clearRect(0, 0, width, height);
        context.clearRect(0, 0, -width, -height);
        context.clearRect(0, 0, -width, height);
        context.clearRect(0, 0, width, -height);
    }
    function drawCircle() {
        context.save();
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        context.strokeStyle = "red";
        context.stroke();
        context.closePath();
        context.restore();
    }
    function drawAngleArc() {
        context.save();
        context.beginPath();
        context.arc(centerX, centerY, 25, 0, angle);
        context.strokeStyle = "#0000FF";
        context.lineWidth = 10;
        context.stroke();
        context.closePath();
        context.restore();
    }

    function drawRotatingCircle() {
        context.beginPath();
        context.arc(x, y, 7, 0, Math.PI * 2, false);
        context.fillStyle = "black";
        context.fill();
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.lineTo(x, y);
        context.strokeStyle="#336633";
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.lineTo(centerX+radius, centerY);
        context.strokeStyle="#336633";
        context.stroke();
        context.closePath();
    }
    function connectPlots(){
        var connectPoints = drawGraph();
        context.save();
        context.beginPath();
        context.moveTo(x,y);
        context.lineTo(connectPoints.x,connectPoints.y);
        context.strokeStyle = "coral";
        context.stroke();
        context.closePath();
        context.restore();
    }
    function run() {
        clearAll();
        drawCircle();
        drawAngleArc();
        drawRotatingCircle();
        drawGraph();
        connectPlots();
        x = centerX + Math.cos(angle) * radius;
        y = centerY + Math.sin(angle) * radius;
        if (angle < 2 * Math.PI) {
            angle += Math.PI / 36;
        }
        if (angle > 2 * Math.PI) {
            angle = 0;
        }
        if (angle == 2 * Math.PI) {
            angle = 2 * Math.PI;
        }


    }

    function drawGraph() {
        var degrees = angle * 180 / Math.PI;
        context.beginPath();
        context.save();
        var amplitude = 100;
        context.moveTo(0, 0);
        for (var i = 0; i < degrees; i++) {
            var xSin = i;
            var ySin = Math.sin(i * Math.PI / 180) * amplitude;
            context.lineTo(xSin, ySin);
        }
        context.strokeStyle="magenta";
        context.stroke();
        context.closePath();
        context.restore();
        return {x:xSin,y:ySin};
    }
    drawCircle();
    setInterval(run, 100);
})();
