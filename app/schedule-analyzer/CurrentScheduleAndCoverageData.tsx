import { ShiftDataType } from "./AllSchedulesData";

export type WeekCoverageDataType = {
    SUN: number[],
    MON: number[],
    TUE: number[],
    WED: number[],
    THU: number[],
    FRI: number[],
    SAT: number[],
    AVG: number[],
};

export type CoverageDataType = {
    Full: WeekCoverageDataType,
    lvl5CC: WeekCoverageDataType,
};

export default class CurrentScheduleAndCoverageData {

    private coverage_data: CoverageDataType;
    private current_schedule: Map<string, ShiftDataType[]>;
    private default_coverage_data: CoverageDataType;
    private y_max: number;

    constructor() {
        this.default_coverage_data = {
            Full: {
                SUN: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                MON: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                TUE: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                WED: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                THU: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                FRI: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                SAT: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                AVG: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            },
            lvl5CC:
            {
                SUN: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                MON: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                TUE: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                WED: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                THU: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                FRI: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                SAT: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                AVG: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            }
        };

        this.coverage_data = {
            Full: {
                SUN: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 10, 10, 10, 10, 10],
                MON: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 10, 10, 10, 10, 10],
                TUE: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 10, 10, 10, 10, 10],
                WED: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 10, 10, 10, 10, 10],
                THU: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 10, 10, 10, 10, 10],
                FRI: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 10, 10, 10, 10, 10],
                SAT: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 10, 10, 10, 10, 10],
                AVG: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 10, 10, 10, 10, 10],
            },
            lvl5CC:
            {
                SUN: [5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 5, 5, 5, 5, 5, 5, 5,],
                MON: [5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 5, 5, 5, 5, 5, 5, 5,],
                TUE: [5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 5, 5, 5, 5, 5, 5, 5,],
                WED: [5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 5, 5, 5, 5, 5, 5, 5,],
                THU: [5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 5, 5, 5, 5, 5, 5, 5,],
                FRI: [5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 5, 5, 5, 5, 5, 5, 5,],
                SAT: [5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 5, 5, 5, 5, 5, 5, 5,],
                AVG: [5, 5, 5, 5, 5, 5, 5, 5, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 5, 5, 5, 5, 5, 5, 5,],
            }
        };

        this.current_schedule = new Map<string, ShiftDataType[]>();

        this.y_max = 0.0;
        this.calculateMaxY();
    }

    private calculateMaxY() {
        let maxy: number = 0.0;
        [this.coverage_data.Full, this.coverage_data.lvl5CC].forEach(week => {
            const weekMax: number = this.yMaxUtilSlice(week);
            maxy = (maxy < weekMax) ? weekMax : maxy;
        })
        this.y_max = maxy;
        console.log("calculated Coverage y_max: " + maxy);
    }

    private yMaxUtilSlice(week: WeekCoverageDataType) {
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

    public getCoverageData(): CoverageDataType {
        return this.coverage_data;
    }
    public getDefaultCoverageData(): CoverageDataType {
        return this.default_coverage_data;
    }
    public getMaxY(): number {
        console.log("returning Coverage y_max: " + this.y_max);
        return this.y_max;
    }

    public setCoverageData(newCov: CoverageDataType) {
        this.coverage_data = newCov;
        this.calculateMaxY();
    }
}
