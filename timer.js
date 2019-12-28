/*
Things the timer does:
- Displays a timer (T)
- Shows an animated border around the timer (B)

Psuedo code:
- Set up eventlistener to watch for click on 'start' button (T)
    - Draw a border around the counter (B)
    - Start counting down the timer (T)
    - Each 'tick' of timer updates the border (B)
    - Each 'tick' of timer updates the text (T)
    - If timer reaches 0 (T)
        - Reset border (B)
        - Reset internal timer (T)

T vs B:
We are mentally switching back and forth from thinking about the timer and the border in the above layout; this is confusing.
We could use an "evented styled approach" to streamline.
We could focus blocks of code entirely on one of each, then use callbacks or emit events to signal other blocks.
Tutorial uses class-based implementation: class Timer, start(), pause(), onDurationChange(), tick().

*/

class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) { // parameters are references to DOM elements
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start); // bind references so instance can reach DOM
        this.pauseButton.addEventListener('click', this.pause);
    }

    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemaining);
        }
        this.tick();
        this.interval = setInterval(this.tick, 20);
    };

    pause = () => {
        clearInterval(this.interval);
    };

    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            this.timeRemaining = this.timeRemaining - 0.02;
            if (this.onTick) {
                this.onTick(this.timeRemaining);
            }
        }
    }

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }
}
