import { getCodesByNames } from "./";

export const getDataForPrompt = (dataBase, newsForPrompt, key) => {
    const codesForPrompt = [];
    if (key === "language") {
        newsForPrompt.forEach((news) => {
            codesForPrompt.push(news[key]);
        });
    } else {
        newsForPrompt.forEach((news) => {
            news[key].forEach((item) => {
                codesForPrompt.push(item);
            });
        });
    }
    const uniqCodesForPrompt = [...new Set(codesForPrompt)];

    const dataForPrompt = uniqCodesForPrompt.map((item) => {
        const code = getCodesByNames(dataBase, [item]);
        return [dataBase[code].icon, dataBase[code].name];
    });
    return dataForPrompt;
};
