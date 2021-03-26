import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Demo from '@/components/Demo';

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root'),
    );
};

render(Demo);

if (module.hot) {
    module.hot.accept('@/components/Demo', () => {
        const NextApp = require('@/components/Demo').default;
        // 重新渲染到 document 里面
        render(NextApp);
    });
}
