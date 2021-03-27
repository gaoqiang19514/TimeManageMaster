import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Button, Select } from 'antd';
import { useToggle } from 'ahooks';

import { COUNTDOWN_EXEC, COUNTDOWN_DONE, COUNTDOWN_PROCESS } from '@/js/config';

import { Container, BoxPrimary, TimeView } from '@/style/popup';

const BG = chrome.extension.getBackgroundPage();
const { Option } = Select;

function Popup() {
    const [count, setCount] = useState(0);
    const [state, setState] = useState('5');
    const [loading, { toggle: toggleLoading }] = useToggle(false);
    const [disabled, { toggle: toggleDisabled }] = useToggle(false);

    const onChange = (value) => {
        setState(value);
    };

    const onClick = () => {
        if (!state) {
            return;
        }

        if (BG.isCountdown) {
            return;
        }

        toggleLoading();

        BG.started(state);
    };

    useEffect(() => {
        chrome.runtime.onMessage.addListener((request) => {
            if (request.type === COUNTDOWN_EXEC) {
                toggleLoading();
                toggleDisabled();
                return;
            }

            if (request.type === COUNTDOWN_DONE) {
                toggleDisabled();
            }

            if (request.type === COUNTDOWN_PROCESS) {
                setCount(request.payload.second);
            }
        });
    }, [toggleLoading, toggleDisabled]);

    return (
        <Container>
            <BoxPrimary>
                <Select defaultValue="5" className="select" onChange={onChange}>
                    <Option value="5">5秒</Option>
                    <Option value="10">10秒</Option>
                    <Option value="60">1分钟</Option>
                    <Option value="1500">25分钟</Option>
                </Select>
                <Button
                    type="primary"
                    loading={loading}
                    disabled={disabled}
                    onClick={onClick}
                >
                    启动
                </Button>
            </BoxPrimary>
            <TimeView>{count}</TimeView>
        </Container>
    );
}

export default Popup;
