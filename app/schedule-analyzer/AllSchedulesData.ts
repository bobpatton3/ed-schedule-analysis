import { Dispatch, SetStateAction } from "react";

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

    public async retrieveAllSchedulesData(
        group: string, 
        facility: string, 
        department: string, 
        setStateCallback: Dispatch<SetStateAction<Map<string, ScheduleDataType>>>
    ) {

        // http://localhost:8080/schedules/A1%20Emergency%20Physicians/Memorial%20Hospital/Main%20ED
        const res = await fetch(`http://localhost:8080/schedules/A1%20Emergency%20Physicians/Memorial%20Hospital/Main%20ED`);
        const schedulesAPIResp = res.json();
           
        const schedulesData = await Promise.all([schedulesAPIResp]);

        const schedules: Map<string, ScheduleDataType> = new Map<string, ScheduleDataType>();     
        
        schedulesData[0].forEach(r => {
            if ( !schedules.has(r.schedule_id)) {
                const sched: ScheduleDataType = {
                    pk: r.schedule_id,
                    owner: r.owner,
                    schedule_name: r.schedule_name,
                    creationDate: r.creation_date,
                    updateDate: r.update_date,
                    shifts: new Map<string,ShiftDataType>(),
                    yearly_cost: 0.0,
                };
                schedules.set(r.schedule_id, sched);
            }
            schedules.get(r.schedule_id)?.shifts.set(r.shift_id, 
                {
                    id: r.shift_id,
                    start: r.start_hour,
                    duration: r.duration,
                    deleteFlag: false,
                    daysOfWeek: r.days_of_week,
                    providerType: r.provider_type,
                });
        });
        
        setStateCallback(schedules);
    }

    public getEmptySchedule(): Map<string, ScheduleDataType> {
        const pk0: string = "1";
        const owner0: string = "null";
        const schedule_name0: string = "null";
        const empty_schedules: Map<string, ScheduleDataType> = new Map<string, ScheduleDataType>();
        const empty_schedule: ScheduleDataType = {pk: pk0, owner: owner0, schedule_name: schedule_name0, creationDate: new Date(), updateDate: new Date(), shifts: new Map<string, ShiftDataType>(), yearly_cost: 0.0 };
        empty_schedules.set(pk0, empty_schedule);
        return empty_schedules;
    }
}


