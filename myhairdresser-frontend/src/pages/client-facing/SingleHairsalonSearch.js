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

    const [hairsalonId, setHairsalonId] = React.useState([]);

    const navigate = useNavigate();



    const callAutocompleteEndpoint = async (nameToAutocomplete) => {
        instance.get('/hairsalons/autocomplete',
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
        navigate("/client/hairsalon/"+ hairsalonId);
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

   // Function to get the ID for a given hair salon name
function getHairSalonIdByName(salonName) {
    const foundSalon = options.find((salon) => salon.name === salonName);
    console.log(foundSalon.id);
    return foundSalon ? foundSalon.id : null;
  }

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
                getOptionLabel={(option) => option.name}
                options={options}
                loading={loading}
                onInputChange={(event, newInputValue) => {
                    console.log(event.target.value)
                    console.log(newInputValue)
                    setHairsalonId(getHairSalonIdByName(newInputValue));
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
            <Button variant="contained" onClick={handleSearchRequest}>Profil aufrufen</Button>
        </React.Fragment>
    );
}

