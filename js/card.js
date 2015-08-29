function main() {
    $.ajax({method: 'GET', url: 'https://data.austintexas.gov/resource/8qty-vat2.json'})
        .done(function(data, status) {
            console.log('DONE: Status is ', status)
            renderReport(data);
        })
        .fail(function(xhr, status, err) {
            console.error('fail', status, err);
        });

    $.ajax({method: 'GET', url: 'https://data.austintexas.gov/api/views/8qty-vat2.json'})
        .done(function(data, status) {
            console.log('DONE: Status is ', status)
            renderReportMetadata(data);
        })
        .fail(function(xhr, status, err) {
            console.error('fail', status, err);
        });
}


function renderReportMetadata(data) {
    var source = $('#metadata-template').html();
    var template = Handlebars.compile(source);
    var context = {
        updated: moment.unix(data.rowsUpdatedAt).fromNow()
    };
    $('.report-header').append(template(context));
}


function renderReport(data) {
    function scoreColor(status) {
        if (['submitted', 'completed'].indexOf(status) !== -1) {
            return 'green';
        }
        else if (['in progress'].indexOf(status) !== -1) {
            return 'yellow';
        }
        else if (['not started', 'not yet', 'unknown'].indexOf(status) !== -1) {
            return 'red';
        }
        else {
            return 'gray';
        }
    }

    var source = $('#card-template').html();
    var template = Handlebars.compile(source);

    var cardsHTML = data.map(function(dept) {
        var scores = {};
        ['liaison', 'inventory', 'plans', 'publication'].map(function(category) {
            scores[category] = {text: dept[category], color: scoreColor(dept[category])};
        });

        var imgFilename = dept.dept.toLowerCase().replace(/\s+/g, '-');
        var imgPath = 'img/' + imgFilename + '.svg';

        var context = {
            department: dept.dept,
            scores: scores,
            image: imgPath,
            data: data,
        };
        return template(context);
    });

    $('.report-container').html(cardsHTML);
}


$().ready(main);
