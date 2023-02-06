import Component from '../../patterns/component';

export class ModalWindow extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    openModal() {
        this.container.className = 'modal';
        this.closeModal();
    }

    private closeModal() {
        this.container.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.container.remove();
            }
        });
    }

    render() {
        return this.container;
    }
}
