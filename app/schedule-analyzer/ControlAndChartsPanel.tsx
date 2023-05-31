"use client";
import React, { useState } from "react";
import ChartsPanel from "./ChartsPanel";
import ControlPanel from "./ControlPanel";
import { ArrivalsDataType } from "./ArrivalsData";
import { CoverageDataType, StatusHeaderDataType } from "./CurrentScheduleAndCoverageData";
import { ScheduleDataType } from "./AllSchedulesData";

function ControlAndChartsPanel(
    {
        arrivals_update_callback,
        coverage_update_callback,
        select_schedule_callback,
        arrivals_data,
        coverage_data,
        maxY,
        all_schedules_data,
        all_schedules_update_callback,
        current_schedule_data,
    }: {
        arrivals_update_callback: (arrivals_data: ArrivalsDataType, status_header_data: StatusHeaderDataType) => void;
        coverage_update_callback: (coverage_data: CoverageDataType) => void;
        select_schedule_callback: (pk: string) => void;
        arrivals_data: ArrivalsDataType;
        coverage_data: CoverageDataType;
        maxY: number;
        all_schedules_data: Map<string, ScheduleDataType>;
        all_schedules_update_callback: (group: string, facility: string, department: string) => void;
        current_schedule_data: ScheduleDataType;
    }
) {
    return (
        <div className="controlAndChartsDiv">
            <div className="divLeft">
                <ControlPanel
                    arrivals_update_callback={arrivals_update_callback}
                    coverage_update_callback={coverage_update_callback}
                    select_schedule_callback={select_schedule_callback}
                    all_schedules_data={all_schedules_data}
                    all_schedules_update_callback={all_schedules_update_callback}
                    current_schedule_data={current_schedule_data} />
            </div>
            <div className="divRight">
                <ChartsPanel arrivals_data={arrivals_data} coverage_data={coverage_data} maxY={maxY} />
            </div>
        </div>
    );
}

export default ControlAndChartsPanel;
