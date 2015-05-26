'use strict';

var Backbone = require('backbone'),
  _$ = require('jquery'),
  ws = null,
  open = false;

Backbone.sync = function (method, model, options) {

  if (!ws) {
    ws = new window.WebSocket('ws://127.0.0.1:3001');
  }

  options = options || {};

  var json = model.toJSON();


  if (open) {
    ws.send(JSON.stringify({
      method: method,
      location: window.location.href,
      entity: json.entity,
      data: json.data
    }));
  }

  ws.onopen = function connectionOpen() {

    open = true;

    ws.send(JSON.stringify({
      method: method,
      location: window.location.href,
      entity: json.entity,
      data: json.data
    }));

  };

};

if (!window.$) {
  window.$ = _$;
}

Backbone.$ = _$;

module.exports = Backbone;
