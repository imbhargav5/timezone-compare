import TimezoneCompare from './TimezoneCompare';

export default TimezoneCompare;

export function getTimesAsStrings(from_timezone, to_timezone){
    return new TimezoneCompare(from_timezone,to_timezone).getTimesAsStrings();
};

export function getTimesAsMoments(from_timezone,to_timezone){
  return new TimezoneCompare(from_timezone,to_timezone).getTimesAsMoments();
}
