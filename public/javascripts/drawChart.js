$('#urlForm').submit(function (event) {
  $('#results').empty().append('<div class="loader">Loading...</div>');
  var data = {url: $('input[name=url]').val()};
  $.ajax({
    type: 'POST',
    url: '/api/phantom',
    data: data
  }).done(drawChart)
  event.preventDefault();
})

google.charts.load('current', {'packages':['timeline']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(data) {
  var container = document.getElementById('results');
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();

  dataTable.addColumn({ type: 'string', id: 'URL' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });
  if (!data) {
    data = JSON.parse('{"http://www.google.com/":{"start":1478769287656,"end":1478769287841},"http://ssl.gstatic.com/gb/images/b_8d5afc09.png":{"start":1478769287861,"end":1478769287901},"http://www.google.com/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png":{"start":1478769287881,"end":1478769287901},"http://www.google.com/images/nav_logo229.png":{"start":1478769287901,"end":1478769287902},"http://www.google.com/xjs/_/js/k=xjs.hp.en_US.cmA6h26pE9U.O/m=sb_he,d/rt=j/d=1/t=zcms/rs=ACT90oEtVO643YtBrYFaiv-lrrBa9rRVwQ":{"start":1478769287981,"end":1478769287982},"http://www.google.com/client_204?&atyp=i&biw=400&bih=300&ei=hzokWML7JciMmQGvrZOwAw":{"end":1478769287982}}')
  }
  var rows = [];
  for (url in data) {
    if (data[url].start && data[url].end) {
      rows.push([url, new Date(data[url].start * 10), new Date(data[url].end * 10)])
    }
  }
  dataTable.addRows(rows)
  var height = 42 * dataTable.getNumberOfRows() + 50;

  var options = {
        colors: ['#0dc5c1'],
        height: height
      };

  chart.draw(dataTable, options);
}
