import { drawChart } from '../../../components/maps/geoChart';
import { createOurElement } from '../../../patterns/createElement';

const countriesForAnswer = ['Canada', 'Mexico', 'Italy', 'Cuba'];

export class PopulationQuestion {
    constructor(private mapData: Array<Array<string | number>>) {}

    private createGeoChart() {
        const geoChartWrap = document.createElement('div');
        geoChartWrap.id = 'regions_div';
        drawChart(geoChartWrap, this.mapData);
        return geoChartWrap;
    }

    private createAnswerBlock() {
        const answersBlock = createOurElement('div', 'answers flex-rows', '');

        countriesForAnswer.forEach((country) => {
            const answer = createOurElement('button', 'btn btn__bordered', `${country}`);
            answersBlock.append(answer);
        });
        return answersBlock;
    }

    render() {
        const wrap = createOurElement('div', 'question flex-columns');
        wrap.append(this.createGeoChart(), this.createAnswerBlock());
        return wrap;
    }
}
