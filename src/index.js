import 'bootstrap/dist/css/bootstrap.css';
import ReactDom from 'react-dom';
import React from 'react';

import BaseCarousel from './containers/BaseCarousel'
import LoginForm from './components/LoginForm'

ReactDom.render(<BaseCarousel><LoginForm/></BaseCarousel>, document.getElementById('root'))