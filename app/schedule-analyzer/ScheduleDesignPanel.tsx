"use client";

import { CoverageDataType } from "./CurrentScheduleAndCoverageData";
import ShiftSliderComponent from "./ShiftSliderComponent";
import { ScheduleDataType } from "./AllSchedulesData";

function ScheduleDesignPanel(
    {
        curr_sched_cov_update_callback: coverage_update_callback,
        current_schedule_data,
    }: {
        curr_sched_cov_update_callback: (newData: CoverageDataType) => void;
        current_schedule_data: ScheduleDataType;
    }
) {
    return (
        <div className="schedulesPanelDiv">
            {current_schedule_data.shifts.map((shift) => <ShiftSliderComponent
                key={shift.id}
                coverage_update_callback={coverage_update_callback}
                shift={shift.id}
                start={shift.start}
                duration={shift.duration} />)}
        </div>
    );
}

export default ScheduleDesignPanel;
