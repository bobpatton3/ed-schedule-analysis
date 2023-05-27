"use client";
import { MyGlobalDataType } from "@/context/context";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Link from "next/link";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import PostLoginData from "../schedule-analyzer/PostLoginData";
import { ShiftDataType } from "../schedule-analyzer/AllSchedulesData";

export default function DataLoadForm({
  searchParams,
}: {
  searchParams: MyGlobalDataType;
}) {
  const [startDatePickerDisabled, setStartDatePickerDisabled] = useState(true);
  const [endDatePickerDisabled, setEndDatePickerDisabled] = useState(true);
  const [loadButtonDisabled, setLoadButtonDisabled] = useState(true);
  const [facilities, setFacilities] = useState<Map<string, Map<string, { start: Date, end: Date }>>>(new Map<string, Map<string, { start: Date, end: Date, schedules: Map<string, ShiftDataType[]> }>>());
  const [departments, setDepartments] = useState<Map<string, { start: Date, end: Date }>>(new Map<string, { start: Date, end: Date, schedules: Map<string, ShiftDataType[]> }>());
  const [earliestStarDate, setEarliestStarDate] = useState<Date>();
  const [latestEndDate, setLatestEndDate] = useState<Date>();
  const [chosenGroup, setChosenGroup] = useState<string>("");
  const [chosenFacility, setChosenFacility] = useState<string>("");
  const [chosenDepartment, setChosenDepartment] = useState<string>("");
  const [chosenStartDate, setChosenStartDate] = useState<Date>();
  const [chosenEndDate, setChosenEndDate] = useState<Date>();
  const [defaultGroupSelectOptionDisabled, setDefaultGroupSelectOptionDisabled] = useState(false);
  const [defaultFacilitySelectOptionDisabled, setDefaultFacilitySelectOptionDisabled] = useState(false);
  const [defaultDepartmentSelectOptionDisabled, setDefaultDepartmentSelectOptionDisabled] = useState(false);

  const dataAccessor: PostLoginData = new PostLoginData();
  const postLoginData: Map<string, Map<string, Map<string, { start: Date, end: Date, schedules: Map<string, ShiftDataType[]> }>>> = dataAccessor.getPostLoginData();

  const dataStartDateChanged = (newStartDate: Date | null) => {
    setChosenStartDate(newStartDate!);
    setEndDatePickerDisabled(false);
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
    const grp: Map<string, Map<string, { start: Date, end: Date, schedules: Map<string, ShiftDataType[]> }>> = postLoginData.get(e.target.value)!;
    setChosenGroup(e.target.value);
    setFacilities(grp);
    setDefaultGroupSelectOptionDisabled(true);
  };

  function onFacilitySelect(e: any) {
    const fac: Map<string, { start: Date, end: Date }> = facilities.get(e.target.value)!;
    setChosenFacility(e.target.value);
    setDepartments(fac);
    setDefaultFacilitySelectOptionDisabled(true);
  };

  function onDepartmentSelect(e: any) {
    const dates: { start: Date, end: Date } = departments.get(e.target.value)!;
    setChosenDepartment(e.target.value);
    setEarliestStarDate(dates.start);
    console.log(dates.start.toString() + "  :  " + dates.end.toString());
    setLatestEndDate(dates.end);
    setDefaultDepartmentSelectOptionDisabled(true);
    setStartDatePickerDisabled(false);
  };

  function onClickLoadButton(e: any) {
    console.log(chosenGroup + "  :  " + chosenFacility + "  :  " + chosenDepartment + "  :  " + chosenStartDate!.toString() + "  :  " + chosenEndDate!.toString())
  }

  return (

    <div>
      <FloatingLabel controlId="floatingSelect" label="Group:">
        <Form.Select onChange={onGroupSelect} >
          <option disabled={defaultGroupSelectOptionDisabled}>Choose your desired group</option>
          {Array.from(postLoginData.keys()).map((k: string) => { return <option value={k} key={k}>{k}</option>; })}
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Facility:">
        <Form.Select onChange={onFacilitySelect} >
          <option disabled={defaultFacilitySelectOptionDisabled}>Choose your desired facility</option>
          {Array.from(facilities.keys()).map((k: string) => { return <option value={k} key={k}>{k}</option>; })}
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Department:">
        <Form.Select onChange={onDepartmentSelect} >
          <option disabled={defaultDepartmentSelectOptionDisabled}>Choose your desired department</option>
          {Array.from(departments.keys()).map((k: string) => { return <option value={k} key={k}>{k}</option>; })}
        </Form.Select>
      </FloatingLabel>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          disabled={startDatePickerDisabled}
          label={"Start Date (Sundays only)"}
          views={["year", "month", "day"]}
          minDate={earliestStarDate}
          maxDate={latestEndDate}
          onChange={dataStartDateChanged}
          shouldDisableDate={disableAllButSundays}
        />
        <DatePicker
          disabled={endDatePickerDisabled}
          label={"End Date (Sundays only)"}
          views={["year", "month", "day"]}
          minDate={earliestStarDate}
          maxDate={latestEndDate}
          onChange={(newValue) => dataEndDateChanged(newValue)}
          shouldDisableDate={disableAllButSundays}
        />
      </LocalizationProvider>

      <Button variant="outline-primary" onClick={onClickLoadButton} disabled={loadButtonDisabled}>
        <Link href="./schedule-analyzer" >
          Load Arrivals and Schedules
        </Link>
      </Button>
    </div>
  );
}
