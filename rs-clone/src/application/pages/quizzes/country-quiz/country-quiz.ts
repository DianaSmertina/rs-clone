import Page from '../../../patterns/pagePattern';
// import { drawChart } from '../../../components/maps/geoChart';
import { createOurElement } from '../../../patterns/createElement';
import { getState, getDataArr, getRandomCountry, getAnswers, shuffle, checkAnswer } from './functions';
// import { dataObj } from './types';

// const localStorObj = getState('002');

// const regionDataArr = getDataArr('002');

// const randomCountry = getRandomCountry(regionDataArr);

// function drawChart(container: HTMLElement) {
//     google.charts.load('current', {
//         callback: drawRegionsMap,
//         packages: ['geochart'],
//         mapsApiKey: 'AIzaSyB6SRulzmagMGauUAszpYABPwn3kZ57itg',
//     });
//     google.charts.setOnLoadCallback(drawRegionsMap);

//     function drawRegionsMap() {
//         if (!randomCountry) return;
//         const data = google.visualization.arrayToDataTable([
//             ['Country', 'Latitude'],
//             [randomCountry, 0],
//         ]);
//         const options = {
//             region: localStorObj.regionCode,
//             colorAxis: { colors: ['#00853F'] },
//             backgroundColor: '#0D98BA', //'#81d4fa'
//             datalessRegionColor: '#E0FFFF',
//         };
//         const chart = new google.visualization.GeoChart(container);
//         chart.draw(data, options);
//     }
// }

// const countriesForAnswer = shuffle(getAnswers(randomCountry, regionDataArr));

export class CountryQuiz extends Page {
    constructor(id: string) {
        super(id);
    }
    render() {
        const localStorObj = getState('002');

        const regionDataArr = getDataArr('002');

        const randomCountry = getRandomCountry(regionDataArr);

        function drawChart(container: HTMLElement) {
            google.charts.load('current', {
                callback: drawRegionsMap,
                packages: ['geochart'],
                mapsApiKey: 'AIzaSyB6SRulzmagMGauUAszpYABPwn3kZ57itg',
            });
            google.charts.setOnLoadCallback(drawRegionsMap);

            function drawRegionsMap() {
                if (!randomCountry) return;
                const data = google.visualization.arrayToDataTable([
                    ['Country', 'Latitude'],
                    [randomCountry, 0],
                ]);
                const options = {
                    region: localStorObj.regionCode,
                    colorAxis: { colors: ['#00853F'] },
                    backgroundColor: '#0D98BA', //'#81d4fa'
                    datalessRegionColor: '#E0FFFF',
                };
                const chart = new google.visualization.GeoChart(container);
                chart.draw(data, options);
            }
        }

        const countriesForAnswer = shuffle(getAnswers(randomCountry, regionDataArr));

        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mainTitle = createOurElement('h1', 'main__title', 'Guess Country');

        const geoChartWrap = document.createElement('div');
        geoChartWrap.id = 'regions_div';
        drawChart(geoChartWrap);
        const answersBlock = createOurElement('div', 'answers flex-rows', '');
        countriesForAnswer.forEach((country) => {
            const answer = createOurElement('button', 'btn btn__bordered answer', `${country}`);
            answer.id = `${country}`;
            answer.addEventListener(
                'click',
                function clickHandler(e: Event) {
                    checkAnswer(e.target, randomCountry, regionDataArr);
                },
                false
            );
            answersBlock.append(answer);
        });

        const nextBtn = createOurElement('button', 'btn btn__colored btn__next', 'Дальше');
        nextBtn.id = 'nextBtn';
        nextBtn.setAttribute('disabled', 'disabled');
        nextBtn.addEventListener('click', () => {
            (document.querySelector('.main') as HTMLElement).innerHTML = '';
            this.render();
        });
        mainWrapper.append(mainTitle, geoChartWrap, answersBlock, nextBtn);
        this.container.append(mainWrapper);

        mainWrapper.append(mainTitle, geoChartWrap, answersBlock, nextBtn);
        this.container.append(mainWrapper);
        return this.container;
    }
}

export default CountryQuiz;
