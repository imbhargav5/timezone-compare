#!/usr/bin/env node

import momentTimezone from 'moment-timezone';
import { getValidZoneName, FORMAT} from './utils';


export default class TimezoneCompare{
  constructor(_from_timezone, _to_timezone){
    const from_timezone = getValidZoneName(_from_timezone),
      to_timezone = getValidZoneName(_to_timezone);
    this.from_timezone = from_timezone;
    this.to_timezone =to_timezone;
  }
  getTimes(){
      const {from_timezone, to_timezone} = this;
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
      return data;
  }
}
