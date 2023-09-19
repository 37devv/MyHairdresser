import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';

const baseURL = 'http://localhost:8080/api';

const instance = axios.create({
    baseURL,
});

export default function SingleHairsalonSearch() {

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    const navigate = useNavigate();


    const [name, setName] = React.useState('');

    const callAutocompleteEndpoint = async (nameToAutocomplete) => {
        instance.get('/hairdressers',
            {
                params: {
                    salonNameToComplete: nameToAutocomplete
                }
            })
            .then(response => {
                setOptions(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleSearchRequest = () => {
        navigate("/client/hairsalon?name='hello'");
        console.log("handleSearchRequest");
    }

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }
        (async () => {

            await callAutocompleteEndpoint("");

            if (active) {
                setOptions([]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    //Diese Methode wird ausgeführt, nachdem die Seite geladen gerendert wurde.
    React.useEffect(() => {
        async function fetchData() {
            await callAutocompleteEndpoint("")
        }
        fetchData();
    }, [])

    return (
        <React.Fragment>
            {name}
            <Autocomplete
                id="asynchronous-demo"
                sx={{ width: 300 }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                etOptionLabel={(option) => option}
                options={options}
                loading={loading}
                onInputChange={(event, newInputValue) => {
                    setName(newInputValue);
                  }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Name des Coiffeursalons"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
            <Button variant="contained" onClick={handleSearchRequest}>Search</Button>
        </React.Fragment>
    );
}

