import { useAtomValue } from "jotai";
import { subtopicArrayAtom, isAddingNoteAtom } from "../atom.js";
import TopicDropdown from "./topicDropdowns/HeaderTopicDropdown.jsx";
import ConfirmButton from "./buttons/ConfirmButton.jsx"

import SubtopicCard from "./SubtopicCard.jsx";
import AddSubtopicCard from "./AddSubtopicCard.jsx";

export default function SubtopicTable() {
    const subtopicArray = useAtomValue(subtopicArrayAtom);
    const isAddingNote = useAtomValue(isAddingNoteAtom)
    console.log(subtopicArray);
    //   const [subtopicArray, setSubtopicArray] = useAtom(subtopicArrayAtom)

    //   console.log(subtopicArray);

    return (
        <div className="w-full p-10 2xl:px-96">
            
            {isAddingNote && <AddSubtopicCard/>}

            

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
