const station = {
  //lat, long, temp
  "Chek Lap Kok": [22.30944444, 113.9219444],
  "Cheung Chau": [22.20111111, 114.0266667],
  "Happy Valley": [22.27055556, 114.1836111],
  "Hong Kong Observatory": [22.30194444, 114.1741667],
  "Hong Kong Park": [22.27833333, 114.1622222],
  "Kai Tak Runway Park": [22.30972222, 114.2133333],
  "King's Park": [22.31194444, 114.1727778],
  "Kowloon City": [22.335, 114.1847222],
  "Kwun Tong": [22.31861111, 114.2247222],
  "Lau Fau Shan": [22.46888889, 113.9836111],
  "Sai Kung": [22.37555556, 114.2744444],
  "Sha Tin": [22.4025, 114.21],
  "Sham Shui Po": [22.33583333, 114.1369444],
  "Shau Kei Wan": [22.28166667, 114.2361111],
  "Shek Kong": [22.43611111, 114.0847222],
  "Stanley": [22.21416667, 114.2186111],
  "Ta Kwu Ling": [22.52861111, 114.1566667],
  "Tai Mei Tuk": [22.47527778, 114.2375],
  "Tai Po": [22.44611111, 114.1788889],
  "Tsing Yi": [22.34805556, 114.1091667],
  "Tseung Kwan O": [22.31583333, 114.2555556],
  "Tsuen Wan Ho Koon": [22.38361111, 114.1077778],
  "Tsuen Wan Shing Mun Valley": [22.37555556, 114.1238889],
  "Tuen Mun": [22.39055556, 113.9766667],
  "Wong Chuk Hang": [22.24777778, 114.1736111],
  "Wong Tai Sin": [22.33944444, 114.2052778],
  "Yuen Long Park": [22.41888889, 113.9961111]
};
const aqhidistrict = {
  "Central/Western": [22.284792, 114.14413907799911],
  "Southern": [22.2479312, 114.1601149],
  "Eastern": [22.2830774, 114.21900057191323],
  "Kwun Tong": [22.3098052, 114.2315367557473],
  "Sham Shui Po": [22.330405213400752, 114.15939550471612],
  "Kwai Chung": [22.356942949999997, 114.1293283974214],
  "Tsuen Wan": [22.371890560773316, 114.11512300841532],
  "Tseung Kwan O": [22.31754838890652, 114.2602613427978],
  "Yuen Long": [22.4449384, 114.0228013],
  "Tuen Mun": [22.39139578334337, 113.97736173910037],
  "Tung Chung": [22.289109238190928, 113.94412689677011],
  "Tai Po": [22.45125422341408, 114.16439708937546],
  "Sha Tin": [22.376768772361523, 114.18537610046992],
  "North": [22.496930300000002, 114.12833606569419],
  "Tap Mun": [22.471330169476424, 114.36096390768151],
  "Causeway Bay": [22.28050141982767, 114.18588316608526],
  "Central": [22.28185169591833, 114.15807261990376],
  "Mong Kok": [22.322578835466118, 114.16836839255906]
};
const raindistrict = {
  "Central &amp; Western District": [22.284792, 114.14413907799911, 0],
  "Eastern District": [22.2830774, 114.21900057191323, 0],
  "Kwai Tsing": [22.356942949999997, 114.1293283974214, 0],
  "Islands District": [22.289109238190928, 113.94412689677011, 0],
  'North District': [22.496930300000002, 114.12833606569419, 0],
  'Sai Kung': [22.471330169476424, 114.36096390768151, 0],
  'Sha Tin': [22.376768772361523, 114.18537610046992, 0],
  'Southern District': [22.2479312, 114.1601149, 0],
  'Tai Po': [22.45125422341408, 114.16439708937546, 0],
  'Tsuen Wan': [22.371890560773316, 114.11512300841532, 0],
  'Tuen Mun': [22.39139578334337, 113.97736173910037, 0],
  'Wan Chai': [22.28050141982767, 114.18588316608526, 0],
  'Yuen Long': [22.4449384, 114.0228013, 0],
  'Yau Tsim Mong': [22.322578835466118, 114.16836839255906, 0],
  'Sham Shui Po': [22.330405213400752, 114.15939550471612, 0],
  'Kowloon City': [22.335, 114.1847222, 0],
  'Wong Tai Sin': [22.33944444, 114.2052778, 0],
  'Kwun Tong': [22.3098052, 114.2315367557473, 0]
};

function makeTitle() {
  var title = document.createElement("h1");
  title.id = "title";
  title.textContent = "wlchan weather portal";

  document.body.appendChild(title);
}

function getHeader() {
  fetch(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en`)
    .then(response => {
      if (response.status == 200) { //receive response successfully
        response.json().then(weather => {
          let output = "sdf123123sdf";
          let warning = "";
          //Write the data beneath the button
          let temps = weather.temperature.data;
          let rain = weather.rainfall.data;
          let uv = weather.uvindex.data;
          let wet = weather.humidity.data;
          let warn = weather.warningMessage;
          let icon = weather.icon;
          let update = weather.updateTime;


          output = "<img src='https://www.hko.gov.hk/images/HKOWxIconOutline/pic" +
            icon + ".png'></img>";
          let i = 1;
          for (let temp of temps) {
            station[temp.place].push(temp.value);
            if (temp.place == "Hong Kong Observatory") {
              output += "&nbsp&nbsp&nbsp" + temp.value + temp.unit + "&nbsp&nbsp&nbsp";
            }
            i += 1;
          }
          for (let we of wet) {
            if (we.place == "Hong Kong Observatory") {
              output += "<img src='images/drop-48.png'></img>" + we.value +
                "%&nbsp&nbsp&nbsp";
            }
          }
          for (let rai of rain) {
            if (rai.max) {
              raindistrict[rai.place][2] = rai.max;
            }
            console.log(rai.place, raindistrict[rai.place]);
            if (rai.place == "Yau Tsim Mong") {
              if (rai.max) {
                output += "<img src='images/rain-48.png'></img>" + rai.max + "mm";
                if (update.substr(11, 2) > 07 && update.substr(11, 2) < 19) {
                  document.getElementById('header').id = 'headerrain';
                } else {
                  document.getElementById('header').id = 'headernightrain';
                }
              } else {
                output += "<img src='images/rain-48.png'></img> 0mm";
                if (update.substr(11, 2) > 07 && update.substr(11, 2) < 19) {
                  document.getElementById('header').id = 'header';
                } else {
                  document.getElementById('header').id = 'headernight';
                }
              }
            }
          }
          if (uv) {
            for (let u of uv) {
              if (u.place == "King's Park") {
                output += "&nbsp&nbsp&nbsp<img src='images/UVindex-48.png'></img> " + u.value;
                break;
              }
            }
          }
          if (warn) {
            warning = "<span id='warningput'>WARNING: </span>";
            for (let war of warn) {
              warning += "<span id='warningput'>" + war + "</span><br>";
            }
          }
          console.log(output);
          document.getElementById('headerput2').innerHTML = output;
          document.getElementById('headerput3').innerHTML = warning +
            "<br>Last Update: " + update.substring(11, 19);
        });
      } else {
        console.log("HTTP return status: " + response.status);
      }
    });
  makeMydata();
}

function makeHeader() {
  var header = document.createElement("div");
  header.className = "header";
  header.id = 'header';
  var headerput = document.createElement("h1");
  headerput.id = "headerput";
  headerput.textContent = "Hong Kong";
  var headerput2 = document.createElement("h1");
  headerput2.id = "headerput2";
  headerput2.textContent = "loading";
  var headerput3 = document.createElement("div");
  headerput3.id = "headerput3";
  headerput3.textContent = "loading";

  header.appendChild(headerput);
  header.appendChild(headerput2);
  header.appendChild(headerput3);
  document.body.appendChild(header);

  getHeader();
}

function getTemp() {
  let place = document.getElementById('place').value;
  console.log("sele", place);
  if (station[place].length > 2) {
    document.getElementById('tempput').textContent = station[place][2] + " °C";
  } else {
    document.getElementById('tempput').textContent = "no data";
  }
}

function makeTemperatures() {
  var temperatures = document.createElement("div");
  temperatures.innerHTML = "Temperatures<br><br>" +
    '<label for="place">Select the location</label>' +
    '<select name="place" id="place">' +
    '<option value="Chek Lap Kok" selected>Chek Lap Kok</option>' +
    '<option value="Cheung Chau">Cheung Chau</option>' +
    '<option value="Happy Valley">Happy Valley</option>' +
    '<option value="Hong Kong Observatory">Hong Kong Observatory</option>' +
    '<option value="Hong Kong Park">Hong Kong Park</option>' +
    '<option value="Kai Tak Runway Park">Kai Tak Runway Park</option>' +
    '<option value="King\'s Park">King\'s Park</option>' +
    '<option value="Kowloon City">Kowloon City</option>' +
    '<option value="Kwun Tong">Kwun Tong</option>' +
    '<option value="Lau Fau Shan">Lau Fau Shan</option>' +
    '<option value="Sai Kung">Sai Kung</option>' +
    '<option value="Sha Tin">Sha Tin</option>' +
    '<option value="Sham Shui Po">Sham Shui Po</option>' +
    '<option value="Shau Kei Wan">Shau Kei Wan</option>' +
    '<option value="Shek Kong">Shek Kong</option>' +
    '<option value="Stanley">Stanley</option>' +
    '<option value="Ta Kwu Ling">Ta Kwu Ling</option>' +
    '<option value="Tai Mei Tuk">Tai Mei Tuk</option>' +
    '<option value="Tai Po">Tai Po</option>' +
    '<option value="Tsing Yi">Tsing Yi</option>' +
    '<option value="Tsuen Wan Ho Koon">Tsuen Wan Ho Koon</option>' +
    '<option value="Tsuen Wan Shing Mun Valley">Tsuen Wan Shing Mun Valley</option>' +
    '<option value="Tseung Kwan O">Tseung Kwan O</option>' +
    '<option value="Tuen Mun">Tuen Mun</option>' +
    '<option value="Wong Chuk Hang">Wong Chuk Hang</option>' +
    '<option value="Wong Tai Sin">Wong Tai Sin</option>' +
    '<option value="Yuen Long Park">Yuen Long Park</option>' +
    '</select><br>';

  var bttn = document.createElement("button");
  bttn.addEventListener("click", getTemp);
  bttn.textContent = "Check";
  bttn.id = "bttn";
  temperatures.appendChild(bttn);

  var tempput = document.createElement("h2");
  tempput.id = "tempput";
  tempput.textContent = "select a location";
  temperatures.appendChild(tempput);
  return temperatures;
}

function findDistance(lat, long, lat2, long2) {
  let x = (long - long2) * Math.cos((lat + lat2) * Math.PI / 360) * Math.PI / 180;
  let y = (lat - lat2) * Math.PI / 180;
  let d = Math.sqrt(x * x + y * y) * 6371;
  return d
}

function findclosest(lat, long) {
  let dists = [];
  for (let place in station) {
    let entry = [place];
    entry.push(findDistance(lat, long, station[place][0], station[place][1]));
    dists.push(entry);
  }
  let closestd = dists[0][1],
    closest = dists[0][0];
  for (let entry of dists) {
    if (closestd > entry[1]) {
      closestd = entry[1];
      closest = entry[0];
    }
  }
  return closest;
}

function finddistrict(lat, long) {
  let dists = [];
  for (let place in aqhidistrict) {
    let entry = [place];
    entry.push(findDistance(lat, long, aqhidistrict[place][0], aqhidistrict[place][1]));
    dists.push(entry);
  }
  let closestd = dists[0][1],
    closest = dists[0][0];
  for (let entry of dists) {
    if (closestd > entry[1]) {
      closestd = entry[1];
      closest = entry[0];
    }
  }
  return closest;
}

function findrain(lat, long) {
  let dists = [];
  for (let place in raindistrict) {
    let entry = [place];
    entry.push(findDistance(lat, long, raindistrict[place][0], raindistrict[place][1]));
    dists.push(entry);
  }
  let closestd = dists[0][1],
    closest = dists[0][0];
  for (let entry of dists) {
    if (closestd > entry[1]) {
      closestd = entry[1];
      closest = entry[0];
    }
  }
  return closest;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  document.getElementById("locationput").innerHTML = "Latitude: " + lat +
    "<br>Longitude: " + lon;
  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`)
    .then(response => {
      if (response.status == 200) { //receive response successfully
        response.json().then(locate => {
          let output = "aaaaa123123sdf<br>";
          let surburb = 'unknown',
            district = 'unknown';
          //Write the data beneath the button
          let data = locate.address;

          if (data["town"]) surburb = data["town"];
          if (data["borough"]) surburb = data["borough"];
          if (data["surburb"]) surburb = data['suburb'];

          if (data['county']) district = data['county'];
          if (data['city_district']) district = data['city_district'];

          let closest = findclosest(lat, lon);
          getaqhi(lat, lon);
          console.log(data);
          console.log("closest temp is", closest);
          document.getElementById('locationput').innerHTML = district + "<br>" +
            surburb + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
            "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +
            "<span id = 'mylocationfonts'>" + station[closest][2] + " °C</span>";
        });
      } else {
        console.log("HTTP return status: " + response.status);
      }
    });
}

function getaqhi(lat, long) {
  fetch(`https://dashboard.data.gov.hk/api/aqhi-individual?format=json`)
    .then(response => {
      if (response.status == 200) { //receive response successfully
        response.json().then(aqhi => {
          let output = "<img src='images/rain-48.png'></img>";
          let closestrain = findrain(lat, long);
          console.log("closest rain is", closestrain);
          output += raindistrict[closestrain][2] + "mm";
          output += "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
          //Write the data beneath the button
          for (let entry of aqhi) {
            aqhidistrict[entry.station].push(entry.aqhi);
            aqhidistrict[entry.station].push(entry.health_risk);
          }
          let closestdistrict = finddistrict(lat, long);
          console.log("closest aqhi is", closestdistrict);
          if (aqhidistrict[closestdistrict][3] == "Low") output += "<img src='images/aqhi-low.png'></img>";
          else if (aqhidistrict[closestdistrict][3] == "Moderate") output += "<img src='images/aqhi-moderate.png'></img>";
          else if (aqhidistrict[closestdistrict][3] == "High") output += "<img src='images/aqhi-high.png'></img>";
          else if (aqhidistrict[closestdistrict][3] == "Very High") output += "<img src='images/aqhi-very_high.png'></img>";
          else if (aqhidistrict[closestdistrict][3] == "Serious") output += "<img src='images/aqhi-serious.png'></img>";
          output += "<span id='mylocationfonts'> " + aqhidistrict[closestdistrict][2] +
            " " + aqhidistrict[closestdistrict][3] + '</span>';
          document.getElementById('locationput2').innerHTML = output;
        });
      } else {
        console.log("HTTP return status: " + response.status);
      }
    });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function makeLocation() {
  var location = document.createElement("div");
  var locationput = document.createElement("h3");
  var locationput2 = document.createElement("h3");
  locationput.id = "locationput";
  locationput2.id = "locationput2";
  location.textContent = "My Location";
  locationput2.textContent = "loading";
  location.appendChild(locationput);
  location.appendChild(locationput2);
  getLocation();
  return location;
}

function makeMydata() {
  var mydata = document.createElement("div");
  var location = makeLocation();
  var temperatures = makeTemperatures();
  mydata.className = "mydata";
  location.className = "location";
  temperatures.className = "temperatures";

  mydata.appendChild(location);
  mydata.appendChild(temperatures);
  document.body.appendChild(mydata);
}

function getForecast() {
  fetch(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en`)
    .then(response => {
      if (response.status == 200) { //receive response successfully
        response.json().then(forecast => {
          let table = document.getElementById('forecasttable');
          let row1 = document.createElement('tr');
          let row2 = document.createElement('tr');
          let row3 = document.createElement('tr');
          let row4 = document.createElement('tr');
          //Write the data beneath the button
          let data = forecast.weatherForecast;
          for (let chunk of data) {
            let icon = chunk.ForecastIcon;
            let cell1 = document.createElement('td');
            let cell2 = document.createElement('td');
            let cell3 = document.createElement('td');
            let cell4 = document.createElement('td');
            cell1.innerHTML = chunk.week.substr(0, 3) + " " + chunk.forecastDate.substr(4, 4);
            cell2.innerHTML = "<img class='forecasticon' src='https://www.hko.gov.hk/images/HKOWxIconOutline/pic" +
              icon + ".png'></img>";
            cell3.innerHTML = chunk.forecastMintemp.value + "-" + chunk.forecastMaxtemp.value + " °C";
            cell4.innerHTML = chunk.forecastMinrh.value + "-" + chunk.forecastMaxrh.value + " %";
            row1.appendChild(cell1);
            row2.appendChild(cell2);
            row3.appendChild(cell3);
            row4.appendChild(cell4);
          }
          table.appendChild(row1);
          table.appendChild(row2);
          table.appendChild(row3);
          table.appendChild(row4);
        });
      } else {
        console.log("HTTP return status: " + response.status);
      }
    });
}

function makeForecast() {
  var forecast = document.createElement("div");
  forecast.className = "forecast";

  var forecastput = document.createElement("h2");
  forecastput.id = "forecastput";
  forecastput.textContent = "9-day forecast";
  var forecastput2 = document.createElement("table");
  forecastput2.id = "forecasttable";
  getForecast();

  forecast.appendChild(forecastput);
  forecast.appendChild(forecastput2);
  document.body.appendChild(forecast);
}