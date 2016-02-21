var	petName,
	petWidth = 10,
	petKorm,
	week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
	day = 0,
	max = false,
	maxDay,
	iDay = 0,
	myLineChart1,
	myLineChart2,
	myBarChart;

var animation = function (elem, style, value, time, fun) {

	var s = new Date().getTime() , ss = parseInt(window.getComputedStyle(elem, null)[style]);

	(function frame() {

		var c = new Date().getTime(), progress = (c-s)/time, val;

		if (progress>1) progress = 1;

		val = ss + (value-ss)*progress;
		elem.style[style] = val;

		if (progress !== 1)
			setTimeout(frame, 30);
		else
			if (fun !== undefined) {
				fun();
			}

	})();

};


var getXmlHttp = function(){
	
	var xmlhttp;
	
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
	
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			xmlhttp = false;
		}
	
	}
	
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	
	return xmlhttp;

};
	
var send = function (index, fun) {

	var url = "/php/server.php";
	var params = "index="+index;
	var http = getXmlHttp();

	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");

	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			console.log('good', http.responseText);
		if (fun !== undefined)
			fun(JSON.parse(http.responseText));
		}
	};

	http.send(params);
};

///// resizable
Chart.defaults.global.responsive = true;
Chart.defaults.global.scaleIntegersOnly = false,


document.addEventListener('DOMContentLoaded', function () {

	var page1, page2, page3, set1, inp1, k1, k2, header, c1, more, index = false, timeout = true;

	if (window.matchMedia("screen and (max-device-width: 500px)").matches) {
			
		maxDay = 3;
			
	}
	else
		maxDay = 7;

	var page1Event = function () {

		if (inp1.value === '') {
			inp1.style.border = '1px solid red';
		}
		else {
			petName = inp1.value;
			animation(page1, 'opacity', 0, 250, function () {
				page1.style.display = 'none';
				page3.style.display = 'block';
				var myRadarChart1 = new Chart(rctx1).Radar(rdata1, roptions);
				var myRadarChart2 = new Chart(rctx2).Radar(rdata2, roptions);
				animation(page3, 'opacity', 1, 250);
			});
		}

	};

	var page2Event = function () {

		if (this.id === 'k1') {
			// inp1.style.border = '1px solid red';
			petKorm = 0;
		}
		else if (this.id === 'k2'){
			petKorm = 1;
		}



		animation(page3, 'opacity', 0, 250, function () {
			page3.style.display = 'none';
			page2.style.display = 'block';
			myLineChart1 = new Chart(ctx1).Line(data1, options);
			myLineChart2 = new Chart(ctx2).Line(data2, options);
			myBarChart = new Chart(btx).Bar(bdata, boptions);
			animation(page2, 'opacity', 1, 250, function() {

			});
		});

		timeout = setTimeout(function test() {

			// myLineChart1.datasets[1].points[6].value = 50;
			// myLineChart1.addData([40], "Monday");
			// myLineChart1.removeData( );

			// canvas1.width = 500;
			// canvas1.style.width = '500px';
			// myLineChart1.draw();
			// myLineChart1.resize();
			// myLineChart1.update();

			send(petKorm, function(obj) {

				if (max) {
					myLineChart1.removeData( );
					myLineChart2.removeData( );
					myBarChart .removeData( );
				}

				if (obj.feel===0) alert('animal bad lead him to the vet');

				console.log(obj.feel, obj.eat, [obj.bar.p, obj.bar.f, obj.bar.c], week[day]);
				myLineChart1.addData([obj.feel.toFixed(1)], week[day]);
				myLineChart2.addData([obj.eat], week[day]);
				myBarChart.addData([obj.bar.p, obj.bar.f, obj.bar.c], week[day]);
				
				day++;
				if (day === 7) {
					day = 0;
				}

				iDay++;
				if (iDay === maxDay) {
					iDay = 0;
					max = true;
				}

				timeout = setTimeout(test, 5000);

			});

			// setTimeout(test, 1000);

		}, 1000);

	};

	page1 = document.querySelector('#page1');
	set1= document.querySelector('#page1 span');
	inp1 = document.querySelector('#page1 input');
	page2 = document.querySelector('#page2');
	k1 = document.querySelector('#k1');
	k2 = document.querySelector('#k2');
	page3 = document.querySelector('#page3');
	header = document.querySelector('#header');
	c1 = document.querySelector('#c1');
	more = document.querySelector('#more');

	var line1 = document.querySelector('#c1');
	var line2 = document.querySelector('#c2');
	var radar1 = document.querySelector('#k1');
	var radar2 = document.querySelector('#k2');
	var bar = document.querySelector('#b');
	var ctx1 = line1.getContext("2d");
	var ctx2 = line2.getContext("2d");

	var rctx1 = radar1.getContext("2d");
	var rctx2 = radar2.getContext("2d");

	var btx = bar.getContext("2d");

	if (window.matchMedia("screen and (max-device-width: 500px)").matches) {
			
		line1.width = 300;
		line2.width = 300;
		bar.width = 300;
			
		ctx1.canvas.width = 400;
		ctx1.canvas.height = 200;
		
		ctx2.canvas.width = 400;
		ctx2.canvas.height = 200;
		
		rctx1.canvas.width = 280;
		rctx1.canvas.height = 200;
		
		rctx2.canvas.width = 280;
		rctx2.canvas.height = 200;
		
		btx.canvas.width = 400;
		btx.canvas.height = 200;

	}
	else {
		ctx1.canvas.width = 1000;
		ctx1.canvas.height = 200;
	
		ctx2.canvas.width = 1000;
		ctx2.canvas.height = 200;
	
		rctx1.canvas.width = 480;
		rctx1.canvas.height = 200;
	
		rctx2.canvas.width = 480;
		rctx2.canvas.height = 200;
	
		btx.canvas.width = 1000;
		btx.canvas.height = 200;
	}


	//////////// data radar
	var rdata1 = {
		labels: ["proteins", "fats", "carbohydrates"],
		datasets: [
			{
				label: "My First dataset",
				fillColor: "rgba(48,213,200,0.2)",
				strokeColor: "rgba(48,213,200,1)",
				pointColor: "rgba(48,213,200,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(48,213,200,1)",
				data: [46, 23, 10]
			},
		]
	};
	var rdata2 = {
		labels: ["proteins", "fats", "carbohydrates"],
		datasets: [
			{
				label: "My Second dataset",
				fillColor: "rgba(0, 127, 255,0.2)",
				strokeColor: "rgba(0, 127, 255,1)",
				pointColor: "rgba(0, 127, 255,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(0, 127, 255,1)",
				data: [26, 12, 42]
			}
		]
	};
	var roptions = {

		scaleShowLine : false,
		angleShowLineOut : true,
		scaleShowLabels : false,
		scaleBeginAtZero : true,
		angleLineColor : "rgba(0,0,0,.1)",
		angleLineWidth : 1,
		pointLabelFontFamily : "'Arial'",
		pointLabelFontStyle : "normal",
		pointLabelFontSize : 10,
		pointLabelFontColor : "#666",
		pointDot : true,
		pointDotRadius : 3,
		pointDotStrokeWidth : 1,
		pointHitDetectionRadius : 20,
		datasetStroke : true,
		datasetStrokeWidth : 2,
		datasetFill : true,
		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
	};

	////// data line
	var data1 = {
		labels: [],
		datasets: [
			{
				label: "First week",
				fillColor: "rgba(48,213,200,0.2)",
				strokeColor: "rgba(48,213,200,1)",
				pointColor: "rgba(48,213,200,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(48,213,200,1)",
				// data: [65, 59, 80, 81, 56] 
				data: []
			},
		]
	};
	var data2 = {
		labels: [],
		datasets: [
			{
				label: "Second week",
				fillColor: "rgba(0, 127, 255,0.2)",
				strokeColor: "rgba(0, 127, 255,1)",
				pointColor: "rgba(0, 127, 255,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(0, 127, 255,1)",
				data: [] 
				// data: [28, 48, 40, 19, 86, 27, 90]
			}
		]
	};
	var options = {

		scaleShowGridLines : true,
		scaleGridLineColor : "rgba(0,0,0,.05)",
		scaleGridLineWidth : 1,
		scaleShowHorizontalLines: false,
		scaleShowVerticalLines: true,
		bezierCurve : true,
		bezierCurveTension : 0.4,
		pointDot : true,
		pointDotRadius : 4,
		pointDotStrokeWidth : 1,
		pointHitDetectionRadius : 20,
		datasetStroke : true,
		datasetStrokeWidth : 2,
		datasetFill : true,
		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
	};


	//////// data bar
	var bdata = {
		labels: [],
		datasets: [
			{
				label: "proteins",
				fillColor: "rgba(48,213,200,0.5)",
				strokeColor: "rgba(48,213,200,0.8)",
				highlightFill: "rgba(48,213,200,0.75)",
				highlightStroke: "rgba(48,213,200,1)",
				data: []
			},
			{
				label: "fats",
				fillColor: "rgba(0, 127, 255,0.5)",
				strokeColor: "rgba(0, 127, 255,0.8)",
				highlightFill: "rgba(0, 127, 255,0.75)",
				highlightStroke: "rgba(151,187,205,1)",
				data: []
			},
			{
				label: "carbohydrates",
				fillColor: "rgba(151,187,205,0.5)",
				strokeColor: "rgba(151,187,205,0.8)",
				highlightFill: "rgba(151,187,205,0.75)",
				highlightStroke: "rgba(151,187,205,1)",
				data: []
			}
		]
	};

	var boptions = {
		scaleBeginAtZero : true,
		scaleShowGridLines : true,
		scaleGridLineColor : "rgba(0,0,0,.05)",
		scaleGridLineWidth : 1,
		scaleShowHorizontalLines: false,
		scaleShowVerticalLines: true,
		barShowStroke : true,
		barStrokeWidth : 2,
		barValueSpacing : 5,
		barDatasetSpacing : 1,
		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
	};

	set1.addEventListener('click', page1Event, false);

	inp1.addEventListener('input', function () {
		if (inp1.value === '') {
			inp1.style.border = '1px solid red';
		}
		else {
			inp1.style.border = '0px solid red';
		}
	});

	inp1.addEventListener('change', page1Event);

	k1.addEventListener('click',  page2Event, false);
	k2.addEventListener('click',  page2Event, false);

	// more.style.display = 'none';
	c1.addEventListener('click', function () {

		if (index) {
			index = false;
			animation(more, 'opacity', 0, 250, function () {
				more.style.display = 'none';
			});
		}
		else {
			index = true;
			more.style.display = 'block';
			animation(more, 'opacity', 1, 250);
		}

	}, false);

	animation(page1, 'opacity', 1, 250);


	
});