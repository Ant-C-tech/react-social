export const getCodesByNames = (dataBase, names) => {
    const nameCodeObject = {};
    Object.entries(dataBase).forEach((item) => {
        const code = item[0];
        const name = item[1].name.toLowerCase();

        nameCodeObject[name] = code;
    });

    return [...names.map((name) => nameCodeObject[name.toLowerCase()])];
};
