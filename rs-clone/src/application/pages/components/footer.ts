import Component from '../../patterns/component';

class Footer extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    render() {
        const footerWrapper = document.createElement('div');
        footerWrapper.className = 'footer__wrapper wrapper flex-rows';

        const developers = document.createElement('div');
        developers.className = 'developers';
        developers.innerHTML = `<ul>
                                    <li>
                                      <a href="https://github.com/DianaSmertina">Diana Smertina</a>  
                                    </li>
                                    <li>
                                      <a href="https://github.com/PetrAlexkulakov">Petr Kulakov</a>  
                                    </li>
                                    <li>
                                      <a href="https://github.com/Elena-Amelia">Elena Ivanova</a>  
                                    </li>
                                </ul>`;

        const year = document.createElement('p');
        year.className = 'year';
        year.innerHTML = '2023';

        const rsSchool = document.createElement('div');
        rsSchool.className = 'rs-icon ico';

        footerWrapper.append(developers, year, rsSchool);
        this.container.append(footerWrapper);
        return this.container;
    }
}

export default Footer;
