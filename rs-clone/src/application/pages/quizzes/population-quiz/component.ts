import { Icountry } from '../../../components/countries/data';
import { drawChart } from '../../../components/maps/geoChart';
import { createOurElement } from '../../../patterns/createElement';

export class PopulationQuestion {
    constructor(private mapData: Array<Icountry>) {}

    // private createCallbackForMap() {
    //     const clickCheck = () => {

    //     }
    //     return clickCheck;
    // }

    private createGeoChart() {
        const geoChartWrap = document.createElement('div');
        geoChartWrap.id = 'regions_div';
        const countries = this.mapData.map((el) => [el.countryEn]);
        countries.unshift(['Country']);
        drawChart(geoChartWrap, countries);
        return geoChartWrap;
    }

    private createAnswerBlock() {
        const answersBlock = createOurElement('div', 'answers flex-rows', '');
        const answers = this.mapData.slice(0);
        console.log(answers);
        answers?.forEach(() => {
            const answer = createOurElement('button', 'btn btn__bordered');
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
