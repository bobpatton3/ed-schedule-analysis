"use client";
import React from "react";
import { WeekArrivalsDataType } from "./ArrivalsData";
import { WeekCoverageDataType } from "./CurrentScheduleAndCoverageData";

function HeatMap(
    {
        dept_arrivals_data,
        dept_coverage_data,
    }: {
        dept_arrivals_data: WeekArrivalsDataType;
        dept_coverage_data: WeekCoverageDataType;
    }
) {

    // A wee bit of a hack to keep this from rendering when there is no reason to do so since 
    // it is _highly_ unlikely that a proper facility would have either no coverage or no arrivals 
    // at midday on Monday.
    if ((dept_arrivals_data.MON[12] === 0) || (dept_coverage_data.MON[12] === 0)) {
        return (
            <div className="tabPanelDiv"></div>
        );
    }

    // const dayOrdering: (keyof WeekCoverageDataType)[] = ["SUN", "SAT", "FRI", "THU", "WED", "TUE", "MON", "SUN",];
    const dayOrdering: (keyof WeekCoverageDataType)[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN",];

    const seriesVertices: number[][] = new Array<Array<number>>();

    for (let day of dayOrdering) {
        const percent_of_peak: number[] = new Array<number>(25);
        const day_coverage_data = dept_coverage_data[day];
        const day_arrivals_data = dept_arrivals_data[day];
        for (let j = 0; j < 25; j++) {
            if (day_coverage_data[j] === 0) {
                percent_of_peak[j] = 0;
            } else {
                percent_of_peak[j] = Math.ceil(100.0 * day_arrivals_data[j] / day_coverage_data[j]);
            }
        }
        seriesVertices.push(percent_of_peak);
    }

    const series: number[][][] = new Array<Array<Array<number>>>();
    for (let i = 0; i < 7 * 17; i++) {
        const row = new Array<Array<number>>();
        for (let j = 0; j < 24 * 17; j++) {
            row.push([0, 0]);
        }
        series.push(row);
    }

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 24; j++) {
            for (let k = 0; k < 17; k++) {
                for (let l = 0; l < 17; l++) {
                    if (((i * 17 + k) * 1000 + j * 17 + l) === 0) console.log("key is zero for " + i + ", " + j + ", " + k + ", " + l);
                    if ((l === 0 && j % 3 === 0) || k === 0) {
                        series[i * 17 + k][j * 17 + l][0] = ((i * 17 + k) * 1000) + j * 17 + l;
                        series[i * 17 + k][j * 17 + l][1] = 1000000;
                    } else {
                        series[i * 17 + k][j * 17 + l][0] = ((i * 17 + k) * 1000) + j * 17 + l;
                        series[i * 17 + k][j * 17 + l][1] =
                            (l * k * seriesVertices[i + 1][j + 1] +
                                l * (17 - k) * seriesVertices[i][j + 1] +
                                (17 - l) * k * seriesVertices[i + 1][j] +
                                (17 - l) * (17 - k) * seriesVertices[i][j]) / 289.0;
                    }
                }
            }
        }
    }


    function numberToRGB(val: number): string {
        //0-60 is blue #0000FF
        //60-70 transitions blue to green "#00FF00"
        //70-80 green to yellow "#FFFF00"
        //80-90 yellow
        //90-100 yellow to orange "#FF8800"
        //100-110 transitions orange to red "#FF0000"

        let retVal: string = "#0000ff";  // default color of blue
        if (val === 1000000) {
            retVal = "#f0f0f0";
        } else if (val < 60) {
            retVal = "#0000ff";
        } else if (val > 60 && val <= 70) {
            const portion: number = Math.ceil((25.5 * (70 - val)));
            let BB: string = portion.toString(16);
            if (BB.length === 1) BB = "0" + BB;
            let GG: string = (255 - portion).toString(16);
            if (GG.length === 1) GG = "0" + GG;
            retVal = "#00" + GG + BB;
        } else if (val > 70 && val <= 80) {
            const portion: number = Math.ceil((25.5 * (val - 70)));
            let RR: string = portion.toString(16);
            if (RR.length === 1) RR = "0" + RR;
            retVal = "#" + RR + "ff00";
        } else if (val > 80 && val <= 90) {
            retVal = "#ffff00";
        } else if (val > 90 && val <= 110) {
            const portion: number = Math.ceil((255 * (110.0 - val) / 20.0));
            let GG: string = portion.toString(16);
            if (GG.length === 1) GG = "0" + GG;
            retVal = "#ff" + GG + "00";
        } else if (val > 110) {
            retVal = "#ff0000";
        }

        return retVal;
    }

    function numberToRGB2(val: number): string {
        //0-60 is blue #5555ff
        //60-70 transitions blue to green "#55ff55"
        //70-80 green to yellow "#FFFF55"
        //80-90 yellow
        //90-100 yellow to orange "#ff8855"
        //100-110 transitions orange to red "#FF5555"

        let retVal: string = "#5555ff";  // default color of blue
        if (val === 1000000) {
            retVal = "#888888";
        } else if (val < 60) {
            retVal = "#5555ff";
        } else if (val > 60 && val <= 70) {
            const portion: number = Math.ceil(17 * (70 - val));
            let BB: string = (85 + portion).toString(16);
            if (BB.length === 1) BB = "0" + BB;
            let GG: string = (255 - portion).toString(16);
            if (GG.length === 1) GG = "0" + GG;
            retVal = "#55" + GG + BB;
        } else if (val > 70 && val <= 80) {
            const portion: number = Math.ceil((17 * (val - 70)));
            let RR: string = (85 + portion).toString(16);
            if (RR.length === 1) RR = "0" + RR;
            retVal = "#" + RR + "ff55";
        } else if (val > 80 && val <= 90) {
            retVal = "#ffff55";
        } else if (val > 90 && val <= 110) {
            const portion: number = Math.ceil((170 * (110.0 - val) / 20.0));
            let GG: string = (85 + portion).toString(16);
            if (GG.length === 1) GG = "0" + GG;
            retVal = "#ff" + GG + "55";
        } else if (val > 110) {
            retVal = "#ff5555";
        }

        return retVal;
    }

    series.map(row => {
        row.map(([k, v]) => {
            if (k === 0) console.log("key = " + k + ", v = " + v);
        }
        )
    });

    return (
        <div className="tabPanelDiv" >
            <table>
                <tbody>
                    {series.map(row => <tr> {
                        row.map(([k, v]) =>
                            <td key={k} style={{ backgroundColor: numberToRGB2(v) }} />)}
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}


export default HeatMap;
