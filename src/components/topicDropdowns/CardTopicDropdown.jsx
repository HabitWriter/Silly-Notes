import { useState } from "react";
import AddButton from "../buttons/AddButton";
import { useAtom, useAtomValue } from "jotai";
import { subtopicArrayWriteableAtom, topicArrayAtom } from "../../atom"

export default function CardTopicDropdown({topicId, subtopicChange}) {
    
    const [subtopicArray, setSubtopicArray] = useAtom(subtopicArrayWriteableAtom);

    const topicArray = useAtomValue(topicArrayAtom);

    const getTopicTitleInitial = (topicId) => {
        const chosenTopic = topicArray.find(
            (topic) => topic.topicId == topicId
        );
        return chosenTopic.title;
    };

    const [selected, setSelected] = useState(getTopicTitleInitial(topicId));

    const getTopicTitle = (e) => {
        const chosenTopic = topicArray.find(
            (topic) => topic.topicId == e.target.value
        );
        return chosenTopic.title;
    };
    
    const sendSubtopicChanges = () => {
        return;
    }

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex="0" role="button" className={`btn w-40 m-1`}>
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
                        defaultValue={topicId}
                        onChange={(e) => {
                            setSelected(getTopicTitle(e));
                            subtopicChange(e,"topicId")
                        }}
                    >
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
                    <AddButton
                        clickAction={() => {
                            return;
                        }}
                        title={"New Topic"}
                    />
                </div>
            </div>
        </div>
    );
}
