import React from "react";
import DataLoaderPanel from "./DataLoaderPanel";
import { UUID } from "crypto";
import { StatusHeaderDataType } from "./CurrentScheduleAndCoverageData";

describe('<DataLoadPanel />', () => {
    const updateArrivalsData: (status_header_data: StatusHeaderDataType,) => void = () => { };
    const retrieveAllScheduleData: (department_id: UUID) => void = () => { };

    it("renders", () => {
        cy.mount(<DataLoaderPanel
            arrivals_update_callback={updateArrivalsData}
            retrieve_all_schedules_callback={retrieveAllScheduleData}
        />);

        cy.contains('Load the most recent # months');
        cy.contains("button", "3");
        cy.contains("button", "6");
        cy.contains("button", "12");
        cy.contains('Load Custom Date Range');
        cy.contains("button", "Load Arrivals and Schedules");
    })
})