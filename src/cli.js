#!/usr/bin/env node

import inquirer from 'inquirer';
import {table} from 'table';
import TimezoneCompare from './TimezoneCompare';

const tableConfig = {
    columns: {
        0: {
            alignment: 'center',
        },
        1: {
            alignment: 'center',
        }
    }
};
const questions = [
  {
    type: 'input',
    name: 'from_timezone',
    message: 'Enter FROM timezone',
    default : function(){
      return `America/New_York`;
    }
  },
  {
    type: 'input',
    name: 'to_timezone',
    message: 'Enter TO timezone',
    default: function () {
      return 'Europe/London';
    }
  },
];

inquirer.prompt(questions).then(function (answers) {
  const {from_timezone, to_timezone} = answers;
  const data = new TimezoneCompare(from_timezone,to_timezone).getTimes();
  const output = table(data, tableConfig);
  console.log(output);
});
