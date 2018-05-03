/**
 * Created by hai.xiong on 2018/4/28.
 */

// try to handle passive events
let passiveEventSupported = false;
try {
    const opts = Object.defineProperty({}, 'passive', {
        get() {
            passiveEventSupported = true;
        }
    });
    window.addEventListener('test', null, opts);
}
catch (e) {
    console.error('no support passive events',e)
}
// if they are supported, setup the optional params
// IMPORTANT: FALSE doubles as the default CAPTURE value!
const passiveEvent = passiveEventSupported ? {capture: false, passive: true} : false;

export default passiveEvent;
