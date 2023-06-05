import { ScheduleDataType, ShiftDataType } from "./AllSchedulesData";

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

export type StatusHeaderDataType = {
    facility_name: string;
    department_name: string;
    data_start_date: Date;
    data_end_date: Date;
    schedule_name: string;
}

export default class CurrentScheduleAndCoverageData {

    private coverage_data: CoverageDataType;
    private current_schedule: ScheduleDataType = { pk: "", owner: "", schedule_name: "", creationDate: new Date(), updateDate: new Date(), shifts: new Map<string, ShiftDataType>(), yearly_cost: 0 };
    private y_max: number;
    private phys_peak_capacity = 8.0;
    private app_peak_capacity = 5.5;
    private phys_profile = [1.5, 1.2, 1.1, 1.0, 0.9, 0.8, 0.5 ];
    private app_profile = [1.3, 1.1, 1.0, 1.0, 1.0, 1.0, 0.6 ];

    constructor() {
        this.coverage_data = {
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

        this.y_max = 0.0;
        this.calculateMaxY();
    }

    private calculateMaxY() {
        let maxy: number = 0.0;
        const week = this.coverage_data.Full;
        [week.SUN, week.MON, week.TUE, week.WED, week.THU, week.FRI, week.SAT].forEach(day => {
            day.forEach(hour => {
                maxy = (maxy < hour) ? hour : maxy;
            });
        });
        this.y_max = Math.ceil(maxy);
    }

    public getCoverageData(): CoverageDataType {
        return this.coverage_data;
    }
    public getMaxY(): number {
        this.calculateMaxY();
        return this.y_max;
    }

    public setCoverageData(newCov: CoverageDataType) {
        this.coverage_data = newCov;
        this.calculateMaxY();
    }

    public setCurrentSchedule(newSchedule: ScheduleDataType) {
        this.current_schedule = newSchedule;
        this.calculateCoverageData();
    }

    public getCurrentSchedule(): ScheduleDataType {
        return this.current_schedule;
    }

    private bitToDay: Array<keyof WeekCoverageDataType> = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "AVG"];

    private calculateCoverageData() {
        const eightDaysArrayFull = new Array(192).fill(0);
        const eightDaysArrayLvl5CC = new Array(192).fill(0);
        
        this.current_schedule.shifts.forEach((value) => {

            const profile = new Array(value.duration).fill((value.providerType == "PHYS" ? this.phys_peak_capacity : this.app_peak_capacity));

            for (let i = 0; i < 3; i++) {
                profile[i] = profile[i] * (value.providerType == "PHYS" ? this.phys_profile[i]: this.app_profile[i]);
                // k counts back from the end of the shift
                let k = value.duration - 1 - i;
                profile[k] = profile[k] * (value.providerType == "PHYS" ? this.phys_profile[6-i]: this.app_profile[6-i]);
            }
            
            if (!value.deleteFlag) {
                for (let i = 0; i < 7; i++) {
                    if (value.daysOfWeek[i]) {
                        let startOffset = i * 24 + value.start;
                        for (let k = 0; k < value.duration; k++) {
                            eightDaysArrayFull[startOffset + k] += profile[k];
                            if (value.providerType == "PHYS") eightDaysArrayLvl5CC[startOffset + k] += profile[k];
                        }
                    }
                }
            }
        });
        
        for ( let hod = 0; hod < 25; hod++) {
            this.coverage_data.Full.AVG[hod] = 0.0;
            this.coverage_data.lvl5CC.AVG[hod] = 0.0;
        }

        for ( let day = 0; day < 7; day++) {
            for ( let hod = 0; hod < 25; hod++) {
                this.coverage_data.Full[this.bitToDay[day]][hod] = eightDaysArrayFull[day*24 + hod];
                this.coverage_data.Full.AVG[hod] += eightDaysArrayFull[day*24 + hod] / 7.0;
                this.coverage_data.lvl5CC[this.bitToDay[day]][hod] = eightDaysArrayLvl5CC[day*24 + hod];
                this.coverage_data.lvl5CC.AVG[hod] += eightDaysArrayLvl5CC[day*24 + hod] / 7.0;
            }
        }
        // handle the end of the week wrap around to the next Sunday (hence why the eightDaysArrays are of length 8*24 = 192 instead of 7*24=168):
        for ( let hod = 0; hod < 24; hod++) {
            this.coverage_data.Full.SUN[hod] += eightDaysArrayFull[168 + hod];
            this.coverage_data.Full.AVG[hod] += eightDaysArrayFull[168 + hod] / 7.0;
            this.coverage_data.lvl5CC.SUN[hod] += eightDaysArrayLvl5CC[168 + hod];
            this.coverage_data.lvl5CC.AVG[hod] += eightDaysArrayLvl5CC[168 + hod] / 7.0;
        }
    }
}