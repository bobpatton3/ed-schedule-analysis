"use client";
import React from "react";
import ArrivalsVsCoverageChart from "./ArrivalsVsCoverageChart";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { WeekArrivalsDataType } from "./ArrivalsData";
import { WeekCoverageDataType } from "./CurrentScheduleAndCoverageData";

const ArrivalsDataSlice = ({ dept_arrivals_data, dept_coverage_data, maxY }: { dept_arrivals_data: WeekArrivalsDataType, dept_coverage_data: WeekCoverageDataType, maxY: number }) => {
    return (
        <div className="chartsPanelDiv">
            <Tabs transition={false} mountOnEnter={false} unmountOnExit={false} fill={true} justify={true}>
                <Tab eventKey="all" title="All">
                    <ArrivalsVsCoverageChart day_of_week="All" day_arrivals_data={dept_arrivals_data.AVG} day_coverage_data={dept_coverage_data.AVG} maxY={maxY} />
                </Tab>
                <Tab eventKey="monday" title="Monday">
                    <ArrivalsVsCoverageChart day_of_week="Monday" day_arrivals_data={dept_arrivals_data.MON} day_coverage_data={dept_coverage_data.MON} maxY={maxY} />
                </Tab>
                <Tab eventKey="tuesday" title="Tuesday">
                    <ArrivalsVsCoverageChart day_of_week="Tuesday" day_arrivals_data={dept_arrivals_data.TUE} day_coverage_data={dept_coverage_data.TUE} maxY={maxY} />
                </Tab>
                <Tab eventKey="wednesday" title="Wednesday">
                    <ArrivalsVsCoverageChart day_of_week="Wednesday" day_arrivals_data={dept_arrivals_data.WED} day_coverage_data={dept_coverage_data.WED} maxY={maxY} />
                </Tab>
                <Tab eventKey="thursday" title="Thursday">
                    <ArrivalsVsCoverageChart day_of_week="Thursday" day_arrivals_data={dept_arrivals_data.THU} day_coverage_data={dept_coverage_data.THU} maxY={maxY} />
                </Tab>
                <Tab eventKey="friday" title="Friday">
                    <ArrivalsVsCoverageChart day_of_week="Friday" day_arrivals_data={dept_arrivals_data.FRI} day_coverage_data={dept_coverage_data.FRI} maxY={maxY} />
                </Tab>
                <Tab eventKey="saturday" title="Saturday">
                    <ArrivalsVsCoverageChart day_of_week="Saturday" day_arrivals_data={dept_arrivals_data.SAT} day_coverage_data={dept_coverage_data.SAT} maxY={maxY} />
                </Tab>
                <Tab eventKey="sunday" title="Sunday">
                    <ArrivalsVsCoverageChart day_of_week="Sunday" day_arrivals_data={dept_arrivals_data.SUN} day_coverage_data={dept_coverage_data.SUN} maxY={maxY} />
                </Tab>
            </Tabs>
        </div>
    );
};

export default ArrivalsDataSlice;
