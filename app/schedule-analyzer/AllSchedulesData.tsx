export type ShiftDataType = {
    id: string,
    start: number,
    duration: number,
    daysOfWeek: number[],
    providerType: string,
};

export type ScheduleDataType = {
    owner: string,
    schedule_name: string,
    creationDate: Date,
    updateDate: Date,
    shifts: ShiftDataType[],
    yearly_cost: number,
}

export default class AllSchedulesData {
    private schedules: Map<string, ScheduleDataType> = new Map<string, ScheduleDataType>();

    public retrieveAllSchedulesData(group: string, facility: string, department: string) {
        // TODO: go to server and retrieve the 
        const shifts1: ShiftDataType[] = [
            { id: "1", start: 8, duration: 8, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "PHYS" },
            { id: "2", start: 15, duration: 8, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "PHYS" },
            { id: "3", start: 11, duration: 8, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "PHYS" },
            { id: "4", start: 18, duration: 8, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "PHYS" },
            { id: "5", start: 22, duration: 10, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "PHYS" },
            { id: "6", start: 9, duration: 12, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "APP" },
        ];

        const owner: string = "bpatton";
        const schedule_name1: string = "Bobs First Schedule Design";
        const sched1: ScheduleDataType = { owner: owner, schedule_name: schedule_name1, creationDate: new Date(2023, 5, 1), updateDate: new Date(2023, 5, 11), shifts: shifts1, yearly_cost: 11.1 }

        this.schedules.set(owner + ": " + schedule_name1, sched1);

        const shifts2: ShiftDataType[] = [
            { id: "7", start: 7, duration: 9, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "PHYS" },
            { id: "8", start: 15, duration: 9, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "PHYS" },
            { id: "9", start: 11, duration: 9, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "PHYS" },
            { id: "10", start: 23, duration: 9, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "PHYS" },
            { id: "11", start: 8, duration: 12, daysOfWeek: [1, 1, 1, 1, 1, 1, 0], providerType: "APP" },
            { id: "12", start: 10, duration: 12, daysOfWeek: [1, 1, 1, 0, 1, 1, 1], providerType: "APP" },
        ];

        const schedule_name2: string = "Bobs Second Schedule Design";
        const sched2: ScheduleDataType = { owner: owner, schedule_name: schedule_name2, creationDate: new Date(2023, 5, 2), updateDate: new Date(2023, 5, 22), shifts: shifts2, yearly_cost: 12.2 }

        this.schedules.set(owner + ": " + schedule_name2, sched2);
    }

    public getAllSchedulesData(): Map<string, ScheduleDataType> {
        return this.schedules;
    }

    public getScheduleByNameAndOwner(pk: string): ScheduleDataType | undefined {
        return this.schedules.get(pk);
    }
}


