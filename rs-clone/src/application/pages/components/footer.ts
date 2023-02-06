import Component from '../../patterns/component';
import { createOurElement } from '../../patterns/createElement';

class Footer extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    render() {
        const footerWrapper = createOurElement('div', 'footer__wrapper wrapper flex-rows');
        const developers = createOurElement(
            'div',
            'developers',
            `<ul>
              <li>
                <a href="https://github.com/DianaSmertina">Diana Smertina</a>  
              </li>
              <li>
                <a href="https://github.com/PetrAlexkulakov">Petr Kulakov</a>  
              </li>
              <li>
                <a href="https://github.com/Elena-Amelia">Elena Ivanova</a>  
              </li>
            </ul>`
        );
        const year = createOurElement('p', 'year', '2023');
        const rsSchool = document.createElement('a');
        rsSchool.className = 'rs-link';
        rsSchool.href = 'https://rs.school/js/';
        rsSchool.innerHTML = `<div class="rs-icon ico"></div>`;

        footerWrapper.append(developers, year, rsSchool);
        this.container.append(footerWrapper);
        return this.container;
    }
}

export default Footer;
