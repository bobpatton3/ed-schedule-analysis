"use client";

import React, { useState } from "react";
import { Slider, Tooltip } from "@mui/material";
import { ShiftDataType } from "./AllSchedulesData";
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import SmallCheckbox from "./SmallCheckbox";


const minDistance = 4;

function ShiftSliderComponent(
    {
        shift_mod_callback,
        shift,
    }: {
        shift_mod_callback: (shift_data: ShiftDataType) => void;
        shift: ShiftDataType;
    }
) {
    const [localShift, setLocalShift] = useState(shift);
    const [startStopValues, setStartStopValues] = useState<number[]>([localShift.start, localShift.start + localShift.duration]);
    const [checked, setChecked] = useState([true, true, true, true, true, true, true]);
    const [deleteFlagChecked, setDeleteFlagChecked] = useState<boolean>(false);

    const handleChangeAllCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        const par = event.target.checked;
        const newChecked: boolean[] = [par, par, par, par, par, par, par,];
        setChecked(newChecked);

        const newShift: ShiftDataType = { id: localShift.id, start: startStopValues[0], duration: startStopValues[1] - startStopValues[0], deleteFlag: deleteFlagChecked, daysOfWeek: newChecked, providerType: localShift.providerType };
        shift_mod_callback(newShift);
        setLocalShift(newShift);
    };

    const handleDayCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.labels) {
            const daynum = parseInt(event.target.labels[0].id);
            const newChecked = [...checked];
            newChecked[daynum] = !checked[daynum];
            // remember useState's setters are asynchronous!
            setChecked(newChecked);
            const newShift: ShiftDataType = { id: localShift.id, start: startStopValues[0], duration: startStopValues[1] - startStopValues[0], deleteFlag: deleteFlagChecked, daysOfWeek: newChecked, providerType: localShift.providerType };
            shift_mod_callback(newShift);
            setLocalShift(newShift);
        }
    };

    const handleDeleteFlagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeleteFlagChecked(!event.target.checked);
        const newShift: ShiftDataType = { id: localShift.id, start: startStopValues[0], duration: startStopValues[1] - startStopValues[0], deleteFlag: !event.target.checked, daysOfWeek: checked, providerType: localShift.providerType };
        shift_mod_callback(newShift);
        setLocalShift(newShift);
    };

    const handleSliderChangeCommitted = (event: React.SyntheticEvent | Event, value: number | Array<number>) => {
        shift_mod_callback(localShift);
    }

    const handleSliderChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setStartStopValues([Math.min(newValue[0], startStopValues[1] - minDistance), startStopValues[1]]);
        } else {
            setStartStopValues([startStopValues[0], Math.max(newValue[1], startStopValues[0] + minDistance)]);
        }

        // There is no reason to allow this part of the slider to be used for start times. 
        // Users should use the left portion of the slider for shift start times at midnight or later.
        if (newValue[0] > 23) setStartStopValues([23, newValue[1]]);

        const newShift: ShiftDataType = { id: localShift.id, start: newValue[0], duration: newValue[1] - newValue[0], daysOfWeek: checked, providerType: localShift.providerType };
        setLocalShift(newShift);
        // Don't perform the callback yet because if we do then a shift can change position in the 
        // list while dragging the start thumb. Let the onChangeCommitted handler do that.
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

    const daysOfWeekLabels: string[] = ["Su", "M", "T", "W", "Th", "F", "Sa"];

    return (
        <div>
            <Box sx={{ display: "flex", flexDirection: "row", ml: 3, fontSize: 14, }}>
                <Tooltip title="Flag for Delete" placement="top">
                    <FormControlLabel control={
                        <Switch
                            checked={!deleteFlagChecked}
                            onChange={handleDeleteFlagChange}
                        />
                    } label={startStopTextFromSlider(startStopValues)}
                        sx={{
                            '.MuiFormControlLabel-label': {
                                fontSize: 12,
                                width: 60,
                            },
                        }}
                    />
                </Tooltip>

                <FormControlLabel
                    label="All"
                    control={
                        <SmallCheckbox checked={
                            checked[0] && checked[1] && checked[2] && checked[3] && checked[4] && checked[5] && checked[6]
                        }
                            indeterminate={
                                !(checked[0] && checked[1] && checked[2] && checked[3] && checked[4] && checked[5] && checked[6])
                                &&
                                (checked[0] || checked[1] || checked[2] || checked[3] || checked[4] || checked[5] || checked[6])
                            }
                            onChange={handleChangeAllCheckbox}
                        />
                    }
                    sx={{
                        mr: 3,
                        '.MuiFormControlLabel-label': {
                            fontSize: 12,
                            width: 1.1,
                        },
                    }}
                />
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <FormControlLabel
                        label={daysOfWeekLabels[i]}
                        id={i.toString()}
                        key={i}
                        control={<SmallCheckbox checked={checked[i]} onChange={handleDayCheckedChange} />}
                        sx={{
                            mr: 3,
                            '.MuiFormControlLabel-label': {
                                fontSize: 12,
                                width: 1.1,
                            },
                        }}
                    />
                ))}
            </Box>

            <Slider
                className='slider'
                style={{ width: 460 }}
                value={startStopValues}
                step={1}
                min={0}
                max={35}
                slotProps={{ thumb: { className: 'thumb' } }}
                onChangeCommitted={handleSliderChangeCommitted}
                onChange={handleSliderChange} />
        </div>
    );
}

export default ShiftSliderComponent;

