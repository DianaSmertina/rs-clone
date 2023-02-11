import { drawChart } from '../../components/maps/geoChart';
import Page from '../../patterns/pagePattern';
import { createOurElement } from '../../patterns/createElement';

export class QuizFlag extends Page {
    constructor(id: string) {
        super(id);
    }
    render() {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mainTitle = createOurElement('h1', 'main__title', 'Country by flag');

        const answersBlock = createOurElement('div', 'answers flex-rows', '');

        const countriesForAnswer = [
            ['Country', 'Number'],
            ['RU', 1],
            ['United States', 2],
            ['Brazil', 3],
            ['Canada', 4],
        ];
        const geoChartWrap = document.createElement('div');
        geoChartWrap.id = 'regions_div';
        drawChart(geoChartWrap, countriesForAnswer);
        countriesForAnswer.slice(1).forEach((country) => {
            const answer = createOurElement('p', 'answer', `${country[0]}`);
            answersBlock.append(answer);
        });

        mainWrapper.append(mainTitle, geoChartWrap, answersBlock);
        this.container.append(mainWrapper);
        return this.container;
    }
}
