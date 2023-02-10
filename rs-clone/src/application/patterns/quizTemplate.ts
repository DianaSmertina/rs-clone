import { drawChart } from '../components/maps/geoChart';
import Page from '../../application/patterns/pagePattern';
import { createOurElement } from './createElement';

const countriesForAnswer = ['Canada', 'Mexico', 'Italy', 'Cuba'];

class QuizTemplate extends Page {
    constructor(
        id: string,
        private title: string,
        private mapData: Array<Array<string | number>>,
        private answerData: Array<string>
    ) {
        super(id);
    }

    render() {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mainTitle = createOurElement('h1', 'main__title', this.title);

        const geoChartWrap = document.createElement('div');
        geoChartWrap.id = 'regions_div';
        drawChart(geoChartWrap, this.mapData);

        const answersBlock = createOurElement('div', 'answers flex-rows', '');

        countriesForAnswer.forEach((country) => {
            const answer = createOurElement('button', 'btn btn__bordered', `${country}`);
            answersBlock.append(answer);
        });

        const nextBtn = createOurElement('button', 'btn btn__colored btn__next', 'Дальше');
        nextBtn.setAttribute('disabled', 'disabled');
        mainWrapper.append(mainTitle, geoChartWrap, answersBlock, nextBtn);
        this.container.append(mainWrapper);
        return this.container;
    }
}

export default QuizTemplate;
