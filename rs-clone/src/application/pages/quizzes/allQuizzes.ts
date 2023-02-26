import Page from '../../patterns/pagePattern';
import { createOurElement } from '../../patterns/createElement';

class Quizzes extends Page {
    constructor(id: string) {
        super(id);
    }

    render() {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mainTitle = createOurElement('h1', 'main__title', 'Выберите викторину', 'choose quizz');
        const menu = createOurElement('div', 'menu flex-rows ', ``, 'quizzes variants');

        mainWrapper.append(mainTitle, menu);
        this.container.append(mainWrapper);
        return this.container;
    }
}

export default Quizzes;
