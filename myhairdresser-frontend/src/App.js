// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>

      <ThemeCustomization>
        <ScrollTop>
          <Routes />
        </ScrollTop>
      </ThemeCustomization>
  </LocalizationProvider>
);

export default App;
