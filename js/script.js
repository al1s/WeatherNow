"use strict";function createCookie(e,t,r){if(r){var o=new Date;o.setTime(o.getTime()+24*r*60*60*1e3);n="; expires="+o.toGMTString()}else var n="";document.cookie=e+"="+t+n+"; path=/"}function readCookie(e){return(e=new RegExp("(?:^|;\\s*)"+(""+e).replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")+"=([^;]*)").exec(document.cookie))&&e[1]}function eraseCookie(e){createCookie(e,"",-1)}function capitalize(e){return e[0].toUpperCase()+e.substr(1)}function errorHandler(e){console.log("Got error  - "+e.message+",\n"+err.stack)}function getWeatherColor(e){var t={};return 30<=e?t={main:"#A50021",support:"#fff"}:25<=e&&e<30?t={main:"#D82632",support:"#fff"}:20<=e&&e<25?t={main:"#F76D5E",support:"#242442"}:15<=e&&e<20?t={main:"#FFAD72",support:"#00365c"}:10<=e&&e<15?t={main:"#FFE099",support:"#001F66"}:5<=e&&e<10?t={main:"#FFFFBF",support:"#000040"}:0<=e&&e<5?t={main:"#E0FFFF",support:"#1F0000"}:-5<=e&&e<0?t={main:"#AAF7FF",support:"#1F0000"}:-10<=e&&e<-5?t={main:"#72D8FF",support:"#1F0000"}:-15<=e&&e<-10?t={main:"#3FA0FF",support:"#1F0000"}:-20<=e&&e<-15&&(t={main:"#264CFF",support:"#fcc"}),t}function getWeatherImage(e,t){var r=void 0,o={},n={flurries:{author:"Frida",link:"https://flic.kr/p/k7zUGc"},snow:{author:"FHKE",link:"https://flic.kr/p/7AVLQR"},storm:{author:"Kuster & Wildhaber Photography",link:"https://flic.kr/p/cESNRS"},fog:{author:"Martin Fisch",link:"https://flic.kr/p/dkqP1t"},hazy:{author:"pnwbot",link:"https://flic.kr/p/pusoD1"},rain:{author:"Gabriele Diwald",link:"https://flic.kr/p/dfkuTL"},sunny:{winter:{author:"bfatphoto",link:"https://flic.kr/p/RHwJiG"},spring:{author:"Stanley Zimny",link:"https://flic.kr/p/oavqBk"},summer:{author:"Chris",link:"https://flic.kr/p/fgLTUU"},fall:{author:"Jorge Franganillo",link:"https://flic.kr/p/i28UqP"}},cloudy:{summer:{author:"Kay Gaensler",link:"https://flic.kr/p/cScQxy"},winter:{author:"Peter Toporowski",link:"https://flic.kr/p/RDW4Z1"}},partlysunny:{winter:{author:"Gérald Laik",link:"https://flic.kr/p/RzuZS7"},spring:{author:"Graham Haley",link:"https://flic.kr/p/UtjTDm"},summer:{author:"Nicolas Raymond",link:"http://freestock.ca/skies_clouds_g61-coastal_clouds__hdr_p1879.html"}},mostlysunny:{winter:{author:"Adam Tas",link:"https://flic.kr/p/R33zcf"},spring:{author:"Jim Choate",link:"https://flic.kr/p/SbmJj2"},summer:{author:"Nicolas Raymond",link:"http://freestock.ca/canada_g92-beaver_brook_scenery__hdr_p804.html"},fall:{author:"Belinda Church",link:"https://flic.kr/p/qb4cbs"}}};switch(e){case"chanceflurries":case"chancesleet":case"flurries":case"sleet":r="img/flurries.jpg",o=n.flurries;break;case"chancesnow":case"snow":r="img/snow.jpg",o=n.snow;break;case"chancetstorms":case"tstorms":r="img/storm.jpg",o=n.storm;break;case"fog":r="img/fog.jpg",o=n.fog;break;case"hazy":r="img/hazy.jpg",o=n.hazy;break;case"chancerain":case"rain":r="img/rain.jpg",o=n.rain;break;case"clear":case"sunny":r="img/sunny_"+t+".jpg",o=n.sunny[t];break;case"cloudy":"spring"!==t&&"fall"!==t||(t="summer"),r="img/cloudy_"+t+".jpg",o=n.cloudy[t];break;case"mostlycloudy":case"partlysunny":"fall"===t&&(t="spring"),r="img/partlysunny_"+t+".jpg",o=n.partlysunny[t];break;case"mostlysunny":case"partlycloudy":r="img/mostlysunny_"+t+".jpg",o=n.mostlysunny[t]}return{image:r,credit:o}}function displayData(e){function t(t){("keypress"!==t.type||13!==t.keyCode&&32!==t.keyCode)&&"click"!==t.type||(m.innerText=e.temp_c,readCookie("scale")&&eraseCookie("scale"),createCookie("scale","celsius",300),o(d,h))}function r(t){("keypress"!==t.type||13!==t.keyCode&&32!==t.keyCode)&&"click"!==t.type||(m.innerText=e.temp_f,readCookie("scale")&&eraseCookie("scale"),createCookie("scale","fahrenheit",300),o(h,d))}function o(e,o){if("F"===e.innerText)var n=t,a=r,i=y,c=g;else if("C"===e.innerText)var n=r,a=t,i=g,c=y;e.classList.add("vivid"),i.setAttribute("aria-checked","true"),e.removeEventListener("click",a),e.removeEventListener("keypress",a),o.classList.remove("vivid"),c.setAttribute("aria-checked","false"),o.addEventListener("click",n),o.addEventListener("keypress",n)}var n=document.querySelector("body"),a=document.querySelector(".main"),i=document.querySelector(".about"),c=document.querySelector(".about__button"),s=document.querySelector(".about__button--close-modal"),l=document.querySelector(".geo-details__date"),u=document.querySelector(".geo-details__time"),p=document.querySelector(".geo-details__place"),m=(document.querySelector(".weather__sky"),document.querySelector(".weather__temp")),h=document.querySelector(".label__item--fahrenheit"),d=document.querySelector(".label__item--celsius"),y=document.querySelector(".radio__item--fahrenheit"),g=document.querySelector(".radio__item--celsius"),k=document.querySelector(".copyright"),f=document.querySelector(".copyright__text"),_=document.querySelector(".copyright__sign"),b=readCookie("scale");l.innerText=e.currDate,u.innerText=e.currTime,p.innerText=e.place,m.innerText="celsius"===b?e.temp_c:e.temp_f;var F=void 0;e.currMonth<3||12===e.currMonth?F="north"===e.hemisphere?"winter":"summer":3<=e.currMonth&&e.currMonth<6?F="north"===e.hemisphere?"spring":"fall":6<=e.currMonth&&e.currMonth<9?F="north"===e.hemisphere?"summer":"winter":9<=e.currMonth&&e.currMonth<12&&(F="north"===e.hemisphere?"fall":"spring");var v=getWeatherImage(e.conditions,F),C=getWeatherColor(e.temp_c);document.documentElement.style.setProperty("--bg-color",C.main),document.documentElement.style.setProperty("--text-color",C.support),_.style.color=C.main,_.style.fill=C.support,a.style.color=C.support,a.style.backgroundColor=C.main,i.style.color=C.support,i.style.backgroundColor=C.main,i.style.borderColor=C.support,c.style.color=C.support,c.style.backgroundColor=C.main,c.style.borderColor=C.support,s.style.color=C.main,s.style.backgroundColor=C.support,s.style.borderColor=C.main,k.style.backgroundColor=C.main,f.style.color=C.support,n.style.backgroundImage="url('"+v.image+"')",f.innerHTML="<p>Image by <a href='"+v.credit.link+"'>"+v.credit.author+"</a></p>","celsius"===b?o(d,h):o(h,d)}function getWeatherForPosition(e){var t="https://api.wunderground.com/api/c29706cb930a70b9/conditions/q/"+e+".json";fetch||alert("fetch() unavailable"),fetch(t).then(function(e){if(e.ok)return e.json();throw new Error}).then(function(t){var r=t.current_observation,o=r.display_location,n=o.city+", "+("US"===o.country?o.state:o.state_name)+("US"===o.country?", "+o.country:""),a=r.local_epoch,i=new Date(0);i.setUTCSeconds(a);var c={weekday:"long"},s={month:"long",day:"numeric"},l={hour:"numeric",minute:"numeric"},u=i.toLocaleDateString(void 0,c),p=i.toLocaleDateString(void 0,s),m=i.toLocaleTimeString(void 0,l),h=i.getMonth()+1,d=r.weather,y=r.temperature_string,g=r.temp_c,k=r.temp_f,f=r.feelslike_string,_=r.feelslike_c,b=r.feelslike_f,F=r.icon;return{place:n,hemisphere:e.split(",")[0]>0?"north":"south",currDay:u,currDate:p,currTime:m,currMonth:h,sky:d,temp:y,temp_f:k,temp_c:g,tempFeels:f,tempFeelsF:b,tempFeelsC:_,conditions:F}}).then(function(e){return displayData(e)}).catch(function(e){return console.log("Error while retrieving weather data - "+e.msg)})}function getLocationByIP(){fetch("https://freegeoip.net/json/").then(function(e){if(e.ok)return e.json();throw new Error}).then(function(e){getWeatherForPosition(e.latitude+","+e.longitude)})}function geoLocFail(e){var t="";switch(e){case 1:t="User denied the request for Geolocation.";break;case 2:t="Location information is unavailable.";break;case 3:t="The request to get user location timed out.";break;default:t=e.message}console.warn("Error: "+t),getLocationByIP()}function getLocation(){if(navigator.geolocation){var e=setTimeout(function(){geoLocFail(new Error({code:3}))},2e3);navigator.geolocation.getCurrentPosition(function(t){clearTimeout(e),getWeatherForPosition(t.coords.latitude+","+t.coords.longitude)},function(t){clearTimeout(e),geoLocFail(t)},{timeout:2e3,maximumAge:6e5,enableHighAccuracy:!1})}else geoLocFail(new Error({code:-999,message:"An unknown Geolocation error occurred"}))}getLocation();var aboutBtn=document.querySelector(".about__button");aboutBtn.addEventListener("click",function(){document.querySelector(".about").classList.toggle("closed")});var aboutCloseBtn=document.querySelector(".about__button--close-modal");aboutCloseBtn.addEventListener("click",function(){document.querySelector(".about").classList.toggle("closed")});
//# sourceMappingURL=script.js.map