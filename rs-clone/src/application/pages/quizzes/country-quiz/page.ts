import Page from '../../../patterns/pagePattern';
import { drawChart } from '../../../components/maps/geoChart';
import { createOurElement } from '../../../patterns/createElement';
import { africa, america, asia, europe, world } from '../../../components/countries/data';
import { playAudio, rightAnswAudio, wrongAnswAudio } from '../../../../application/components/sound/sound';
import { QuizRegion } from '../quizzesRegions';
import { codes } from '../../../components/countries/regionsCodes';
import { QuizResult } from '../quizzesResults';
import { QuizName } from '../../../server/server-api';

export class CountryQuiz extends Page {
    static ourChart: google.visualization.GeoChart;
    private regionCode: string;
    private regionDataArr: typeof world;
    private min: number;
    private max: number;
    private usedCountryInd: number[];
    private round: number;
    private rightAnswers: number;
    private randomCountry: string | undefined;

    constructor(id: string) {
        super(id);
        this.regionCode = '';
        this.regionDataArr = [];
        this.min = 0;
        this.max = 0;
        this.usedCountryInd = [];
        this.round = 0;
        this.rightAnswers = 0;
        this.randomCountry = '';
    }

    render() {
        this.container.append(new QuizRegion('div', 'none', this).render());
        return this.container;
    }

    renderMain(region: string) {
        this.getData(region);
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mainTitle = createOurElement('h1', 'main__title main__title_quiz', '', 'main__title_quiz-population');
        const titleAndRound = createOurElement('div', 'flex-rows title-and-round');
        const geoChartWrap = document.createElement('div');
        geoChartWrap.id = 'regions_div';
        const answersBlock = createOurElement('div', 'answers flex-rows', '');
        const nextBtn = createOurElement('button', 'btn btn__colored btn__next', '', 'Дальше');
        nextBtn.id = 'nextBtn';
        const roundBlock = createOurElement('h1', 'quizz-round');

        titleAndRound.append(mainTitle, roundBlock);

        this.renderPlayField(geoChartWrap, answersBlock, nextBtn, roundBlock);

        nextBtn.addEventListener('click', async () => {
            if (this.round != 10) {
                (document.querySelector('.answers') as HTMLElement).innerHTML = '';
                this.renderPlayField(geoChartWrap, answersBlock, nextBtn, roundBlock);
            } else {
                this.container.append(
                    await new QuizResult(
                        'div',
                        'none',
                        this.countResult(),
                        QuizName.Country,
                        this.regionCode
                    ).renderResult()
                );
            }
        });

        mainWrapper.append(titleAndRound, geoChartWrap, answersBlock, nextBtn);
        this.container.append(mainWrapper);
        return this.container;
    }

    private renderPlayField(
        geoChartWrap: HTMLElement,
        answersBlock: HTMLElement,
        nextBtn: HTMLElement,
        roundBlock: HTMLElement
    ) {
        this.round++;
        this.randomCountry = this.getRandomCountry(this.regionDataArr);
        if (!this.randomCountry) return;

        const country = [['Country'], [this.randomCountry]];

        drawChart(geoChartWrap, country, 'countries', {
            region: this.regionCode,
            // magnifyingGlass: { enable: true, zoomFactor: 1 },
            backgroundColor: '#0D98BA',
            enableRegionInteractivity: false,
        });

        const countriesForAnswer = this.shuffle(this.getAnswers(this.randomCountry, this.regionDataArr));

        countriesForAnswer.forEach((country) => {
            const answer = createOurElement('button', 'btn btn__bordered answer', `${country}`);
            answer.id = `${country}`;
            answer.addEventListener('click', (e) => {
                this.checkAnswer(e.target, this.randomCountry, this.regionDataArr);
            });
            answersBlock.append(answer);
        });

        nextBtn.setAttribute('disabled', 'disabled');
        roundBlock.textContent = this.round + '/10';
    }

    getData(regionCode: string) {
        switch (regionCode) {
            case 'africa': {
                this.regionCode = codes.africa;
                this.regionDataArr = africa;
                this.max = this.regionDataArr.length - 1;
                break;
            }
            case 'america': {
                this.regionCode = codes.america;
                this.regionDataArr = america;
                this.max = this.regionDataArr.length - 1;
                break;
            }
            case 'asia': {
                this.regionCode = codes.asia;
                this.regionDataArr = asia;
                this.max = this.regionDataArr.length - 1;
                break;
            }
            case 'europe': {
                this.regionCode = codes.europe;
                this.regionDataArr = europe;
                this.max = this.regionDataArr.length - 1;
                break;
            }
            case 'world':
            default: {
                this.regionCode = codes.world;
                this.regionDataArr = world;
                this.max = this.regionDataArr.length - 1;
                break;
            }
        }
    }

    getRandomNumber(min: number, max: number) {
        const rand = Math.abs(min + Math.random() * (max - min + 1));
        return Math.floor(rand);
    }

    getRandomCountry(arr: typeof world) {
        let randomNumber = this.getRandomNumber(this.min, this.max);

        if (this.usedCountryInd.includes(randomNumber)) {
            randomNumber = this.getRandomNumber(this.min, this.max);
        }

        this.usedCountryInd.push(randomNumber);
        const possibleRandCountry = arr[randomNumber].countryCodeLetters;
        return possibleRandCountry;
    }

    getAnswers(rightCountry: string, arr: typeof world) {
        const setAnswers = new Set<string>();

        arr.forEach((item) => {
            if (item.countryCodeLetters === rightCountry) {
                setAnswers.add(localStorage.getItem('nowLanguage') === 'ru' ? item.countryRu : item.countryEn);
            }
        });

        while (setAnswers.size < 4) {
            const index = this.getRandomNumber(this.min, this.max);
            if (arr[index].countryCodeLetters === rightCountry) {
                continue;
            } else {
                setAnswers.add(
                    localStorage.getItem('nowLanguage') === 'ru' ? arr[index].countryRu : arr[index].countryEn
                );
            }
        }

        return setAnswers;
    }

    shuffle(set: Set<string>) {
        const arr = Array.from(set);
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return new Set(arr);
    }

    checkAnswer(eTarget: EventTarget | null, rightAnswer: string | undefined, arr: typeof world) {
        if (!eTarget || !rightAnswer) return;

        const target = eTarget as HTMLElement;
        const rightAnswerName =
            localStorage.getItem('nowLanguage') === 'ru'
                ? arr.find((item) => item.countryCodeLetters === rightAnswer)?.countryRu
                : arr.find((item) => item.countryCodeLetters === rightAnswer)?.countryEn;
        if (!rightAnswerName) return;

        const allAnswers = document.querySelectorAll('.answer');
        allAnswers.forEach((item) => item.classList.add('btn__wrong'));

        if (target.id === rightAnswerName) {
            target.classList.remove('btn__wrong');
            target.classList.add('btn__right');
            this.rightAnswers++;
            playAudio(rightAnswAudio);
        } else {
            const trulyRightAnsw = document.getElementById(rightAnswerName);
            trulyRightAnsw?.classList.remove('btn__wrong');
            trulyRightAnsw?.classList.add('btn__right');
            playAudio(wrongAnswAudio);
        }

        const nextBtn = document.getElementById('nextBtn');
        if (!nextBtn) return;
        nextBtn.removeAttribute('disabled');
        if (this.round === 10) {
            nextBtn.textContent =
                localStorage.getItem('nowLanguage') === 'ru' ? 'Посмотреть результат' : 'Check the result';
        }
    }

    private countResult() {
        return Math.round((this.rightAnswers / 10) * 100);
    }
}

export default CountryQuiz;
