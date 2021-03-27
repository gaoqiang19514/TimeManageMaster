import EventEmitter from 'wolfy87-eventemitter';

class Countdown {
    constructor(count) {
        this.count = count;
        this.isCountdown = false;
        this.timer = null;

        this.countdown = this.countdown.bind(this);
    }

    setCount(count) {
        this.count = count;
    }

    getCount() {
        return this.count;
    }

    getStatus() {
        return this.isCountdown;
    }

    started() {
        this.isCountdown = true;

        this.trigger('started');
        this.timer = setInterval(this.countdown, 1000);
    }

    countdown() {
        const nextCount = this.count - 1;

        if (nextCount < 0) {
            this.done();
            return;
        }

        this.setCount(nextCount);
        this.trigger('process');
    }

    done() {
        this.isCountdown = false;
        this.trigger('done');
        clearInterval(this.timer);
    }
}

Countdown.prototype = Object.assign(
    Countdown.prototype,
    EventEmitter.prototype,
);

export default Countdown;
