"use client";
import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { WeekArrivalsDataType } from "./ArrivalsData";
import { WeekCoverageDataType } from "./CurrentScheduleAndCoverageData";
import WeekAtAGlanceChartOptions from "./WeekAtAGlanceChartOptions";

function WeekAtAGlanceChart(
    {
        dept_arrivals_data,
        dept_coverage_data,
    }: {
        dept_arrivals_data: WeekArrivalsDataType;
        dept_coverage_data: WeekCoverageDataType;
    }
) {

    const series: ApexAxisChartSeries = [];

    const intToDay: Array<keyof WeekCoverageDataType> = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT",];

    // Dont need this with th current chart - only if we change to what I had before with the graduated differences
    // let sundayPercs: { name: string, data: number[] } = { name: "SUN", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,] };

    for (let i = 0; i < 7; i++) {
        const percent_of_peak: number[] = new Array<number>(25);
        const day_coverage_data = dept_coverage_data[intToDay[6 - i]];
        const day_arrivals_data = dept_arrivals_data[intToDay[6 - i]];
        for (let j = 0; j < 25; j++) {
            if (day_coverage_data[j] === 0) {
                percent_of_peak[j] = 0;
            } else {
                percent_of_peak[j] = Math.ceil(100.0 * day_arrivals_data[j] / day_coverage_data[j]);
            }
        }

        series.push({
            name: intToDay[6 - i].toString(),
            data: percent_of_peak,
        })

        // if (i === 0) sundayPercs = {
        //     name: intToDay[i].toString(),
        //     data: percent_of_peak,
        // };
    }

    //series.push(sundayPercs);

    const options: ApexOptions = WeekAtAGlanceChartOptions();

    return (
        <div className="tabPanelDiv">
            <Chart options={options} series={series} type="heatmap" />
        </div>
    );
}

export default WeekAtAGlanceChart;
