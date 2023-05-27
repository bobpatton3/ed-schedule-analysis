"use client";
import React from "react";
import ArrivalsDataSlice from "./ArrivalsDataSlice";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ArrivalsDataType } from "./ArrivalsData";
import { CoverageDataType } from "./CurrentScheduleAndCoverageData";

const ChartsPanel = ({ arrivals_data, coverage_data, maxY }: { arrivals_data: ArrivalsDataType, coverage_data: CoverageDataType, maxY: number }) => {

    return (
        <div>
            <Tabs>
                <Tab eventKey="full" title="Full Department">
                    <ArrivalsDataSlice dept_arrivals_data={arrivals_data.Full} dept_coverage_data={coverage_data.Full} maxY={maxY} />
                </Tab>
                <Tab eventKey="phys_only" title="PhysOnly (CClvl5)">
                    <ArrivalsDataSlice dept_arrivals_data={arrivals_data.lvl5CC} dept_coverage_data={coverage_data.lvl5CC} maxY={maxY} />
                </Tab>
            </Tabs>
        </div>
    );
};


export default ChartsPanel;
