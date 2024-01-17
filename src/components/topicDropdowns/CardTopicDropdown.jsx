import { useState } from "react";
import AddButton from "../buttons/AddButton";
import { useAtom, useAtomValue } from "jotai";
import { subtopicArrayWriteableAtom, topicArrayAtom, subtopicFilteredWriteableAtom, topicFilterAtom } from "../../atom"

export default function CardTopicDropdown({topicId, subtopicChange}) {
    
    const [subtopicArray, setSubtopicArray] = useAtom(subtopicArrayWriteableAtom);
    const [subtopicFiltered, setSubtopicFiltered] = useAtom(subtopicFilteredWriteableAtom);

    const topicArray = useAtomValue(topicArrayAtom);
    const topicFilter = useAtomValue(topicFilterAtom);
    
    // Logic to get the topic from the parent component handing down the data.
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
    
    const setFilteredArray = async (changedSubtopicPromise) => {
        // Wait for the promise to resolve
        const changedSubtopic = await changedSubtopicPromise;
    
        let newFullArray = subtopicArray.filter(subtopic => subtopic.subtopicId !== changedSubtopic.data.subtopicId);
        newFullArray.push(changedSubtopic.data)
        newFullArray = newFullArray.sort((a, b) => new Date(b.timeAccessed) - new Date(a.timeAccessed))
        console.log(newFullArray);
        setSubtopicArray(newFullArray);
    
        
        const newFilteredArray = subtopicFiltered.filter(subtopic => subtopic.subtopicId !== changedSubtopic.data.subtopicId);
        
        setSubtopicFiltered(newFilteredArray);
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
                            let changedSubtopic = subtopicChange(e,"topicId")
                            if (topicFilter !== 0) {
                            setFilteredArray(changedSubtopic)
                            }
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
