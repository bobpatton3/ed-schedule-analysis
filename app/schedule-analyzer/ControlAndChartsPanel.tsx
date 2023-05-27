"use client";
import React, { useState } from "react";
import ChartsPanel from "./ChartsPanel";
import ControlPanel from "./ControlPanel";
import ArrivalsData, { ArrivalsDataType } from "./ArrivalsData";
import CurrentScheduleAndCoverageData, { CoverageDataType } from "./CurrentScheduleAndCoverageData";

const ControlAndChartsPanel = () => {

    const arrivals_data: ArrivalsData = new ArrivalsData();
    const [arrivalsData, setArrivalsData] = useState<ArrivalsDataType>(arrivals_data.getDefaultArrivalsData());

    const curr_sched_cov_data: CurrentScheduleAndCoverageData = new CurrentScheduleAndCoverageData();
    const [currSchedCovData, setCurrSchedCovData] = useState<CoverageDataType>(curr_sched_cov_data.getDefaultCoverageData());

    const updateArrivalsData = (newData: ArrivalsDataType) => setArrivalsData(newData);
    const updateCoverageData = (newData: CoverageDataType) => setCurrSchedCovData(newData);

    const covMaxY = curr_sched_cov_data.getMaxY();
    const arrMaxY = arrivals_data.getMaxY();
    const maxY = (covMaxY < arrMaxY) ? arrMaxY : covMaxY;

    return (
        <div className="controlAndChartsDiv">
            <div className="divLeft">
                <ControlPanel arrivals_update_callback={updateArrivalsData} coverage_update_callback={updateCoverageData} />
            </div>
            <div className="divRight">
                <ChartsPanel arrivals_data={arrivalsData!} coverage_data={currSchedCovData!} maxY={maxY} />
            </div>
        </div>
    );
};

export default ControlAndChartsPanel;
