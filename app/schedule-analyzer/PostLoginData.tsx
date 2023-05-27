import { ShiftDataType } from "./AllSchedulesData";

// TODO: THIS IS ALL WRONG! THE SCHEDULES SHOULDN'T BE IN HERE. 
// SCHEDULES SHOULD BE LOADED SIMULATANEOUSLY WITH THE ARRIVALS LOAD AND ONLY THE SCHEDULES FOR THE CHOSEN GROUP/FACILITY/DEPARTMENT!

export default class PostLoginData {
    private group_data: Map<string, Map<string, Map<string, {
        start: Date, end: Date,
    }>>> = new Map<string, Map<string, Map<string, {
        start: Date, end: Date,
    }>>>();

    constructor() {

        const fac1: Map<string, { start: Date, end: Date }> = new Map<string, { start: Date, end: Date }>();
        fac1.set("Main1", {
            start: new Date("2021-01-01"), end: new Date("2023-01-01"),
        });
        fac1.set("FastTrack1", {
            start: new Date("2021-02-01"), end: new Date("2023-01-01"),
        });

        const fac2: Map<string, { start: Date, end: Date }> = new Map<string, { start: Date, end: Date }>();
        fac2.set("Main2", {
            start: new Date("2021-03-01"), end: new Date("2023-01-01"),
        });
        fac2.set("FastTrack2", {
            start: new Date("2021-04-01"), end: new Date("2023-01-01"),
        });

        const fac3: Map<string, { start: Date, end: Date }> = new Map<string, { start: Date, end: Date }>();
        fac3.set("Main3", {
            start: new Date("2021-05-01"), end: new Date("2023-01-01"),
        });
        fac3.set("FastTrack3", {
            start: new Date("2021-06-01"), end: new Date("2023-01-01"),
        });

        const fac4: Map<string, { start: Date, end: Date }> = new Map<string, { start: Date, end: Date }>();
        fac4.set("Main4", {
            start: new Date("2021-07-01"), end: new Date("2023-01-01"),
        });
        fac4.set("FastTrack4", {
            start: new Date("2021-08-01"), end: new Date("2023-01-01"),
        });

        const group1: Map<string, Map<string, { start: Date, end: Date }>> = new Map<string, Map<string, { start: Date, end: Date }>>();
        group1.set("Memorial Hospital", fac1);
        group1.set("Regional Hospital", fac2);
        const group2: Map<string, Map<string, { start: Date, end: Date }>> = new Map<string, Map<string, { start: Date, end: Date }>>();
        group2.set("Memorial Patton Hospital", fac3);
        group2.set("Patton Regional Hospital", fac4);

        this.group_data.set("A1 Emergency Physicians", group1);
        this.group_data.set("Best Emergency Physicians", group2);

    }

    public getPostLoginData(): Map<string, Map<string, Map<string, { start: Date, end: Date, }>>> {
        return this.group_data;
    }
}

/*
function logIt(value: object, key: string) {
    console.log(key);
    if (value instanceof Map) {
        value.forEach(logIt);
    } else {
        const d: {start: Date, end: Date} = value as {start: Date, end: Date};
        console.log(value);
        console.log("             start:  " + d.start.toUTCString());
        console.log("               end:  " + d.end.toUTCString());
    }
}

const v: PostLoginData = new PostLoginData();

const gd: Map<string, Map<string, Map<string, {start: Date, end: Date}>>> = v.getPostLoginData();

console.log("-----------------------------------------------------------------");
for (const g of gd ) {
    console.log("Group:  " + g[0]);
    for (const f of g[1] ) {
        console.log("    Facility:  " + f[0]);
        for (const d of f[1] ) {
            console.log("        Department:  " + d[0]);
            console.log("             start:  " + d[1].start);
            console.log("               end:  " + d[1].end);
        }
    }
}

gd.forEach(logIt);


*/
