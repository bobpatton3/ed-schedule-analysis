"use client";

import { Tab, Tabs } from "react-bootstrap";
import ArrivalsData, { ArrivalsDataType } from "./ArrivalsData";
import { useState } from "react";
import CurrentScheduleAndCoverageData, {
    CoverageDataType,
    StatusHeaderDataType,
} from "./CurrentScheduleAndCoverageData";
import AllSchedulesData, { ScheduleDataType, ShiftDataType } from "./AllSchedulesData";
import DataLoaderPanel from "./DataLoaderPanel";
import SchedulesPanel from "./SchedulesPanel";
import ArrivalsDataSlice from "./ArrivalsDataSlice";
import ShiftSliderComponent from "./ShiftSliderComponent";
import SaveScheduleModal from "./SaveScheduleModal";
import { UUID } from "crypto";

// toggling the use of a prefix on the ShiftSliderComponent's key ensures the Designer tab
// gets refreshed back to its previously saved state by clicking on the same schedule again in
// the SchedulesPanel (its a React issue since useState is on the reference which doesn't change)
let usePrefix: boolean = false;

export default function ScheduleAnalyzer() {
    /* TODO:
     * 1. Auth
     * 2. investigate MIT License
     * 3. secure database name and password
     * 4. deploy in Docker
     * 5. deploy on AWS
     * 6. domain name
     * 7. ability to flip between sculpted and blocked
     * 8. ability to temporarily override peak capacities
     *
     */

    const uuid_for_init: UUID = "00000000-0000-0000-0000-000000000000";
    const todaysDate: Date = new Date();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [maxY, setMaxY] = useState<number>(1);
    const [covMaxY, setCovMaxY] = useState<number>(1);
    const [arrMaxY, setArrMaxY] = useState<number>(1);
    const [physWeeklyHours, setPhysWeeklyHours] = useState<number>(0.0);
    const [appWeeklyHours, setAppWeeklyHours] = useState<number>(0.0);
    const [yearlyCost, setYearlyCosts] = useState<number>(0.0);
    const [statusHeaderData, setStatusHeaderData] = useState<StatusHeaderDataType>({
        group_name: "",
        facility_name: "",
        department_name: "",
        department_id: uuid_for_init,
        phys_hourly_rate: 0.0,
        phys_peak_capacity: 0.0,
        app_hourly_rate: 0.0,
        app_peak_capacity: 0.0,
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

    // TODO: hard-coded my username
    const emptySchedule: ScheduleDataType = {
        pk: "temp",
        owner: "bpatton",
        schedule_name: "NEW SCHED",
        creationDate: new Date(),
        updateDate: new Date(),
        department_id: statusHeaderData.department_id,
        yearly_cost: 0.0,
        shifts: new Map<string, ShiftDataType>(),
    };

    function retrieveAllScheduleData(department_id: UUID): void {
        allSchedulesDataManager.retrieveAllSchedulesData(department_id, setAllSchedulesData);

        setCurrSchedData(emptySchedule);
    }

    const curr_sched_cov_data_mgr: CurrentScheduleAndCoverageData = new CurrentScheduleAndCoverageData();
    const [currCovData, setCurrCovData] = useState<CoverageDataType>(curr_sched_cov_data_mgr.getCoverageData());
    const [currSchedData, setCurrSchedData] = useState<ScheduleDataType>(curr_sched_cov_data_mgr.getCurrentSchedule());

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
            curr_sched_cov_data_mgr.setCurrentSchedule(
                selectedSched,
                statusHeaderData.phys_peak_capacity,
                statusHeaderData.app_peak_capacity
            );
            setCurrSchedData(selectedSched);
            setCurrCovData(curr_sched_cov_data_mgr.getCoverageData());
            updateCovMaxY(curr_sched_cov_data_mgr.getMaxY());

            const newStatusHeaderData = { ...statusHeaderData, schedule_name: selectedSched.schedule_name };
            setStatusHeaderData(newStatusHeaderData);
            calculateProviderWeeklyHoursAndYearlyCost(selectedSched);
            usePrefix = !usePrefix;
        }
    }

    function calculateProviderWeeklyHoursAndYearlyCost(schedule: ScheduleDataType) {
        let physHours: number = 0.0;
        let appHours: number = 0.0;

        schedule.shifts.forEach((shift) => {
            if (!shift.deleteFlag) {
                if (shift.providerType === "PHYS") {
                    physHours += shift.duration * shift.daysOfWeek.filter(Boolean).length;
                } else {
                    appHours += shift.duration * shift.daysOfWeek.filter(Boolean).length;
                }
            }
        });

        setPhysWeeklyHours(physHours);
        setAppWeeklyHours(appHours);
        setYearlyCosts((physHours * statusHeaderData.phys_hourly_rate + appHours * statusHeaderData.app_hourly_rate) * 52 / 1000000);
    }

    function updateSchedAndCovWhenShiftModified(shift_data: ShiftDataType) {

        let newSchedData: ScheduleDataType = { ...currSchedData };

        let newShifts: Map<string, ShiftDataType> = new Map<string, ShiftDataType>(newSchedData.shifts);
        newShifts.set(shift_data.id, shift_data);
        newSchedData.shifts = newShifts;
        setCurrSchedData(newSchedData);
        calculateProviderWeeklyHoursAndYearlyCost(newSchedData);

        curr_sched_cov_data_mgr.setCurrentSchedule(newSchedData,
            statusHeaderData.phys_peak_capacity,
            statusHeaderData.app_peak_capacity);
        setCurrCovData(curr_sched_cov_data_mgr.getCoverageData());
        updateCovMaxY(curr_sched_cov_data_mgr.getMaxY());

    }

    function addShift(provType: string) {
        let idval: number = 0;
        for (const element of currentScheduleShiftsArray) idval = (idval < parseInt(element.id)) ? parseInt(element.id) : idval;
        idval += 1;
        const newShift: ShiftDataType = { id: idval.toString(), start: 8, duration: 8, deleteFlag: false, daysOfWeek: [true, true, true, true, true, true, true,], providerType: provType };

        updateSchedAndCovWhenShiftModified(newShift);
    }

    function clearForNewDesign() {
        setCurrSchedData(emptySchedule);
        curr_sched_cov_data_mgr.setCurrentSchedule(emptySchedule,
            statusHeaderData.phys_peak_capacity,
            statusHeaderData.app_peak_capacity);
        setCurrCovData(curr_sched_cov_data_mgr.getCoverageData());
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
            let currDateTime: Date = new Date();
            if (sched_name != statusHeaderData.schedule_name) {
                setStatusHeaderData({ ...statusHeaderData, schedule_name: sched_name });
                const newSchedData: ScheduleDataType = { ...currSchedData, 
                    pk: uuid_for_init, 
                    schedule_name: sched_name, 
                    department_id: statusHeaderData.department_id,
                    updateDate: currDateTime,
                    creationDate: currDateTime,
                 };
                setCurrSchedData(newSchedData);
                allSchedulesDataManager.saveSchedule(newSchedData, setAllSchedulesData, setCurrSchedData);
            } else {
                currSchedData.updateDate = currDateTime;
                allSchedulesDataManager.saveSchedule(currSchedData, setAllSchedulesData, setCurrSchedData);
            }
        }
    }

    function deleteSchedule(pk: string) {
        allSchedulesDataManager.deleteSchedule(pk, deleteScheduleSuccessfulCallback);
    }

    function deleteScheduleSuccessfulCallback(pk: string) {
        const newAllSchedules = new Map<string, ScheduleDataType>();
        allSchedulesData.forEach((sched, key) => {
            if (key !== pk) newAllSchedules.set(key, sched);
        });
        setAllSchedulesData(newAllSchedules);
    }

    const currentScheduleShiftsArray: ShiftDataType[] = Array.from(currSchedData.shifts.values());
    const physScheduleShiftsArray: ShiftDataType[] = currentScheduleShiftsArray.filter((shift) => (shift.providerType === "PHYS"));
    const appScheduleShiftsArray: ShiftDataType[] = currentScheduleShiftsArray.filter((shift) => (shift.providerType === "APP"));
    physScheduleShiftsArray.sort((a, b) => (a.start - b.start) ? (a.start - b.start) : (a.duration - b.duration));
    appScheduleShiftsArray.sort((a, b) => (a.start - b.start) ? (a.start - b.start) : (a.duration - b.duration));

    if (arrivalsData && currCovData) {
        return (

            <div className="baseAppPanel">
                <div className="statusHeaderDiv">
                    <div className="divHeaderLeft">
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

                        <br />
                        <label className="edSchedStatusHdr">Phys Hours:</label>
                        <label className="statusHeaderInfo">{physWeeklyHours}</label>
                        <label className="edSchedStatusHdr">APP Hours:</label>
                        <label className="statusHeaderInfo">{appWeeklyHours}</label>
                        <label className="edSchedStatusHdr">Cost:</label>
                        <label className="statusHeaderInfo">${yearlyCost.toFixed(2)}M</label>
                        <label className="edSchedStatusHdr">Phys Peak Capacity:</label>
                        <label className="statusHeaderInfo">{statusHeaderData.phys_peak_capacity}</label>
                        <label className="edSchedStatusHdr">App Peak Capacity:</label>
                        <label className="statusHeaderInfo">{statusHeaderData.app_peak_capacity}</label>
                    </div>
                    <div className="divHeaderRight">
                        <a className="btn btn-primary logoutButton" href="/api/auth/logout">Logout</a>
                    </div>
                </div>
                <div className="controlAndChartsDiv">
                    <div className="divLeft">
                        <Tabs>
                            <Tab eventKey="data_loader" title="Data Loader">
                                <DataLoaderPanel arrivals_update_callback={updateArrivalsData} retrieve_all_schedules_callback={retrieveAllScheduleData} />
                            </Tab>
                            <Tab eventKey="existing_schedules" title="Schedules">
                                <SchedulesPanel select_schedule_callback={setNewSelectedSchedule} delete_schedule_callback={deleteSchedule} all_schedules_data={allSchedulesData} />
                            </Tab>
                            <Tab eventKey="schedule_design" title="Designer">
                                <SaveScheduleModal modal_state={modalOpen} handle_modal_close_callback={handleModalClose} current_schedule_name={statusHeaderData.schedule_name} />
                                <div className="scroll">
                                    <div className="tabPanelDiv">
                                        <div className="providerTypeDivs">Physician shifts:
                                            <button className="addShiftsButton" onClick={() => addShift("PHYS")}>+</button>
                                            <button className="newScheduleButton" onClick={clearForNewDesign}>Design New Schedule</button>
                                            <button className="saveChangesButton" onClick={saveScheduleChanges}>Save Changes</button>
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
                                            <button className="addShiftsButton" onClick={() => addShift("APP")}>+</button></div>
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