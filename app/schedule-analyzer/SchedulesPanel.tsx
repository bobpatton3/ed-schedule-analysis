"use client";

import { Button } from "react-bootstrap";
import { ScheduleDataType } from "./AllSchedulesData";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { useState } from "react";
import DeleteScheduleConfirmationModal from "./DeleteScheduleConfirmationModal";

type PkModalStatePair = {
    pk: string;
    modal_state: boolean;
};

function SchedulesPanel(
    {
        select_schedule_callback,
        delete_schedule_callback,
        all_schedules_data,
    }: {
        select_schedule_callback: (pk: string) => void;
        delete_schedule_callback: (pk: string) => void;
        all_schedules_data: Map<string, ScheduleDataType>;
    }
) {

    const [pkModalStatePair, setPkModalStatePair] = useState<PkModalStatePair>({ pk: "", modal_state: false });

    const onClickScheduleNameButton = (id: GridRowId): void => {
        select_schedule_callback(id.toString());
    };

    const onClickDeleteScheduleButton = (id: GridRowId): void => {
        setPkModalStatePair({ pk: id.toString(), modal_state: true });
    };

    const handleDeleteConfirmationClose = (delete_sched: boolean = false, pk?: string) => {

        if (delete_sched && pk) {
            delete_schedule_callback(pk);
        }

        setPkModalStatePair({ pk: "", modal_state: false });
    }

    const rows: object[] = [];
    all_schedules_data.forEach((value: ScheduleDataType, key: string) => {
        const creationDate: Date = new Date(value.creationDate);
        rows.push({
            id: value.pk,
            name: value.schedule_name,
            creator: value.owner,
            //yearly_cost: value.yearly_cost,
            creation_date: creationDate.toLocaleDateString(),
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
            width: 250,
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
            headerName: 'Owner',
            width: 120,
            align: 'center',
        },
        // {
        //     field: 'yearly_cost',
        //     headerName: '$',
        //     width: 120,
        //     align: 'center',
        // },
        {
            field: 'creation_date',
            headerName: 'Created',
            width: 100,
            align: 'center'
        },
    ];

    return (
        <div className="tabPanelDiv">
            <DataGrid
                rows={rows}
                columns={columns}
                hideFooter={true} />
            <DeleteScheduleConfirmationModal
                handle_modal_close_callback={handleDeleteConfirmationClose}
                all_schedules_data={all_schedules_data}
                pk_modal_state_pair={pkModalStatePair}
            />
        </div>
    );
}

export default SchedulesPanel;
