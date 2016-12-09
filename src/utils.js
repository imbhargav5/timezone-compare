import momentTimezone from 'moment-timezone';
const timezones = momentTimezone.tz.names();
import informalTimezones from './informalTimezones';
export const NUM_HOURS = 24;

export function trim(s){
  return ( s || '' ).replace( /\s+/g, '' );
}
export function findTimezone(timezone){
  return timezones.find(t=>t.includes(timezone)) || informalTimezones[timezone];
}
export function isValidMomentTimezone(_timezone){
  return !!momentTimezone.tz.zone(_timezone);
}
export function getValidZoneName(_timezone){
  let timezone = trim(_timezone);
  if(timezone.length == 0){
      throw new  TypeError(`Timezone ${_timezone} is empty. Please refer to timezones from the readme file.`);
  }
  if(!isValidMomentTimezone(timezone)){
    timezone = findTimezone(timezone);
    if(!timezone){
        throw new TypeError(`Timezone ${_timezone} is not valid. Please refer to timezones from the readme file.`);
    }
  }
  return timezone;
}

export const FORMAT = 'MM/DD/YY hh:mm a';
