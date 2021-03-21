import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Button, Select } from 'antd';

import { BoxPrimary } from './style/popup';

import './css/popup.css';

const BG = chrome.extension.getBackgroundPage();
const { Option } = Select;

function App() {
    const [state, setState] = useState('5');

    const onChange = (value) => {
        console.log('onChange', value);
        setState(value);
    };

    const onClick = () => {
        if (!state) {
            return;
        }

        if (BG.isCountdown) {
            return;
        }

        BG.started(state);
    };

    return (
        <BoxPrimary>
            <Select defaultValue="5" className="select" onChange={onChange}>
                <Option value="5">5秒</Option>
                <Option value="10">10秒</Option>
                <Option value="60">1分钟</Option>
                <Option value="1500">25分钟</Option>
            </Select>
            <Button type="primary" onClick={onClick}>
                启动
            </Button>
        </BoxPrimary>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
