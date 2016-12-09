# `$ timezone-compare`

:zap: Cli tool to get a list of times across 2 different timezones for easy checking.

## Screenshot-cli

![Screenshot](https://raw.githubusercontent.com/bhargav175/timezone-compare/master/assets/timezone-compare-cli.gif "Screenshot")


## :clipboard: Usage - ES6

```javascript
import TimezoneCompare from 'timezone-compare';
const tz = new TimezoneCompare('IST', 'GMT');
const {times} = tz.getTimesAsStrings();
// [[IST times as strings][GMT times as strings]]

//const {times} = tz.getTimesAsMoments(); //If you need a 2d array of moments
// [[IST times as moments][GMT times as moments]]

```

## :cloud: Usage - cli

``` bash
$ npm install -g timezone-compare
$ timezone-compare
? Enter FROM timezone (America/New_York) IST
? Enter TO timezone (Europe/London) GMT
```

## Available timezones

List of available timezones are [here][timezones].

## Note : Timezones are fetched from moment-timezone
[Moment Timezone -- getting a list timezones](http://momentjs.com/timezone/docs/#/data-loading/getting-zone-names/)

Other arbitrary timezones can be added to `src/informalTimezones.js` if needed.

## :+1: Like it?

Support timezone-compare by giving [feedback](https://github.com/bhargav175/timezone-compare/issues) or just by 🌟 starring the project!

## :scroll: License

[MIT][license] © [Bhargav Ponnapalli][website]

[license]: http://showalicense.com/?fullname=Bhargav%20Ponnapalli%20<bhargavponnapalli.5%40gmail.com%3E%20(http%3A%2F%2Fcodementor.io/bhargavponnapalli)&year=2016#license-mit
[website]: https://www.codementor.io/bhargavponnapalli
[timezones]: https://github.com/bhargav175/timezone-compare/blob/master/AvailableTimezones.md
