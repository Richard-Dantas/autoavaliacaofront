import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Avaliation, createAvaliation } from "./AvaliaitonSlice";
import { AvaliationForm } from "./components/AvaliantonForm";
import { useAppDispatch } from "../../app/hooks";


export const AvaliationCreate = () => {
    const [isdisabled, setIsdisabled] = useState(false);
    const [avaliationState, setAvaliationState] = useState<Avaliation>({
        id:"",
        name:"",
        questionCount:0,
        creationDate:"",
        is_Active:false,
    });
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(createAvaliation(avaliationState));
        enqueueSnackbar("Avaliação criada com sucesso!", { variant: "success" });
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
                        Criar Avaliação
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
