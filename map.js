var width = 960,
    height = 500,
    centered;

var arrPollutant = ["CO", "NO\u2082", "O\u2083", "PM\u2081\u2080", "PM\u2082.\u2085", "SO\u2082"];
var arrMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

var selectedYear;
var selectedState;

var projection = d3.geo.albersUsa()
    .scale(1070)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", clicked);

var g = svg.append("g");

pollu_selected = 'so2';

var margin = { top: 50, right: 0, bottom: 100, left: 50 },
         width = 650 - margin.left - margin.right,
         height = 450 - margin.top - margin.bottom,
         gridSize = Math.floor(width / 12),
         legendElementWidth = gridSize;

var heatX = d3.time.scale().range([0, width]),
    heatY = d3.scale.linear().range([height, 0]);

var heatgrid = d3.select("#heatgrid").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// for(var i = 0; i<6; i++){
//   for (var j=0; j<12; j++){
//     heatgrid.append("rect")
//             .attr("x", function(d){ return j * gridSize;})
//             .attr("y", function(d){ return i * gridSize;})
//             .attr("rx", 3)
//             .attr("ry", 3)
//             .attr("width", gridSize-3)
//             .attr("height",  gridSize-3)
//             .style("fill", "gray");
//   }
// }

for(var i=0; i<6; i++){
  heatgrid.append("text")
  .text(arrPollutant[i])
  .attr("x", 0)
  .attr("y", function (d, i) { return i * gridSize; })
  .attr("transform", "translate(-5," + (gridSize*i+30)+ ")")
  .style("text-anchor", "end");
}

for(var j=0; j<12; j++){
  heatgrid.append("text")
  .text(arrMonth[j])
  .attr("x", function (d, i) { return i * gridSize; })
  .attr("y", 0)
  .attr("transform", "translate("+ (gridSize * j + 23)+ ", -5)")
  .style("text-anchor", "middle");
}

d3.json("us.json", function(error, us) {
  if (error) throw error;

  var maxNum;
  var minNum;

  d3.json("pollution_data.json", function(error, pollutant) {
    if (error) throw error;

    d3.select("#timeSlider").on("input", function() {
      update(parseInt(this.value));
      // heatUpdate();
    });

    maxNum = pollutant.yearMax[pollu_selected];

    function update(year) {
      colorMap = d3.scale.linear()
                 .domain([-1, -0.5, 0.5, 10])
                //  .range(['#31a354', '#F6F7B9', '#d6616b']);
                .range(['#31a354', '#F6F7B9','#d6616b', 'black']);


      g.selectAll("g").remove();

      g.append("g")
          .attr("id", "states")
        .selectAll("path")
          .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
          .attr("d", path)
          .style("fill", function(d){
            if (d.id < 70) {
              return colorMap(pollutant[year][d.id.toString()].pollutant[pollu_selected]);
            }})
          .on("click", clicked);

      d3.select("#timeSlider").property("value", year);
    }

    update(2005);


    d3.csv("pollution_data_monthly.csv", function(error, heatData) {

      function heatUpdate(heatYear, heatStateId){
        heatgrid.selectAll("rect").remove();

        // if (side === 'front') {
      	// 	side = 'back';
      	// } else {
      	// 	side = 'front';
      	// }

        heatgrid.selectAll(".tile")
           .data(heatData)
           .enter().append("rect")
           .attr("class", "tile")
           .attr("id", function(d) {return 'r' + d.pollutant + 'c' + d.month;})
           .attr("x", function(d) { if ((d.year == heatYear) && (d.state == heatStateId) ) {return (d.month - 1) * gridSize; }})
           .attr("y", function(d) { if ((d.year == heatYear) && (d.state == heatStateId) ) {return (d.pollutant - 1) * gridSize; }})
           .attr("rx", 3)
           .attr("ry", 3)
           .attr("width", gridSize-3)
           .attr("height",  gridSize-3)
           .style("fill", function(d) {
             if ((d.year == heatYear) && (d.state == heatStateId) ) {
               if(d.value == -1) {
                 return 'lightgray';
               }
               return colorMap(d.value);
             }})
           .filter(function(d){return !(d.year == heatYear && d.state == heatStateId);})
           .remove();
        // flipTiles();
      }

      function flipTiles() {
        var oldSide = d3.select('#heatgrid').attr('class'),
      		newSide = '';

      	if (oldSide == 'front') {
      		newSide = 'back';
      	} else {
      		newSide = 'front';
      	}

      	var flipper = function(r, c, side) {
      		return function() {
      			var sel = '#r' + r + 'c' + c,
      				rotateY = 'rotateY(180deg)';

      			if (side === 'back') {
      				rotateY = 'rotateY(0deg)';
      			}
      			// if (browser.browser === 'Safari' || browser.browser === 'Chrome') {
      				d3.select(sel).style('-webkit-transform', rotateY);
      			// } else {
      			// 	d3.select(sel).select('.' + oldSide).classed('hidden', true);
      			// 	d3.select(sel).select('.' + newSide).classed('hidden', false);
      			// }

      		};
	       };

      	for (var c = 0; c < 13; c++) {
      		for (var r = 0; r < 6; r++) {
      			var side = d3.select('#heatgrid').attr('class');
      			setTimeout(flipper(r, c, side), (c * 20) + (r * 20) + (Math.random() * 100));
      		}
      	}
      	d3.select('#heatgrid').attr('class', newSide);
      }
      heatUpdate(2005,38);

    });
  });
});

function clicked(d) {
  console.log(d);

  if (d && centered !== d) {
    centered = d;
  } else {
    centered = null;
  }

  g.selectAll("path")
      .classed("state-borders", centered && function(d) { return d === centered; });
}
