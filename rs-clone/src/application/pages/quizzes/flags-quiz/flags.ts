import { drawChart } from '../../../components/maps/geoChart';
import Page from '../../../patterns/pagePattern';
import { createOurElement } from '../../../patterns/createElement';
import { world, africa, america, asia, europe } from '../../../components/countries/data';
import { QuizResult } from '../quizzesResults';
import { codes } from '../../../components/countries/regionsCodes';
import { QuizRegion } from '../quizzesRegions';
import { playAudio, rightAnswAudio, wrongAnswAudio } from '../../../../application/components/sound/sound';
import { QuizName } from '../../../server/server-api';
import Header from '../../components/header';

type countryWithFlag = typeof world & { flag: string };

export class QuizFlag extends Page {
    private countriesArr: typeof world;

    private flagsArr: countryWithFlag;

    private rightAnswers: number;

    private wrongAnswers: number;

    private availableToPlus: boolean;

    private availableToMinus: boolean;

    private code: string;

    private areaCountry: number;

    static ourChart: google.visualization.GeoChart;

    constructor(id: string) {
        super(id);
        this.flagsArr = world.filter((obj) => Object.keys(obj).indexOf('flag') !== -1) as countryWithFlag;
        this.countriesArr = this.flagsArr;
        this.rightAnswers = 0;
        this.wrongAnswers = 0;
        this.availableToPlus = true;
        this.availableToMinus = true;
        this.code = '';
        this.areaCountry = 350000;
    }

    render() {
        this.container.append(new QuizRegion('div', 'none', this).render());

        return this.container;
    }

    renderMain(region: string) {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mainTitle = createOurElement('h1', 'main__title main__title_quiz', '', 'main__title_quiz-flag');
        const titleAndRound = createOurElement('div', 'flex-rows title-and-round');
        const nextBtn = createOurElement('button', 'btn btn__colored btn__next', '', 'Дальше');
        const rightWorld = createOurElement('h2', 'right-world', '', 'Правильно!');
        const wrongWorld = createOurElement('h2', 'wrong-world', '', 'Неправильно!');
        const round = createOurElement('h1', 'quizz-round');
        const geoChartWrap = document.createElement('div');
        geoChartWrap.id = 'regions_div';
        const flag = createOurElement('div', 'img-flag');

        this.choseCode(region);

        titleAndRound.append(mainTitle, round);

        this.renderContent(nextBtn, rightWorld, wrongWorld, geoChartWrap, flag, round);

        nextBtn.addEventListener('click', async () => {
            if (this.rightAnswers !== 10) {
                this.renderContent(nextBtn, rightWorld, wrongWorld, geoChartWrap, flag, round);
            } else {
                this.container.append(
                    await new QuizResult('div', 'none', this.countResult(), QuizName.Flags, this.code).renderResult()
                );
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

        round.textContent = `${this.rightAnswers + 1}/10`;

        const answer = this.randomiseCountry(this.flagsArr, this.areaCountry, true);

        const countriesForAnswer = [
            ['Country', 'Name'],
            answer,
            this.randomiseCountry(this.countriesArr, this.areaCountry),
            this.randomiseCountry(this.countriesArr, this.areaCountry),
            this.randomiseCountry(this.countriesArr, this.areaCountry),
        ];

        drawChart(geoChartWrap, countriesForAnswer, 'flag', { region: this.code, backgroundColor: '#81d4fa' });
        this.addLabelsListeners(geoChartWrap, countriesForAnswer, nextBtn, wrongWorld, rightWorld);

        flag.style.backgroundImage = world.find((el) => el.countryCodeLetters === answer[0])?.flag || '';

        this.addMapListener(nextBtn, wrongWorld, rightWorld);
    }

    private addMapListener(nextBtn: HTMLElement, wrongWorld: HTMLElement, rightWorld: HTMLElement) {
        setTimeout(() => {
            google.visualization.events.addListener(QuizFlag.ourChart, 'select', () => {
                const selected = QuizFlag.ourChart.getSelection()[0];
                if (selected) {
                    if (selected.row === 0) {
                        playAudio(rightAnswAudio);
                        nextBtn.removeAttribute('disabled');
                        if (this.rightAnswers === 9) {
                            nextBtn.textContent =
                                localStorage.getItem('nowLanguage') === 'ru'
                                    ? 'Посмотреть результат'
                                    : 'Check the result';
                        }
                        wrongWorld.style.display = 'none';
                        rightWorld.style.display = '';
                        if (this.availableToPlus) {
                            this.rightAnswers += 1;
                            this.availableToPlus = false;
                            this.availableToMinus = false;
                        }
                    } else {
                        playAudio(wrongAnswAudio);
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

    private randomiseCountry(arr: typeof world, area: number, isFlag = false) {
        let country = arr[Math.floor(Math.random() * arr.length)];

        while (country.area < area) {
            country = arr[Math.floor(Math.random() * arr.length)];
        }

        if (isFlag) {
            arr.splice(arr.indexOf(country), 1);
        }

        const countryName = localStorage.getItem('nowLanguage') === 'ru' ? country.countryRu : country.countryEn;

        return [country.countryCodeLetters, countryName];
    }

    private countResult() {
        return Math.floor(((this.rightAnswers - this.wrongAnswers) / (this.rightAnswers + this.wrongAnswers)) * 100);
    }

    private choseCode(region: string) {
        switch (region) {
            case 'africa':
                this.code = codes.africa;
                this.countriesArr = africa.filter((obj) => Object.keys(obj).indexOf('flag') === -1);
                this.flagsArr = africa.filter((obj) => Object.keys(obj).indexOf('flag') !== -1) as countryWithFlag;
                this.areaCountry = 50000;
                break;
            case 'europe':
                this.code = codes.europe;
                this.countriesArr = europe.filter((obj) => Object.keys(obj).indexOf('flag') === -1);
                this.flagsArr = europe.filter((obj) => Object.keys(obj).indexOf('flag') !== -1) as countryWithFlag;
                this.areaCountry = 50000;
                break;
            case 'asia':
                this.code = codes.asia;
                this.countriesArr = asia.filter((obj) => Object.keys(obj).indexOf('flag') === -1);
                this.flagsArr = asia.filter((obj) => Object.keys(obj).indexOf('flag') !== -1) as countryWithFlag;
                this.areaCountry = 50000;
                break;
            case 'america':
                this.code = codes.america;
                this.countriesArr = america.filter((obj) => Object.keys(obj).indexOf('flag') === -1);
                this.flagsArr = america.filter((obj) => Object.keys(obj).indexOf('flag') !== -1) as countryWithFlag;
                this.areaCountry = 100000;
                break;
            case 'world':
                this.code = codes.world;
                break;
        }
    }

    private addLabelsListeners(
        wrap: HTMLElement,
        arr: string[][],
        nextBtn: HTMLElement,
        wrongWorld: HTMLElement,
        rightWorld: HTMLElement
    ) {
        Header.firstLabel.addEventListener('click', () => {
            this.redrawMap(wrap, arr, nextBtn, wrongWorld, rightWorld);
        });
        Header.secondLabel.addEventListener('click', () => {
            this.redrawMap(wrap, arr, nextBtn, wrongWorld, rightWorld);
        });
    }

    private redrawMap(
        wrap: HTMLElement,
        arr: string[][],
        nextBtn: HTMLElement,
        wrongWorld: HTMLElement,
        rightWorld: HTMLElement
    ) {
        const newArr = [arr[0]].concat(
            arr.slice(1).map(function (country) {
                const name =
                    localStorage.getItem('nowLanguage') === 'en'
                        ? world.find((el) => el.countryCodeLetters === country[0])?.countryEn
                        : world.find((el) => el.countryCodeLetters === country[0])?.countryRu;
                return [country[0], name || ''];
            })
        );

        drawChart(wrap, newArr, 'flag', { region: this.code, backgroundColor: '#6bcbd1' });
        this.addMapListener(nextBtn, wrongWorld, rightWorld);
    }
}
