import { drawChart } from '../../components/maps/geoChart';
import Page from '../../patterns/pagePattern';
import { createOurElement } from '../../patterns/createElement';
import { world } from '../../components/countries/data';
import { QuizResult } from './quizzesResults';

type countryWithFlag = typeof world & { flag: string };

export class QuizFlag extends Page {
    private flagsArr: countryWithFlag;

    private rightAnswers: number;

    private wrongAnswers: number;

    private availableToPlus: boolean;

    private availableToMinus: boolean;

    static ourChart: google.visualization.GeoChart;

    constructor(id: string) {
        super(id);
        this.flagsArr = world.filter((obj) => Object.keys(obj).indexOf('flag') !== -1) as countryWithFlag;
        this.rightAnswers = 0;
        this.wrongAnswers = 0;
        this.availableToPlus = true;
        this.availableToMinus = true;
    }

    render() {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mainTitle = createOurElement('h1', 'main__title', 'Узнай страну по флагу');
        const titleAndRound = createOurElement('div', 'main__wrapper wrapper title-and-round');
        const nextBtn = createOurElement('button', 'btn btn__colored btn__next', 'Дальше');
        const rightWorld = createOurElement('h1', 'right-world', 'Правильно!');
        const wrongWorld = createOurElement('h1', 'wrong-world', 'Неправильно!');
        const round = createOurElement('h1', 'quizz-round');
        const geoChartWrap = document.createElement('div');
        geoChartWrap.id = 'regions_div';
        const flag = createOurElement('div', 'img-flag');

        titleAndRound.append(mainTitle, round);

        this.renderContent(nextBtn, rightWorld, wrongWorld, geoChartWrap, flag, round);

        nextBtn.addEventListener('click', () => {
            if (this.rightAnswers !== 15) {
                this.renderContent(nextBtn, rightWorld, wrongWorld, geoChartWrap, flag, round);
            } else {
                this.container.append(new QuizResult('div', 'none', `${this.countResult()}%`).render());
            }
        });
        mainWrapper.append(titleAndRound, geoChartWrap, rightWorld, wrongWorld, flag, nextBtn);
        this.container.append(mainWrapper);
        return this.container;
    }

    private renderContent(
        nextBtn: HTMLElement,
        rightWorld: HTMLElement,
        wrongWorld: HTMLElement,
        geoChartWrap: HTMLElement,
        flag: HTMLElement,
        round: HTMLElement
    ) {
        this.availableToPlus = true;
        this.availableToMinus = true;

        nextBtn.setAttribute('disabled', 'disabled');
        rightWorld.style.display = 'none';
        wrongWorld.style.display = 'none';

        round.textContent = `${this.rightAnswers + 1}/15`;

        const answer = this.randomiseCountry(this.flagsArr, 150000);

        const countriesForAnswer = [
            ['Country', 'Name'],
            answer,
            this.randomiseCountry(this.flagsArr, 150000),
            this.randomiseCountry(this.flagsArr, 150000),
            this.randomiseCountry(this.flagsArr, 150000),
        ];

        drawChart(geoChartWrap, countriesForAnswer);

        flag.style.backgroundImage = world.find((el) => el.countryCodeLetters === answer[0])?.flag || '';

        setTimeout(() => {
            google.visualization.events.addListener(QuizFlag.ourChart, 'select', () => {
                const selected = QuizFlag.ourChart.getSelection()[0];
                if (selected) {
                    if (selected.row === 0) {
                        nextBtn.removeAttribute('disabled');
                        wrongWorld.style.display = 'none';
                        rightWorld.style.display = '';
                        if (this.availableToPlus) {
                            this.rightAnswers += 1;
                            this.availableToPlus = false;
                            this.availableToMinus = false;
                        }
                    } else {
                        wrongWorld.style.display = '';
                        rightWorld.style.display = 'none';
                        if (this.availableToMinus) {
                            this.wrongAnswers += 1;
                            this.availableToMinus = false;
                        }
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

        return [country.countryCodeLetters, country.countryRu];
    }

    private countResult() {
        return Math.floor(((this.rightAnswers - this.wrongAnswers) / (this.rightAnswers + this.wrongAnswers)) * 100);
    }
}
