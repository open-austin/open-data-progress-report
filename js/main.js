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

      $(cardDeptName).text(portalData[i].dept)
      $(liasonScore).text(portalData[i].liaison)
      $(inventoryScore).text(portalData[i].inventory)
      $(plansScore).text(portalData[i].plans)
      $(publicationScore).text(portalData[i].publication)
    };


}

var htmlBlock = '<div class="card"><p class="dept-name"></p> \
                <div class="score-row"> \
                    <div class="score">\
                        <p class="score-title">Liaison</p>\
                        <p class="liaison-score"></p>\
                    </div>\
                    <div class="score">\
                        <p class="score-title">Inventory</p>\
                        <p class="inventory-score"></p>\
                    </div>\
                    <div class="score">\
                        <p class="score-title">Plans</p>\
                        <p class="plans-score"></p>\
                    </div>\
                    <div class="score">\
                        <p class="score-title">Publication</p>\
                        <p class="publication-score"></p>\
                    </div>\
                </div>'
