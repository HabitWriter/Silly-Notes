import { useState } from "react";
import AddButton from "../buttons/AddButton";
import { useAtomValue, useSetAtom } from "jotai";
import {
    topicArrayAtom,
    newNoteTopicAtom,
    topicFilterAtom
} from "../../atom";

export default function AddTopicDropdown() {
    let filteredTopic = useAtomValue(topicFilterAtom)
    let initialTopic = "Choose Topic"
    let initialColor = "btn btn-warning"
    if  (parseInt(filteredTopic) !== 0) {
        console.log(filteredTopic);
        initialTopic = parseInt(filteredTopic)
        initialColor = "btn"
    }
    const [buttonColor, setButtonColor] = useState(initialColor);
    const topicArray = useAtomValue(topicArrayAtom);
    const setNewNoteTopic = useSetAtom(newNoteTopicAtom);
    
    const getTopicTitleInitial = (topicId) => {
        if  (parseInt(filteredTopic) !== 0) {
            const chosenTopic = topicArray.find(
                (topic) => topic.topicId == topicId
            );
            setNewNoteTopic(parseInt(filteredTopic))
            return chosenTopic.title;
            
        } else {
            return topicId
        }
    };

    const [selected, setSelected] = useState(getTopicTitleInitial(initialTopic));

    const getTopicTitle = (e) => {
        const chosenTopic = topicArray.find(
            (topic) => topic.topicId == e.target.value
        );
        return chosenTopic.title;
    };

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex="0" role="button" className={`${buttonColor} m-1`}>
                {selected}
            </div>
            <div
                tabIndex="0"
                className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-base-300"
            >
                <div className="card-body flex items-center">
                    {/* The Select Box */}
                    <select
                        className="select select-ghost w-full max-w-xs"
                        defaultValue={parseInt(filteredTopic)}
                        onChange={(e) => {
                            setSelected(getTopicTitle(e));
                            setButtonColor("btn");
                            setNewNoteTopic(e.target.value);
                            
                        }}
                    >
                      <option value="0" disabled>Choose Topic...</option>
                        {topicArray.map(function (topic) {
                            return (
                                <option
                                    key={topic.topicId}
                                    value={topic.topicId}
                                >
                                    {topic.title}
                                </option>
                            );
                        })}
                    </select>
                    <AddButton clickAction={() =>{ return;}} title={"New Topic"}/>
                </div>
            </div>
        </div>
    );
}
