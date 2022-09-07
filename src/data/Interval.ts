class Interval {

    private startTime: Date;
    private endTime: Date | null;
    
    constructor(startTime: Date, endTime?: Date) {
        if (!(startTime instanceof Date))
            throw "The start time of an interval must be a valid Date object";

        this.startTime = startTime;
        this.endTime = endTime || null;
    }

    get StartTime() {
        return this.startTime;
    }

    get EndTime(): Date | null {
        return this.endTime;
    }

    isBefore(other : Interval) : number {
        if (this.StartTime === other.StartTime)
            return 0;

        return this.StartTime < other.StartTime ? -1 : 1;
    }

    toString() : string {
        if (this.endTime === null)
            return `[${this.startTime}, )`;

        return `[${this.startTime}, ${this.endTime}]`;
    }
}

export default Interval;