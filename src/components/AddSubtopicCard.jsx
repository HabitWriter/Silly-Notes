import AddTopicDropdown from "./topicDropdowns/AddTopicDropdown.jsx";
import ConfirmButton from "./buttons/ConfirmButton.jsx";
import XButton from "./buttons/XButton.jsx";
import { useAtomValue, useSetAtom } from "jotai";
import { isAddingNoteAtom, newNoteTopicAtom, subtopicFilteredWriteableAtom } from "../atom";
import { useRef, Suspense } from "react";
import axios from "axios";

export default function AddSubtopicCard({ subtopicArray }) {
    const setIsAddingNote = useSetAtom(isAddingNoteAtom);
    const newNoteTopic = useAtomValue(newNoteTopicAtom);
    const inputRef = useRef();
    const setSubtopicArray = useSetAtom(subtopicFilteredWriteableAtom);
    

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
                    <XButton 
                    clickAction={() => setIsAddingNote(false)}
                    title={"exit adding note"}
                    
                    />
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
                        clickAction={async () => {
                            
                            const createdSubtopic = await addNewSubtopic(
                                inputRef.current.value,
                                newNoteTopic
                            );

                            setIsAddingNote(false);
                            setSubtopicArray([createdSubtopic.data,...subtopicArray]);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
