export default class PostLoginData {
    private group_data: Map<string, Map<string, Map<string, {
        start: Date, end: Date,
    }>>> = new Map<string, Map<string, Map<string, {
        start: Date, end: Date,
    }>>>();

    constructor() {

        const fac1: Map<string, { start: Date, end: Date }> = new Map<string, { start: Date, end: Date }>();
        fac1.set("Main ED", {
            start: new Date("2021-01-01T00:00"), end: new Date("2023-01-03T00:00"),
        });
        fac1.set("FastTrack1", {
            start: new Date("2021-02-01T00:00"), end: new Date("2023-01-03T00:00"),
        });

        const fac2: Map<string, { start: Date, end: Date }> = new Map<string, { start: Date, end: Date }>();
        fac2.set("Main2", {
            start: new Date("2021-03-01T00:00"), end: new Date("2023-01-01T00:00"),
        });
        fac2.set("FastTrack2", {
            start: new Date("2021-04-01T00:00"), end: new Date("2023-01-01T00:00"),
        });

        const fac3: Map<string, { start: Date, end: Date }> = new Map<string, { start: Date, end: Date }>();
        fac3.set("Main3", {
            start: new Date("2021-05-01T00:00"), end: new Date("2023-01-01T00:00"),
        });
        fac3.set("FastTrack3", {
            start: new Date("2021-06-01T00:00"), end: new Date("2023-01-01T00:00"),
        });

        const fac4: Map<string, { start: Date, end: Date }> = new Map<string, { start: Date, end: Date }>();
        fac4.set("Main4", {
            start: new Date("2021-07-01T00:00"), end: new Date("2023-01-01T00:00"),
        });
        fac4.set("FastTrack4", {
            start: new Date("2021-08-01T00:00"), end: new Date("2023-01-01T00:00"),
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
