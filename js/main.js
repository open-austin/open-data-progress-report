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

      if ( portalData[i].liaison === "completed" ){
          $(liasonScore).addClass("green");
      }

      if ( portalData[i].inventory === "submitted" ){
          $(inventoryScore).addClass("green");
      } else if ( portalData[i].inventory === "in progress" ){
          $(inventoryScore).addClass("yellow");
      } else if ( portalData[i].inventory === "not started" ){
          $(inventoryScore).addClass("red");
      }

      if ( portalData[i].plans === "submitted" ){
          $(plansScore).addClass("green");
      } else if ( portalData[i].plans === "not yet" ){
          $(plansScore).addClass("red");
      }

      if ( portalData[i].publication === "completed" ){
          $(publicationScore).addClass("green");
      } else if ( portalData[i].publication === "in progress" ){
          $(publicationScore).addClass("yellow");
      } else if ( portalData[i].publication === "unknown" ){
          $(publicationScore).addClass("red");
      }



      $(cardDeptName).text(portalData[i].dept)
      $(liasonScore).text(portalData[i].liaison)
      $(inventoryScore).text(portalData[i].inventory)
      $(plansScore).text(portalData[i].plans)
      $(publicationScore).text(portalData[i].publication)

      var imgFilename = portalData[i].dept.toLowerCase().replace(/\s+/g, "-");
      var imgPath = "img/" + imgFilename + ".svg";

      $(".card-" + i + " .dept-icon").attr("src", imgPath)

    };


}

var htmlBlock = '<div class="card"> \
                    <p class="dept-name"></p> \
                    <img class="dept-icon" src=""/> \
                <div class="score-row"> \
                    <div class="score">\
                        <p class="score-title">Liaison</p>\
                        <p class="score-text liaison-score"></p>\
                    </div>\
                    <div class="score">\
                        <p class="score-title">Inventory</p>\
                        <p class="score-text inventory-score"></p>\
                    </div>\
                    <div class="score">\
                        <p class="score-title">Plans</p>\
                        <p class="score-text plans-score"></p>\
                    </div>\
                    <div class="score">\
                        <p class="score-title">Publication</p>\
                        <p class="score-text publication-score"></p>\
                    </div>\
                </div>'
