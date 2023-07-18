"use client";

import { Dispatch, SetStateAction } from "react";
import { StatusHeaderDataType } from "./CurrentScheduleAndCoverageData";

export type WeekArrivalsDataType = {
    SUN: number[],
    MON: number[],
    TUE: number[],
    WED: number[],
    THU: number[],
    FRI: number[],
    SAT: number[],
    AVG: number[],
}

export type ArrivalsDataType = {
    Full: WeekArrivalsDataType,
    l5CC: WeekArrivalsDataType,
}

export default class ArrivalsData {

    private default_arrivals_data: ArrivalsDataType;

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
            l5CC:
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
    }

    // http://localhost:8080/arrivals/2022-01-02%2000:00/2022-07-01%2000:00/30%20minutes/A1%20Emergency%20Physicians/Memorial%20Hospital/Main%20ED

    public async getArrivalsData(status_header_data: StatusHeaderDataType, set_arrivals_callback: Dispatch<SetStateAction<ArrivalsDataType>>, update_arrmaxy_callback: (retArrMaxY: number) => void) {

        const start_date: string = status_header_data.data_start_date.toISOString().substring(0, 10);
        const end_date: string = status_header_data.data_end_date.toISOString().substring(0, 10);

        const params = `/${start_date}/${end_date}/${status_header_data.door_to_provider}/${status_header_data.department_id}`;

        const res = await fetch(`api/forwardToServer?serverapi=arrivals&params=${params}`, { method: 'GET', });

        const arrivalsAPIResp = res.json();

        const arrivalsDataPromise = await Promise.all([arrivalsAPIResp]);

        set_arrivals_callback(arrivalsDataPromise[0]);

        let arrMaxY: number = 0.0;
        const week = arrivalsDataPromise[0].Full;
        [week.SUN, week.MON, week.TUE, week.WED, week.THU, week.FRI, week.SAT].forEach(day => {
            day.forEach((hourArrivals: number) => {
                arrMaxY = (arrMaxY < hourArrivals) ? hourArrivals : arrMaxY;
            });
        });
        arrMaxY = Math.ceil(arrMaxY);
        update_arrmaxy_callback(arrMaxY);
    }

    public getDefaultArrivalsData(): ArrivalsDataType {
        return this.default_arrivals_data;
    }
}





