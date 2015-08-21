"use strict"

var url = 'https://data.austintexas.gov/resource/8qty-vat2.json';
var url2 = 'https://data.austintexas.gov/api/views/8qty-vat2.json';
var htmlBlock;


console.log('GET', url);
$.ajax({
    method: 'GET',
    url: url,
}).done(function(data, status) {
    console.log('DONE: Status is ', status)
    fillHeader(data);
    fillCards(data);
}).fail(function(xhr, status, err) {
    console.error('fail', status, err);
});

console.log('GET', url2);
$.ajax({
    method: 'GET',
    url: url2,
}).done(function(data, status) {
    console.log('DONE: Status is ', status)
    findLastUpdate(data);
}).fail(function(xhr, status, err) {
    console.error('fail', status, err);
});

function fillHeader(data){
    $(".dept-count").text(data.length);
}

function findLastUpdate(data){
    var date = new Date(data.rowsUpdatedAt * 1000);
    $(".updated-date").text(date.toDateString());
}

function fillCards(data){

    for (var i = 0; i < data.length; i++) {
      var $container       = $(".container"),
          cardDeptName     = ".card-" + i + " .dept-name",
          liasonScore      = ".card-" + i + " .liaison-score",
          inventoryScore   = ".card-" + i + " .inventory-score",
          plansScore       = ".card-" + i + " .plans-score",
          publicationScore = ".card-" + i + " .publication-score";

      $container.append(htmlBlock);
      $container.children().last().addClass("card-"+i);


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
      $(liasonScore + " .score-text").text(data[i].liaison)
      $(inventoryScore + " .score-text").text(data[i].inventory)
      $(plansScore + " .score-text").text(data[i].plans)
      $(publicationScore + " .score-text").text(data[i].publication)

      var imgFilename = data[i].dept.toLowerCase().replace(/\s+/g, "-");
      var imgPath = "img/" + imgFilename + ".svg";

      $(".card-" + i + " .dept-icon").attr("src", imgPath)

    };

    insertSVGIcon(".liaison-score", liaisonIcon);
    insertSVGIcon(".inventory-score", inventoryIcon);
    insertSVGIcon(".plans-score", planIcon);
    insertSVGIcon(".publication-score", publishIcon);

}

function insertSVGIcon(selector, icon){
  $(selector).prepend(icon)
}

htmlBlock = '<div class="card"> \
                <p class="dept-name"></p> \
                <img class="dept-icon" src=""/> \
                <div class="score-row"> \
                    <div class="score liaison-score">\
                        <p class="score-text"></p>\
                    </div>\
                    <div class="score inventory-score">\
                        <p class="score-text"></p>\
                    </div>\
                    <div class="score plans-score">\
                        <p class="score-text"></p>\
                    </div>\
                    <div class="score publication-score">\
                        <p class="score-text"></p>\
                    </div>\
                </div>\
            </div>'
