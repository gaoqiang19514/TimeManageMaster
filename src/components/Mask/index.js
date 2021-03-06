/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Container, Btn } from './styled';

const propTypes = {
    onClose: PropTypes.func,
};

function Mask({ onClose }) {
    return (
        <Container>
            <Btn type="button" onClick={onClose}>
                我知道了
            </Btn>
            <audio
                controls="controls"
                autoPlay="autoplay"
                style={{ display: 'none' }}
            >
                <source
                    src="https://www.html5rocks.com/en/tutorials/audio/quick/test.mp3"
                    type="audio/mp3"
                />
            </audio>
        </Container>
    );
}

Mask.propTypes = propTypes;

function openMask() {
    let div = document.createElement('div');
    document.body.appendChild(div);

    const onClose = () => {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
        div = null;
    };

    // 调出弹层
    ReactDOM.render(<Mask onClose={onClose} />, div);
}

export { openMask };
export default Mask;
