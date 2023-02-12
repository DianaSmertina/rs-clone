import Page from '../../../patterns/pagePattern';
// import { drawChart } from '../../../components/maps/';
import { createOurElement } from '../../../patterns/createElement';
import {
    getDataArr,
    getInitialState,
    getRandomNumber,
    getRandomCountry,
    getAnswers,
    deleteUsedCountry,
    shuffle,
    checkAnswer,
} from './functions';

const regionDataArr = getDataArr('Africa');
const stateObj = getInitialState(regionDataArr);
const randomNumber = getRandomNumber(stateObj.min, stateObj.max);
const randomCountry = getRandomCountry(regionDataArr, randomNumber);

function drawChart(container: HTMLElement) {
    google.charts.load('current', {
        callback: drawRegionsMap,
        packages: ['geochart'],
    });
    google.charts.setOnLoadCallback(drawRegionsMap);
    function drawRegionsMap() {
        const data = google.visualization.arrayToDataTable([
            ['Country', 'Latitude'],
            [randomCountry, 0],
        ]);
        const options = {
            region: stateObj.region,
            colorAxis: { colors: ['#FF6600'] },
            backgroundColor: '#0D98BA', //'#81d4fa'
            datalessRegionColor: '#E0FFFF',
        };
        const chart = new google.visualization.GeoChart(container);
        chart.draw(data, options);
    }
}

deleteUsedCountry(randomCountry, regionDataArr);

const countriesForAnswer = shuffle(getAnswers(randomCountry, regionDataArr));

class CountryQuiz extends Page {
    constructor(id: string) {
        super(id);
    }

    render() {
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
                    checkAnswer(e.target, randomCountry);
                },
                false
            );
            answersBlock.append(answer);
        });

        const nextBtn = createOurElement('button', 'btn btn__colored btn__next', 'Дальше');
        nextBtn.id = 'nextBtn';
        nextBtn.setAttribute('disabled', 'disabled');
        mainWrapper.append(mainTitle, geoChartWrap, answersBlock, nextBtn);
        this.container.append(mainWrapper);

        mainWrapper.append(mainTitle, geoChartWrap, answersBlock, nextBtn);
        this.container.append(mainWrapper);
        return this.container;
    }
}

export default CountryQuiz;
