// import { createOurElement } from '../../patterns/createElement';
import Page from '../../patterns/pagePattern';

export class ProfilePage extends Page {
    constructor(id: string) {
        super(id);
    }

    render() {
        return this.container;
    }
}
