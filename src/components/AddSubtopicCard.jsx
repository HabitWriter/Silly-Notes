import AddTopicDropdown from "./topicDropdowns/AddTopicDropdown.jsx";
import ConfirmButton from "./buttons/ConfirmButton.jsx";
import { useAtomValue, useSetAtom } from "jotai";
import { isAddingNoteAtom, newNoteTopicAtom, subtopicArrayAtom } from "../atom";
import { useRef, Suspense } from "react";
import axios from "axios";

export default function AddSubtopicCard({ subtopicArray }) {
    const setIsAddingNote = useSetAtom(isAddingNoteAtom);
    const newNoteTopic = useAtomValue(newNoteTopicAtom);
    const inputRef = useRef();
    const setSubtopicArray = useSetAtom(subtopicArrayAtom);
    

    async function addNewSubtopic(title, topicId) {
        if (title && topicId)
            await axios
                .post("/new", { title: title, topicId: topicId })
                .then((response) => {
                    console.log(response);
                    return response;
                });
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
                        />
                    </form>
                    <div className="w-72">
                        <Suspense>
                            <AddTopicDropdown />
                        </Suspense>
                    </div>

                    <ConfirmButton
                        clickAction={() => {
                            
                            const createdSubtopic = addNewSubtopic(
                                inputRef.current.value,
                                newNoteTopic
                            );
                            setIsAddingNote(false);
                            setSubtopicArray([createdSubtopic,...subtopicArray]);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
