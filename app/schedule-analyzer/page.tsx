"use client";
import StatusHeader from "./StatusHeader";
import ControlAndChartsPanel from "./ControlAndChartsPanel";
import ArrivalsData, { ArrivalsDataType } from "./ArrivalsData";
import { useState } from "react";
import CurrentScheduleAndCoverageData, {
    CoverageDataType,
    StatusHeaderDataType,
} from "./CurrentScheduleAndCoverageData";
import AllSchedulesData, { ScheduleDataType } from "./AllSchedulesData";

export default function ScheduleAnalyzer() {
    const todaysDate: Date = new Date();
    const [maxY, setMaxY] = useState<number>(30);
    const [statusHeaderData, setStatusHeaderData] = useState<StatusHeaderDataType>({
        facility_name: "",
        department_name: "",
        data_start_date: todaysDate,
        data_end_date: todaysDate,
        schedule_name: "",
    });
    const arrivalsDataManager: ArrivalsData = new ArrivalsData();
    const [arrivalsData, setArrivalsData] = useState<ArrivalsDataType>(
        arrivalsDataManager.getDefaultArrivalsData()
    );

    function retrieveAllScheduleData(group: string, facility: string, department: string): void {
        allSchedulesDataManager.retrieveAllSchedulesData(group, facility, department);
    }

    const allSchedulesDataManager: AllSchedulesData = new AllSchedulesData();

    const [allSchedulesData, setAllSchedulesData] = useState<Map<string, ScheduleDataType>>(
        allSchedulesDataManager.getAllSchedulesData()
    );

    const curr_sched_cov_data: CurrentScheduleAndCoverageData = new CurrentScheduleAndCoverageData();
    const [currCovData, setCurrCovData] = useState<CoverageDataType>(curr_sched_cov_data.getDefaultCoverageData());
    const [currSchedData, setCurrSchedData] = useState<ScheduleDataType>(curr_sched_cov_data.getCurrentSchedule());

    function updateArrivalsData(arrivals_data: ArrivalsDataType,
        status_header_data: StatusHeaderDataType) {
        setArrivalsData(arrivals_data);
        setStatusHeaderData(status_header_data);
    }

    // this is passed down into ShiftSliderComponent but is not yet called
    function updateCurrentScheduleAndCoverageData(newData: CoverageDataType) {
        setCurrCovData(newData);

        // TODO: statusHeaderData.schedule_name = newData
    }

    function setNewSelectedSchedule(pk: string) {
        const selectedSched: ScheduleDataType | undefined = allSchedulesData.get(pk);
        if (selectedSched) {
            setCurrSchedData(selectedSched);
            curr_sched_cov_data.setCurrentSchedule(selectedSched);
            setCurrCovData(curr_sched_cov_data.getCoverageData());

            const covMaxY = curr_sched_cov_data.getMaxY();
            const arrMaxY = arrivalsDataManager.getMaxY();
            setMaxY(covMaxY < arrMaxY ? arrMaxY : covMaxY);
            const newStatusHeaderData = { ...statusHeaderData, schedule_name: selectedSched.schedule_name };
            setStatusHeaderData(newStatusHeaderData);
        }
    }

    /* TODOs:
          1. Deal with the whole Date conversion and UTC time problem
          2. Add functionality to the ScheduleDesignPanel
          3. heat map!
          4. SchedulesPanel need to re-style the button and maybe move the checkbox to the end
          5. SchedulesPanel needs the UI enabledment for deleting a schedule
    */
    if (arrivalsData && currCovData) {
        return (
            <div className="baseAppPanel">
                <StatusHeader status_header_data={statusHeaderData} />
                <ControlAndChartsPanel
                    arrivals_update_callback={updateArrivalsData}
                    coverage_update_callback={updateCurrentScheduleAndCoverageData}
                    select_schedule_callback={setNewSelectedSchedule}
                    arrivals_data={arrivalsData}
                    coverage_data={currCovData}
                    maxY={maxY}
                    all_schedules_data={allSchedulesData}
                    all_schedules_update_callback={retrieveAllScheduleData}
                    current_schedule_data={currSchedData}
                />
            </div>
        );
    }
}
