import React, { useState, useEffect, useCallback } from 'react';
import 'antd/dist/antd.css';
import { Button, Select } from 'antd';
import { useToggle } from 'ahooks';

import { IsChrome, onMessage } from '@/js/utils';
import { COUNTDOWN_EXEC, COUNTDOWN_DONE, COUNTDOWN_PROCESS } from '@/js/config';

import { Container, BoxPrimary, TimeView } from './styled';

const { Option } = Select;
const backgroundPage = chrome.extension.getBackgroundPage();

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

        // 检测是否存在倒计时
        if (backgroundPage.cd.getStatus()) {
            return;
        }

        toggleLoading();

        backgroundPage.launch(state);
    };

    const initCountdown = useCallback(() => {
        const count = backgroundPage.cd.getCount();
        if (count) {
            toggleDisabled(true);
            setCount(count);
        }
    }, [toggleDisabled]);

    useEffect(() => {
        if (!IsChrome()) {
            return;
        }

        initCountdown();

        onMessage((request) => {
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
    }, [toggleLoading, toggleDisabled, initCountdown]);

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
