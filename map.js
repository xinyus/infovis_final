var width = 960,
    height = 500,
    centered;

var projection = d3.geo.albersUsa()
    .scale(1070)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", clicked);

var g = svg.append("g");

pollu_selected = 'no';

d3.json("us.json", function(error, us) {
  if (error) throw error;
  
  var maxNum;
  var minNum;

  d3.json("pollution_data.json", function(error, pollutant) {
    if (error) throw error;
    
    d3.select("#timeSlider").on("input", function() {
      update(parseInt(this.value));
    });

    maxNum = pollutant.yearMax[pollu_selected];
    
    function update(year) {
      colorMap = d3.scale.linear()
                  .domain([0, maxNum])
                  .range(['white', 'black']);
      
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
