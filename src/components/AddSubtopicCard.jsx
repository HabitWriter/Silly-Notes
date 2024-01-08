import AddTopicDropdown from "./topicDropdowns/AddTopicDropdown.jsx";
import ConfirmButton from "./buttons/ConfirmButton.jsx";
import { useSetAtom } from "jotai";
import { isAddingNoteAtom } from "../atom";
import { Suspense } from "react";

export default function AddSubtopicCard() {
    const setIsAddingNote = useSetAtom(isAddingNoteAtom);

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
                    />
                    </form>
                    <div className="w-72">
                        <Suspense>
                            <AddTopicDropdown />
                        </Suspense>
                    </div>

                    <ConfirmButton clickAction={() => setIsAddingNote(false)} />
                
                </div>
            </div>
        </div>
    );
}
