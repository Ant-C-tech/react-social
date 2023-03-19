import { string, number, exact, arrayOf, oneOf } from "prop-types";

import { COUNTRIES_DATA, CATEGORIES_DATA, HIGHLIGHTERS } from "@constants";

export const newsType = exact({
    category: arrayOf(oneOf(Object.keys(CATEGORIES_DATA))).isRequired,
    content: string,
    country: arrayOf(
        oneOf(
            Object.values(COUNTRIES_DATA).map((countryData) => {
                // Some specific cases from API
                switch (countryData.name) {
                    case "Nepal":
                    case "Oman":
                    case "Croatia":
                    case "DR Congo":
                    case "Guatemala":
                    case "Luxembourg":
                    case "Panama":
                    case "Sri Lanka":
                    case "Vietnam":
                    case "Libya":
                    case "Uruguay":
                        return countryData.name;
                    case "Burkina Faso":
                        return "burkina fasco";
                    case "Costa Rica":
                        return "costa Rica";
                    case "Côte d'Ivoire":
                        return "côte d'Ivoire";
                    default:
                        return countryData.name.toLowerCase();
                }
            })
        )
    ).isRequired,
    creator: arrayOf(string),
    description: string,
    highlights: exact({
        content: arrayOf(
            exact({
                endIndex: number.isRequired,
                highlighter: oneOf(
                    HIGHLIGHTERS.map((highlighter) => highlighter.name)
                ).isRequired,
                id: string,
                startIndex: number.isRequired,
            })
        ),
        description: arrayOf(
            exact({
                endIndex: number.isRequired,
                highlighter: oneOf(
                    HIGHLIGHTERS.map((highlighter) => highlighter.name)
                ).isRequired,
                id: string,
                startIndex: number.isRequired,
            })
        ),
        title: arrayOf(
            exact({
                endIndex: number.isRequired,
                highlighter: oneOf(
                    HIGHLIGHTERS.map((highlighter) => highlighter.name)
                ).isRequired,
                id: string,
                startIndex: number.isRequired,
            })
        ),
    }),
    image_url: string,
    keywords: arrayOf(string),
    language: string.isRequired,
    link: string.isRequired,
    notes: exact({
        content: arrayOf(
            exact({
                noteId: string.isRequired,
                noteIndex: number.isRequired,
                noteText: string.isRequired,
            })
        ),
        description: arrayOf(
            exact({
                noteId: string.isRequired,
                noteIndex: number.isRequired,
                noteText: string.isRequired,
            })
        ),
        title: arrayOf(
            exact({
                noteId: string.isRequired,
                noteIndex: number.isRequired,
                noteText: string.isRequired,
            })
        ),
    }),
    pubDate: string.isRequired,
    source_id: string.isRequired,
    title: string.isRequired,
    video_url: string,
});
