import { Box, Button, IconButton, Toolbar, Typography, debounce } from "@mui/material";
import { useSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteAvaliation, selectAvaliations } from "./AvaliaitonSlice";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridToolbar } from "@mui/x-data-grid";

export const AvaliationList = () => {
    const avaliations = useAppSelector(selectAvaliations);
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const componentProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: {
                debounce: 500
            },
        },
    };

    // usar as avaliações para criar as linhas
    const rows: GridRowsProp = avaliations.map((avaliation) => ({
        id: avaliation.id,
        name: avaliation.name,
        questionCount: avaliation.questionCount,
        creationDate: new Date((avaliation.creationDate ?? "")).toLocaleDateString("pr-BR"),
    }));
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1, renderCell: renderNameCell, },
        { field: 'questionCount', headerName: 'Question Count', flex: 1 },
        { field: 'creationDate', headerName: 'Creation Date', flex: 1 },
        { field: 'id', headerName: 'Actions', type: "string", flex: 1, renderCell: renderActionsCell, },
    ];

    function handleDeleteAvaliation(id: string) {
        dispatch(deleteAvaliation(id));
        enqueueSnackbar("Avaliação deletada com sucesso", { variant: "success" });
    }

    function renderNameCell(rowData: GridRenderCellParams) {
        return (
            <Link
                style={{ textDecoration: "none" }}
                to={`/avaliations/edit/${rowData.id}`}
            >
                <Typography color="primary">{rowData.value}</Typography>
            </Link>
        )
    }

    function renderActionsCell(params: GridRenderCellParams) {
        return (
            <IconButton
                color="secondary"
                onClick={() => handleDeleteAvaliation(params.value)}
                aria-label="delete"
            >
                <DeleteIcon/>
            </IconButton>
        )
    }

    return(
        <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/avaliation/create"
                    style={{ marginBottom: "1rem"}}
                >
                    Nova Avaliação
                </Button>
            </Box>

            <Box sx={{ display: "flex", height: 600 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    componentsProps={componentProps}
                    rowsPerPageOptions={ [2, 20, 50, 100] }
                />
            </Box>

            {/* {avaliations.map((avaliation) =>(
                <Typography key={avaliation.id}>{avaliation.name}</Typography>
            ))} */}
        </Box>
    );
};