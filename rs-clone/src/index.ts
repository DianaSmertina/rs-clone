import './sass/global.scss';
import App from './application/pages/app/index';
import router from './application/routing/router';

const app = new App();
app.run();

const links = document.querySelectorAll('.nav__item_link');
links.forEach((link) => link.addEventListener('click', router));
