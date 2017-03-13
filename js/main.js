
$(document).ready(function(){

//Storing the login boolean locally so between refreshes the user will not be logged out.
	if(!localStorage.getItem("login")){
		localStorage.setItem("login", "false");
		console.log("nologin");
	};
	//Making sure the css for both flexible and desktop layouts display properly depending on the login boolean.
	if(localStorage.getItem("login") === "false"){
		//if false, display the login form.
		$("#login").css("display", "default");
		$(".user-info").css("display", "none");
		$("#loginD").css("display", "default");
		$(".user-infoD").css("display", "none");
	}else if(localStorage.getItem("login") === "true"){
		//if true, display the username and a logout button.
		$("#login").css("display", "none");
		$(".user-info").css("display", "default");
		$("#loginD").css("display", "none");
		$(".user-infoD").css("display", "default");
		$(".user-fullname").replaceWith(localStorage.getItem("username"));
	};

	//Upon clicking the login form, the email and pass values are checked against the values kept in the user's local storage, as established by the create function below.
	$("#Login").click(function(){
		if($("#email").val() == localStorage.getItem("user") && $("#pass").val() == localStorage.getItem("pass")){
			//Fading out the login form.  Fancy!
			$("#login").fadeOut();
			//Setting the userinfo to come in right as the login form fades out.
			setTimeout(function(){$(".user-info").fadeIn();}, 400);
			//Setting the user info to the username
			$(".user-fullname").replaceWith(localStorage.getItem("username"));
			//Lastly, here's the boolean being changed.
			localStorage.setItem("login", "true");
		}else{
			//conditionals for the type of alert.  If only the username or pass are wrong, the message will target those.  If both are wrong, a more general message is sent.
			if($("#email").val() != localStorage.getItem("user") && $("#pass").val() != localStorage.getItem("pass")){
				alert("Your login credentials don't seem to match up.  Modify your details or create an account!");
				return;
			}else if($("#email").val() != localStorage.getItem("user") || $("#pass").val() != localStorage.getItem("pass")){
				if($("#email").val() != localStorage.getItem("user")){
					alert("Your username doesn't seem to match up!");
					return;
				}else if($("#pass").val() != localStorage.getItem("pass")){
					alert("Your password doesn't seem to match up!");
					return;
				};
			};
		};	
	});
	
	//The same as above but for the desktop layout.
	$("#LoginD").click(function(){
		if($("#emailD").val() == localStorage.getItem("user") && $("#passD").val() == localStorage.getItem("pass")){
			//Fading out the login form.  Fancy!
			$("#loginD").fadeOut();
			//Setting the userinfo to come in right as the login form fades out.
			setTimeout(function(){$(".user-infoD").fadeIn();}, 400);
			//Setting the user info to the first and last name
			$(".user-fullname").replaceWith(localStorage.getItem("username"));
			//Lastly, here's the boolean being changed.
			localStorage.setItem("login", "true");
		}else{
			if($("#emailD").val() != localStorage.getItem("user") && $("#passD").val() != localStorage.getItem("pass")){
				alert("Your login credentials don't seem to match up.  Modify your details or create an account!");
				return;
			}else if($("#emailD").val() != localStorage.getItem("user") || $("#passD").val() != localStorage.getItem("pass")){
				if($("#emailD").val() != localStorage.getItem("user")){
					alert("Your username doesn't seem to match up!");
					return;
				}else if($("#passD").val() != localStorage.getItem("pass")){
					alert("Your password doesn't seem to match up!");
					return;
				};
			};
		};
	});
	
	//The logout function!
	$("#Logout").click(function(){
		//fading out the user info and fading in the login form right after.
		$(".user-info").fadeOut();
		setTimeout(function(){$("#login").fadeIn();}, 400);
		//booleans!
		localStorage.setItem("login", "false");
	});

	//The logout function, desktop version!
	$("#LogoutD").click(function(){
		//fading out the user info and fading in the login form right after.
		$(".user-infoD").fadeOut();
		setTimeout(function(){$("#loginD").fadeIn();}, 400);
		//booleans!
		localStorage.setItem("login", "false");
	});

	//Making the dropdown navbar work on mobile.  Upon clicking the white plus, the menu drops and users are presented with options, and the plus changes to a minus.
	$("#expand").click(function() {
		var spanclass = $("#expand").find("span").attr("class");
		if(spanclass == "glyphicon glyphicon-plus"){
			$("#expand").find("span").addClass("glyphicon-minus").removeClass("glyphicon-plus");
		}else{
			$("#expand").find("span").addClass("glyphicon-plus").removeClass("glyphicon-minus");
		}
	});
	
	
	//The edit button!  On pages where it's permitted, allows users to click around and type into the mainbody div (intro on down).
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
	
	//Stores the current page info when clicking on talk tab so that users can return quickly to the page they were on.
	var href = ""
	$(".talk").click(function(e) {
		e.preventDefault();
		href = window.location.href.toString();
		localStorage.setItem("href", href);
		document.location.href="talk.html";
	});
	
	//returning to the page
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
	
	
	//setting up the variable that will store the search data.
	var tags = "";
	
	//The search function!  Pulls whatever the user types in and matches, as best it can, to a page on the site.  Limited to names for now.
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
		//Then, if the tags are included in any of the names of the scientists, go to that page!  If not, go to the "does not exist" page.
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
	
	//Same with the desktop site format.
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
	
	//Usually I would put this together with a loop but here are all the pages.
	var page = ['lee.html', 'curie.html', 'darwin.html', 'kepler.html', 'mendel.html', 'johnson.html'];
	
	//Clicking on the random page gets you to a random page based on the variable index!
	$("button.random").click(function(e){
		var index = Math.floor(Math.random() * page.length);
		location.replace(page[index]);
	});
	
	//Smooth scrolling in the table of contents!  The name in the TOC and the name of the div are the same so upon clicking it takes the data and searches for it in the page.
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
	
	//Going to the creat account page and storing the current location so that users can return to it.
	$("#createacct").click(function(e){
		e.preventDefault();
		href = window.location.href.toString();
		localStorage.setItem("href", href);
		document.location.href="create.html";
	});
	
	//Same thing on desktop.
	$("#createacctD").click(function(e){
		e.preventDefault();
		href = window.location.href.toString();
		localStorage.setItem("href", href);
		document.location.href="create.html";
	});
	
	//Swiped this email validator regex from Stack Overflow http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
	//An email validating function that makes sure users put in valid addresses.  Could also be done with validator but I think regex is more rigid.  Not like it's necessary for the passwords or handle at the moment anyhow
	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
	}
	//Creating the account.  Accepts an email, two instances of the same password, and a username.  
	$("#create").click(function(){
		var email = $("#Cuser").val();
		var pass1 = $("#Cpass").val();
		var pass2 = $("#Cpass2").val();
		var handle = $("#handle").val();
		//if the email checks out, check the passwords.  If the passes or email don't check out, a particular alert is displayed.
		if(validateEmail(email)){
			if(pass1 == pass2){
				localStorage.setItem("user", email);
				localStorage.setItem("pass", pass1);
				localStorage.setItem("username", handle);
				document.location.href=localStorage.getItem("href");
			}else{
				alert("Your passwords don't match!  Try again?");
				return;
			};
		}else{
			alert("Your email address is looking a little weird there buddy.  Try again?");
			return;
		};
	});
	
	
	//ADDING THE CHARLES DARWIN MAP WITH LEAFLET
	
//MAPS	

//including the topographic layer:
var topo = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2NoYWVmMTYiLCJhIjoiY2l5bDE1aHZ5MDAydTJ3bnpoaWZqbWpkcSJ9.ip2r4oOtxQdBmGDcL7IaWA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'your.mapbox.project.id'

});

//and the satellite layer:
var satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2NoYWVmMTYiLCJhIjoiY2l5bDE1aHZ5MDAydTJ3bnpoaWZqbWpkcSJ9.ip2r4oOtxQdBmGDcL7IaWA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'your.mapbox.project.id'
});

//put them all into an object to be included into the map:
var baseMaps = {
	"Topographic": topo,
	"Satellite": satellite,
};

//including the points of interest with coordinates and popups!  For now the names are the same as on the Rainier Project
var insPoint = L.marker([-0.880992, -89.523137]).bindPopup("Isla San Cristobal, where Darwin first disembarked and stayed from September 17-22."),
	SVT = L.marker([-1.2627, -90.437749]).bindPopup("Isla Floreana, where Darwin spent September 24-27."),
	campMuir = L.marker([-0.732692, -90.984318]).bindPopup("Isla Isabela, where the Beagle spent September 29-October 2."),
	ingGlacier = L.marker([-0.290511, -90.690434]).bindPopup("Isla Santiago, where the Beagle spent October 8-17 before leaving for Tahiti.")

	
//putting them all into a layer group
var POIs = L.layerGroup([insPoint, SVT, campMuir, ingGlacier]);

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
	

  


