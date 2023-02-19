export const getArrayOfChunksOfTargetPart = () => {
    return Array.prototype.slice.call(
        // Target part always have not more than one level of nested children
        window.getSelection().anchorNode.parentElement.parentElement.children
    );
};
