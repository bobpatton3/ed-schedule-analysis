"use client";

import ArrivalsData, { ArrivalsDataType } from "./ArrivalsData";
import { useState } from "react";
import CurrentScheduleAndCoverageData, {
    CoverageDataType,
    StatusHeaderDataType,
} from "./CurrentScheduleAndCoverageData";
import AllSchedulesData, { ScheduleDataType } from "./AllSchedulesData";
import { Tab, Tabs } from "react-bootstrap";
import DataLoaderPanel from "./DataLoaderPanel";
import SchedulesPanel from "./SchedulesPanel";
import ScheduleDesignPanel from "./ScheduleDesignPanel";
import ArrivalsDataSlice from "./ArrivalsDataSlice";

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
                <div className="statusHeaderDiv">
                    <label className="edSchedStatusHdr">Facility: </label>
                    <label className="statusHeaderInfo">{statusHeaderData.facility_name}</label>
                    <label className="edSchedStatusHdr">Department: </label>
                    <label className="statusHeaderInfo">{statusHeaderData.department_name} </label>
                    <label className="edSchedStatusHdr">Date Range: </label>
                    <label className="statusHeaderInfo">{statusHeaderData.data_start_date.toLocaleDateString()}</label>
                    <label className="edSchedStatusConnector">-</label>
                    <label className="statusHeaderInfo">{statusHeaderData.data_end_date.toLocaleDateString()}</label>
                    <label className="edSchedStatusHdr">Schedule: </label>
                    <label className="statusHeaderInfo">{statusHeaderData.schedule_name} </label>
                </div>
                <div className="controlAndChartsDiv">
                    <div className="divLeft">
                        <Tabs>
                            <Tab eventKey="data_loader" title="Data Loader">
                                <div className="controlPanelDiv">
                                    <DataLoaderPanel arrivals_update_callback={updateArrivalsData} retrieve_all_schedules_callback={retrieveAllScheduleData} />
                                </div>
                            </Tab>
                            <Tab eventKey="existing_schedules" title="Schedules">
                                <div className="controlPanelDiv">
                                    <SchedulesPanel select_schedule_callback={setNewSelectedSchedule} all_schedules_data={allSchedulesData} />
                                </div>
                            </Tab>
                            <Tab eventKey="schedule_design" title="Design">
                                <div className="controlPanelDiv">
                                    <ScheduleDesignPanel curr_sched_cov_update_callback={updateCurrentScheduleAndCoverageData} current_schedule_data={currSchedData} />
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                    <div className="divRight">
                        <Tabs>
                            <Tab eventKey="full" title="Full Department">
                                <ArrivalsDataSlice dept_arrivals_data={arrivalsData.Full} dept_coverage_data={currCovData.Full} maxY={maxY} />
                            </Tab>
                            <Tab eventKey="phys_only" title="PhysOnly (CClvl5)">
                                <ArrivalsDataSlice dept_arrivals_data={arrivalsData.lvl5CC} dept_coverage_data={currCovData.lvl5CC} maxY={maxY} />
                            </Tab>
                        </Tabs>
                    </div>
                </div>

            </div>

        );
    }
}
