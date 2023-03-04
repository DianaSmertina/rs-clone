abstract class Page {
    protected container: HTMLElement;

    constructor(id: string) {
        this.container = document.createElement('main');
        this.container.classList.add('main');
        this.container.id = id;
    }

    protected createHeaderTitle(text: string) {
        const headerTitle = document.createElement('h1');
        headerTitle.innerHTML = text;
        return headerTitle;
    }

    render() {
        return this.container;
    }
}

export default Page;
