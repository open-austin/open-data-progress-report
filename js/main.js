"use strict"

console.log("Hello internet makers!");

var url = 'https://data.austintexas.gov/resource/8qty-vat2.json';
var portalData;

console.log('GET', url);

$.ajax({
    method: 'GET',
    url: url,
}).done(function(data, status) {
    console.log('DONE: Status is ', status)
    portalData = data;

    fillHeader(portalData);
    fillCards(portalData);

}).fail(function(xhr, status, err) {
    console.error('fail', status, err);
});

function fillHeader(data){
    $(".dept-count").text(data.length);

}

function fillCards(data){

    for (var i = 0; i < data.length; i++) {

      var $container = $(".container").append(htmlBlock);

      $container.children().last().addClass("card-"+i);

      var cardDeptName = ".card-" + i + " .dept-name";
      var liasonScore = ".card-" + i + " .liaison-score";
      var inventoryScore = ".card-" + i + " .inventory-score";
      var plansScore = ".card-" + i + " .plans-score";
      var publicationScore = ".card-" + i + " .publication-score";

      if ( data[i].liaison === "completed" ){
          $(liasonScore).addClass("green");
      }

      if ( data[i].inventory === "submitted" ){
          $(inventoryScore).addClass("green");
      } else if ( data[i].inventory === "in progress" ){
          $(inventoryScore).addClass("yellow");
      } else if ( data[i].inventory === "not started" ){
          $(inventoryScore).addClass("red");
      }

      if ( data[i].plans === "submitted" ){
          $(plansScore).addClass("green");
      } else if ( data[i].plans === "not yet" ){
          $(plansScore).addClass("red");
      }

      if ( data[i].publication === "completed" ){
          $(publicationScore).addClass("green");
      } else if ( data[i].publication === "in progress" ){
          $(publicationScore).addClass("yellow");
      } else if ( data[i].publication === "unknown" ){
          $(publicationScore).addClass("red");
      }



      $(cardDeptName).text(data[i].dept)
      $(liasonScore).text(data[i].liaison)
      $(inventoryScore).text(data[i].inventory)
      $(plansScore).text(data[i].plans)
      $(publicationScore).text(data[i].publication)

      var imgFilename = data[i].dept.toLowerCase().replace(/\s+/g, "-");
      var imgPath = "img/" + imgFilename + ".svg";

      $(".card-" + i + " .dept-icon").attr("src", imgPath)

    };

}

htmlBlock = '<div class="card"> \
                <p class="dept-name"></p> \
                <img class="dept-icon" src=""/> \
                <div class="score-row"> \
                    <div class="score">\
                        <img class="metric-icon" src="img/liaison.svg"/>\
                        <p class="score-text liaison-score"></p>\
                    </div>\
                    <div class="score">\
                        <img class="metric-icon" src="img/inventory.svg"/>\
                        <p class="score-text inventory-score"></p>\
                    </div>\
                    <div class="score">\
                        <img class="metric-icon" src="img/plan.svg"/>\
                        <p class="score-text plans-score"></p>\
                    </div>\
                    <div class="score">\
                        <img class="metric-icon" src="img/publish.svg"/>\
                        <p class="score-text publication-score"></p>\
                    </div>\
                </div>\
            </div>'
