import Page from '../../patterns/pagePattern';

class NeighboCountries extends Page {
    static TextObject = {
        MainTitle: 'Neighboring Countries Quiz',
    };

    constructor(id: string) {
        super(id);
    }

    render() {
        const title = this.createHeaderTitle(NeighboCountries.TextObject.MainTitle);
        this.container.append(title);
        return this.container;
    }
}

export default NeighboCountries;
