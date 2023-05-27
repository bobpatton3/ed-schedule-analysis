"use client";

import { useState } from "react";
import PostLoginData from "./PostLoginData";
import CurrentScheduleAndCoverageData, { CoverageDataType } from "./CurrentScheduleAndCoverageData";


const ScheduleDesignPanel = (
    { coverage_callback }:
        {
            coverage_callback: (newData: CoverageDataType) => void,
        }
) => {
    //const dataAccessor: PostLoginData = new PostLoginData();
    //const postLoginData: Map<string, Map<string, Map<string, { start: Date, end: Date }>>> = dataAccessor.getPostLoginData();

    function onClickScheduleNameButton(e: any) {
    }

    return (

        <div>
            Schedule Design stuff coming!
        </div>
    );
}

export default ScheduleDesignPanel;
