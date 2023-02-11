export function drawChart(container: HTMLElement, countryData: Array<Array<string | number>>) {
    google.charts.load('current', {
        callback: drawRegionsMap,
        packages: ['geochart'],
    });
    google.charts.setOnLoadCallback(drawRegionsMap);
    function drawRegionsMap() {
        // console.log(countryData);
        // const data = google.visualization.arrayToDataTable([['fdbdb'], ['South Korea']]);
        const data = google.visualization.arrayToDataTable(countryData);
        const options = {
            region: '142',
        };
        const chart = new google.visualization.GeoChart(container);
        chart.draw(data, options);
        // function selectHandler() {
        //     const selectedItem = chart.getSelection()[0];
        //     if (selectedItem) {
        //         console.log(selectedItem.row);
        //     }
        // }
        function choseAnswerOption() {
            const selectedItem = chart.getSelection()[0];
            const answersBlock = Array.from(document.querySelectorAll('.btn__population'));
            if (selectedItem && answersBlock) {
                console.log(selectedItem.row, answersBlock);
                for (const btn of answersBlock) {
                    if (btn.innerHTML === '') {
                        btn.innerHTML = `${countryData[Number(selectedItem.row) + 1][0]}`;
                        break;
                    }
                }
            }
        }
        google.visualization.events.addListener(chart, 'select', choseAnswerOption);
    }
}
