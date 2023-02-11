import { drawChart } from '../components/maps/geoChart';
import Page from '../../application/patterns/pagePattern';
import { createOurElement } from './createElement';

// const countriesForAnswer = ['Canada', 'Mexico', 'Italy', 'Cuba'];

class PopulationQuizTemplate extends Page {
    constructor(
        id: string,
        private title: string,
        private mapData: Array<Array<string | number>>,
        private level: number
    ) {
        super(id);
    }

    render() {
        const mainWrapper = createOurElement('div', 'main__wrapper wrapper flex-columns');
        const mainTitle = createOurElement('h1', 'main__title', this.title);

        const geoChartWrap = document.createElement('div');
        geoChartWrap.id = 'regions_div';
        drawChart(geoChartWrap, this.mapData);

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
        const answerArr: Array<number | HTMLElement> = Array(this.level).fill(1);
        answerArr.forEach(() => {
            const divForAnswer = createOurElement('div', 'population-answer');
            answersBlock.append(divForAnswer);
        });
        // this.answerData.forEach((country) => {
        //     const answer = createOurElement('p', 'answer', `${country}`);
        //     answersBlock.append(answer);
        // });

        mainWrapper.append(mainTitle, geoChartWrap, levels, answersBlock);
        this.container.append(mainWrapper);
        return this.container;
    }
}

export default PopulationQuizTemplate;
