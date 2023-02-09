import Page from '../../patterns/pagePattern';

class ResultsPage extends Page {
    static TextObject = {
        MainTitle: 'Results',
    };

    constructor(id: string) {
        super(id);
    }

    render() {
        const title = this.createHeaderTitle(ResultsPage.TextObject.MainTitle);
        this.container.append(title);
        return this.container;
    }
}

export default ResultsPage;
