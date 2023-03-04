import Page from '../../patterns/pagePattern';
import { createOurElement } from '../../patterns/createElement';
// import route from '../../routing/router'; // РОУТИНГ

const QuizLinks = [
    {
        link: 'country-quiz',
        name: 'country-quiz',
        cover: 'country-cover',
    },
    {
        link: 'population-quiz',
        name: 'population-quiz',
        cover: 'population-cover',
    },
    {
        link: 'quizz-flag',
        name: 'flag-quiz',
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
            const link = createOurElement('a', 'quiz-link', '', ``);

            (link as HTMLLinkElement).href = `/${item.link}`;
            const menuItemBlock = createOurElement('div', 'menu__item flex-columns', '', '');
            const header = createOurElement('h3', '', '', `${item.name}`);
            const cover = createOurElement('div', `menu__quiz-cover ${item.cover} img`, '', '');

            menuItemBlock.append(header, cover);
            link.append(menuItemBlock);

            // РОУТИНГ
            // link.addEventListener('click', (e) => {
            //     route(e);
            // });

            menuBlock.append(link);
        });
        return menuBlock;
    }
    render() {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');

        const mainTitle = createOurElement('h1', 'main__title', 'Выберите викторину', 'choose quizz');
        mainWrapper.append(mainTitle, this.createMenu());
        this.container.append(mainWrapper);
        return this.container;
    }
}

export default Quizzes;
