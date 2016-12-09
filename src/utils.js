import momentTimezone from 'moment-timezone';
const timezones = momentTimezone.tz.names();
import informalTimezones from './informalTimezones';

export function trim(s){
  return ( s || '' ).replace( /\s+/g, '' );
}
export function findTimezone(timezone){
  return timezones.find(t=>t.includes(timezone)) || informalTimezones[timezone];
}
export function getValidZoneName(_timezone){
  let timezone = trim(_timezone);
  if(!momentTimezone.tz.zone(timezone)){
    timezone = findTimezone(timezone);
    if(!timezone){
        throw new Error(`Timezone ${_timezone} is not valid. Please refer to timezones from the readme file.`);
    }
  }
  return timezone;
}

export const FORMAT = 'MM/DD/YY hh:mm a';
