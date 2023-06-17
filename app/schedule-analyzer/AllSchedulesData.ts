import { Dispatch, SetStateAction } from "react";

export type ShiftDataType = {
    id: string;
    start: number;
    duration: number;
    deleteFlag?: boolean;
    daysOfWeek: boolean[];
    providerType: string;
};

export type ScheduleDataType = {
    pk: string;
    owner: string;
    schedule_name: string;
    creationDate: Date;
    updateDate: Date;
    client_group: string;
    facility: string;
    department: string;
    shifts: Map<string, ShiftDataType>;
    yearly_cost: number;
};

export type ShiftWithScheduleDataType = {
    schedule_id: string;
    owner: string;
    schedule_name: string;
    creation_date: Date;
    update_date: Date;
    client_group: string;
    facility: string;
    department: string;
    shift_id: string;
    start_hour: number;
    duration: number;
    provider_type: string;
    days_of_week: boolean[];
}

export default class AllSchedulesData {
    public async retrieveAllSchedulesData(
        group: string,
        facility: string,
        department: string,
        setStateCallback: Dispatch<SetStateAction<Map<string, ScheduleDataType>>>,
        id?: string,
        setCurrSchedData?: Dispatch<SetStateAction<ScheduleDataType>>,
    ) {

        const get_schedules_url = "http://localhost:8080/schedules/" + group + "/" + facility + "/" + department;

        const res = await fetch(get_schedules_url);

        const schedulesAPIResp = res.json();

        const schedulesData = await Promise.all([schedulesAPIResp]);

        const schedules: Map<string, ScheduleDataType> = new Map<
            string,
            ScheduleDataType
        >();

        schedulesData[0].forEach((r: any) => {
            if (!schedules.has(r.schedule_id)) {
                const sched: ScheduleDataType = {
                    pk: r.schedule_id,
                    owner: r.owner,
                    schedule_name: r.schedule_name,
                    creationDate: r.creation_date,
                    updateDate: r.update_date,
                    client_group: r.client_group,
                    facility: r.facility,
                    department: r.department,
                    shifts: new Map<string, ShiftDataType>(),
                    yearly_cost: 0.0,
                };
                schedules.set(r.schedule_id, sched);
            }
            schedules.get(r.schedule_id)?.shifts.set(r.shift_id, {
                id: r.shift_id,
                start: r.start_hour,
                duration: r.duration,
                deleteFlag: false,
                daysOfWeek: r.days_of_week,
                providerType: r.provider_type,
            });
        });

        setStateCallback(schedules);

        if (id && setCurrSchedData) {
            const schedule = schedules.get(id);
            if (schedule) setCurrSchedData(schedule);
        }
    }

    public getEmptySchedule(): Map<string, ScheduleDataType> {
        const pk0: string = "1";
        const owner0: string = "null";
        const schedule_name0: string = "null";
        const empty_schedules: Map<string, ScheduleDataType> = new Map<
            string,
            ScheduleDataType
        >();
        const empty_schedule: ScheduleDataType = {
            pk: pk0,
            owner: owner0,
            schedule_name: schedule_name0,
            creationDate: new Date(),
            updateDate: new Date(),
            client_group: "",
            facility: "",
            department: "",
            shifts: new Map<string, ShiftDataType>(),
            yearly_cost: 0.0,
        };
        empty_schedules.set(pk0, empty_schedule);
        return empty_schedules;
    }

    public async deleteSchedule(pk: string, deleteScheduleSuccessfulCallback: (pk: string) => void) {
        try {
            const response = await fetch("http://localhost:8080/schedules/" + pk, {
                method: "DELETE",
            });

            if (response.status >= 400) {
                console.log("server returns error: response >= 400");
                return;
            }

            deleteScheduleSuccessfulCallback(pk);

        } catch (error) {
            console.log("Exception saving Schedule: " + error);
        }
    }

    public async saveSchedule(
        schedule: ScheduleDataType,
        setAllSchedulesData: Dispatch<SetStateAction<Map<string, ScheduleDataType>>>,
        setCurrSchedData: Dispatch<SetStateAction<ScheduleDataType>>,
    ) {
        const retShiftsWithScheduleData: ShiftWithScheduleDataType[] = this.flattenLocalScheduleToServerData(schedule);

        try {
            const response = await fetch("http://localhost:8080/schedules", {
                body: JSON.stringify(retShiftsWithScheduleData),
                headers: {
                    //'Authorization': 'Basic ' + base64.encode("APIKEY:X"),
                    "Content-Type": "application/json; charset=utf8",
                },
                method: "POST",
            });

            if (response.status >= 400) {
                console.log("server returns error: response >= 400");
                return;
            }

            const scheduleSaveAPIResp = response.text();
            const scheduleSaveData = await Promise.all([scheduleSaveAPIResp]);

            this.retrieveAllSchedulesData(
                schedule.client_group,
                schedule.facility,
                schedule.department,
                setAllSchedulesData,
                scheduleSaveData[0],
                setCurrSchedData,
            );

        } catch (error) {
            console.log("Exception saving Schedule: " + error);
        }
    }


    private flattenLocalScheduleToServerData(schedule: ScheduleDataType): ShiftWithScheduleDataType[] {
        const retShiftsWithScheduleData: ShiftWithScheduleDataType[] = [];

        schedule.shifts.forEach((shift, key) => {
            if (!shift.deleteFlag) {
                const shiftWSched: ShiftWithScheduleDataType = {
                    schedule_id: schedule.pk,
                    owner: schedule.owner,
                    schedule_name: schedule.schedule_name,
                    creation_date: schedule.creationDate,
                    update_date: schedule.updateDate,
                    client_group: schedule.client_group,
                    facility: schedule.facility,
                    department: schedule.department,
                    shift_id: shift.id,
                    start_hour: shift.start,
                    duration: shift.duration,
                    provider_type: shift.providerType,
                    days_of_week: shift.daysOfWeek
                }
                retShiftsWithScheduleData.push(shiftWSched);
            }
        });

        return retShiftsWithScheduleData;
    }
}
