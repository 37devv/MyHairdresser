import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Button from '@mui/material/Button';

const baseURL = 'http://localhost:8080/api';

const instance = axios.create({
    baseURL,
});

export default function SingleHairsalonSearch() {

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    const callAutocompleteEndpoint = async (nameToAutocomplete) => {
        instance.get('/hairdressers',
            {
                params: {
                    salonNameToComplete: nameToAutocomplete
                }
            })
            .then(response => {
                console.log("Setting following options \n" + response.data);
                setOptions(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleSearchRequest = () => {
        console.log("handleSearchRequest");
    }

    React.useEffect(() => {
        let active = true;
        console.log("React.useEffect [loading]")

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

    React.useEffect(() => {

        console.log("React.useEffect []                          fetchData()")

        async function fetchData() {
            
            await callAutocompleteEndpoint("")
            
        }
        fetchData();
    }, [])

    return (
        <React.Fragment>
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
                    console.log(newInputValue);
                  }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Name des Coiffeursalons"
                        onChange={e => console.log(e.target.value)}
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

