export const minFilterItemType = (props, propName, componentName) => {
    if (props[propName] !== 1) {
        return new Error(
            `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
        );
    }
    return null;
};
