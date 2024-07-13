'use strict';
const fs = require('fs');
const EventEmitter = require('events').EventEmitter;
const { GlobalKeyboardListener } = require("node-global-key-listener");
const toKey = require('./keycodes');

function Keyboard() {
  EventEmitter.call(this);
  this.onRead();
}

Keyboard.prototype = Object.create(EventEmitter.prototype, {
  constructor: { value: Keyboard }
});

Keyboard.prototype.onRead = function onRead() {
  const self = this;
  const listener = new GlobalKeyboardListener();

  listener.addListener(function (e) {
    if (e.state === "DOWN") {
      let keyEvent = parse(e);
      if (keyEvent) {
        self.emit('keydown', keyEvent);
      }
    }
  });
}

function parse(event) {
  return {
    keycode: event.name,
    keyId: toKey[event.name] || event.name,
    type: 'keydown'
  };
}

Keyboard.Keys = toKey;

module.exports = Keyboard;
