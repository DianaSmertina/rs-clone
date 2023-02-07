//declare const google: any;

google.charts.load('current', {
    packages: ['geochart'],
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    const data = google.visualization.arrayToDataTable([
        ['Country', 'Popularity'],
        ['Germany', 200],
        ['United States', 300],
        ['Brazil', 400],
        ['Canada', 500],
        ['France', 600],
        ['RU', 700],
    ]);

    const options = {};

    const chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
}
