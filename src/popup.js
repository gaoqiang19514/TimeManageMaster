import React from 'react';
import ReactDOM from 'react-dom';

import Popup from '@/components/Popup';

function render(Component) {
    ReactDOM.render(<Component />, document.getElementById('root'));
}

render(Popup);
