import "./style.css";

export const Content = ({ children }) => {
    return (
        <>
            <section className="content-container">{children}</section>
        </>
    );
};
