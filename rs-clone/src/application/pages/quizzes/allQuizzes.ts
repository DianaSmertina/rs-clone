import Page from '../../patterns/pagePattern';
import { createOurElement } from '../../patterns/createElement';

class Quizzes extends Page {
    static TextObject = {
        MainTitle: 'Quizzes',
    };

    constructor(id: string) {
        super(id);
    }

    render() {
        const title = this.createHeaderTitle(Quizzes.TextObject.MainTitle);
        const menu = createOurElement(
            'div',
            'menu flex-rows',
            `<div class="menu__item">
                <h3>Whole world quiz</h3>
            </div>
            <div class="menu__item">
                <h3>Neighboring countries quiz</h3>
            </div>`
        );
        this.container.append(title, menu);
        return this.container;
    }
}

export default Quizzes;
