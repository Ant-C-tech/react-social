import "./styles.css";

export const NoteCardControl = ({ text, onClick }) => {
    return (
        <button className="note-card-control" onClick={onClick}>
            {text}
        </button>
    );
};
