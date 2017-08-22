  function createCookie(name,value,days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = '; expires='+date.toGMTString();
    } else var expires = '';
    document.cookie = name+'='+value+expires+'; path=/';
  }

//here is the function from https://stackoverflow.com/a/5882352
  function readCookie(name) {
    return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
  }

  function eraseCookie(name) {
    createCookie(name, '', -1);
  }

  function getWeatherColor(temp_c) {
    let colors = {};
    if (30 <= temp_c) colors = { main: '#A50021', support: '#fff'};
    else if (25 <= temp_c && temp_c < 30) colors = { main: '#D82632', support: '#fff'};
    else if (20 <= temp_c && temp_c < 25) colors = { main: '#F76D5E', support: '#242442'}; //support: #fff - bad accessibility
    else if (15 <= temp_c && temp_c < 20) colors = { main: '#FFAD72', support: '#00365c'};
    else if (10 <= temp_c && temp_c < 15) colors = { main: '#FFE099', support: '#001F66'};
    else if (5 <= temp_c && temp_c < 10) colors = { main: '#FFFFBF', support: '#000040'};
    else if (0 <= temp_c && temp_c < 5) colors = { main: '#E0FFFF', support: '#1F0000'};
    else if (-5 <= temp_c && temp_c < 0) colors = { main: '#AAF7FF', support: '#1F0000'};
    else if (-10 <= temp_c && temp_c < -5) colors = { main: '#72D8FF', support: '#1F0000'};
    else if (-15 <= temp_c && temp_c < -10) colors = { main: '#3FA0FF', support: '#1F0000'};
    else if (-20 <= temp_c && temp_c < -15) colors = { main: '#264CFF', support: '#fcc'};
    return colors;
  }

  function getWeatherImage(conditions, seasonYear) {
    // weather determitants:
    // - conditions as returned by weather API
    // - current local season of the year;
    // - latitude (north or south hemisphere);
    let backgroundImage;
    let credit = {};
    let credits = {
      flurries:    { author: 'Frida',
                       URL: 'https://flic.kr/p/k7zUGc',
                    license: 'CC BY-NC 2.0',
                 licenseURL: 'https://creativecommons.org/licenses/by-nc/2.0' },
      snow:        { author: 'FHKE',
                       URL: 'https://flic.kr/p/7AVLQR',
                    license: 'CC BY-SA 2.0',
                 licenseURL: 'https://creativecommons.org/licenses/by-sa/2.0' },
      storm:       { author: 'Kuster & Wildhaber Photography',
                       URL: 'https://flic.kr/p/cESNRS',
                    license: 'CC BY-ND 2.0',
                 licenseURL: 'https://creativecommons.org/licenses/by-nd/2.0' },
      fog:         { author: 'Martin Fisch',
                       URL: 'https://flic.kr/p/dkqP1t',
                    license: 'CC BY-SA 2.0',
                 licenseURL: 'https://creativecommons.org/licenses/by-sa/2.0' },
      hazy:        { author: 'pnwbot',
                       URL: 'https://flic.kr/p/pusoD1',
                    license: 'CC BY-NC-SA 2.0',
                 licenseURL: 'https://creativecommons.org/licenses/by-nc-sa/2.0' },
      rain:        { author: 'Gabriele Diwald',
                       URL: 'https://flic.kr/p/dfkuTL',
                    license: 'CC BY 2.0',
                 licenseURL: 'https://creativecommons.org/licenses/by/2.0'},
      sunny:       { winter: { author: 'bfatphoto',
                                 URL: 'https://flic.kr/p/RHwJiG',
                              license: 'CC BY-NC-ND 2.0',
                           licenseURL: 'https://creativecommons.org/licenses/by-nc-nd/2.0' },
                    spring:  { author: 'Stanley Zimny',
                                 URL: 'https://flic.kr/p/oavqBk',
                              license: 'CC BY-NC 2.0',
                           licenseURL: 'https://creativecommons.org/licenses/by-nc/2.0' },
                    summer:  { author: 'Chris',
                                 URL: 'https://flic.kr/p/fgLTUU',
                              license: 'CC BY-SA 2.0',
                           licenseURL: 'https://creativecommons.org/licenses/by-sa/2.0'},
                    fall:    { author: 'Jorge Franganillo',
                                 URL: 'https://flic.kr/p/i28UqP',
                              license: 'CC BY 2.0',
                           licenseURL: 'https://creativecommons.org/licenses/by/2.0' }},
      cloudy:      { summer: { author: 'Kay Gaensler',
                                 URL: 'https://flic.kr/p/cScQxy',
                              license: 'CC BY-NC-SA 2.0',
                           licenseURL: 'https://creativecommons.org/licenses/by-nc-sa/2.0' },
                     winter: { author: 'Peter Toporowski',
                                 URL: 'https://flic.kr/p/RDW4Z1',
                              license: 'CC BY 2.0',
                           licenseURL: 'https://creativecommons.org/licenses/by/2.0' }},
      partlysunny: { winter: { author: 'Gérald Laik',
                                 URL: 'https://flic.kr/p/RzuZS7',
                              license: 'CC BY-NC-ND 2.0',
                           licenseURL: 'https://creativecommons.org/licenses/by-nc-nd/2.0' },
                    spring:  { author: 'Graham Haley',
                                 URL: 'https://flic.kr/p/UtjTDm',
                              license: 'CC BY-SA 2.0',
                           licenseURL: 'https://creativecommons.org/licenses/by-sa/2.0' },
                    summer:  { author: 'Nicolas Raymond',
                                  URL: 'http://freestock.ca/skies_clouds_g61-coastal_clouds__hdr_p1879.html',
                              license: 'CC BY 2.0',
                           licenseURL: 'https://creativecommons.org/licenses/by/2.0'}},
     mostlysunny:  { winter: { author: 'Adam Tas',
                                 URL: 'https://flic.kr/p/R33zcf',
                              license: 'CC BY 2.0',
                           licenseURL: 'https://creativecommons.org/licenses/by/2.0' },
                    spring:  { author: 'Jim Choate',
                                 URL: 'https://flic.kr/p/SbmJj2',
                              license: 'CC BY-NC-ND 2.0',
                           licenseURL: 'https://creativecommons.org/licenses/by-nc-nd/2.0' },
                    summer:  { author: 'Nicolas Raymond',
                                 URL: 'http://freestock.ca/canada_g92-beaver_brook_scenery__hdr_p804.html',
                              license: 'CC BY 2.0',
                           licenseURL: 'https://creativecommons.org/licenses/by/2.0' },
                    fall:    { author: 'Belinda Church',
                                 URL: 'https://flic.kr/p/qb4cbs',
                              license: 'CC BY 2.0',
                           licenseURL: 'https://creativecommons.org/licenses/by/2.0' }}
    };
    switch (conditions) {
      case 'chanceflurries':
      case 'chancesleet':
      case 'flurries':
      case 'sleet':
        backgroundImage = `img/flurries.jpg`;
        credit = credits.flurries;
        break;
      case 'chancesnow':
      case 'snow':
        backgroundImage = `img/snow.jpg`;
        credit = credits.snow;
        break;
      case 'chancetstorms':
      case 'tstorms':
        backgroundImage = `img/storm.jpg`;
        credit = credits.storm;
        break;
      case 'fog':
        backgroundImage = `img/fog.jpg`;
        credit = credits.fog;
        break;
      case 'hazy':
        backgroundImage = `img/hazy.jpg`;
        credit = credits.hazy;
        break;
      case 'chancerain':
      case 'rain':
        backgroundImage = `img/rain.jpg`;
        credit = credits.rain;
        break;
      case 'clear':
      case 'sunny':
        backgroundImage = `img/sunny_${seasonYear}.jpg`;
        credit = credits.sunny[seasonYear];
        break;
      case 'cloudy':
        if (seasonYear === 'spring' || seasonYear === 'fall') seasonYear = 'summer';
        backgroundImage = `img/cloudy_${seasonYear}.jpg`;
        credit = credits.cloudy[seasonYear];
        break;
      case 'mostlycloudy':
      case 'partlysunny':
        if (seasonYear === 'fall') seasonYear = 'spring';
        backgroundImage = `img/partlysunny_${seasonYear}.jpg`;
        credit = credits.partlysunny[seasonYear];
        break;
      case 'mostlysunny':
      case 'partlycloudy':
        backgroundImage = `img/mostlysunny_${seasonYear}.jpg`;
        credit = credits.mostlysunny[seasonYear];
        break;
    }
    return { image: backgroundImage, credit };
  }

  function displayData(data) {

    const bodyElm = document.querySelector('body');
    const mainElm = document.querySelector('.main');
    const aboutElm = document.querySelector('.about');
    const aboutBtnElm = document.querySelector('.about__button');
    const aboutCloseBtnElm = document.querySelector('.about__button--close-modal');
    const dateElm = document.querySelector('.geo-details__date');
    const timeElm = document.querySelector('.geo-details__time');
    const placeElm = document.querySelector('.geo-details__place');
    const skyElm = document.querySelector('.weather__sky');
    const tempElm = document.querySelector('.weather__temp');
    const tempFScaleLabelElm = document.querySelector('.label__item--fahrenheit');
    const tempCScaleLabelElm = document.querySelector('.label__item--celsius');
    const tempFScaleInputElm = document.querySelector('.radio__item--fahrenheit');
    const tempCScaleInputElm = document.querySelector('.radio__item--celsius');
    const copyrightElm = document.querySelector('.copyright');
    const copyrightTextElm = document.querySelector('.copyright__text');
    //const copyrightSignElm = document.querySelector('.copyright__sign');
    const userScale = readCookie('scale');


    dateElm.innerText = data.currDate;
    timeElm.innerText = data.currTime;
    placeElm.innerText = data.place;
    tempElm.innerText = userScale === 'celsius' ? data.temp_c : data.temp_f;

    // set visual appearance of the page
    let seasonYear;
    if (data.currMonth < 3 || data.currMonth === 12) {
      seasonYear = data.hemisphere === 'north' ? 'winter' : 'summer';
    } else if (3 <= data.currMonth && data.currMonth < 6) {
      seasonYear = data.hemisphere === 'north' ? 'spring' : 'fall';
    } else if (6 <= data.currMonth && data.currMonth < 9) {
      seasonYear = data.hemisphere === 'north' ? 'summer' : 'winter';
    } else if (9 <= data.currMonth && data.currMonth < 12) {
      seasonYear = data.hemisphere === 'north' ? 'fall' : 'spring';
    }
    const bgImage = getWeatherImage(data.conditions, seasonYear);
    const weatherColors = getWeatherColor(data.temp_c); // all inner visual appearance decisions are based on celsius scale;
    document.documentElement.style.setProperty('--bg-color', weatherColors.main);
    document.documentElement.style.setProperty('--text-color', weatherColors.support);
    // unable to set svg properties through css variables, so work directly
    //copyrightSignElm.style.color = weatherColors.main;
    //copyrightSignElm.style.fill = weatherColors.support;
    // unable to rule colors in old Safari with css variables, so work directly
    mainElm.style.color = weatherColors.support;
    mainElm.style.backgroundColor = weatherColors.main;
    aboutElm.style.color = weatherColors.support;
    aboutElm.style.backgroundColor = weatherColors.main;
    aboutElm.style.borderColor = weatherColors.support;
    aboutBtnElm.style.color = weatherColors.support;
    aboutBtnElm.style.backgroundColor = weatherColors.main;
    aboutBtnElm.style.borderColor = weatherColors.support;
    aboutCloseBtnElm.style.color = weatherColors.main;
    aboutCloseBtnElm.style.backgroundColor = weatherColors.support;
    aboutCloseBtnElm.style.borderColor = weatherColors.main;
    copyrightElm.style.backgroundColor = weatherColors.main;
    copyrightTextElm.style.color = weatherColors.support;

    bodyElm.style.backgroundImage = `url('${bgImage.image}')`;
    copyrightTextElm.innerHTML = `<p>Photo by <a href='${bgImage.credit.URL}'>${bgImage.credit.author}</a>, <a href='${bgImage.credit.licenseURL}'>${bgImage.credit.license}</a>.</p>`;

    // set scale and switch handlers
    if (userScale === 'celsius') toggleButtonsState(tempCScaleLabelElm, tempFScaleLabelElm);
    else toggleButtonsState(tempFScaleLabelElm, tempCScaleLabelElm);

    function cScaleClickHandler(e) {
      if ((e.type === 'keypress' && (e.keyCode === 13 || e.keyCode === 32)) ||
           e.type === 'click') {
        tempElm.innerText = data.temp_c;
        if (readCookie('scale')) eraseCookie('scale');
        createCookie('scale','celsius',300)
        toggleButtonsState(tempCScaleLabelElm, tempFScaleLabelElm);
      }
    }

    function fScaleClickHandler(e) {
      if ((e.type === 'keypress' && (e.keyCode === 13 || e.keyCode === 32)) ||
           e.type === 'click') {
        tempElm.innerText = data.temp_f;
        if (readCookie('scale')) eraseCookie('scale');
        createCookie('scale','fahrenheit',300)
        toggleButtonsState(tempFScaleLabelElm, tempCScaleLabelElm);
      }
    }

    function toggleButtonsState(btn_pressed, btn_released) {
      if (btn_pressed.innerText  === 'F') {
        var addHandler = cScaleClickHandler;
        var removeHandler = fScaleClickHandler;
        var inputCheckedElm = tempFScaleInputElm;
        var inputUncheckedElm = tempCScaleInputElm;
      } else if (btn_pressed.innerText  === 'C') {
        var addHandler = fScaleClickHandler;
        var removeHandler = cScaleClickHandler;
        var inputCheckedElm = tempCScaleInputElm;
        var inputUncheckedElm = tempFScaleInputElm;
      }

      btn_pressed.classList.add('vivid');
      inputCheckedElm.setAttribute('aria-checked', 'true');
      btn_pressed.removeEventListener('click', removeHandler);
      btn_pressed.removeEventListener('keypress', removeHandler);

      btn_released.classList.remove('vivid');
      inputUncheckedElm.setAttribute('aria-checked', 'false');
      btn_released.addEventListener('click', addHandler);
      btn_released.addEventListener('keypress', addHandler);
    }


  }

  function getWeatherForPosition(pos) {
    //const httpAddr = `https://api.wunderground.com/api/c29706cb930a70b9/conditions/q/${pos.coords.latitude},${pos.coords.longitude}.json`;//Kenmore,WA
    const httpAddr = `https://api.wunderground.com/api/c29706cb930a70b9/conditions/q/${pos}.json`;
    if (!fetch) alert('fetch() unavailable');

    fetch(httpAddr)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error();
      })
      .then(data => {

        const obz = data.current_observation;
        const loc = obz.display_location;

        const place = loc.city + ', ' + (loc.country === 'US' ? loc.state : loc.state_name) +  (loc.country === 'US' ? (', ' + loc.country) : '');
        const time = obz.local_epoch;
        let d = new Date(0);
        d.setUTCSeconds(time);
        const dayOptions = { weekday: 'long' };
        const dateOptions = { month: 'long',
                              day: 'numeric' };
        const timeOptions = { hour: 'numeric',
                              minute: 'numeric' };
        const currDay = d.toLocaleDateString(undefined, dayOptions);
        const currDate = d.toLocaleDateString(undefined, dateOptions);
        const currTime = d.toLocaleTimeString(undefined, timeOptions);
        const currMonth = d.getMonth() + 1;
        const sky = obz.weather;
        const temp = obz.temperature_string;
        const temp_c = obz.temp_c;
        const temp_f = obz.temp_f;
        const tempFeels = obz.feelslike_string;
        const tempFeelsC = obz.feelslike_c;
        const tempFeelsF = obz.feelslike_f;
        const conditions = obz.icon;
        return {
          place,
          hemisphere: pos.split(',')[0] > 0 ? 'north' : 'south',
          currDay,
          currDate,
          currTime,
          currMonth,
          sky,
          temp,
          temp_f,
          temp_c,
          tempFeels,
          tempFeelsF,
          tempFeelsC,
          conditions
        }
      })
      .then(data => displayData(data))
      .catch (error => console.log(`Error while retrieving weather data - ${error.msg}`));
  }

  function getLocationByIP() {
    fetch('https://freegeoip.net/json/')
      .then(resp => {
        if (resp.ok) return resp.json();
        throw new Error();
      })
      .then(data => {
        getWeatherForPosition(data.latitude + ',' + data.longitude);
      })
  }

  function geoLocFail(error) {
    let msg = '';
    switch(error) {
      case 1: //error.PERMISSION_DENIED:
           msg = "User denied the request for Geolocation.";
           break;
      case 2: //error.POSITION_UNAVAILABLE:
           msg = "Location information is unavailable.";
           break;
      case 3: //error.TIMEOUT:
          msg = "The request to get user location timed out.";
          break;
      default:
          msg = error.message;
          break;
    }
    console.warn(`Error: ${msg}`);
    getLocationByIP(); //fallback to get alternative user location;
  }

  function getLocation() {
    if(navigator.geolocation) {
      const location_timeout = setTimeout(function() {
        let err = new Error({code: 3});
        geoLocFail(err);
      }, 0.2 * 10 * 1000); //0.2 is for 2 seconds timeout
      navigator.geolocation.getCurrentPosition(function(position) {
        clearTimeout(location_timeout);
        //console.log('successfully get geoposition');
        getWeatherForPosition(position.coords.latitude + ',' + position.coords.longitude);
      }, function(err) {
        clearTimeout(location_timeout);
        //console.log('failed to get geoposition');
        geoLocFail(err);
      }, { timeout: 0.2 * 10 * 1000, maximumAge: 60 * 10 * 1000, enableHighAccuracy: false });
    } else {
      let err = new Error({code: -999, message: 'An unknown Geolocation error occurred'});
      geoLocFail(err);
    }
  }

// main
  getLocation();

  const aboutBtn = document.querySelector('.about__button');
  aboutBtn.addEventListener('click', function() {
    const aboutMsg = document.querySelector('.about');
    aboutMsg.classList.toggle('closed');
  });

  const aboutCloseBtn = document.querySelector('.about__button--close-modal');
  aboutCloseBtn.addEventListener('click', function() {
    const aboutMsg = document.querySelector('.about');
    aboutMsg.classList.toggle('closed');
  });
