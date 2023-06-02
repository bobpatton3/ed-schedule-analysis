"use client";

import { useState } from "react";
import { CoverageDataType } from "./CurrentScheduleAndCoverageData";
import { Slider } from "@mui/material";

const minDistance = 4;

function ShiftSliderComponent(
    {
        coverage_update_callback,
        shift_id,
        start,
        duration,
    }: {
        coverage_update_callback: (newData: CoverageDataType) => void;
        shift_id: string;
        start: number;
        duration: number;
    }
) {
    //const dataAccessor: PostLoginData = new PostLoginData();
    //const postLoginData: Map<string, Map<string, Map<string, { start: Date, end: Date }>>> = dataAccessor.getPostLoginData();
    const [values, setValues] = useState<number[]>([start, start + duration]);

    const handleChange1 = (
        event: Event,
        newValue: number | number[],
        activeThumb: number
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValues([Math.min(newValue[0], values[1] - minDistance), values[1]]);
        } else {
            setValues([values[0], Math.max(newValue[1], values[0] + minDistance)]);
        }

        // There is no reason to allow this part of the slider to be used for start times. 
        // Users should use the left portion of the slider for shift start times at midnight or later.
        if (newValue[0] > 23)
            setValues([23, newValue[1]]);
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
            {startStopTextFromSlider(values)}
            <Slider
                className='slider'
                value={values}
                step={1}
                min={0}
                max={35}
                slotProps={{ thumb: { className: 'thumb' } }}
                onChange={handleChange1} />
        </div>
    );
}

export default ShiftSliderComponent;
