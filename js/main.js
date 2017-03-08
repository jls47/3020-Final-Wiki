
$(document).ready(function(){

//Table of contents generator
var login = false;

	var userInfo = {
        firstName: 'Jerry',
        lastName: 'Brown'
    };
	
	if(login == false){
		$(".login").css("display", "default");
		$(".user-info").css("display", "none");
	}else{
		$(".login").css("display", "none");
		$(".user-info").css("display", "default");
	};
	
	$("#Login").click(function(){
		//Fading out the login form.  Fancy!
		$("#login").fadeOut();
		//Setting the userinfo to come in right as the login form fades out.
		setTimeout(function(){$(".user-info").fadeIn();}, 400);
		//Setting the user info to the first and last name
		$(".user-fullname").replaceWith(userInfo.firstName + " " + userInfo.lastName);
		//Lastly, here's the boolean being changed.
		login = true;
		console.log(login);
	});
	
	$("#LoginD").click(function(){
		//Fading out the login form.  Fancy!
		$("#loginD").fadeOut();
		//Setting the userinfo to come in right as the login form fades out.
		setTimeout(function(){$(".user-info").fadeIn();}, 400);
		//Setting the user info to the first and last name
		$(".user-fullname").replaceWith(userInfo.firstName + " " + userInfo.lastName);
		//Lastly, here's the boolean being changed.
		login = true;
	});
	
	//The logout function!
	$("#Logout").click(function(){
		//fading out the user info and fading in the login form right after.
		$(".user-info").fadeOut();
		setTimeout(function(){$("#login").fadeIn();}, 400);
		//booleans!
		login = false;
	});

	//The logout function!
	$("#LogoutD").click(function(){
		//fading out the user info and fading in the login form right after.
		$(".user-info").fadeOut();
		setTimeout(function(){$("#loginD").fadeIn();}, 400);
		//booleans!
		login = false;
	});

	$("#expand").click(function() {
		var spanclass = $("#expand").find("span").attr("class");
		console.log(spanclass);
		if(spanclass == "glyphicon glyphicon-plus"){
			$("#expand").find("span").addClass("glyphicon-minus").removeClass("glyphicon-plus");
		}else{
			$("#expand").find("span").addClass("glyphicon-plus").removeClass("glyphicon-minus");
		}
	});
	
	var editable = false;
	
	$("button.editAll").click(function() {
		if(login == false){
			alert("You must log in before you can start editing!");
			return;
		};
		
		if($(".container").attr("contenteditable") == "true"){
			console.log($(".container").attr("contenteditable"));
			$(".container").attr("contenteditable", "false");
		}else{
			$(".container").attr("contenteditable", "true");
		};
	});
	
	console.log(window.location.href);
	
	$(".talk").click(function(e) {
		e.preventDefault();
		var href = window.location.href.toString();
		localStorage.setItem("href", href);
		document.location.href="talk.html";
	});
	
	$(".read").click(function(e) {
		e.preventDefault();
		document.location.href=localStorage.getItem("href");
	});
	
	
	
	//Ideally I would be able to pull JSON data from the site due to the hosting but since I'm not using a generator of some kind 
	//it's a bit more difficult so for now I will simply let this object with all my pages suffice.
	var site = {
		bernerslee : {
			href: "lee.html"
		},
		curie : {
			href: "curie.html"
		},
		darwin : {
			href: "darwin.html"
		},
		kepler : {
			href: "kepler.html"
		},
		mendel : {
			href: "mendel.html"
		},
		johnson: {
			href: "johnson.html"
		}
	};
	
	console.log(site.bernerslee.href);
	
	var tags = "";
	
	$("button.search").click(function(e, tags){
		//First we stop what the button usually does.
		e.preventDefault();
		//Then, we grab the var tags from the form the user filled out (the search bar).
		tags = $('#searchText').val();
		console.log(tags);
		//If they didn't enter anything remind them to do so.
		if(tags.length  < 1){
			alert("Put some text to search, ya dingus!");
			return;
		};
		console.log(site.bernerslee.href);
		if(tags.toLowerCase().includes("tim") || tags.toLowerCase().includes("berners") || tags.toLowerCase().includes("lee")){
			location.replace(site.bernerslee.href);
		}else if(tags.toLowerCase().includes("marie") || tags.toLowerCase().includes("curie")){
			location.replace(site.curie.href);
		}else if(tags.toLowerCase().includes("charles") || tags.toLowerCase().includes("darwin")){
			location.replace(site.darwin.href);
		}else if(tags.toLowerCase().includes("johannes") || tags.toLowerCase().includes("kepler")){
			location.replace(site.kepler.href);
		}else if(tags.toLowerCase().includes("gregor") || tags.toLowerCase().includes("mendel")){
			location.replace(site.mendel.href);
		}else if(tags.toLowerCase().includes("johnson") || tags.toLowerCase().includes("katherine")){
			location.replace(site.johnson.href);
		}else{
			location.replace("dne.html");
		};
		
	});
	
	$("button.searchD").click(function(e, tags){
		//First we stop what the button usually does.
		e.preventDefault();
		//Then, we grab the var tags from the form the user filled out (the search bar).
		tags = $('#searchTextD').val();
		console.log(tags);
		//If they didn't enter anything remind them to do so.
		if(tags.length  < 1){
			alert("Put some text to search, ya dingus!");
			return;
		};
		
		if(tags.toLowerCase().includes("tim") || tags.toLowerCase().includes("berners") || tags.toLowerCase().includes("lee")){
			location.replace("lee.html");
		}else if(tags.toLowerCase().includes("marie") || tags.toLowerCase().includes("curie")){
			location.replace("curie.html");
		}else if(tags.toLowerCase().includes("charles") || tags.toLowerCase().includes("darwin")){
			location.replace("darwin.html");
		}else if(tags.toLowerCase().includes("johannes") || tags.toLowerCase().includes("kepler")){
			location.replace("kepler.html");
		}else if(tags.toLowerCase().includes("gregor") || tags.toLowerCase().includes("mendel")){
			location.replace("mendel.html");
		}else if(tags.toLowerCase().includes("johnson") || tags.toLowerCase().includes("katherine")){
			location.replace("johnson.html");
		}else{
			location.replace("dne.html");
		};
		
	});
	
	var page = ['lee.html', 'curie.html', 'darwin.html', 'kepler.html', 'mendel.html', 'johnson.html'];
	
	$("button.random").click(function(e){
		var index = Math.floor(Math.random() * page.length);
		console.log(index);
		console.log(page.length);
		location.replace(page[index]);
	});
	
	
	$(".TOC").find("a").on('click', function(event) {
		console.log(this.hash);
		var hash = this.hash;
		if (hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault;

			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate({
				scrollTop: $(hash).offset().top 	
			}, 800, function(){
				// Add hash (#) to URL when done scrolling (default click behavior)
				window.location.hash = hash;
			});
		} // End if
	});
	
	
	
	
	//ADDING THE MAPS
	
//MAPS	

//including the topographic layer:
var topo = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2NoYWVmMTYiLCJhIjoiY2l5bDE1aHZ5MDAydTJ3bnpoaWZqbWpkcSJ9.ip2r4oOtxQdBmGDcL7IaWA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'your.mapbox.project.id'

}),

//and the satellite layer:
satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2NoYWVmMTYiLCJhIjoiY2l5bDE1aHZ5MDAydTJ3bnpoaWZqbWpkcSJ9.ip2r4oOtxQdBmGDcL7IaWA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'your.mapbox.project.id'
}),

//and the street layer:
streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2NoYWVmMTYiLCJhIjoiY2l5bDE1aHZ5MDAydTJ3bnpoaWZqbWpkcSJ9.ip2r4oOtxQdBmGDcL7IaWA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'your.mapbox.project.id'
});

//put them all into an object to be included into the map:
var baseMaps = {
	"Topographic": topo,
	"Satellite": satellite,
	"Streets": streets
};

console.dir(baseMaps);

//including the points of interest with coordinates and popups!
var insPoint = L.marker([-0.880992, -89.523137]).bindPopup("Isla San Cristobal, where Darwin first disembarked and stayed from September 17-22."),
	SVT = L.marker([-1.2627, -90.437749]).bindPopup("Isla Floreana, where Darwin spent September 24-27."),
	campMuir = L.marker([-0.732692, -90.984318]).bindPopup("Isla Isabela, where the Beagle spent September 29-October 2."),
	ingGlacier = L.marker([-0.290511, -90.690434]).bindPopup("Isla Santiago, where the Beagle spent October 8-17 before leaving for Tahiti.")

	
//putting them all into a layer group
var POIs = L.layerGroup([insPoint, SVT, campMuir, ingGlacier]);
	console.log(POIs);
//and then an overlay!
var overlayMaps = {
	"POIs": POIs
};

//finally, establishing the map container at map-container, with the satellite layer and POIs loaded by default
var myMap = L.map('map-container', {
	center: [-0.9538, -90.5],
	zoom: 7,
	layers: [satellite, POIs]
});

console.log(myMap);
//and adding in layers to be switched between.
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

});
	

  


