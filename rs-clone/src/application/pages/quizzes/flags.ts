import { drawChart } from '../../components/maps/geoChart';
import Page from '../../patterns/pagePattern';
import { createOurElement } from '../../patterns/createElement';
import { world } from '../../components/countries/data';

type countryWithFlag = typeof world & { flag: string };

export class QuizFlag extends Page {
    private flagsArr: countryWithFlag;

    static ourChart: google.visualization.GeoChart;

    constructor(id: string) {
        super(id);
        this.flagsArr = world.filter((obj) => Object.keys(obj).indexOf('flag') !== -1) as countryWithFlag;
    }

    render() {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mainTitle = createOurElement('h1', 'main__title', 'Country by flag');
        const nextBtn = createOurElement('button', 'btn btn__colored btn__next', 'Дальше');
        const rightWorld = createOurElement('h1', 'right-world', 'RIGHT!');
        const wrongWorld = createOurElement('h1', 'wrong-world', 'WRONG!');
        const geoChartWrap = document.createElement('div');
        geoChartWrap.id = 'regions_div';
        const flag = createOurElement('div', 'img-flag');

        this.renderContent(nextBtn, rightWorld, wrongWorld, geoChartWrap, flag);

        nextBtn.addEventListener('click', () => {
            this.renderContent(nextBtn, rightWorld, wrongWorld, geoChartWrap, flag);
        });
        mainWrapper.append(mainTitle, geoChartWrap, rightWorld, wrongWorld, flag, nextBtn);
        this.container.append(mainWrapper);
        return this.container;
    }

    private renderContent(
        nextBtn: HTMLElement,
        rightWorld: HTMLElement,
        wrongWorld: HTMLElement,
        geoChartWrap: HTMLElement,
        flag: HTMLElement
    ) {
        nextBtn.setAttribute('disabled', 'disabled');
        rightWorld.style.display = 'none';
        wrongWorld.style.display = 'none';

        const answer = this.randomiseCountry(this.flagsArr, 150000);

        const countriesForAnswer = [
            ['Country'],
            [answer.countryEn],
            [this.randomiseCountry(this.flagsArr, 150000).countryEn],
            [this.randomiseCountry(this.flagsArr, 150000).countryEn],
            [this.randomiseCountry(this.flagsArr, 150000).countryEn],
        ];

        drawChart(geoChartWrap, countriesForAnswer);

        flag.style.backgroundImage = answer.flag || '';

        setTimeout(() => {
            google.visualization.events.addListener(QuizFlag.ourChart, 'select', function () {
                const selected = QuizFlag.ourChart.getSelection()[0];
                if (selected) {
                    if (selected.row === 0) {
                        nextBtn.removeAttribute('disabled');
                        wrongWorld.style.display = 'none';
                        rightWorld.style.display = '';
                    } else {
                        wrongWorld.style.display = '';
                        rightWorld.style.display = 'none';
                    }
                }
            });
        }, 1000);
    }

    private randomiseCountry(arr: typeof world, area: number) {
        let country = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];

        while (country.area < area) {
            country = arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
        }

        return country;
    }
}
