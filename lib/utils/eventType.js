'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by hai.xiong on 2018/4/28.
 */

// try to handle passive events
var passiveEventSupported = false;
try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function get() {
            passiveEventSupported = true;
        }
    });
    window.addEventListener('test', null, opts);
} catch (e) {
    console.error('no support passive events', e);
}
// if they are supported, setup the optional params
// IMPORTANT: FALSE doubles as the default CAPTURE value!
var passiveEvent = passiveEventSupported ? { capture: false, passive: true } : false;

exports.default = passiveEvent;