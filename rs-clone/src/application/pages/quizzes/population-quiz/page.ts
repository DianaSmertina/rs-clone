import { createOurElement } from '../../../patterns/createElement';
import Page from '../../../patterns/pagePattern';
import { PopulationQuestion } from './component';
import { world, africa, america, asia, europe } from '../../../components/countries/data';
import { QuizRegion } from '../quizzesRegions';
import { codes } from '../../../components/countries/regionsCodes';

export class PopulationQuizPage extends Page {
    constructor(id: string, private code: string = '', private countriesArr = world) {
        super(id);
    }

    private createNextBtn(rules: HTMLElement) {
        const nextBtn = createOurElement('button', 'btn btn__colored btn__next', '', 'Дальше');
        nextBtn.setAttribute('disabled', 'disabled');
        nextBtn.addEventListener('click', () => {
            const previousQuestion = document.querySelector('.question');
            if (previousQuestion && rules) {
                previousQuestion.remove();
                const newQuestion = new PopulationQuestion(this.generateData(), this.code).render();
                rules.after(newQuestion);
                nextBtn.setAttribute('disabled', 'disabled');
            }
        });
        return nextBtn;
    }

    private generateData() {
        const countriesOnMap = [];
        const arrayCopy = this.countriesArr.slice(0);
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
