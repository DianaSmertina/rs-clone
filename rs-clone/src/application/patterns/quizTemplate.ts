import { drawChart } from '../components/maps/geoChart';
import Page from '../../application/patterns/pagePattern';
import { createOurElement } from './createElement';

const countriesForAnswer = ['Canada', 'Mexico', 'Italy', 'Cuba'];

class QuizTemplate extends Page {
    constructor(id: string) {
        super(id);
    }

    render() {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mainTitle = createOurElement('h1', 'main__title', 'Quiz Name');

        const geoChartWrap = document.createElement('div');
        geoChartWrap.id = 'regions_div';
        drawChart(geoChartWrap);

        const levels = createOurElement(
            'div',
            'levels',
            `<label class="level__radio-btn"> 
            <input name="level" type="radio" value="1" checked/>
            Easy Level
            </label>
            <label class="level__radio-btn"> 
            <input name="level" type="radio" value="2" />
            High Level
            </label>`
        );

        const answersBlock = createOurElement('div', 'answers flex-rows', '');
        countriesForAnswer.forEach((country) => {
            const answer = createOurElement('p', 'answer', `${country}`);
            answersBlock.append(answer);
        });

        mainWrapper.append(mainTitle, geoChartWrap, levels, answersBlock);
        this.container.append(mainWrapper);
        return this.container;
    }
}

export default QuizTemplate;
