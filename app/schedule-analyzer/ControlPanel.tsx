"use client";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { ArrivalsDataType } from "./ArrivalsData";
import DataLoaderPanel from "./DataLoaderPanel";
import { CoverageDataType, StatusHeaderDataType } from "./CurrentScheduleAndCoverageData";
import SchedulesPanel from "./SchedulesPanel";
import ScheduleDesignPanel from "./ScheduleDesignPanel";
import AllSchedulesData, { ScheduleDataType } from "./AllSchedulesData";

function ControlPanel(
    {
        arrivals_update_callback,
        coverage_update_callback,
        select_schedule_callback,
        all_schedules_data,
        all_schedules_update_callback,
        current_schedule_data,
    }: {
        arrivals_update_callback: (arrivals_data: ArrivalsDataType, status_header_data: StatusHeaderDataType) => void;
        coverage_update_callback: (coverage_data: CoverageDataType) => void;
        select_schedule_callback: (pk: string) => void;
        all_schedules_data: Map<string, ScheduleDataType>;
        all_schedules_update_callback: (group: string, facility: string, department: string) => void;
        current_schedule_data: ScheduleDataType;
    }
) {

    return (
        <Tabs>
            <Tab eventKey="data_loader" title="Data Loader">
                <div className="controlPanelDiv">
                    <DataLoaderPanel arrivals_update_callback={arrivals_update_callback} all_schedules_update_callback={all_schedules_update_callback} />
                </div>
            </Tab>
            <Tab eventKey="existing_schedules" title="Schedules">
                <div className="controlPanelDiv">
                    <SchedulesPanel select_schedule_callback={select_schedule_callback} all_schedules_data={all_schedules_data} />
                </div>
            </Tab>
            <Tab eventKey="schedule_design" title="Design">
                <div className="controlPanelDiv">
                    <div className="controlPanelDiv">
                        <ScheduleDesignPanel coverage_update_callback={coverage_update_callback} current_schedule_data={current_schedule_data} />
                    </div>
                </div>
            </Tab>
        </Tabs>
    );
}


export default ControlPanel;
