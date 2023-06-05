export type ShiftDataType = {
    id: string,
    start: number,
    duration: number,
    deleteFlag?: boolean,
    daysOfWeek: boolean[],
    providerType: string,
};

export type ScheduleDataType = {
    pk: string,
    owner: string,
    schedule_name: string,
    creationDate: Date,
    updateDate: Date,
    shifts: Map<string,ShiftDataType>,
    yearly_cost: number,
}

export default class AllSchedulesData {
    private schedules: Map<string, ScheduleDataType> = new Map<string, ScheduleDataType>();
    private empty_schedule: ScheduleDataType = {pk: "0", owner: "", schedule_name: "", creationDate: new Date(), updateDate: new Date(), shifts: new Map<string, ShiftDataType>(), yearly_cost: 0.0 };

    public retrieveAllSchedulesData(group: string, facility: string, department: string) {
        // TODO: go to server and retrieve the 
        const shifts1: Map<string, ShiftDataType> = new Map<string, ShiftDataType>();
        shifts1.set("1", { id: "1", start: 8, duration: 8, daysOfWeek: [true,true,true,true,true,true,true,], providerType: "PHYS" });
        shifts1.set("2", { id: "2", start: 15, duration: 8, daysOfWeek: [true,true,true,true,true,true,true,], providerType: "PHYS" });
        shifts1.set("3", { id: "3", start: 11, duration: 8, daysOfWeek: [true,true,true,true,true,true,true,], providerType: "PHYS" });
        shifts1.set("4", { id: "4", start: 18, duration: 8, daysOfWeek: [true,true,true,true,true,true,true,], providerType: "PHYS" });
        shifts1.set("5", { id: "5", start: 22, duration: 10, daysOfWeek: [true,true,true,true,true,true,true,], providerType: "PHYS" });
        shifts1.set("6", { id: "6", start: 9, duration: 12, daysOfWeek: [true,true,true,true,true,true,true,], providerType: "APP" });

        const pk1 = "1";
        const owner: string = "bpatton";
        const schedule_name1: string = "Bobs First Schedule Design";
        const sched1: ScheduleDataType = { pk: pk1, owner: owner, schedule_name: schedule_name1, creationDate: new Date(2023, 5, 1), updateDate: new Date(2023, 5, 11), shifts: shifts1, yearly_cost: 11.1 }

        this.schedules.set(pk1, sched1);

        // For updates to ShiftSliderComponent to work all shifts must have unique ids across AllSchedulesData 
        // not just within a singe schedule! I;m not absolutely sure why this is the criteria used to determine update necessity
        // and why the item is not updated for having changed even if the id is the same - but it seems to be a thing
        // about the way React handles lists of Component items and the need for those unique keys for each item in those lists of items.
        // A database unique PK will suffice. Alternatively, we could just use 100*<schedulePK> + incremented shiftnum
        const shifts2: Map<string, ShiftDataType> = new Map<string, ShiftDataType>();
        shifts2.set("101", { id: "101", start: 7, duration: 9, daysOfWeek: [true,true,true,true,true,true,true,], providerType: "PHYS" });
        shifts2.set("102", { id: "102", start: 15, duration: 9, daysOfWeek: [true,true,true,true,true,true,true,], providerType: "PHYS" });
        shifts2.set("103", { id: "103", start: 11, duration: 9, daysOfWeek: [true,true,true,true,true,true,true,], providerType: "PHYS" });
        shifts2.set("104", { id: "104", start: 23, duration: 9, daysOfWeek: [true,true,true,true,true,true,true,], providerType: "PHYS" });
        shifts2.set("105", { id: "105", start: 8, duration: 12, daysOfWeek: [true,true,true,true,true,true,false], providerType: "APP" });
        shifts2.set("106", { id: "106", start: 10, duration: 12, daysOfWeek: [true,true,true, false, true,true,true,], providerType: "APP" });
        shifts2.set("107", { id: "107", start: 10, duration: 11, daysOfWeek: [true,true,true, false, true,true,true,], providerType: "APP" });

        const pk2 = "2";
        const schedule_name2: string = "Bobs Second Schedule Design";
        const sched2: ScheduleDataType = { pk: pk2, owner: owner, schedule_name: schedule_name2, creationDate: new Date(2023, 5, 2), updateDate: new Date(2023, 5, 22), shifts: shifts2, yearly_cost: 12.2 }

        this.schedules.set(pk2, sched2);

    }

    public getEmptySchedule(): ScheduleDataType {
        return this.empty_schedule;
    }

    public getAllSchedulesData(): Map<string, ScheduleDataType> {
        return this.schedules;
    }

    public getScheduleByNameAndOwner(pk: string): ScheduleDataType | undefined {
        return this.schedules.get(pk);
    }
}


