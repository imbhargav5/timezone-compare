#!/usr/bin/env node

import momentTimezone from 'moment-timezone';
import { getValidZoneName,NUM_HOURS ,FORMAT} from './utils';


export default class TimezoneCompare{
  constructor(_from_timezone, _to_timezone){
    const from_timezone = getValidZoneName(_from_timezone),
      to_timezone = getValidZoneName(_to_timezone);
    this.from_timezone = from_timezone;
    this.to_timezone =to_timezone;
  }
  _getMoments(){
    const {from_timezone, to_timezone} = this;
    const times = [];
    const start =  momentTimezone.tz(from_timezone).startOf('day');
    const end =  start.clone().add(NUM_HOURS,'hours');
    start.add(-30,'minutes');
    while(start.isBefore(end)){
      const left = start.add(30,'minutes').clone();
      const right = left.clone().tz(to_timezone);
      times.push([left,right]);
    }
    return times;
  }
  getTimesAsStrings(){
      const {from_timezone, to_timezone} = this;
      const times = this._getMoments().map(([left,right])=>{
        return  [`${left.format(FORMAT)} ${from_timezone}`,`${right.format(FORMAT)} ${to_timezone}`];
      });
      const timezones = [from_timezone, to_timezone];
      return {
        times,
        timezones
      };
  }
  getTimesAsMoments(){
    const {from_timezone, to_timezone} = this;
    const times = this._getMoments();
    const timezones = [from_timezone, to_timezone];
    return {
      times,
      timezones
    };
  }
}
