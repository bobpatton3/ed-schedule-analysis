"use client";

import React from "react";
import { ScheduleDataType, ShiftDataType } from "./AllSchedulesData";
import ShiftSliderComponent from "./ShiftSliderComponent";

const ScheduleDesignPanel = (
    {
        current_schedule_data,
        shift_mod_callback,
    }: {
        current_schedule_data: ScheduleDataType;
        shift_mod_callback: (shift_data: ShiftDataType) => void;
    }
) => {
    //

    return (
        <div className="tabPanelDiv">
            {Array.from(current_schedule_data.shifts.values()).map((shift) =>
                <ShiftSliderComponent
                    key={shift.id}
                    shift_mod_callback={shift_mod_callback}
                    shift={shift}
                />)}
        </div>
    );
}

export default ScheduleDesignPanel;

