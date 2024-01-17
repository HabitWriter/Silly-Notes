import { useAtomValue } from "jotai";
import { subtopicFilteredWriteableAtom, isAddingNoteAtom } from "../atom.js";

import SubtopicCard from "./SubtopicCard.jsx";
import AddSubtopicCard from "./AddSubtopicCard.jsx";

export default function SubtopicTable() {
    const subtopicArray = useAtomValue(subtopicFilteredWriteableAtom);
    const isAddingNote = useAtomValue(isAddingNoteAtom)


    return (
        <div className="w-full p-10 2xl:px-96">
            
            {isAddingNote && <AddSubtopicCard subtopicArray = {subtopicArray}/>}

            

            {subtopicArray.map(function (subtopic) {
                return (
                    <SubtopicCard
                        key={subtopic.subtopicId}
                        subtopic={subtopic}
                    />
                );
            })}
        </div>
    );
}
