import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Avaliation, selectAvaliationById, updateAvaliation } from "./AvaliaitonSlice";
import { AvaliationForm } from "./components/AvaliantonForm";


export const AvaliationEdit = () => {
    const id = useParams().id || "";
    const [isdisabled, setIsdisabled] = useState(false);
    const avaliation = useAppSelector((state) => selectAvaliationById(state, id));
    const [avaliationState, setAvaliationState] = useState<Avaliation>(avaliation);
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(updateAvaliation(avaliationState));
        enqueueSnackbar("Avaliação atualizada com sucesso!", { variant: "success" });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAvaliationState({
           ...avaliationState,
            [name]: value,
        });
    };
    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setAvaliationState({
           ...avaliationState,
            [name]: checked,
        });
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Paper>
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Editar Avaliação
                    </Typography>
                </Box>
            </Paper>
            <AvaliationForm
                avaliation={avaliationState}
                isdisabled={isdisabled}
                isLoading={false}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleToggle={handleToggle}
            />
        </Box>
    );
};
