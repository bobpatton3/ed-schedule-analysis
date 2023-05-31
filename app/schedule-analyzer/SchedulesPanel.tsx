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

    const rows: object[] = [];
    all_schedules_data.forEach((value: ScheduleDataType, key: string) => {
        console.log(key);
        rows.push({
            id: key,
            name: value.schedule_name,
            creator: value.owner,
            yearly_cost: value.yearly_cost,
            creation_date: value.creationDate
        });
    });

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            align: 'left',
            renderCell: (params) => (
                <Button onClick={() => onClickScheduleNameButton(params.id)}>{params.value}</Button>
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
        <div className="schedulesPanelDiv">
            <DataGrid
                rows={rows}
                columns={columns}
                hideFooter={true}
                checkboxSelection={true} />
        </div>
    );
}

export default SchedulesPanel;
