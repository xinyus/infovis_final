// function drawLineGraph(stateCode){


        //standard=[];

    $.getJSON("pollution_data.json", function(data){

        d3.select("#states").on("input", function() {
            updateLineChart(parseInt(this.value));
        });

        function updateLineChart(stateCode) {
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
                        //console.log(key, value.pollutant.co);
                        break;
                    case "no2":
                        sum += Number(value.pollutant.no2);
                        //console.log(key, value.pollutant.no2);
                        break;
                    case "ozone":
                        sum += Number(value.pollutant.ozone);
                        //console.log(key, value.pollutant.ozone);
                        break;
                    case "pm25":
                        sum += Number(value.pollutant.pm25);
                        //console.log(key, value.pollutant.pm25);
                        break;
                    case "pm10":
                        sum += Number(value.pollutant.pm10);
                        //console.log(key, value.pollutant.pm10);
                        break;
                    case "so2":
                        sum += Number(value.pollutant.so2);
                        //console.log(key, value.pollutant.so2);
                        break;
                }
            });
            return sum/count;
        }

        //Wrap data
        function pollutants(){
            return[
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
                //console.log(i, calcAve("co",i));
                co.push({x:i, y: calcAve("co", i)});
                no2.push({x:i, y: calcAve("no2", i)});
                ozone.push({x:i, y: calcAve("ozone", i)});
                pm25.push({x:i, y: calcAve("pm25", i)});
                pm10.push({x:i, y: calcAve("pm10", i)});
                so2.push({x:i, y: calcAve("so2", i)});
            }
        } else {
            for(i=2005; i<= 2014; i++) {
                //standard.push({x:i, y:0});
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

            // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
            // chart.xAxis
                //.axisLabel("Year")
                // .tickFormat(d3.format(',.1f'))
                // .staggerLabels(true)
            // ;

            chart.yAxis
                .axisLabel('Ratio to National Standard')
                .tickFormat(d3.format('%'));

            var svg = d3.select('#chart1').append('svg')
                .datum(pollutants())
                .call(chart);

            // d3.select(".nv-legendWrap")
            //     .attr("transform", "translate(90,340)");

            nv.utils.windowResize(chart.update);

            return chart;

        });//add chart callback ends

        // console.log("update!");
        // console.log(stateCode)

    }

    updateLineChart(0);



    });//JSON ends


// }
