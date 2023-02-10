export function drawChart(container: HTMLElement, countryData: Array<Array<string | number>>) {
    google.charts.load('current', {
        callback: drawRegionsMap,
        packages: ['geochart'],
    });
    google.charts.setOnLoadCallback(drawRegionsMap);
    function drawRegionsMap() {
        const data = google.visualization.arrayToDataTable(countryData);
        const options = {};
        const chart = new google.visualization.GeoChart(container);
        chart.draw(data, options);
    }
}
