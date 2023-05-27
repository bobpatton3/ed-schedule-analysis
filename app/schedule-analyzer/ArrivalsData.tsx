
export type WeekArrivalsDataType = {
    SUN: number[],
    MON: number[],
    TUE: number[],
    WED: number[],
    THU: number[],
    FRI: number[],
    SAT: number[],
    AVG: number[],
};

export type ArrivalsDataType = {
    Full: WeekArrivalsDataType,
    lvl5CC: WeekArrivalsDataType,
};

export default class ArrivalsData {

    private arrivals_data: ArrivalsDataType;
    private default_arrivals_data: ArrivalsDataType;
    private y_max: number;

    constructor() {
        this.default_arrivals_data = {
            Full: {
                SUN: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                MON: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                TUE: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                WED: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                THU: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                FRI: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                SAT: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                AVG: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            lvl5CC:
            {
                SUN: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                MON: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                TUE: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                WED: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                THU: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                FRI: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                SAT: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                AVG: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            }
        };

        this.arrivals_data = {
            Full: {
                SUN: [9, 5, 4.5, 3.5, 2, 4, 4, 6, 5.5, 9, 12, 15, 18, 17, 20, 20, 19, 21, 24, 19, 15, 9, 8, 5, 4],
                MON: [4, 3.5, 3.5, 2.5, 3, 4, 6, 8, 9, 12, 16, 19, 23, 24, 23, 21, 22, 22, 24, 23, 18, 13, 11, 7, 5],
                TUE: [5, 5, 5, 5, 5, 5, 5, 8, 8, 8, 8, 11, 11, 11, 15, 15, 15, 15, 15, 11, 11, 11, 11, 9, 6],
                WED: [6, 4, 4, 4, 4, 4, 7, 7, 7, 7, 7, 15, 15, 15, 15, 21, 21, 21, 22, 22, 15, 15, 11, 9, 6],
                THU: [6, 3, 3, 3, 3, 5, 5, 8, 8, 8, 12, 12, 15, 18, 21, 22, 24, 24, 22, 24, 20, 15, 11, 9, 6],
                FRI: [6, 4, 4, 2, 2, 3, 6, 7, 8, 9, 10, 15, 21, 23, 23, 25, 21, 23, 22, 18, 15, 11, 9, 7, 6],
                SAT: [6, 3.5, 3.5, 2.5, 3, 4, 6, 8, 9, 12, 16, 19, 23, 24, 23, 21, 22, 22, 24, 23, 18, 13, 11, 7, 9],
                AVG: [6, 4, 3.9, 3.2, 3.1, 4.1, 5.6, 7.4, 7.8, 9.3, 11.6, 15.1, 18, 18.9, 20, 20.7, 20.6, 21.1, 21.9, 20, 16, 12.4, 10.3, 7.6, 6],
            },
            lvl5CC:
            {
                SUN: [4.5, 2.5, 2.3, 1.8, 1, 2, 2, 3, 2.8, 4.5, 6, 7.5, 9, 8.5, 10, 10, 9.5, 10.5, 12, 9.5, 7.5, 4.5, 4, 2.5, 2],
                MON: [2, 1.8, 1.8, 1.3, 1.5, 2, 3, 4, 4.5, 6, 8, 9.5, 11.5, 12, 11.5, 10.5, 11, 11, 12, 11.5, 9, 6.5, 5.5, 3.5, 2.5],
                TUE: [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 4, 4, 4, 4, 5.5, 5.5, 5.5, 7.5, 7.5, 7.5, 7.5, 7.5, 5.5, 5.5, 5.5, 5.5, 4.5, 3],
                WED: [3, 2, 2, 2, 2, 2, 3.5, 3.5, 3.5, 3.5, 3.5, 7.5, 7.5, 7.5, 7.5, 10.5, 10.5, 10.5, 11, 11, 7.5, 7.5, 5.5, 4.5, 3],
                THU: [3, 1.5, 1.5, 1.5, 1.5, 2.5, 2.5, 4, 4, 4, 6, 6, 7.5, 9, 10.5, 11, 12, 12, 11, 12, 10, 7.5, 5.5, 4.5, 3],
                FRI: [3, 2, 2, 1, 1, 1.5, 3, 3.5, 4, 4.5, 5, 7.5, 10.5, 11.5, 11.5, 12.5, 10.5, 11.5, 11, 9, 7.5, 5.5, 4.5, 3.5, 3],
                SAT: [3, 1.8, 1.8, 1.3, 1.5, 2, 3, 4, 4.5, 6, 8, 9.5, 11.5, 12, 11.5, 10.5, 11, 11, 12, 11.5, 9, 6.5, 5.5, 3.5, 4.5],
                AVG: [3, 2, 2, 1.6, 1.6, 2.1, 2.8, 3.7, 3.9, 4.6, 5.8, 7.6, 9, 9.4, 10, 10.4, 10.3, 10.6, 10.9, 10, 8, 6.2, 5.1, 3.8, 3],
            }
        };

        this.y_max = 0.0;
        this.calculateMaxY();
    }

    private calculateMaxY() {
        let maxy: number = 0.0;
        [this.arrivals_data.Full, this.arrivals_data.lvl5CC].forEach(week => {
            const weekMax: number = this.yMaxUtilSlice(week);
            maxy = (maxy < weekMax) ? weekMax : maxy;
        })
        this.y_max = maxy;
        console.log("calculated Arrivals y_max: " + maxy);
    }

    private yMaxUtilSlice(week: WeekArrivalsDataType) {
        let maxy: number = 0.0;
        [week.SUN, week.MON, week.TUE, week.WED, week.THU, week.FRI, week.SAT].forEach(day => {
            const dayMax: number = this.yMaxUtilWeek(day);
            maxy = (maxy < dayMax) ? dayMax : maxy;
        });
        return maxy;
    }

    private yMaxUtilWeek(day: number[]): number {
        let maxy: number = 0.0;
        day.forEach(hour => {
            maxy = (maxy < hour) ? hour : maxy;
        });
        return maxy;
    }

    public getArrivalsData(): ArrivalsDataType {
        return this.arrivals_data;
    }
    public getDefaultArrivalsData(): ArrivalsDataType {
        return this.default_arrivals_data;
    }
    public getMaxY(): number {
        console.log("returning Arrivals y_max: " + this.y_max);
        return this.y_max;
    }
}





