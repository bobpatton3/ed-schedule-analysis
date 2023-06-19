"use client";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import PostLoginData, { DepartmentConfigurationType } from "./PostLoginData";
import ArrivalsData from "./ArrivalsData";
import CurrentScheduleAndCoverageData, { StatusHeaderDataType } from "./CurrentScheduleAndCoverageData";
import { UUID, randomUUID } from "crypto";

const DataLoaderPanel = (
    { user_id, arrivals_update_callback, retrieve_all_schedules_callback }:
        {
            user_id: UUID,
            arrivals_update_callback: (status_header_data: StatusHeaderDataType,) => void,
            retrieve_all_schedules_callback: (department_id: UUID) => void,
        }
) => {
    const [startDatePickerDisabled, setStartDatePickerDisabled] = useState(true);
    const [endDatePickerDisabled, setEndDatePickerDisabled] = useState(true);
    const [loadButtonDisabled, setLoadButtonDisabled] = useState(true);
    const [loadFixedMonthsDisabled, setLoadFixedMonthsDisabled] = useState(true);
    const [facilities, setFacilities] = useState<Map<string, Map<string, DepartmentConfigurationType>>>(new Map<string, Map<string, DepartmentConfigurationType>>());
    const [departments, setDepartments] = useState<Map<string, DepartmentConfigurationType>>(new Map<string, DepartmentConfigurationType>());
    const [earliestStartDate, setEarliestStartDate] = useState<Date>(new Date());
    const [earliestEndDate, setEarliestEndDate] = useState<Date>(new Date());
    const [latestEndDate, setLatestEndDate] = useState<Date>(new Date());
    const [chosenGroup, setChosenGroup] = useState<string>("");
    const [chosenFacility, setChosenFacility] = useState<string>("");
    const [chosenDepartment, setChosenDepartment] = useState<DepartmentConfigurationType>({
        department_id: "00000000-0000-0000-0000-000000000000",
        department_name: "",
        data_start_date: new Date(),
        data_end_date: new Date(),
        phys_hourly_cost: 0,
        phys_peak_capacity: 0,
        app_hourly_cost: 0,
        app_peak_capacity: 0,
    });
    const [chosenStartDate, setChosenStartDate] = useState<Date>(new Date());
    const [chosenEndDate, setChosenEndDate] = useState<Date>(new Date());
    const [defaultGroupSelectOptionDisabled, setDefaultGroupSelectOptionDisabled] = useState(false);
    const [defaultFacilitySelectOptionDisabled, setDefaultFacilitySelectOptionDisabled] = useState(false);
    const [defaultDepartmentSelectOptionDisabled, setDefaultDepartmentSelectOptionDisabled] = useState(false);
    const [postLoginData, setPostLoginData] = useState<Map<string, Map<string, Map<string, DepartmentConfigurationType>>>>(new Map<string, Map<string, Map<string, DepartmentConfigurationType>>>());

    PostLoginData.getPostLoginData(user_id, setPostLoginData);

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
        if (postLoginData) {
            const grp: Map<string, Map<string, DepartmentConfigurationType>> = postLoginData.get(e.target.value)!;
            setChosenGroup(e.target.value);
            setFacilities(grp);
            setDepartments(new Map<string, DepartmentConfigurationType>());
            setDefaultGroupSelectOptionDisabled(true);
            setDefaultFacilitySelectOptionDisabled(false);
            setDefaultDepartmentSelectOptionDisabled(false);
            setStartDatePickerDisabled(true);
            setLoadFixedMonthsDisabled(true);
            setEndDatePickerDisabled(true);
            setLoadButtonDisabled(true);
        }
    };

    function onFacilitySelect(e: any) {
        const fac: Map<string, DepartmentConfigurationType> = facilities.get(e.target.value)!;
        setChosenFacility(e.target.value);
        setDepartments(fac);
        setDefaultFacilitySelectOptionDisabled(true);
        setDefaultDepartmentSelectOptionDisabled(false);
        setLoadFixedMonthsDisabled(true);
        setLoadButtonDisabled(true);
    };

    function onDepartmentSelect(e: any) {
        const deptConf: DepartmentConfigurationType = departments.get(e.target.value)!;
        setChosenDepartment(deptConf);
        setEarliestStartDate(deptConf.data_start_date);

        // Needs to be a Sunday!
        deptConf.data_end_date.setDate(deptConf.data_end_date.getDate() - deptConf.data_end_date.getDay());

        setLatestEndDate(deptConf.data_end_date);
        setDefaultDepartmentSelectOptionDisabled(true);
        setStartDatePickerDisabled(false);
        setLoadButtonDisabled(true);
        setLoadFixedMonthsDisabled(false);
    };

    function onClickLoadButton(e: any) {
        retrieveArrivalsAndSchedules(chosenStartDate, chosenEndDate);
    }

    function onClickFixedMonthsLoadButton(e: any) {
        const presetsStartDate: Date = subtractDays(latestEndDate, e.target.value as number);

        retrieveArrivalsAndSchedules(presetsStartDate, latestEndDate);
    }

    function subtractDays(date: Date, days: number): Date {
        const result: Date = new Date(date);
        result.setDate(result.getDate() - days);
        return result;
    }

    function retrieveArrivalsAndSchedules(startDate: Date, endDate: Date) {

        const status_header_data: StatusHeaderDataType = {
            group_name: chosenGroup,
            facility_name: chosenFacility,
            department_name: chosenDepartment.department_name,
            department_id: chosenDepartment.department_id,
            data_start_date: startDate,
            data_end_date: endDate,
            schedule_name: "",
            door_to_provider: "30 minutes"    // TODO: door_to_provider hard-coded for now
        };

        retrieve_all_schedules_callback(chosenDepartment.department_id);
        arrivals_update_callback(status_header_data);
    }


    return (
        <div className="tabPanelDiv">
            <FloatingLabel controlId="floatingSelect" label="Group:" className="dataLoaderLabel">
                <Form.Select onChange={onGroupSelect} >
                    <option disabled={defaultGroupSelectOptionDisabled}>Choose your desired group</option>
                    {Array.from(postLoginData?.keys()).map((k: string) => { return <option value={k} key={k}>{k}</option>; })}
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
