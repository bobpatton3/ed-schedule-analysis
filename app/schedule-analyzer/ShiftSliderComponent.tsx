"use client";

import { useState } from "react";
import { CoverageDataType } from "./CurrentScheduleAndCoverageData";
import { Slider } from "@mui/material";

const minDistance = 4;

function ShiftSliderComponent(
    {
        coverage_update_callback,
        shift,
        start,
        duration,
    }: {
        coverage_update_callback: (newData: CoverageDataType) => void;
        shift: string;
        start: number;
        duration: number;
    }
) {
    //const dataAccessor: PostLoginData = new PostLoginData();
    //const postLoginData: Map<string, Map<string, Map<string, { start: Date, end: Date }>>> = dataAccessor.getPostLoginData();
    const [value1, setValue1] = useState<number[]>([start, start + duration]);

    const handleChange1 = (
        event: Event,
        newValue: number | number[],
        activeThumb: number
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }

        // There is no reason to allow this part of the slider to be used for start times. 
        // Users should use the left portion of the slider for midnight on starts.
        if (newValue[0] > 23)
            setValue1([23, newValue[1]]);
    };

    const marks = [
        { value: 0, label: '12a', },
        { value: 6, label: '6a', },
        { value: 12, label: '12p', },
        { value: 18, label: '6p', },
        { value: 24, label: '12a', },
        { value: 30, label: '6a', },
        { value: 35, label: '11a', },
    ];

    const sliderValToText: string[] = [
        "12a", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a",
        "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p",
        "12a", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a",
    ];

    const startStopTextFromSlider = (values: number[]) => {
        return sliderValToText[values[0]] + " - " + sliderValToText[values[1]];
    };

    return (
        <div>
            {startStopTextFromSlider(value1)}
            <Slider
                className='slider'
                value={value1}
                step={1}
                min={0}
                max={35}
                slotProps={{ thumb: { className: 'thumb' } }}
                onChange={handleChange1} />
        </div>
    );
}

export default ShiftSliderComponent;
