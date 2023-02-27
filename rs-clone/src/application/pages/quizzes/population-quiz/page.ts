import { createOurElement } from '../../../patterns/createElement';
import Page from '../../../patterns/pagePattern';
import { PopulationQuestion } from './component';
import { world, africa, america, asia, europe } from '../../../components/countries/data';
import { QuizRegion } from '../quizzesRegions';
import { codes } from '../../../components/countries/regionsCodes';
import { QuizResult } from '../quizzesResults';
import { QuizName } from '../../../server/server-api';

export class PopulationQuizPage extends Page {
    constructor(id: string, private code: string = '', private countriesArr = world) {
        super(id);
    }

    private createNextBtn(rules: HTMLElement) {
        const nextBtn = createOurElement('button', 'btn btn__colored btn__next', '', 'Дальше');
        nextBtn.setAttribute('disabled', 'disabled');
        nextBtn.addEventListener('click', async () => {
            if (PopulationQuestion.roundNum <= 10) {
                const previousQuestion = document.querySelector('.question');
                if (previousQuestion && rules) {
                    previousQuestion.remove();
                    const newQuestion = new PopulationQuestion(this.generateData(), this.code).render();
                    rules.after(newQuestion);
                    nextBtn.setAttribute('disabled', 'disabled');
                }
            } else {
                const result = Number(((PopulationQuestion.rightAnswer / 30) * 100).toFixed(2));
                this.container.append(
                    await new QuizResult('div', 'none', result, QuizName.Population, this.code).renderResult()
                );
            }
        });
        return nextBtn;
    }

    private generateData() {
        const countriesOnMap = [];
        let arrayCopy = this.countriesArr.slice(0);
        if (this.code === codes.america || this.code === codes.africa) {
            arrayCopy = arrayCopy.filter((el) => el.area > 100000);
        } else if (this.code === codes.world) {
            arrayCopy = arrayCopy.filter((el) => el.area > 300000);
        }
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * arrayCopy.length);
            countriesOnMap.push(arrayCopy[randomIndex]);
            arrayCopy.splice(randomIndex, 1);
        }
        countriesOnMap.sort((a, b) => a.population - b.population);
        return countriesOnMap;
    }

    private choseCode(region: string) {
        switch (region) {
            case 'africa':
                this.code = codes.africa;
                this.countriesArr = africa;
                break;
            case 'europe':
                this.code = codes.europe;
                this.countriesArr = europe;
                break;
            case 'asia':
                this.code = codes.asia;
                this.countriesArr = asia;
                break;
            case 'america':
                this.code = codes.america;
                this.countriesArr = america;
                break;
            case 'world':
                this.code = codes.world;
                break;
        }
    }

    renderMain(region: string) {
        this.choseCode(region);
        PopulationQuestion.roundNum = 1;
        PopulationQuestion.rightAnswer = 0;
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mainTitle = createOurElement('h1', 'main__title main__title_quiz', '', 'main__title_quiz-population');
        const titleAndRound = createOurElement('div', 'flex-rows title-and-round');
        const round = createOurElement('h1', 'quizz-round', '1/10');
        titleAndRound.append(mainTitle, round);
        const rules = createOurElement('p', 'main__rules', ``, 'main__rules');
        const playSpace = new PopulationQuestion(this.generateData(), this.code).render();
        mainWrapper.append(titleAndRound, rules, playSpace, this.createNextBtn(rules));
        this.container.append(mainWrapper);
        return this.container;
    }

    render() {
        this.container.append(new QuizRegion('div', 'none', this).render());
        return this.container;
    }
}
