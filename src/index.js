import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

function render(Component) {
    ReactDOM.render(<Component />, document.getElementById('root'));
}

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        render(NextApp);
    });
}

render(App);
