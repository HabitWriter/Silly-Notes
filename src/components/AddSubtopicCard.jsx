import AddTopicDropdown from "./topicDropdowns/AddTopicDropdown.jsx";
import ConfirmButton from "./buttons/ConfirmButton.jsx";
import XButton from "./buttons/XButton.jsx";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
    isAddingNoteAtom,
    newNoteTopicAtom,
    subtopicArrayWriteableAtom,
    subtopicFilteredWriteableAtom,
    topicFilterAtom
} from "../atom";
import { useRef, Suspense } from "react";
import axios from "axios";

export default function AddSubtopicCard({  }) {
    const setIsAddingNote = useSetAtom(isAddingNoteAtom);
    const newNoteTopic = useAtomValue(newNoteTopicAtom);
    const inputRef = useRef();
    // const setSubtopicArray = useSetAtom(subtopicFilteredWriteableAtom);
    const [subtopicArray, setSubtopicArray] = useAtom(subtopicArrayWriteableAtom)
    const [subtopicFiltered, setSubtopicFiltered] = useAtom(subtopicFilteredWriteableAtom);
    const topicFilter = useAtomValue(topicFilterAtom)

    async function addNewSubtopic(title, topicId) {
        if (title && topicId) {
            return axios.post("/new", { title: title, topicId: topicId });
        }
    }

    return (
        <div className="card w-70% bg-base-300 shadow-xl my-4">
            <div className="card-body items-center text-center">
                {/* Flexbox containing the form inputs */}

                <div className="w-full flex justify-between items-center">
                    <label htmlFor="title">New Note:</label>
                    <form action="">
                        <input
                            type="text"
                            autoFocus
                            name="title"
                            placeholder="New note title"
                            className="input input-bordered w-full max-w-xs"
                            ref={inputRef}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault(); // Prevents the addition of a new line in the input when pressing 'Enter'
                                    // Add new note here?
                                }}}
                        />
                    </form>
                    <div className="w-72">
                        <Suspense>
                            <AddTopicDropdown />
                        </Suspense>
                    </div>

                    <div>
                        <ConfirmButton
                            clickAction={async () => {
                                const createdSubtopic = await addNewSubtopic(
                                    inputRef.current.value,
                                    newNoteTopic
                                );

                                // console.log(createdSubtopic.data);
                                setIsAddingNote(false);
                                
                                setSubtopicArray([
                                    createdSubtopic.data,
                                    ...subtopicArray,
                                ]);
                                
                                if (createdSubtopic.data.topicId == topicFilter) {
                                setSubtopicFiltered([
                                    createdSubtopic.data,
                                    ...subtopicFiltered,
                                ])};
                            }}
                        />
                        <XButton
                            clickAction={() => setIsAddingNote(false)}
                            title={"exit adding note"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
