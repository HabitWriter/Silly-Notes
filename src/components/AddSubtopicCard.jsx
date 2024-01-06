import TopicDropdown from "./topicDropdowns/TopicDropdown.jsx";
import ConfirmButton from "./buttons/ConfirmButton.jsx"
import { useSetAtom } from 'jotai'
import { isAddingNoteAtom } from '../atom'


export default function AddSubtopicCard() {
    
    const setIsAddingNote = useSetAtom(isAddingNoteAtom)
    
    return (
        <div className="card w-70% bg-base-300 shadow-xl my-4">
            <div className="card-body items-center text-center">
                {/* Flexbox containing title and open button */}
                <div className="w-full flex justify-between items-center">
                    <label htmlFor="title">New Note:</label>
                    <input
                        type="text"
                        autoFocus
                        name="title"
                        placeholder="New note title"
                        className="input input-bordered w-full max-w-xs"
                    />

                    <TopicDropdown />
                    <ConfirmButton clickAction={() => setIsAddingNote(false)}/>
                </div>
            </div>
        </div>
    );
}
