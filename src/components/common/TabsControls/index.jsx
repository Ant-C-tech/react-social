import { StyledTabs } from "./StyledTabs";
import { StyledTab } from "./StyledTab";

export const TabsControls = ({ tabs, currentTab, changeTab }) => {
    const a11yProps = (index) => {
        return {
            id: `tab-${index}`,
            "aria-controls": `tabpanel-${index}`,
        };
    };

    return (
        <StyledTabs value={currentTab} onChange={changeTab} aria-label="tabs">
            {tabs.map((tabLabel, tabIndex) => (
                <StyledTab
                    key={tabIndex}
                    label={tabLabel}
                    {...a11yProps(tabIndex)}
                />
            ))}
        </StyledTabs>
    );
};
