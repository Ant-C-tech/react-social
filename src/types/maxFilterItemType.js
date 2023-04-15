export const maxFilterItemType = (props, propName, componentName) => {
    if (props[propName] < 0 || props[propName] > 5) {
        return new Error(
            `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
        );
    }
    return null;
};
