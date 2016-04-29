$( document ).ready(function() {
    $('#indexPage').show();
    $('#resultPage').hide();
    $('#moreInfoPage').hide();
});

$('#submit').click(function() {
    $('#indexPage').hide();
    $('#resultPage').show();
    $('#moreInfoPage').hide();
    var bandId = "";
    var bandKeyword = document.getElementById('bandTextBox').value;
    console.log("bandKeyword: " + bandKeyword);
    var url = "";
    url = "https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=dHNgGAzAAIlClob7KKxCfAr3nI86ocQu";
    if (bandKeyword != null) {
        url += '&keyword="' + bandKeyword + '"';
        $.getJSON(url, function (data1) {
            console.log(data1);
            bandId = data1["_embedded"].attractions[0].id;
            console.log(bandId);
            var eventBandNames = "";
            var fullBandNames = "";
            var variousBands = "";
            var eventImage = "";
            //var eventDateFrom = $('#datepickerFrom').value;
            //var eventDateTo = $('#datepickerTo').value;
            url = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=dHNgGAzAAIlClob7KKxCfAr3nI86ocQu";

            /*fix this
            if (eventDateFrom != null) {
                url += "&startDateTime=" + eventDateFrom;
            }
            if (eventDateTo != null) {
                url += "&endDateTime"
            }
            fix this */

            url += "&attractionId=" + bandId;
            $.getJSON(url, function (data) {
                var resultsWidth = 0;
                $('#allResults').innerHTML = "";
                console.log(data);
                for (var i = 0; i < data["_embedded"].events.length; i++) {
                    eventImage = data["_embedded"].events[i].images[0].url;
                    eventBandNames = "";
                    for (var j = 0; j < data["_embedded"].events[i]["_embedded"].attractions.length; j++) {
                        if(data["_embedded"].events[i]["_embedded"].attractions.length === 1) {
                            variousBands = eventBandNames += data["_embedded"].events[i]["_embedded"].attractions[j].name;
                        } else if (data["_embedded"].events[i]["_embedded"].attractions.length > 1) {
                            variousBands = "Various";
                        }

                        if (j < 3) {
                            eventBandNames += data["_embedded"].events[i]["_embedded"].attractions[j].name + ", ";
                        } else if (j = data["_embedded"].events[i]["_embedded"].attractions.length - 1) {
                            eventBandNames += '+' + (j - 2) + ' more, ';
                        }
                        fullBandNames += data["_embedded"].events[i]["_embedded"].attractions[j].name + ", ";
                    }
                    $('#allResults').append("<div class='results' id='resultTab" + i + "'>" +
                        "<h2>" + data["_embedded"].events[i].name + "</h2>" +
                        "<img class='eventImage' src='" + eventImage + "' width='100%' style='margin-bottom: 10px;'>" +
                        "<p class='eventTabDetails'>" + data['_embedded'].events[i]["_embedded"].venues[0].city.name + ", </p><p class='eventTabDetails'>" + eventBandNames + "</p><p class='eventTabDetails'>" + data['_embedded'].events[i].dates.start.localDate + "</p>" +
                        "<p class='moreInfo'><a>More Info...</a></p>" +
                        "<p class='eventTabDetails' style='display: none'>" + fullBandNames + "</p>" + "<p class='eventTabDetails' style='display: none'>" + variousBands + "</p>" +
                        "</div>");
                    resultsWidth += 400;
                }
                document.getElementById("allResults").style.width = resultsWidth + "px";
                var resultId = "";
                $('.moreInfo').click(function() {
                    $('#indexPage').hide();
                    $('#resultPage').hide();
                    $('#moreInfoPage').show();
                    resultId = $(this).parent().attr("id");
                    document.getElementsByClassName("eventName")[0].innerHTML = document.getElementById(resultId).getElementsByTagName("h2")[0].innerHTML;
                    document.getElementsByClassName("eventName")[1].innerHTML = document.getElementById(resultId).getElementsByTagName("h2")[0].innerHTML;
                    document.getElementsByClassName("cityName")[0].innerHTML = document.getElementById(resultId).getElementsByClassName("eventTabDetails")[0].innerHTML;
                    document.getElementsByClassName("cityName")[1].innerHTML = document.getElementById(resultId).getElementsByClassName("eventTabDetails")[0].innerHTML;
                    document.getElementsByClassName("date")[0].innerHTML = document.getElementById(resultId).getElementsByClassName("eventTabDetails")[2].innerHTML;
                    document.getElementsByClassName("date")[1].innerHTML = document.getElementById(resultId).getElementsByClassName("eventTabDetails")[2].innerHTML;
                    document.getElementById("artists").innerHTML = document.getElementById(resultId).getElementsByClassName("eventTabDetails")[3].innerHTML;
                    document.getElementById("eventImage").setAttribute("src", document.getElementById(resultId).getElementsByClassName("eventImage")[0].getAttribute("src"));
                    document.getElementById("eventImage").setAttribute("width", 300);
                    document.getElementsByClassName("artistName")[0].innerHTML = document.getElementById(resultId).getElementsByClassName("eventTabDetails")[4].innerHTML;
                });
                });
                $('.logo').click(function() {
                    $('#indexPage').show();
                    $('#resultPage').hide();
                    $('#moreInfoPage').hide();
                });
        });
    };
});