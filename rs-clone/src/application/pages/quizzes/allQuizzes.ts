import Page from '../../patterns/pagePattern';
import { createOurElement } from '../../patterns/createElement';

class Quizzes extends Page {
    constructor(id: string) {
        super(id);
    }

    render() {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mainTitle = createOurElement('h1', 'main__title', 'Выберите викторину');
        const menu = createOurElement(
            'div',
            'menu flex-rows ',
            `<a href="country-quiz">
                <div class="menu__item flex-columns">
                    <h3>Угадай страну</h3>
                    <div class="menu__quiz-cover country-cover img">
                    </div>
                </div>
            </a>
            <a href="population-quiz">
                <div class="menu__item flex-columns">
                    <h3>Угадай численность населения</h3>
                    <div class="menu__quiz-cover population-cover img"></div>
                </div>
            </a>
            <a href="quizz-flag">
            <div class="menu__item flex-columns">
                <h3>Угадай страну по флагу</h3>
                <div class="menu__quiz-cover flag-cover img"></div>
            </div>
            </a>`
        );

        mainWrapper.append(mainTitle, menu);
        this.container.append(mainWrapper);
        return this.container;
    }
}

export default Quizzes;
