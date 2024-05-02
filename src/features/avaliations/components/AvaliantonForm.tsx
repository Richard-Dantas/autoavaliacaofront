import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Switch, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { Avaliation } from "../AvaliaitonSlice";

type Props = {
    avaliation: Avaliation;
    isdisabled?: boolean;
    isLoading?: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export function AvaliationForm({
    avaliation,
    isdisabled,
    isLoading,
    handleSubmit,
    handleChange,
    handleToggle,
}:Props) {
  return (
    <Box p={2}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    required
                                    name="name"
                                    label="Name"
                                    value={avaliation.name}
                                    disabled={isdisabled}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    required
                                    name="questionCount"
                                    label="Question Count"
                                    value={avaliation.questionCount}
                                    disabled={isdisabled}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormGroup>
                                <FormControlLabel 
                                    control={
                                        <Switch
                                            name="is_active"
                                            color="secondary"
                                            onChange={handleToggle}
                                            checked={avaliation.is_Active}
                                            inputProps={{ "aria-label" : "controlled" }}
                                        />
                                    } 
                                    label="Active"                               
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" gap={2}>
                                <Button variant="contained" component={Link} to="/avaliations">
                                    Voltar
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    disabled={isdisabled}
                                >
                                    Salvar
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
  )
}
