import { createOurElement } from '../../../patterns/createElement';
import Page from '../../../patterns/pagePattern';
import { PopulationQuestion } from './component';
import { asia } from '../../../components/countries/data';

export class PopulationQuizPage extends Page {
    constructor(id: string) {
        super(id);
    }

    private createNextBtn(rules: HTMLElement) {
        const nextBtn = createOurElement('button', 'btn btn__colored btn__next', 'Дальше');
        nextBtn.setAttribute('disabled', 'disabled');
        nextBtn.addEventListener('click', () => {
            const previousQuestion = document.querySelector('.question');
            if (previousQuestion && rules) {
                previousQuestion.remove();
                const newQuestion = new PopulationQuestion(this.generateData()).render();
                rules.after(newQuestion);
                nextBtn.setAttribute('disabled', 'disabled');
            }
        });
        return nextBtn;
    }

    private generateData() {
        const countriesOnMap = [];
        const arrayCopy = asia.slice(0);
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * arrayCopy.length);
            countriesOnMap.push(arrayCopy[randomIndex]);
            arrayCopy.splice(randomIndex, 1);
        }
        countriesOnMap.sort((a, b) => a.population - b.population);
        return countriesOnMap;
    }

    render() {
        PopulationQuestion.roundNum = 1;
        PopulationQuestion.rightAnswer = 0;
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mainTitle = createOurElement('h1', 'main__title', 'Угадай численность населения');
        const rules = createOurElement(
            'p',
            'main__rules',
            `В этом квизе тебе нужно расположить выделенные на карте страны в порядке возрастания численности населения.
            Наведи чтобы узнать информацию о стране и кликни, чтобы добавить в поле для ответов.
            Пока ты не нажал "Проверить", можешь изменить окончательный порядок, кликнув на ответы.`
        );
        const playSpace = new PopulationQuestion(this.generateData()).render();
        mainWrapper.append(mainTitle, rules, playSpace, this.createNextBtn(rules));
        this.container.append(mainWrapper);
        return this.container;
    }
}
