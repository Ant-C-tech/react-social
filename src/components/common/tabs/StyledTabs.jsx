import { withStyles } from "@material-ui/core/styles";
import Tabs from '@mui/material/Tabs';

export const StyledTabs = withStyles(() => ({
  root: {
    width: '100%',
    marginBottom: '15px !important',

  }
}))(props => <Tabs {...props} TabIndicatorProps={{
  style: {
    height: '1px',
    backgroundColor: "#e0004d",
  }
}} />);
