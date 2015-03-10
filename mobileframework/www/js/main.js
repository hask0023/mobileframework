// used the GALAXY NOTE II - 2 in-lab phone
document.addEventListener("DOMContentLoaded", function(){

document.addEventListener("deviceready", startApp);
        
function startApp() {
  
  if( navigator.geolocation ){ 
    
    var params = {enableHighAccuracy: true, timeout:5000, maximumAge:60000}; // timeout was 3600
   
    navigator.geolocation.getCurrentPosition( reportPosition, gpsError, params );
   
  
  }else{

    alert("You've eluded me. For now.");
  }
    
    
var options = new ContactFindOptions();  
options.filter = "";
options.multiple = true;

var filter = ["displayName"];
navigator.contacts.find(filter, onSuccess, onError, options);
    
}});
//  });
    
function onSuccess(matches) {

    var randomNumber = Math.floor(Math.random() * matches.length);
    var currentName = matches[randomNumber].displayName;
     
    document.getElementById("randomcontact").innerHTML = "Ah, I see you have chosen <strong>" + currentName + "</strong> for me to kill. Excellent choice!";

   
}
    
function onError() {
alert ("Failed to get contact");
}

function reportPosition( position ){ 
  var output = document.querySelector("#output");
    
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var canvas = document.createElement("canvas");
    var outputDiv = document.createElement("div");
    outputDiv.setAttribute("id", "output");
    canvas.setAttribute("width", 250);
    canvas.setAttribute("height", 250);
    var context = canvas.getContext('2d');
    

        var staticImage = "https://maps.googleapis.com/maps/api/staticmap?zoom=14&size=250x250&markers=color:blue|" + lat + "," + long + "&key=AIzaSyA8BTwbN0s9UfefqLk9vs32OSNJQz22Iag";
    
    document.getElementById("map").appendChild(canvas);
    document.getElementById("map").appendChild(outputDiv);
    
    var img = document.createElement("img");
   img.onload = function() {
    context.drawImage(img, 0, 0);
  };
  img.src = staticImage;
    
    
 
}

function gpsError( error ){   
  var errors = {
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  alert("Error: " + errors[error.code]);
}



// CONTROLLING THE TABS SECTION


var pages = [], links=[];
var numLinks = 0;
var numPages = 0;


    document.addEventListener("DOMContentLoaded", function(){
    
	//device ready listener 
	pages = document.querySelectorAll('[data-role="page"]');	
	numPages = pages.length;
	links = document.querySelectorAll('[data-role="pagelink"]');
   
	numLinks = links.length;
	for(var i=0;i<numLinks; i++){
           
     if(detectTouchSupport( )){
       links[i].addEventListener("touchend", handleTouch, false);
     }
		links[i].addEventListener("click", handleNav, false);
        
	}

});

//handle the touchend event
function handleTouch(ev){
  ev.preventDefault();
  ev.stopImmediatePropagation();
  var touch = evt.changedTouches[0];        //this is the first object touched
  var newEvt = document.createEvent("MouseEvent");	
  newEvt.initMouseEvent("click", true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY);
  ev.currentTarget.dispatchEvent(newEvt);
  //send the touch to the click handler
}

//handle the click event
function handleNav(ev){
	ev.preventDefault();
	var href = ev.target.href;
	var parts = href.split("#");
	loadPage( parts[1] );	
  return false;
}

function loadPage( url ){
	if(url == null){
		//home page first call
        pages[0].className = 'active';
		history.replaceState(null, null, "#home");	
	}else{
    
    for(var i=0; i < numPages; i++){
      if(pages[i].id == url){
          pages[i].className = "active";
        history.pushState(null, null, "#" + url);	
      }else{
          pages[i].className = "";
      }
    }
    for(var t=0; t < numLinks; t++){
      links[t].className = "";
      if(links[t].href == location.href){
        links[t].className = "activetab";
      }
    }
	}
}



function detectTouchSupport( ){
  msGesture = navigator && navigator.msPointerEnabled && navigator.msMaxTouchPoints > 0 && MSGesture;
  var touchSupport = (("ontouchstart" in window) || msGesture || (window.DocumentTouch && document instanceof DocumentTouch));
  return touchSupport;
}