import { createOurElement } from '../../../patterns/createElement';
import Page from '../../../patterns/pagePattern';
import { PopulationQuestion } from './component';
import { asia } from '../../../components/countries/data';

export class PopulationQuizPage extends Page {
    constructor(id: string, private title: string) {
        super(id);
    }

    private createNextBtn() {
        const nextBtn = createOurElement('button', 'btn btn__colored btn__next', 'Дальше');
        // nextBtn.setAttribute('disabled', 'disabled'); //по клику удаляем существующий question и генерируем новый
        nextBtn.addEventListener('click', () => {
            const previousQuestion = document.querySelector('.question');
            const title = document.querySelector('.main__title');
            if (previousQuestion && title) {
                previousQuestion.remove();
                const newQuestion = new PopulationQuestion(this.generateData()).render();
                title.after(newQuestion);
            }
        });
        return nextBtn;
    }

    private generateData() {
        const countriesOnMap = [];
        const arrayCopy = asia.slice();
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * arrayCopy.length);
            countriesOnMap.push([arrayCopy[randomIndex].countryEn]);
            arrayCopy.splice(randomIndex, 1);
        }
        countriesOnMap.unshift(['Country']);
        console.log(countriesOnMap);
        return countriesOnMap;
    }

    render() {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mainTitle = createOurElement('h1', 'main__title', this.title);
        const playSpace = new PopulationQuestion(this.generateData()).render();
        mainWrapper.append(mainTitle, playSpace, this.createNextBtn());
        this.container.append(mainWrapper);
        return this.container;
    }
}
