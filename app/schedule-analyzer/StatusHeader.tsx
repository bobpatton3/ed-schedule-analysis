"use client";
import React from "react";
import { ArrivalsDataType } from "./ArrivalsData";

const StatusHeader = () => {
    const startDate: Date = new Date(2022, 0, 1);
    const endDate: Date = new Date(2023, 0, 1);
    const facData: {
        facilityName: string;
        departmentName: string;
        data_start_date: Date;
        data_end_date: Date;
        scheduleName: string;
    } = {
        facilityName: "FAC",
        departmentName: "MAIN",
        data_start_date: startDate,
        data_end_date: endDate,
        scheduleName: "BOBSCHED",
    };

    return (
        <div className="statusHeaderDiv">
            <label className="edSchedStatusHdr">Facility: </label>
            <label className="statusHeaderInfo">{facData.facilityName}</label>
            <label className="edSchedStatusHdr">Department: </label>
            <label className="statusHeaderInfo">{facData.departmentName} </label>
            <label className="edSchedStatusHdr">Date Range: </label>
            <label className="statusHeaderInfo">{facData.data_start_date.toLocaleDateString()}</label>
            <label className="edSchedStatusConnector">-</label>
            <label className="statusHeaderInfo">{facData.data_end_date.toLocaleDateString()}</label>
            <label className="edSchedStatusHdr">Schedule: </label>
            <label className="statusHeaderInfo">{facData.scheduleName} </label>
        </div>
    );
};


export default StatusHeader;
