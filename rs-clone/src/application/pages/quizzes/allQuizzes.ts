import Page from '../../patterns/pagePattern';
import { createOurElement } from '../../patterns/createElement';

class Quizzes extends Page {
    constructor(id: string) {
        super(id);
    }

    render() {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mainTitle = createOurElement('h1', 'main__title', 'Choose Quiz');
        const menu = createOurElement(
            'div',
            'menu flex-rows',
            `<div class="menu__item">
                <h3>Guess country quiz</h3>
            </div>
            <a href="population-quiz">
                <div class="menu__item">
                    <h3>Guess population quiz</h3>
                </div>
            </a>
            <a href="quizz-flag">
                <div class="menu__item">
                    <h3>Угадай страну по флагу</h3>
                </div>
            </a>`
        );

        mainWrapper.append(mainTitle, menu);
        this.container.append(mainWrapper);
        return this.container;
    }
}

export default Quizzes;
