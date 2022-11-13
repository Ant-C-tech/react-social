import { withStyles } from '@material-ui/core/styles';
import Tab from '@mui/material/Tab';

export const StyledTab = withStyles(() => ({
  root: {
    paddingBottom: '0 !important',
    paddingTop: '0 !important',
    fontFamily: 'Amatic SC, cursive !important',
    fontSize: '25px !important',
    fontWeight: 'bold !important',
    color: '#323e42 !important',
    letterSpacing: '0 !important',
    borderRadius: '10px !important',
  },
}))((props) => <Tab disableRipple {...props} />);
