import Page from '../../../patterns/pagePattern';
import { drawChart } from '../../../components/maps/geoChart';
import { createOurElement } from '../../../patterns/createElement';
import { africa, america, asia, europe, oceania, world } from '../../../components/countries/data';
import { rightAnswAudio, wrongAnswAudio } from '../../../../application/components/sound/sound';

export class CountryQuiz extends Page {
    private regionCode: string;
    private regionDataArr: typeof world;
    private min: number;
    private max: number;
    private usedCountries: string[];
    private round: number;
    private score: number;

    static ourChart: google.visualization.GeoChart;
    private randomCountry: string | undefined;

    constructor(id: string) {
        super(id);
        this.regionCode = '002';
        this.regionDataArr = this.getDataArr(this.regionCode);
        this.min = 0;
        this.max = this.regionDataArr.length - 1;
        this.usedCountries = [];
        this.round = 1;
        this.score = 0;
        this.randomCountry = '';
    }

    private renderPlayField(geoChartWrap: HTMLElement, answersBlock: HTMLElement, nextBtn: HTMLElement) {
        this.randomCountry = this.getRandomCountry(this.regionDataArr);
        if (!this.randomCountry) return;
        const country = [['Country'], [this.randomCountry]];

        drawChart(geoChartWrap, country, 'countries', {
            region: this.regionCode,
            colorAxis: { colors: ['#00853F'] },
            backgroundColor: '#0D98BA',
            datalessRegionColor: '#E0FFFF',
            enableRegionInteractivity: false,
        });

        const countriesForAnswer = this.shuffle(this.getAnswers(this.randomCountry, this.regionDataArr));

        countriesForAnswer.forEach((country) => {
            const answer = createOurElement('button', 'btn btn__bordered answer', `${country}`);
            answer.id = `${country}`;
            const arrAnswers = this.regionDataArr;
            answer.addEventListener('click', (e) => {
                this.checkAnswer(e.target, this.randomCountry, arrAnswers);
            });
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

    getDataArr(regionCode: string): typeof world {
        switch (regionCode) {
            case '002': {
                return africa;
                break;
            }
            case '009': {
                return oceania;
                break;
            }
            case '019': {
                return america;
                break;
            }
            case '142': {
                return asia;
                break;
            }
            case '150': {
                return europe;
                break;
            }

            case 'world': {
                return world;
                break;
            }
            default: {
                return world;
            }
        }
    }

    getRandomNumber(min: number, max: number) {
        const rand = Math.abs(min + Math.random() * (max - min + 1));
        return Math.floor(rand);
    }

    getRandomCountry(arr: typeof world) {
        const randomNumber = this.getRandomNumber(this.min, this.max);
        const possibleRandCountry = arr[randomNumber].countryCodeLetters;

        if (this.usedCountries.includes(possibleRandCountry)) {
            console.log('rep', possibleRandCountry, this.usedCountries);
            this.getRandomCountry(arr);
        } else {
            this.usedCountries.push(possibleRandCountry);
            console.log(possibleRandCountry, this.usedCountries);
        }
        return possibleRandCountry;
    }

    getAnswers(country: string, arr: typeof world) {
        const setAnswers = new Set<string>();

        arr.forEach((item) => {
            if (item.countryCodeLetters === country) {
                setAnswers.add(item.countryRu);
            }
        });

        while (setAnswers.size < 4) {
            const index = this.getRandomNumber(0, arr.length - 1);
            if (arr[index].countryCodeLetters === country) {
                continue;
            } else {
                setAnswers.add(arr[index].countryRu);
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

        const nextBtn = document.getElementById('nextBtn');
        nextBtn?.removeAttribute('disabled');

        const target = eTarget as HTMLElement;
        const rightAnswerName = arr.find((item) => item.countryCodeLetters === rightAnswer)?.countryRu;
        if (!rightAnswerName) return;

        const anotherAnsw = document.querySelectorAll('.answer');

        if (target.id === rightAnswerName) {
            anotherAnsw.forEach((item) => item.classList.add('btn__wrong'));
            target.classList.remove('btn__wrong');
            target.classList.add('btn__right');
            this.changeRoundAndScore(true);
            rightAnswAudio.play();
        } else {
            anotherAnsw.forEach((item) => item.classList.add('btn__wrong'));
            const trulyRightAnsw = document.getElementById(rightAnswerName);
            trulyRightAnsw?.classList.remove('btn__wrong');
            trulyRightAnsw?.classList.add('btn__right');
            this.changeRoundAndScore(false);
            wrongAnswAudio.play();
        }
    }

    changeRoundAndScore(flag: boolean) {
        if (flag === true) {
            this.round++;
            this.score++;
        } else {
            this.round++;
        }
        if (this.round === 15) {
            this.goToTheResults();
        }
        console.log(this.score, this.round);
    }

    goToTheResults() {
        alert("That's all!");
        window.location.href = '/results';
    }
}

export default CountryQuiz;
