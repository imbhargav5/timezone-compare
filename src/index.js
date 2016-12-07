import inquirer from 'inquirer';
import momentTimezone from 'moment-timezone';
const timezones = momentTimezone.tz.names();
import {table} from 'table';
import informalTimezones from './informalTimezones';

function trim(s){
  return ( s || '' ).replace( /\s+/g, '' );
}

const FORMAT = 'MM/DD/YY hh:mm a';
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

function findTimezone(timezone){
   return timezones.find(t=>t.includes(timezone)) || informalTimezones[timezone];
}

inquirer.prompt(questions).then(function (answers) {
  let {from_timezone, to_timezone} = answers;
  from_timezone = trim(from_timezone);
  to_timezone = trim(to_timezone);

  if(!momentTimezone.tz.zone(from_timezone)){
    from_timezone = findTimezone(from_timezone);
    if(!from_timezone){
        throw new Error('from_timezone is not valid');
    }


  }
  if(!momentTimezone.tz.zone(to_timezone)){
    to_timezone = findTimezone(to_timezone);
    if(!to_timezone){
        throw new Error('to_timezone is not valid');
    }
  }


  const data = [];
  const start =  momentTimezone.tz(from_timezone).startOf('day');
  const end =  start.clone().add(30,'hours');
  start.add(-30,'minutes');
  data.push([from_timezone, to_timezone]);
  while(start.isBefore(end)){
    const left = start.add(30,'minutes').clone();
    const right = left.clone().tz(to_timezone);
    data.push([`${left.format(FORMAT)} ${from_timezone}`,`${right.format(FORMAT)} ${to_timezone}`]);
  }
  const output = table(data, tableConfig);
  console.log(output);
});
