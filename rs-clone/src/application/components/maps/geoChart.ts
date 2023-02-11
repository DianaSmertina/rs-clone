export function drawChart(
    container: HTMLElement,
    countries = [
        ['Country', 'Popularity'],
        ['Germany', 200],
        ['United States', 300],
        ['Brazil', 400],
        ['Canada', 500],
        ['France', 600],
        ['RU', 700],
    ]
) {
    google.charts.load('current', {
        callback: drawRegionsMap,
        packages: ['geochart'],
    });
    google.charts.setOnLoadCallback(drawRegionsMap);
    function drawRegionsMap() {
        const data = google.visualization.arrayToDataTable(countries);
        const options = {};
        const chart = new google.visualization.GeoChart(container);
        chart.draw(data, options);
    }
}
