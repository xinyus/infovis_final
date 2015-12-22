d3.json("us.json", function(error, us) {
  if (error) throw error;

  d3.json("pollution_data.json", function(error, pollutant) {
    if (error) throw error;

    d3.csv("pollution_data_monthly.csv", function(error, heatData) {
      if (error) throw error;

      d3.json("pollution_data.json", function(error, data){
        if (error) throw error;

      //scroll sticky selector
      var sliderScrollH = $( '#slider' ).position().top;
        $(window).bind('scroll', function() {
          var sliderHeight = sliderScrollH - 53;
               if ($(window).scrollTop() > sliderHeight) {
                   $('#slider').addClass('fixed');
               }
               else {
                   $('#slider').removeClass('fixed');
               }
        });

        var selectedYear = 2005;
        var selectedState = 60;
        var pollu_selected = 'co';
        states = {"0": "U.S.", "1":"Alabama", "2":"Alaska", "4":"Arizona", "5":"Arkansas", "6":"California", "8":"Colorado", "9":"Connecticut", "10":"Delaware", "11":"District of Columbia", "12":"Florida", "13":"Georgia", "15":"Hawaii", "16":"Idaho", "17":"Illinois", "18":"Indiana", "19":"Iowa", "20":"Kansas", "21":"Kentucky", "22":"Louisiana", "23":"Maine", "24":"Maryland", "25":"Massachusetts", "26":"Michigan", "27":"Minnesota", "28":"Mississippi", "29":"Missouri", "30":"Montana", "31":"Nebraska", "32":"Nevada", "33":"New Hampshire", "34":"New Jersey", "35":"New Mexico", "36":"New York", "37":"North Carolina", "38":"North Dakota", "39":"Ohio", "40":"Oklahoma", "41":"Oregon", "42":"Pennsylvania", "44":"Rhode Island", "45":"South Carolina", "46":"South Dakota", "47":"Tennessee", "48":"Texas", "49":"Utah", "50":"Vermont", "51":"Virginia", "53":"Washington", "54":"West Virginia", "55":"Wisconsin", "56":"Wyoming"};

        function getStateName(stateCode){
        	return states[stateCode];
        }

        d3.select("#states").on("input", function() {
            stateCode = $( "#states" ).val();
            selectedState = stateCode;

            updateLineChart(parseInt(this.value));
            if (selectedState === '0') {
              selectedState = '60';
            }
            heatUpdate(selectedYear, selectedState);
        });
        function updateLineChart(stateCode) {
            if (stateCode === 60) {
              stateCode = 0;
            }
            $( "#states" ).val(stateCode);
            stateName = getStateName(stateCode);
            $("#state_tag").html(getStateName(stateCode));
          	$('.linegraph_title').html(getStateName(stateCode));

            d3.select('#chart1').select('svg').remove();
            var co=[],
            no2=[],
            ozone=[],
            pm25=[],
            so2=[],
            pm10=[];
            //Calculate national average
            function calcAve(paraName, year){
                var sum = 0;
                var count = 0;
                $.each(data[year], function(key, value){
                    if(key+1>count){
                        count = key+1;
                    }
                    switch(paraName){
                        case "co":
                            sum += Number(value.pollutant.co);
                            break;
                        case "no2":
                            sum += Number(value.pollutant.no2);
                            break;
                        case "ozone":
                            sum += Number(value.pollutant.ozone);
                            break;
                        case "pm25":
                            sum += Number(value.pollutant.pm25);
                            break;
                        case "pm10":
                            sum += Number(value.pollutant.pm10);
                            break;
                        case "so2":
                            sum += Number(value.pollutant.so2);
                            break;
                    }
                });
                return sum/count;
            }
            //Wrap data
            function pollutants(){
                return [
                    {
                        values:co,
                        key:"CO",
                        color:"#54d3bd"
                    },
                    {
                        values:no2,
                        key:"NO2",
                        color:"#699eff"
                    },
                    {
                        values:ozone,
                        key:"Ozone",
                        color:"#d369ff"
                    },
                    {
                        values:pm25,
                        key:"PM2.5",
                        color:"#ff7369"
                    },
                    {
                        values:pm10,
                        key:"PM10",
                        color:"#ffb369"
                    },
                    {
                        values:so2,
                        key:"SO2",
                        color:"#7eae94"
                    }
                ];
            }
            //calculate percentage
            function calcRatio(paraName, paraValue){
                switch (paraName){
                    case "co":
                        return(paraValue-9)/9;
                    case "no2":
                        return(paraValue-53)/53;
                    case "so2":
                        return(paraValue-75)/75;
                    case "ozone":
                        return(paraValue-0.075)/0.075;
                    case "pm25":
                        return(paraValue-35)/35;
                    case "pm10":
                        return(paraValue-150)/150;
                }
            }

            if (stateCode === 0){
                for(i=2005; i<= 2014; i++) {
                    co.push({x:i, y: calcAve("co", i)});
                    no2.push({x:i, y: calcAve("no2", i)});
                    ozone.push({x:i, y: calcAve("ozone", i)});
                    pm25.push({x:i, y: calcAve("pm25", i)});
                    pm10.push({x:i, y: calcAve("pm10", i)});
                    so2.push({x:i, y: calcAve("so2", i)});
                }
            } else {
                for(i=2005; i<= 2014; i++) {
                    co.push({x:i, y: data[i][stateCode].pollutant.co});
                    ozone.push({x:i, y: data[i][stateCode].pollutant.ozone});
                    no2.push({x:i, y: data[i][stateCode].pollutant.no2});
                    pm25.push({x:i, y: data[i][stateCode].pollutant.pm25});
                    pm10.push({x:i, y: data[i][stateCode].pollutant.pm10});
                    so2.push({x:i, y: data[i][stateCode].pollutant.so2});
                }
            }

            //Draw chart
            var chart;
            nv.addGraph(function() {
                chart = nv.models.lineChart()
                    .options({
                        transitionDuration: 300,
                        useInteractiveGuideline: true
                    })
                ;
                chart.yAxis
                    .axisLabel('Ratio to National Standard')
                    .tickFormat(d3.format('%'));

                var svg = d3.select('#chart1').append('svg')
                    .datum(pollutants())
                    .call(chart);
                nv.utils.windowResize(chart.update);
                return chart;
            });//add chart callback ends
            // Update the SVG with the new data and call chart
        }

        updateLineChart(selectedState);

        $('input[name="pollutant"]:radio').on('click', function() {
          pollu_selected = $(this).val();
          update(selectedYear);
        });

        var width = 960,
            height = 500,
            centered;

        var arrPollutant = ["CO", "NO\u2082", "O\u2083", "PM\u2081\u2080", "PM\u2082.\u2085", "SO\u2082"];
        var arrMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var tooltipPollutant = {"co": "CO", "no2": "NO\u2082", "ozone": "O\u2083", "pm10": "PM\u2081\u2080", "pm25": "PM\u2082.\u2085", "so2": "SO\u2082"};

        var projection = d3.geo.albersUsa()
            .scale(1070)
            .translate([width / 2, height / 2]);

        var path = d3.geo.path()
            .projection(projection);

        var svg = d3.select("#map").append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("fill", 'white');

        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .on("click", clicked);

        var g = svg.append("g");

        var margin = { top: 70, right: 0, bottom: 100, left: 30 },
                 heatWidth = 650 - margin.left - margin.right,
                 heatHeight = 450 - margin.top - margin.bottom,
                 gridSize = Math.floor(heatWidth / 12),
                 legendElementWidth = gridSize;

        var heatX = d3.time.scale().range([0, heatWidth]),
            heatY = d3.scale.linear().range([heatHeight, 0]);

        var heatgrid = d3.select("#heatgrid").append("svg")
            .attr("width", heatWidth + margin.left + margin.right)
            .attr("height", heatHeight + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

        var color = ['#62b08d', '#F6F7B9', '#d6616b', 'black'];
        var colorId = [-1, -0.75, -0.5, -0.25, 0, 0.25, 1, 2];
        colorMap = d3.scale.linear()
                     .domain([-1, -0.5, 0.5, 10])
                     .range(color);

        var legend = svg.selectAll(".legend")
              .data([].concat(colorId), function(d) { return d; });

        legend.enter().append("g")
            .attr("class", "legend");

        legend.append("rect")
          .attr("x", function(d, i) { return width * 0.45 + legendElementWidth * i; })
          .attr("y", 0)
          .attr("width", legendElementWidth)
          .attr("height", gridSize / 4)
          .style("fill", function(d) { return colorMap(d); });

        legend.append("text")
          .attr("class", "mono")
          .text(function(d) { return d; })
          .attr("x", function(d, i) { return width * 0.45 + legendElementWidth * i; })
          .attr("y", gridSize/2)
          .style("fill", "black");

        legend.exit().remove();

        var colorIdHeat = [-1, -0.5, 0, 0.5, 1, 5, 10];

        var legendHeat = heatgrid.selectAll(".legend")
              .data([].concat(colorIdHeat), function(d) { return d; });

        legendHeat.enter().append("g")
            .attr("class", "legend");

        legendHeat.append("rect")
          .attr("x", function(d, i) { return heatWidth * 0.41 + legendElementWidth * i; })
          .attr("y", -65)
          .attr("width", legendElementWidth)
          .attr("height", gridSize / 4)
          .style("fill", function(d) { return colorMap(d); });

        legendHeat.append("text")
          .attr("class", "mono")
          .text(function(d) { return d; })
          .attr("x", function(d, i) { return heatWidth * 0.41 + legendElementWidth * i; })
          .attr("y", -40)
          .style("fill", "black");

        legendHeat.exit().remove();

        d3.select("#timeSlider").on("input", function() {
          update(parseInt(this.value));
        });

        function update(year) {
          colorMap = d3.scale.linear()
                     .domain([-1, -0.5, 0.5, 10])
                    .range(['#62b08d', '#F6F7B9','#d6616b', 'black']);

          g.selectAll("g").remove();

          var div = d3.select("#map").append("div")
              .attr("class", "tooltip")
              .style("display", "none");

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
              .on("click", clicked)
              .on("mouseover", mouseover)
              .on("mousemove", function(d){ return mousemove(d); })
              .on("mouseout", mouseout);

          function mouseover() {
            div.style("display", "inline");
          }

          function mousemove(d) {
            div
                .html('<p class="state-name">' + states[d.id.toString()] + '<\p><p>' + tooltipPollutant[pollu_selected] + "  =  " + pollutant[selectedYear][d.id.toString()].pollutant[pollu_selected] + "</p>")
                .style("left", String(d3.event.pageX - 34) + "px")
                .style("top", String(d3.event.pageY - 1310) + "px");
          }

          function mouseout() {
            div.style("display", "none");
          }

          d3.select("#timeSlider").property("value", year);
          selectedYear = year;
          heatUpdate(selectedYear, selectedState);

        }

        update(2005);

        function heatUpdate(heatYear, heatStateId){
          heatgrid.selectAll(".tile").remove();

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
          $('.heatgrid_year').html(selectedYear);
        }

        heatUpdate(2005,60);

        function clicked(d) {

          if (d && centered !== d) {
            centered = d;
            selectedState = d.id;
            updateLineChart(selectedState);
            heatUpdate(selectedYear, selectedState);
          } else {
            centered = null;
            updateLineChart(60);
            heatUpdate(selectedYear, 60);
          }

          g.selectAll("path")
              .classed("state-borders", centered && function(d) { return d === centered; });
        }
      });
    });
  });
});
