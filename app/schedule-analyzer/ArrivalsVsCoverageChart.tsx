"use client";
import React from "react";
import Chart from "react-apexcharts";
import ArrVCovChartOptions from "./ArrVCovChartOptions";
import { ApexOptions } from "apexcharts";

const ArrivalsVsCoverageChart = ({
    day_of_week,
    day_arrivals_data,
    day_coverage_data,
    maxY,
}: {
    day_of_week: string,
    day_arrivals_data: number[],
    day_coverage_data: number[],
    maxY: number,
}) => {

    const series = [
        {
            name: "Coverage",
            data: day_coverage_data,
            color: "#3377FF",
        },
        {
            name: "Arrivals",
            data: day_arrivals_data,
            color: "#E91E63",
        },
    ];

    const default_options: ApexOptions = ArrVCovChartOptions(maxY);

    const title_options = {
        ...default_options.title,
        text: day_of_week + " " + default_options.title?.text,
    };

    const maxY_options = {
        ...default_options.yaxis,
        max: Math.ceil(maxY),
    };

    const new_options = { ...default_options, title: title_options, yaxis: maxY_options };

    return (
        <div className="tabPanelDiv">
            <Chart options={new_options} series={series} type="line" />
        </div>
    );
};

export default ArrivalsVsCoverageChart;
