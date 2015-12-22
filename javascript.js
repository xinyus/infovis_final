


    
    var yearSelected = 2010;

    function refresh(){

    }


$(document).ready(function(){  


states = {"1":"Alabama", "2":"Alaska", "4":"Arizona", "5":"Arkansas", "6":"alifornia", "8":"Colorado", "9":"Connecticut", "10":"Delaware", "11":"District of Columbia", "12":"Florida", "13":"Georgia", "15":"Hawaii", "16":"Idaho", "17":"Illinois", "18":"Indiana", "19":"Iowa", "20":"Kansas", "21":"Kentucky", "22":"Louisiana", "23":"Maine", "24":"Maryland", "25":"Massachusetts", "26":"Michigan", "27":"Minnesota", "28":"Mississippi", "29":"Missouri", "30":"Montana", "31":"Nebraska", "32":"Nevada", "33":"New Hampshire", "34":"New Jersey", "35":"New Mexico", "36":"New York", "37":"North Carolina", "38":"North Dakota", "39":"Ohio", "40":"Oklahoma", "41":"Oregon", "42":"Pennsylvania", "44":"Rhode Island", "45":"South Carolina", "46":"South Dakota", "47":"Tennessee", "48":"Texas", "49":"Utah", "50":"Vermont", "51":"Virginia", "53":"Washington", "54":"West Virginia", "55":"Wisconsin", "56":"Wyoming"};
// console.log(states[1]);
// console.log(getStateName(1));

    $("#states").change(function(){
    	stateCode = $( "#states" ).val();
    	stateName = getStateName(stateCode);
    	console.log(stateName);
    	$("#headline_tag").find("h1").html(getStateName(stateCode));
    	$('.linegraph_title').html(getStateName(stateCode));



    });  

    function getStateName(stateCode){
    	return states[stateCode];
    }
    // console.log(getStateName(11));
});
