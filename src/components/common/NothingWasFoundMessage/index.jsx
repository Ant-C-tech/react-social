import "./styles.css";

import React from "react";
import { Message } from "@common";

export const NothingWasFoundMessage = ({
    countriesForPrompt = [],
    categoriesForPrompt = [],
    languagesForPrompt = [],
}) => {
    return (
        <Message
            type={"message-info"}
            title="Nothing was found according to your request."
        >
            <p>Try to change your search parameters.</p>
            {countriesForPrompt.length > 0 && (
                <div className="nothing-was-found-prompt">
                    <h3 className="nothing-was-found-prompt-title">
                        Recommended countries :
                    </h3>
                    <ul className="nothing-was-found-prompt-list">
                        {countriesForPrompt.map((country, index) => {
                            const countryFlag = country[0];
                            const countryName = country[1];
                            return (
                                <li
                                    key={index}
                                    className="nothing-was-found-prompt-item"
                                >
                                    <span className="nothing-was-found-prompt-country-flag">
                                        {countryFlag}
                                    </span>
                                    <span className="nothing-was-found-prompt-country-name">
                                        {countryName}
                                    </span>
                                </li>
                            );
                        })}
                        <hr></hr>
                    </ul>
                </div>
            )}
            {categoriesForPrompt.length > 0 && (
                <div className="nothing-was-found-prompt">
                    <h3 className="nothing-was-found-prompt-title">
                        Recommended categories :
                    </h3>
                    <ul className="nothing-was-found-prompt-list">
                        {categoriesForPrompt.map((category, index) => {
                            const categoryIcon = category[0];
                            const categoryName = category[1];
                            return (
                                <li
                                    key={index}
                                    className="nothing-was-found-prompt-item"
                                >
                                    <span className="nothing-was-found-prompt-category-icon">
                                        {categoryIcon}
                                    </span>
                                    <span className="nothing-was-found-prompt-category-name">
                                        {categoryName}
                                    </span>
                                </li>
                            );
                        })}
                        <hr></hr>
                    </ul>
                </div>
            )}
            {languagesForPrompt.length > 0 && (
                <div className="nothing-was-found-prompt">
                    <h3 className="nothing-was-found-prompt-title">
                        Recommended languages :
                    </h3>
                    <ul className="nothing-was-found-prompt-list">
                        {languagesForPrompt.map((language, index) => {
                            const languageIcon = language[0];
                            const languageName = language[1];
                            return (
                                <li
                                    key={index}
                                    className="nothing-was-found-prompt-item"
                                >
                                    <span className="nothing-was-found-prompt-language-icon">
                                        {languageIcon}
                                    </span>
                                    <span className="nothing-was-found-prompt-language-name">
                                        {languageName}
                                    </span>
                                </li>
                            );
                        })}
                        <hr></hr>
                    </ul>
                </div>
            )}
            <p>Happy news!</p>
        </Message>
    );
};
