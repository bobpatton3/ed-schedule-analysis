"use client";

import ArrivalsData, { ArrivalsDataType } from "./ArrivalsData";
import { useState } from "react";
import CurrentScheduleAndCoverageData, {
    CoverageDataType,
    StatusHeaderDataType,
} from "./CurrentScheduleAndCoverageData";
import AllSchedulesData, { ScheduleDataType, ShiftDataType } from "./AllSchedulesData";
import { Button, Container, Tab, Tabs } from "react-bootstrap";
import DataLoaderPanel from "./DataLoaderPanel";
import SchedulesPanel from "./SchedulesPanel";
import ArrivalsDataSlice from "./ArrivalsDataSlice";
import ShiftSliderComponent from "./ShiftSliderComponent";
import { Box } from "@mui/material";
import SaveScheduleModal from "./SaveScheduleModal";

// toggling the use of a prefix on the ShiftSliderComponent's key ensures the Designer tab
// gets refreshed by clicking on the same schedule again in the SchedulesPanel (its a React issue!)
let usePrefix: boolean = false;

export default function ScheduleAnalyzer() {
    const todaysDate: Date = new Date();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [maxY, setMaxY] = useState<number>(1);
    const [covMaxY, setCovMaxY] = useState<number>(1);
    const [arrMaxY, setArrMaxY] = useState<number>(1);
    const [statusHeaderData, setStatusHeaderData] = useState<StatusHeaderDataType>({
        group_name: "",
        facility_name: "",
        department_name: "",
        data_start_date: todaysDate,
        data_end_date: todaysDate,
        schedule_name: "",
        door_to_provider: "",
    });
    const arrivalsDataManager: ArrivalsData = new ArrivalsData();
    const [arrivalsData, setArrivalsData] = useState<ArrivalsDataType>(
        arrivalsDataManager.getDefaultArrivalsData()
    );
    const allSchedulesDataManager: AllSchedulesData = new AllSchedulesData();

    const [allSchedulesData, setAllSchedulesData] = useState<Map<string, ScheduleDataType>>(
        allSchedulesDataManager.getEmptySchedule());

    function retrieveAllScheduleData(group: string, facility: string, department: string): void {
        allSchedulesDataManager.retrieveAllSchedulesData(group, facility, department, setAllSchedulesData);

        // TODO: hard-coded my username
        setCurrSchedData({
            pk: "temp",
            owner: "bpatton",
            schedule_name: "NEW SCHED",
            creationDate: new Date(),
            updateDate: new Date(),
            client_group: group,
            facility: facility,
            department: department,
            yearly_cost: 0.0,
            shifts: new Map<string, ShiftDataType>(),
        });
    }

    const curr_sched_cov_data: CurrentScheduleAndCoverageData = new CurrentScheduleAndCoverageData();
    const [currCovData, setCurrCovData] = useState<CoverageDataType>(curr_sched_cov_data.getCoverageData());
    const [currSchedData, setCurrSchedData] = useState<ScheduleDataType>(curr_sched_cov_data.getCurrentSchedule());

    function updateArrivalsData(status_header_data: StatusHeaderDataType) {
        arrivalsDataManager.getArrivalsData(status_header_data, setArrivalsData, updateArrMaxY);
        setStatusHeaderData(status_header_data);
    }

    function updateArrMaxY(retArrMaxY: number) {
        setArrMaxY(retArrMaxY);
        setMaxY((retArrMaxY < covMaxY) ? covMaxY : retArrMaxY);
    }

    function updateCovMaxY(retCovMaxY: number) {
        setCovMaxY(retCovMaxY);
        setMaxY((retCovMaxY < arrMaxY) ? arrMaxY : retCovMaxY);
    }

    function setNewSelectedSchedule(pk: string) {
        const selectedSched: ScheduleDataType | undefined = allSchedulesData.get(pk);

        if (selectedSched) {
            // Some of these below seem redundant but this statemanagement thing is a bit tricky
            // I could change getCoverageData to be a utility function that you pass the schedule in to which would 
            // preclude needing to maintain any state within curr_sched_cov_data
            curr_sched_cov_data.setCurrentSchedule(selectedSched);
            setCurrSchedData(selectedSched);
            setCurrCovData(curr_sched_cov_data.getCoverageData());
            updateCovMaxY(curr_sched_cov_data.getMaxY());

            const newStatusHeaderData = { ...statusHeaderData, schedule_name: selectedSched.schedule_name };
            setStatusHeaderData(newStatusHeaderData);
            usePrefix = !usePrefix;
        }
    }

    function updateSchedAndCovWhenShiftModified(shift_data: ShiftDataType) {

        let newSchedData: ScheduleDataType = { ...currSchedData };

        // Object.entries(shift_data).forEach((v, k) => console.log(`${v[0]} = ${v[1]}`));
        // Object.entries(newSchedData).forEach((v, k) => console.log(`${v[0]} = ${v[1]}`));
        // Object.entries(newSchedData.shifts).forEach((v, k) => console.log(`${v[0]} = ${v[1].id},  ${v[1].duration},  ${v[1].providerType}`));

        let newShifts: Map<string, ShiftDataType> = new Map<string, ShiftDataType>(newSchedData.shifts);
        newShifts.set(shift_data.id, shift_data);
        newSchedData.shifts = newShifts;
        setCurrSchedData(newSchedData);

        // Some of these below seem redundant but this statemanagement thing is a bit tricky
        // I could change getCoverageData to be a utility function that you pass the schedule in to which would 
        // preclude needing to maintain any state within curr_sched_cov_data
        curr_sched_cov_data.setCurrentSchedule(newSchedData);
        setCurrCovData(curr_sched_cov_data.getCoverageData());
        updateCovMaxY(curr_sched_cov_data.getMaxY());

    }

    function addShift(provType: string) {
        let idval: number = 0;
        for (let i = 0; i < currentScheduleShiftsArray.length; i++) idval = (idval < parseInt(currentScheduleShiftsArray[i].id)) ? parseInt(currentScheduleShiftsArray[i].id) : idval;
        idval += 1;
        const newShift: ShiftDataType = { id: idval.toString(), start: 8, duration: 8, deleteFlag: false, daysOfWeek: [true, true, true, true, true, true, true,], providerType: provType };

        updateSchedAndCovWhenShiftModified(newShift);
    }

    function clearForNewDesign() {
        // TODO: hard-coded my username
        let newSchedule: ScheduleDataType = {
            pk: "temp",
            owner: "bpatton",
            schedule_name: "NEW SCHED",
            creationDate: new Date(),
            updateDate: new Date(),
            client_group: statusHeaderData.group_name,
            facility: statusHeaderData.facility_name,
            department: statusHeaderData.department_name,
            yearly_cost: 0.0,
            shifts: new Map<string, ShiftDataType>(),
        };
        setCurrSchedData(newSchedule);
        // Some of these below seem redundant but this statemanagement thing is a bit tricky
        // I could change getCoverageData to be a utility function that you pass the schedule in to which would 
        // preclude needing to maintain any state within curr_sched_cov_data
        curr_sched_cov_data.setCurrentSchedule(newSchedule);
        setCurrCovData(curr_sched_cov_data.getCoverageData());
        setStatusHeaderData({ ...statusHeaderData, schedule_name: "" })
    }

    function saveScheduleChanges() {
        setModalOpen(true);
    }

    function handleModalClose(save_sched: boolean = false, sched_name?: string) {
        setModalOpen(false);

        if (save_sched && sched_name) {
            if (sched_name === statusHeaderData.schedule_name && currSchedData === allSchedulesData.get(currSchedData.pk)) {
                // need dialog for this:
                console.log("There are no changes to process.");
                return;
            }
            if (sched_name != statusHeaderData.schedule_name) {
                setStatusHeaderData({ ...statusHeaderData, schedule_name: sched_name });
                const newSchedData: ScheduleDataType = { ...currSchedData, schedule_name: sched_name };
                setCurrSchedData(newSchedData);
                allSchedulesDataManager.saveSchedule(newSchedData, setAllSchedulesData, setCurrSchedData);
            } else {
                allSchedulesDataManager.saveSchedule(currSchedData, setAllSchedulesData, setCurrSchedData);
            }
        }
    }

    /* TODOs:
        1. 
    */

    const currentScheduleShiftsArray: ShiftDataType[] = Array.from(currSchedData.shifts.values());
    const physScheduleShiftsArray: ShiftDataType[] = currentScheduleShiftsArray.filter((shift) => (shift.providerType === "PHYS"));
    const appScheduleShiftsArray: ShiftDataType[] = currentScheduleShiftsArray.filter((shift) => (shift.providerType === "APP"));
    physScheduleShiftsArray.sort((a, b) => (a.start - b.start) ? (a.start - b.start) : (a.duration - b.duration));
    appScheduleShiftsArray.sort((a, b) => (a.start - b.start) ? (a.start - b.start) : (a.duration - b.duration));

    if (arrivalsData && currCovData) {
        return (

            <div className="baseAppPanel">
                <div className="statusHeaderDiv">
                    <label className="edSchedStatusHdr">Facility: </label>
                    <label className="statusHeaderInfo">{statusHeaderData.facility_name}</label>
                    <label className="edSchedStatusHdr">Department: </label>
                    <label className="statusHeaderInfo">{statusHeaderData.department_name} </label>
                    <label className="edSchedStatusHdr">Date Range: </label>
                    <label className="statusHeaderInfo">{statusHeaderData.data_start_date.toLocaleDateString()}</label>
                    <label className="edSchedStatusConnector">-</label>
                    <label className="statusHeaderInfo">{statusHeaderData.data_end_date.toLocaleDateString()}</label>
                    <label className="edSchedStatusHdr">Schedule: </label>
                    <label className="statusHeaderInfo">{statusHeaderData.schedule_name} </label>
                </div>
                <div className="controlAndChartsDiv">
                    <div className="divLeft">
                        <Tabs>
                            <Tab eventKey="data_loader" title="Data Loader">
                                <DataLoaderPanel arrivals_update_callback={updateArrivalsData} retrieve_all_schedules_callback={retrieveAllScheduleData} />
                            </Tab>
                            <Tab eventKey="existing_schedules" title="Schedules">
                                <SchedulesPanel select_schedule_callback={setNewSelectedSchedule} all_schedules_data={allSchedulesData} />
                            </Tab>
                            <Tab eventKey="schedule_design" title="Designer">
                                <SaveScheduleModal modal_state={modalOpen} handle_modal_close_callback={handleModalClose} current_schedule_name={statusHeaderData.schedule_name} />
                                <div className="scroll">
                                    <div className="tabPanelDiv">
                                        <div className="providerTypeDivs">Physician shifts:
                                            <Button className="addShiftsButton" onClick={() => addShift("PHYS")}>+</Button>
                                            <Button className="newScheduleButton" onClick={clearForNewDesign}>Design New Schedule</Button>
                                            <Button className="saveChangesButton" onClick={saveScheduleChanges}>Save Changes</Button>
                                        </div>
                                        {physScheduleShiftsArray.map((shift) =>
                                            <ShiftSliderComponent
                                                key={(usePrefix) ? 1000 + shift.id : shift.id}
                                                shift_mod_callback={updateSchedAndCovWhenShiftModified}
                                                shift={shift}
                                            />)}
                                    </div>
                                    <div className="tabPanelDiv">
                                        <div className="providerTypeDivs">APP shifts:
                                            <Button className="addShiftsButton" onClick={() => addShift("APP")}>+</Button></div>
                                        {appScheduleShiftsArray.map((shift) =>
                                            <ShiftSliderComponent
                                                key={(usePrefix) ? 1000 + shift.id : shift.id}
                                                shift_mod_callback={updateSchedAndCovWhenShiftModified}
                                                shift={shift}
                                            />)}
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                    <div className="divRight">
                        <Tabs>
                            <Tab eventKey="full" title="Full Department">
                                <ArrivalsDataSlice dept_arrivals_data={arrivalsData.Full} dept_coverage_data={currCovData.Full} maxY={maxY} />
                            </Tab>
                            <Tab eventKey="phys_only" title="PhysOnly (CClvl5)">
                                <ArrivalsDataSlice dept_arrivals_data={arrivalsData.l5CC} dept_coverage_data={currCovData.l5CC} maxY={maxY} />
                            </Tab>
                        </Tabs>
                    </div>
                </div>

            </div>

        );
    }
}

