
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
	});
	
	//The logout function!
	$("#Logout").click(function(){
		//fading out the user info and fading in the login form right after.
		$(".user-info").fadeOut();
		setTimeout(function(){$("#login").fadeIn();}, 400);
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



});

