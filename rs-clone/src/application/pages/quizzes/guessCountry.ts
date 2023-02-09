import Page from '../../patterns/pagePattern';

class GuessCountry extends Page {
    static TextObject = {
        MainTitle: 'Guess Country Quiz',
    };

    constructor(id: string) {
        super(id);
    }

    render() {
        const title = this.createHeaderTitle(GuessCountry.TextObject.MainTitle);
        this.container.append(title);
        return this.container;
    }
}

export default GuessCountry;
