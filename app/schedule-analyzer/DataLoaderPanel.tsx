"use client";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import PostLoginData from "./PostLoginData";
import ArrivalsData, { ArrivalsDataType } from "./ArrivalsData";
import CurrentScheduleAndCoverageData, { StatusHeaderDataType } from "./CurrentScheduleAndCoverageData";

const DataLoaderPanel = (
    { arrivals_update_callback, retrieve_all_schedules_callback }:
        {
            arrivals_update_callback: (status_header_data: StatusHeaderDataType,) => void,
            retrieve_all_schedules_callback: (group: string, facility: string, department: string) => void,
        }
) => {
    const [startDatePickerDisabled, setStartDatePickerDisabled] = useState(true);
    const [endDatePickerDisabled, setEndDatePickerDisabled] = useState(true);
    const [loadButtonDisabled, setLoadButtonDisabled] = useState(true);
    const [loadFixedMonthsDisabled, setLoadFixedMonthsDisabled] = useState(true);
    const [facilities, setFacilities] = useState<Map<string, Map<string, { start: Date, end: Date }>>>(new Map<string, Map<string, { start: Date, end: Date }>>());
    const [departments, setDepartments] = useState<Map<string, { start: Date, end: Date }>>(new Map<string, { start: Date, end: Date }>());
    const [earliestStartDate, setEarliestStartDate] = useState<Date>(new Date());
    const [earliestEndDate, setEarliestEndDate] = useState<Date>(new Date());
    const [latestEndDate, setLatestEndDate] = useState<Date>(new Date());
    const [chosenGroup, setChosenGroup] = useState<string>("");
    const [chosenFacility, setChosenFacility] = useState<string>("");
    const [chosenDepartment, setChosenDepartment] = useState<string>("");
    const [chosenStartDate, setChosenStartDate] = useState<Date>(new Date());
    const [chosenEndDate, setChosenEndDate] = useState<Date>(new Date());
    const [defaultGroupSelectOptionDisabled, setDefaultGroupSelectOptionDisabled] = useState(false);
    const [defaultFacilitySelectOptionDisabled, setDefaultFacilitySelectOptionDisabled] = useState(false);
    const [defaultDepartmentSelectOptionDisabled, setDefaultDepartmentSelectOptionDisabled] = useState(false);

    const dataAccessor: PostLoginData = new PostLoginData();
    const postLoginData: Map<string, Map<string, Map<string, { start: Date, end: Date }>>> = dataAccessor.getPostLoginData();

    const dataStartDateChanged = (newStartDate: Date | null) => {
        if (newStartDate) {
            setChosenStartDate(newStartDate);
            setEarliestEndDate(newStartDate);
            setEndDatePickerDisabled(false);
        };
        //setLoadButtonDisabled(true);  // Unsure at the moment whether or not this is a good idea.
    };

    const dataEndDateChanged = (newEndDate: Date | null) => {
        setChosenEndDate(newEndDate!);
        setLoadButtonDisabled(false);
    };

    const disableAllButSundays = (date: Date) => {
        const day = date.getDay();
        return day != 0;
    };

    function onGroupSelect(e: any) {
        const grp: Map<string, Map<string, { start: Date, end: Date }>> = postLoginData.get(e.target.value)!;
        setChosenGroup(e.target.value);
        setFacilities(grp);
        setDepartments(new Map<string, { start: Date, end: Date }>());
        setDefaultGroupSelectOptionDisabled(true);
        setDefaultFacilitySelectOptionDisabled(false);
        setDefaultDepartmentSelectOptionDisabled(false);
        setStartDatePickerDisabled(true);
        setLoadFixedMonthsDisabled(true);
        setEndDatePickerDisabled(true);
        setLoadButtonDisabled(true);
    };

    function onFacilitySelect(e: any) {
        const fac: Map<string, { start: Date, end: Date }> = facilities.get(e.target.value)!;
        setChosenFacility(e.target.value);
        setDepartments(fac);
        setDefaultFacilitySelectOptionDisabled(true);
        setDefaultDepartmentSelectOptionDisabled(false);
        setLoadFixedMonthsDisabled(true);
        setLoadButtonDisabled(true);
    };

    function onDepartmentSelect(e: any) {
        const dates: { start: Date, end: Date } = departments.get(e.target.value)!;
        setChosenDepartment(e.target.value);
        setEarliestStartDate(dates.start);

        // Needs to be a Sunday!
        dates.end.setDate(dates.end.getDate() - dates.end.getDay());

        setLatestEndDate(dates.end);
        setDefaultDepartmentSelectOptionDisabled(true);
        setStartDatePickerDisabled(false);
        setLoadButtonDisabled(true);
        setLoadFixedMonthsDisabled(false);
    };

    function onClickLoadButton(e: any) {
        // TODO
    }

    function onClickFixedMonthsLoadButton(e: any) {
        // TODO: The below is just for testing. Need the real code here that will ultimately lead to the API calls.
        const arrData: ArrivalsData = new ArrivalsData();
        const covData: CurrentScheduleAndCoverageData = new CurrentScheduleAndCoverageData();

        // TODO: chosen Dates below are not accurate when using the 3, 6, and 12 month buttons
        const presetsStartDate: Date = subtractDays(latestEndDate, e.target.value as number);

        // TODO: door_to_provider hard-coded for now

        const status_header_data: StatusHeaderDataType = {
            group_name: chosenGroup,
            facility_name: chosenFacility,
            department_name: chosenDepartment,
            data_start_date: presetsStartDate,
            data_end_date: latestEndDate,
            schedule_name: "",
            door_to_provider: "30 minutes"
        };

        retrieve_all_schedules_callback(chosenGroup, chosenFacility, chosenDepartment);

        arrivals_update_callback(status_header_data);

    }

    function subtractDays(date: Date, days: number) {
        const result = new Date(date);
        result.setDate(result.getDate() - days);
        return result;
    }

    return (
        <div className="tabPanelDiv">
            <FloatingLabel controlId="floatingSelect" label="Group:" className="dataLoaderLabel">
                <Form.Select onChange={onGroupSelect} >
                    <option disabled={defaultGroupSelectOptionDisabled}>Choose your desired group</option>
                    {Array.from(postLoginData.keys()).map((k: string) => { return <option value={k} key={k}>{k}</option>; })}
                </Form.Select>
            </FloatingLabel>
            <FloatingLabel controlId="floatingSelect" label="Facility:" className="dataLoaderLabel">
                <Form.Select onChange={onFacilitySelect} >
                    <option disabled={defaultFacilitySelectOptionDisabled}>Choose your desired facility</option>
                    {Array.from(facilities.keys()).map((k: string) => { return <option value={k} key={k}>{k}</option>; })}
                </Form.Select>
            </FloatingLabel>
            <FloatingLabel controlId="floatingSelect" label="Department:" className="dataLoaderLabel">
                <Form.Select onChange={onDepartmentSelect} >
                    <option disabled={defaultDepartmentSelectOptionDisabled}>Choose your desired department</option>
                    {Array.from(departments.keys()).map((k: string) => { return <option value={k} key={k}>{k}</option>; })}
                </Form.Select>
            </FloatingLabel>
            <div className="dataLoaderLabel" >Load the most recent # months:</div>
            <div >
                <Button variant="outline-primary" onClick={onClickFixedMonthsLoadButton} disabled={loadFixedMonthsDisabled} className="setMonthsButtons" value={91}>3</Button>
                <Button variant="outline-primary" onClick={onClickFixedMonthsLoadButton} disabled={loadFixedMonthsDisabled} className="setMonthsButtons" value={182}>6</Button>
                <Button variant="outline-primary" onClick={onClickFixedMonthsLoadButton} disabled={loadFixedMonthsDisabled} className="setMonthsButtons" value={364}>12</Button>
            </div>

            <div className="dataLoaderLabel" >Load Custom Date Range:</div>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="datePickerDiv">
                    <DatePicker
                        disabled={startDatePickerDisabled}
                        label={"Start Date (Sundays only)"}
                        views={["year", "month", "day"]}
                        minDate={earliestStartDate}
                        maxDate={latestEndDate}
                        onChange={dataStartDateChanged}
                        shouldDisableDate={disableAllButSundays}
                    />
                </div>
                <div className="datePickerDiv">
                    <DatePicker
                        disabled={endDatePickerDisabled}
                        label={"End Date (Sundays only)"}
                        views={["year", "month", "day"]}
                        minDate={earliestEndDate}
                        maxDate={latestEndDate}
                        onChange={dataEndDateChanged}
                        shouldDisableDate={disableAllButSundays}
                    />
                </div>
            </LocalizationProvider>

            <Button variant="outline-primary" onClick={onClickLoadButton} disabled={loadButtonDisabled} className="datePickerDiv">
                Load Arrivals and Schedules
            </Button>
        </div>
    );
}

export default DataLoaderPanel;
