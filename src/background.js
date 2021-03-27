import { COUNTDOWN_EXEC, COUNTDOWN_DONE, COUNTDOWN_PROCESS } from '@/js/config';
import { sendToContentScript, sendToPopup } from '@/js/utils';
import Countdown from '@/js/Countdown';

const cd = new Countdown();

cd.addListener('started', () => {
    sendToPopup({
        msg: '倒计时启动',
        type: COUNTDOWN_EXEC,
    });
});

cd.addListener('process', () => {
    sendToPopup({
        msg: '倒计时进行中',
        type: COUNTDOWN_PROCESS,
        payload: {
            second: cd.getCount(),
        },
    });
});

cd.addListener('done', () => {
    sendToContentScript({
        code: 0,
        msg: '倒计时结束',
    });

    sendToPopup({
        msg: '倒计时完成',
        type: COUNTDOWN_DONE,
    });
});

function launch(second) {
    cd.setCount(second);

    cd.started();
}

window.cd = cd;
window.launch = launch;
