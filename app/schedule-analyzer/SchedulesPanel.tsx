"use client";

import { CoverageDataType } from "./CurrentScheduleAndCoverageData";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const SchedulesPanel = (
    { coverage_callback }:
        {
            coverage_callback: (newData: CoverageDataType) => void,
        }
) => {
    //const dataAccessor: PostLoginData = new PostLoginData();
    //const postLoginData: Map<string, Map<string, Map<string, { start: Date, end: Date }>>> = dataAccessor.getPostLoginData();

    function onClickScheduleNameButton(e: any) {
    }

    const rows: object[] = [
        {
            "id": "1",
            "name": "Bobs First Schedule Design",
            "creator": "bpatton",
            "yearly_cost": "$4.4",
            "creation_date": "2023-01-01",
        },
        {
            "id": "2",
            "name": "Bobs Second Schedule Design",
            "creator": "bpatton",
            "yearly_cost": "$5.5",
            "creation_date": "2023-02-02",
        },
    ]

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            align: 'left'
        },
        {
            field: 'creator',
            headerName: 'Creator',
            width: 100,
            align: 'center',

        },
        {
            field: 'yearly_cost',
            headerName: 'Yearly Cost',
            width: 50,
            align: 'center',

        },
        {
            field: 'creation_date',
            headerName: 'Created On',
            width: 70,
            align: 'center'
        },

    ];

    return (
        <div className="schedulesPanelDiv">
            <DataGrid
                rows={rows}
                columns={columns}
                hideFooter={true}
                checkboxSelection={true}
            />
        </div>
    );
}

export default SchedulesPanel;
