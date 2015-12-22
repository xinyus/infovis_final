<!DOCTYPE html>
<html>

<?php
include("head.php");
?>

<body class="vis">
<!-- <div id="overlay" class="cover"> -->
<a id = "00"></a>
<!-- ======================================== -->
<!-- HEADER-->
<!-- ======================================== -->

<header id="main-header">
	<div class="nav_bg">
	<nav id="navigation">

	<div id="headline_tag">
		<h1>U.S. Overview</h1>
	</div>
	<div class="nav_links">
		<ul style="display:inline-block">
			<li><a
			 href="#">Select State</a></li>

			 <select id="states" name="states" class="select-style">
<option value="0">U.S.</option>
<option value="1">Alabama</option>
<option value="2">Alaska</option>
<option value="4">Arizona</option>
<option value="5">Arkansas</option>
<option value="6">California</option>
<option value="8">Colorado</option>
<option value="9">Connecticut</option>
<option value="10">Delaware</option>
<option value="11">District of Columbia</option>
<option value="12">Florida</option>
<option value="13">Georgia</option>
<option value="15">Hawaii</option>
<option value="16">Idaho</option>
<option value="17">Illinois</option>
<option value="18">Indiana</option>
<option value="19">Iowa</option>
<option value="20">Kansas</option>
<option value="21">Kentucky</option>
<option value="22">Louisiana</option>
<option value="23">Maine</option>
<option value="24">Maryland</option>
<option value="25">Massachusetts</option>
<option value="26">Michigan</option>
<option value="27">Minnesota</option>
<option value="28">Mississippi</option>
<option value="29">Missouri</option>
<option value="30">Montana</option>
<option value="31">Nebraska</option>
<option value="32">Nevada</option>
<option value="33">New Hampshire</option>
<option value="34">New Jersey</option>
<option value="35">New Mexico</option>
<option value="36">New York</option>
<option value="37">North Carolina</option>
<option value="38">North Dakota</option>
<option value="39">Ohio</option>
<option value="40">Oklahoma</option>
<option value="41">Oregon</option>
<option value="42">Pennsylvania</option>
<option value="44">Rhode Island</option>
<option value="45">South Carolina</option>
<option value="46">South Dakota</option>
<option value="47">Tennessee</option>
<option value="48">Texas</option>
<option value="49">Utah</option>
<option value="50">Vermont</option>
<option value="51">Virginia</option>
<option value="53">Washington</option>
<option value="54">West Virginia</option>
<option value="55">Wisconsin</option>
<option value="56">Wyoming</option>
</select>
<!-- 			<li><a
			 href="#overview">Overview</a></li>
			<li><a 
			href="#region">Regional</a></li>
			<li><a
			href="#season">Seasonal</a></li> -->
			<!-- <li><a
			 class="contact_link" style="cursor: pointer" href="#">Contact</a></li>
		 -->
		</ul>
	</div>
	</nav>
	</div>
</header>

<!-- ======================================== -->
<!-- contents-->
<!-- ======================================== -->

<div id="contents" class="text-center">

<div id= "vis_display">
<div style="z-index: -999; position: fixed; top: 0"></div>
	<div class="welcome">
	<h1 class="homequote" style="color: #00c989;">Visualizing Air Quality in U.S.</h1>
	<p class="caption" style = "color: #a0a0a0; font-size: 1.5em" >Xinyu Sheng, Weikai Zhang, Mengtian Zhang</p>
	
	</div>
</div>


<!-- ======================================== -->
<!-- CHART 1-->
<!-- ======================================== -->
<section id="overview">
<div class="content-container">

<div class="content-container">
	<h2>Pollutants: <strong class="linegraph_title">U.S. Overview</strong></h2>
	<div id="chart1" style="margin:0 auto; width:75%"></div>
	<!-- <img src="img/01.png" style="width:80%"/> -->
</div>
<div class="main_text" style="width: 70%; margin: 0 auto 1.5em">
	<p>&nbsp;&nbsp;&nbsp;&nbsp;
	<strong>Cras mattis consectetur</strong>  purus sit amet fermentum. Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit sit amet non magna.

	<p style="margin-top: 1em">
	Maecenas sed diam eget risus varius blandit sit amet non magna. Donec sed odio dui. <a class="in-text_link" href="#">Cras mattis</a> consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

	</p>
</div>



</div>
</section>






<section id="region">
<!-- <div style="z-index: 0; background: url('img/Grass_dim.jpg') no-repeat; background-position: top center; width: 0; height: 0;background-size: cover; -moz-background-size: cover; -webkit-background-size: cover; -o-background-size: cover; top: 0"></div> -->
<div class="content-container" >
<h1 style="margin-top: 0; margin-bottom: 0.5em">Regional Destribution</h1>

<div class="intro"  style="margin: 0 auto 1.5em; ">

</div>
<img src="img/02.png" / style="width:75%">

	<div class="main_text" style="width: 70%; margin: 0 auto 1.5em">
<p>
Cras mattis consectetur purus sit amet fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod. Donec id elit non mi porta gravida at eget metus.
</p>
	</div>





</div>
</section> 





<section id="season">
<div class="content-container" style="width: 90%;">

<!-- <h1 style="margin-top: 0; margin-bottom: 1em">Criteria</h1> -->


<h1 style = "margin-bottom: 1em">Seasonal Change</h1>
<div class = "one_third" style="margin-left:5em">


	<div class="main_text">
<p>
Curabitur blandit tempus porttitor. Donec ullamcorper nulla non metus auctor fringilla. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Etiam porta sem malesuada magna mollis euismod.
</p>
	</div>
</div>
<div class="two_third">
	<img src="img/03.jpg" style="width:90%; right:-100">
</div>

 </div>
</section> 








<section id="ending">
<div class="content-container">

<!-- <div class="button crystle end_button" ><a href="work.php"><p>Back to Portfolio</p></a></div>
<div class="button crystle end_button"><a href="project_seed.php"><p>Next Project</p></a></div> -->
</div>
</section>


<a href = "#00">
	<div class = "to-top fade-element">
	<p>top</p>
	</div>
</a>





</div>
</div><!-- blur-in, overlay -->







</body>
</html>