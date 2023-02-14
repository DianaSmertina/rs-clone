import Page from '../../../patterns/pagePattern';
import { drawChart } from '../../../components/maps/geoChart';
import { createOurElement } from '../../../patterns/createElement';
import { getState, getDataArr, getRandomCountry, getAnswers, shuffle, checkAnswer } from './functions';

export class CountryQuiz extends Page {
    static ourChart: google.visualization.GeoChart;

    constructor(id: string) {
        super(id);
    }

    private renderPlayField(geoChartWrap: HTMLElement, answersBlock: HTMLElement, nextBtn: HTMLElement) {
        const localStorObj = getState('002');
        const regionDataArr = getDataArr('002');
        const randomCountry = getRandomCountry(regionDataArr);
        if (!randomCountry) {
            return;
        }

        const country = [
            ['Country', 'Latitude'],
            [randomCountry, 0],
        ];

        drawChart(geoChartWrap, country, 'countries', {
            region: localStorObj.regionCode,
            colorAxis: { colors: ['#00853F'] },
            backgroundColor: '#0D98BA',
            datalessRegionColor: '#E0FFFF',
        });

        const countriesForAnswer = shuffle(getAnswers(randomCountry, regionDataArr));

        countriesForAnswer.forEach((country) => {
            const answer = createOurElement('button', 'btn btn__bordered answer', `${country}`);
            answer.id = `${country}`;
            const rightAnswer = randomCountry;
            const arrAnswers = regionDataArr;
            answer.addEventListener(
                'click',
                function clickHandler(e: Event) {
                    checkAnswer(e.target, rightAnswer, arrAnswers);
                },
                false
            );
            answersBlock.append(answer);
        });

        nextBtn.setAttribute('disabled', 'disabled');
    }

    render() {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mainTitle = createOurElement('h1', 'main__title', 'Угадай страну');
        const geoChartWrap = document.createElement('div');
        geoChartWrap.id = 'regions_div';
        const nextBtn = createOurElement('button', 'btn btn__colored btn__next', 'Дальше');
        nextBtn.id = 'nextBtn';
        const answersBlock = createOurElement('div', 'answers flex-rows', '');

        this.renderPlayField(geoChartWrap, answersBlock, nextBtn);

        nextBtn.addEventListener('click', () => {
            (document.querySelector('.answers') as HTMLElement).innerHTML = '';
            this.renderPlayField(geoChartWrap, answersBlock, nextBtn);
        });

        mainWrapper.append(mainTitle, geoChartWrap, answersBlock, nextBtn);
        this.container.append(mainWrapper);
        return this.container;
    }
}

export default CountryQuiz;
