
function enterdata() {
    event.preventDefault();
    var startCity = $("#departingCity").val().trim()
    var departCity = (startCity.charAt(0).toUpperCase() + startCity.slice(1))

    var endCity = $("#arrivalCity").val().trim()
    var arrCity = (endCity.charAt(0).toUpperCase() + endCity.slice(1))
    console.log(departCity, arrCity)

    if (!arrCity || !departCity) {
        return;
    }

    for (var i = 0; i < masterList.length; i++) {
        if (masterList[i].city.includes(departCity)) {
            var departCode = masterList[i].code
            console.log(departCode)}
            else { 
                alert("wrong mf!!!")
                return

            }
        if (masterList[i].city.includes(arrCity)) {
            var arrCode = masterList[i].code
          
        }
        if (masterList[i].city.includes(arrCity)) {
            var covidState = masterList[i].state
            localStorage.setItem("covid-state", covidState)
        }
    };
    var flightAPI = {
        "async": true,
        "crossDomain": true,
        "url": "https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/cheap?destination=" + arrCode + "&origin=" + departCode + "&currency=USD&page=1",
        "method": "GET",
        "headers": {
            "x-access-token": "3589015d11656c52187d4a9678569191",
            "x-rapidapi-host": "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
            "x-rapidapi-key": "8144acd97dmsh3d8d17d414f0cc6p1178d1jsn267a11f3f771"
        }
    }
    $.ajax(flightAPI).done(function (response) {
        localStorage.setItem("cheapestflight", JSON.stringify(response.data[arrCode][0]));
    });
    var covidAPI = {
        "async": true,
        "crossDomain": true,
        "url": "https://covid-19-statistics.p.rapidapi.com/reports?region_province=" + covidState + "&date=2020-07-01",
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
            "x-rapidapi-key": "8144acd97dmsh3d8d17d414f0cc6p1178d1jsn267a11f3f771"
        }
    }

    $.ajax(covidAPI).done(function (response2) {
        console.log(response2);
        localStorage.setItem("Covid-Stats", JSON.stringify(response2.data[0]))
        // return window.location.assign("results.html")
    });
}