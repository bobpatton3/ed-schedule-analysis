"use client";
import React from "react";
import { StatusHeaderDataType } from "./CurrentScheduleAndCoverageData";

const StatusHeader = (
    { status_header_data, }:
        {
            status_header_data: StatusHeaderDataType,
        }
) => {

    return (
        <div className="statusHeaderDiv">
            <label className="edSchedStatusHdr">Facility: </label>
            <label className="statusHeaderInfo">{status_header_data.facility_name}</label>
            <label className="edSchedStatusHdr">Department: </label>
            <label className="statusHeaderInfo">{status_header_data.department_name} </label>
            <label className="edSchedStatusHdr">Date Range: </label>
            <label className="statusHeaderInfo">{status_header_data.data_start_date.toLocaleDateString()}</label>
            <label className="edSchedStatusConnector">-</label>
            <label className="statusHeaderInfo">{status_header_data.data_end_date.toLocaleDateString()}</label>
            <label className="edSchedStatusHdr">Schedule: </label>
            <label className="statusHeaderInfo">{status_header_data.schedule_name} </label>
        </div>
    );
};


export default StatusHeader;
