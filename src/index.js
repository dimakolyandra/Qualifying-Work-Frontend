import 'bootstrap/dist/css/bootstrap.css';
import './css/carousel.css';
import './css/modal.css';
import './css/chooseCarousel.css';
import './css/title.css';
import './css/form.css';

import ReactDom from 'react-dom';
import React from 'react';

import MainContainer from './containers/MainContainer'

ReactDom.render(<MainContainer/>, document.getElementById('root'))