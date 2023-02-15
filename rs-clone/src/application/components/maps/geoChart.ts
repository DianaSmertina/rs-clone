import { QuizFlag } from '../../pages/quizzes/flags';
import { PopulationQuestion } from '../../pages/quizzes/population-quiz/component';
import { CountryQuiz } from '../../pages/quizzes/country-quiz/page';

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
    ],
    quiz = 'flags',
    mapOptions: {
        backgroundColor?: string;
        region?: string;
        colorAxis?: { colors: Array<string> };
        legend?: 'none';
        datalessRegionColor?: '#E0FFFF';
        enableRegionInteractivity?: boolean;
    } = {
        backgroundColor: '#81d4fa',
    }
) {
    google.charts.load('current', {
        callback: drawRegionsMap,
        packages: ['geochart'],
        mapsApiKey: 'AIzaSyB6SRulzmagMGauUAszpYABPwn3kZ57itg',
    });
    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {
        const data = google.visualization.arrayToDataTable(countries);
        const options = mapOptions;
        const chart = new google.visualization.GeoChart(container);

        chart.draw(data, options);

        if (quiz === 'population') {
            PopulationQuestion.ourChart = chart;
        } else if (quiz === 'countries') {
            CountryQuiz.ourChart = chart;
        } else {
            QuizFlag.ourChart = chart;
        }
    }
}
