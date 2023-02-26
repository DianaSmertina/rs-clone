import Page from '../../patterns/pagePattern';
import { createOurElement } from '../../patterns/createElement';
// import route from '../../routing/router'; // РОУТИНГ с которым квизы не работают(

const QuizLinks = [
    {
        id: 'country-quiz',
        name: 'Угадай страну',
        cover: 'country-cover',
    },
    {
        id: 'population-quiz',
        name: 'Угадай численность населения',
        cover: 'population-cover',
    },
    {
        id: 'quizz-flag',
        name: 'Угадай страну по флагу',
        cover: 'flag-cover',
    },
];

class Quizzes extends Page {
    constructor(id: string) {
        super(id);
    }

    private createMenu() {
        const menuBlock = createOurElement('div', 'menu flex-rows', '');
        QuizLinks.forEach((item) => {
            const link = createOurElement('a', 'quiz-link', '');

            (link as HTMLLinkElement).href = `/${item.id}`;
            link.innerHTML = `<div class="menu__item flex-columns">
            <h3>${item.name}</h3>
            <div class="menu__quiz-cover ${item.cover} img"></div>
            </div>`;

            // РОУТИНГ с которым квизы не работают(
            // link.addEventListener('click', (e) => {
            //     route(e);
            // });

            menuBlock.append(link);
        });
        return menuBlock;
    }
    render() {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mainTitle = createOurElement('h1', 'main__title', 'Выберите викторину');

        mainWrapper.append(mainTitle, this.createMenu());
        this.container.append(mainWrapper);
        return this.container;
    }
}

export default Quizzes;
