"use client";

import { Button } from "react-bootstrap";
import { ScheduleDataType } from "./AllSchedulesData";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";

function SchedulesPanel(
    {
        select_schedule_callback,
        all_schedules_data,
    }: {
        select_schedule_callback: (pk: string) => void;
        all_schedules_data: Map<string, ScheduleDataType>;
    }
) {

    const onClickScheduleNameButton = (id: GridRowId): void => {
        select_schedule_callback(id.toString());
    };

    const onClickDeleteScheduleButton = (id: GridRowId): void => {
        console.log('delete schedule functionality coming soon!');
    };

    const rows: object[] = [];
    all_schedules_data.forEach((value: ScheduleDataType, key: string) => {
        rows.push({
            id: value.pk,
            name: value.schedule_name,
            creator: value.owner,
            yearly_cost: value.yearly_cost,
            creation_date: value.creationDate
        });
    });

    const columns: GridColDef[] = [
        {
            field: 'Del?',
            width: 60,
            align: "center",
            renderCell: (params) => (
                <Button
                    onClick={() => onClickDeleteScheduleButton(params.id)}
                    className="scheduleDeleteButton"
                >&#8212;</Button>
            )
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            align: 'left',
            renderCell: (params) => (
                <Button
                    onClick={() => onClickScheduleNameButton(params.id)}
                    className="scheduleListButton"
                >
                    {params.value}
                </Button>
            ),
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
        <div className="tabPanelDiv">
            <DataGrid
                rows={rows}
                columns={columns}
                hideFooter={true} />
        </div>
    );
}

export default SchedulesPanel;
