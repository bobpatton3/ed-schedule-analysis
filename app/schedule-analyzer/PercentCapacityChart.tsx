"use client";
import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import PercentCapacityChartOptions from "./PercentCapacityChartOptions";

function PercentCapacityChart(
    {
        day_arrivals_data,
        day_coverage_data,
    }: {
        day_arrivals_data: number[];
        day_coverage_data: number[];
    }
) {

    const percent_of_peak: number[] = new Array<number>(25);
    for (let i = 0; i < 25; i++) {
        if (day_coverage_data[i] == 0) {
            percent_of_peak[i] = 0;
        } else {
            percent_of_peak[i] = Math.ceil(100.0 * day_arrivals_data[i] / day_coverage_data[i]);
        }
    }

    const maxY = Math.max(...percent_of_peak);
    const goal: number[] = [85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85,];
    const peak: number[] = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,];

    const series = [
        {
            name: "%Cap",
            data: percent_of_peak,
            color: "#3377FF",
        },
        {
            name: "Peak",
            data: peak,
            color: "#E91E63",
        },
        {
            name: "Goal",
            data: goal,
            color: "#11d000",
        },
    ];


    const default_options: ApexOptions = PercentCapacityChartOptions(maxY);

    const title_options = {
        ...default_options.title,
        text: "Percent of Peak Capacity",
    };

    const maxY_options = {
        ...default_options.yaxis,
        max: Math.ceil(maxY),
    };

    const new_options = { ...default_options, title: title_options, yaxis: maxY_options };

    return (
        <div className="tabPanelDiv" >
            <Chart options={new_options} series={series} type="line" />
        </div>
    );
}

export default PercentCapacityChart;
