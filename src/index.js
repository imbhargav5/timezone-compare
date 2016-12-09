import TimezoneCompare from './TimezoneCompare';

export default function compareTimezones(from_timezone, to_timezone){
    return new TimezoneCompare(from_timezone,to_timezone).getTimes();
};
