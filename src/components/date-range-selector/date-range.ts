import * as moment from 'moment';

export class DateRange {
    public static fromRouteParams(params, defaultDays?: number): DateRange {
        let days = params['days'] ? parseInt(params['days'], 10) : defaultDays || 1;
        let endDate = (params['date'] ? moment.unix(parseInt(params['date'], 10)) : moment()).endOf('day');
        return new DateRange(days, endDate);
    }

    public static equals(first: DateRange, second: DateRange) {
        return first && second && first.durationDays === second.durationDays && first.endDate.unix() === second.endDate.unix();
    }

    public static today() {
        return new DateRange(1, moment().endOf('day'));
    }

    constructor(public durationDays: number, public endDate: moment.Moment) {
    }

    get startDate() {
        return this.endDate.clone().startOf('day').subtract(this.durationDays - 1, 'days');
    }

    get isAllDates(): boolean {
        return this.durationDays === -1;
    }

    set isAllDates(value: boolean) {
        this.durationDays = value ? -1 : 1;
    }

    get containsToday(): boolean {
        return this.isAllDates || moment().endOf('day').unix() === this.endDate.unix();
    }

    public toRouteParams() {
        return {
            days: this.durationDays,
            date: this.endDate.unix(),
        };
    }

    public format(): string {
        if (this.isAllDates) {
            return 'All dates';
        }
        let dateFormat = 'MMM D, YYYY';
        let startDate = this.startDate;
        let endDate = this.endDate;
        return startDate.format(dateFormat) + (startDate.format(dateFormat) === endDate.format(dateFormat) ?
            '' : ` - ${endDate.format(dateFormat)}`);
    }
}
