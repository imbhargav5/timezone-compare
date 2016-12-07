#!/usr/bin/env node
'use strict';

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _table = require('table');

var _informalTimezones = require('./informalTimezones');

var _informalTimezones2 = _interopRequireDefault(_informalTimezones);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timezones = _momentTimezone2.default.tz.names();


function trim(s) {
  return (s || '').replace(/\s+/g, '');
}

var FORMAT = 'MM/DD/YY hh:mm a';
var tableConfig = {
  columns: {
    0: {
      alignment: 'center'
    },
    1: {
      alignment: 'center'
    }
  }
};
var questions = [{
  type: 'input',
  name: 'from_timezone',
  message: 'Enter FROM timezone',
  default: function _default() {
    return 'America/New_York';
  }
}, {
  type: 'input',
  name: 'to_timezone',
  message: 'Enter TO timezone',
  default: function _default() {
    return 'Europe/London';
  }
}];

function findTimezone(timezone) {
  return timezones.find(function (t) {
    return t.includes(timezone);
  }) || _informalTimezones2.default[timezone];
}

_inquirer2.default.prompt(questions).then(function (answers) {
  var from_timezone = answers.from_timezone,
      to_timezone = answers.to_timezone;

  from_timezone = trim(from_timezone);
  to_timezone = trim(to_timezone);

  if (!_momentTimezone2.default.tz.zone(from_timezone)) {
    from_timezone = findTimezone(from_timezone);
    if (!from_timezone) {
      throw new Error('from_timezone is not valid');
    }
  }
  if (!_momentTimezone2.default.tz.zone(to_timezone)) {
    to_timezone = findTimezone(to_timezone);
    if (!to_timezone) {
      throw new Error('to_timezone is not valid');
    }
  }

  var data = [];
  var start = _momentTimezone2.default.tz(from_timezone).startOf('day');
  var end = start.clone().add(30, 'hours');
  start.add(-30, 'minutes');
  data.push([from_timezone, to_timezone]);
  while (start.isBefore(end)) {
    var left = start.add(30, 'minutes').clone();
    var right = left.clone().tz(to_timezone);
    data.push([left.format(FORMAT) + ' ' + from_timezone, right.format(FORMAT) + ' ' + to_timezone]);
  }
  var output = (0, _table.table)(data, tableConfig);
  console.log(output);
});