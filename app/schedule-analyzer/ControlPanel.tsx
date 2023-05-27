"use client";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { ArrivalsDataType } from "./ArrivalsData";
import DataLoaderPanel from "./DataLoaderPanel";
import { CoverageDataType } from "./CurrentScheduleAndCoverageData";
import SchedulesPanel from "./SchedulesPanel";
import ScheduleDesignPanel from "./ScheduleDesignPanel";

const ControlPanel = (
    { arrivals_update_callback: arrivals_update_callback, coverage_update_callback: coverage_update_callback }:
        {
            arrivals_update_callback: (newData: ArrivalsDataType) => void,
            coverage_update_callback: (newData: CoverageDataType) => void
        }
) => {

    return (
        <Tabs>
            <Tab eventKey="data_loader" title="Data Loader">
                <div className="controlPanelDiv">
                    <DataLoaderPanel arrivals_update_callback={arrivals_update_callback} coverage_update_callback={coverage_update_callback} />
                </div>
            </Tab>
            <Tab eventKey="existing_schedules" title="Schedules">
                <div className="controlPanelDiv">
                    <SchedulesPanel coverage_update_callback={coverage_update_callback} />
                </div>
            </Tab>
            <Tab eventKey="schedule_design" title="Design">
                <div className="controlPanelDiv">
                    <div className="controlPanelDiv">
                        <ScheduleDesignPanel coverage_update_callback={coverage_update_callback} />
                    </div>
                </div>
            </Tab>
        </Tabs>
    );
};


export default ControlPanel;
