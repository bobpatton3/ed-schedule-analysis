export type ShiftDataType = {
    start: number,
    duration: number,
    daysOfWeek: number[],
    providerType: string,
};

export type SchedulePKType = {
    owner: string,
    name: string,
}

export type ScheduleDataType = {
    creationDate: Date,
    updateDate: Date,
    shifts: ShiftDataType[],
}

export default class AllSchedulesData {
    private schedules: Map<SchedulePKType, ScheduleDataType> = new Map<SchedulePKType, ScheduleDataType>();

    constructor() {
        const shifts1: ShiftDataType[] = [
            { start: 8, duration: 8, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "PHYS" },
            { start: 15, duration: 8, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "PHYS" },
            { start: 11, duration: 8, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "PHYS" },
            { start: 18, duration: 8, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "PHYS" },
            { start: 22, duration: 10, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "PHYS" },
            { start: 9, duration: 12, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "APP" },
        ];

        const sched1: ScheduleDataType = { creationDate: new Date(2023, 5, 1), updateDate: new Date(2023, 5, 11), shifts: shifts1 }

        this.schedules.set({ owner: "bpatton", name: "Bobs First Schedule Design" }, sched1);

        const shifts2: ShiftDataType[] = [{ start: 7, duration: 9, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "PHYS" },
        { start: 15, duration: 9, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "PHYS" },
        { start: 11, duration: 9, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "PHYS" },
        { start: 23, duration: 9, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "PHYS" },
        { start: 8, duration: 12, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "APP" },
        { start: 10, duration: 12, daysOfWeek: [1, 1, 1, 1, 1, 1, 1], providerType: "APP" },
        ];

        const sched2: ScheduleDataType = { creationDate: new Date(2023, 5, 2), updateDate: new Date(2023, 5, 22), shifts: shifts2 }

        this.schedules.set({ owner: "bpatton", name: "Bobs Second Schedule Design" }, sched1);

    }

    public getAllSchedulesData(): Map<SchedulePKType, ScheduleDataType> {
        return this.schedules;
    }

    public getScheduleByNameAndOwner(pk: SchedulePKType): ScheduleDataType | undefined {
        return this.schedules.get(pk);
    }
}


