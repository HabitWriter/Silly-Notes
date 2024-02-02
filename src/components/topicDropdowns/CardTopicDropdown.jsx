import { useState, useEffect, useRef } from "react";
import AddButton from "../buttons/AddButton";
import { useAtom, useAtomValue } from "jotai";
import {
    subtopicArrayWriteableAtom,
    topicArrayWriteableAtom,
    subtopicFilteredWriteableAtom,
    topicFilterAtom,
} from "../../atom";
import TopicOptionsButton from "../buttons/TopicOptionsButton";
import axios from "axios";
import { debounce } from "lodash";
import DeleteButton from "../buttons/DeleteButton";

export default function CardTopicDropdown({ topicId, subtopicChange }) {
    const [subtopicArray, setSubtopicArray] = useAtom(
        subtopicArrayWriteableAtom
    );
    const [subtopicFiltered, setSubtopicFiltered] = useAtom(
        subtopicFilteredWriteableAtom
    );
    const [topicArray, setTopicArray] = useAtom(topicArrayWriteableAtom);

    // const topicArray = useAtomValue(topicArrayAtom);
    const topicFilter = useAtomValue(topicFilterAtom);

    // Logic to get the topic from the parent component handing down the data.
    const getTopicTitleInitial = (topicId) => {
        const chosenTopic = topicArray.find(
            (topic) => topic.topicId == topicId
        );
        return chosenTopic.title;
    };

    const [selected, setSelected] = useState(getTopicTitleInitial(topicId));
    const [isAddingTopic, setIsAddingTopic] = useState(false);
    const [isEditingTopic, setIsEditingTopic] = useState(false);
    const [selectedTopicValue, setSelectedTopicValue] = useState(topicId);

    const getTopicTitle = (e) => {
        let topicId;
        try {
            // Try to get topicId from e.target.value
            topicId = e.target.value;
        } catch (error) {
            // If that fails, use e directly as topicId
            topicId = e;
        }

        const chosenTopic = topicArray.find(
            (topic) => topic.topicId == topicId
        );

        return chosenTopic ? chosenTopic.title : "";
    };

    const setFilteredArray = async (changedSubtopicPromise) => {
        // Wait for the promise to resolve
        const changedSubtopic = await changedSubtopicPromise;

        let newFullArray = subtopicArray.filter(
            (subtopic) =>
                subtopic.subtopicId !== changedSubtopic.data.subtopicId
        );
        newFullArray.push(changedSubtopic.data);
        newFullArray = newFullArray.sort(
            (a, b) => new Date(b.timeAccessed) - new Date(a.timeAccessed)
        );
        console.log(newFullArray);
        setSubtopicArray(newFullArray);

        const newFilteredArray = subtopicFiltered.filter(
            (subtopic) =>
                subtopic.subtopicId !== changedSubtopic.data.subtopicId
        );

        setSubtopicFiltered(newFilteredArray);
    };
    
    const handleTopicChange = async (value) => {
        
            setSelected(getTopicTitle(value));
            let changedSubtopic = await subtopicChange(
                parseInt(value),
                "topicId"
            );
            if (topicFilter !== 0) {
                setFilteredArray(changedSubtopic);
            }
        
    };

    useEffect(() => {
        // Call the new function with selectedTopicValue as argument
        if (topicId !== selectedTopicValue) {
            console.log("hit");
        handleTopicChange(selectedTopicValue)};
    }, [selectedTopicValue]);

    const newTopicHandler = async (e) => {
        if (e.target.value) {
            const topic = await axios.post("/api/topic/new", {
                title: e.target.value,
            });
            console.log(topic.data);
            const newTopicArray = [...topicArray];
            newTopicArray.push(topic.data);
            setTopicArray(newTopicArray);
            setSelectedTopicValue(parseInt(topic.data.topicId));
        }
    };

    const editTopicHandler = async (e, passedTopicId) => {
        if (e.target.value) {
            await axios.post("/api/topic/edit", {
                topicId: passedTopicId,
                title: e.target.value,
            });
            const newTopicArray = [...topicArray];
            const topicIndex = newTopicArray.findIndex(
                (searchedTopic) =>
                    searchedTopic.topicId === parseInt(passedTopicId)
            );
            newTopicArray[topicIndex].title = e.target.value;
            setTopicArray(newTopicArray);
            if (topicId === passedTopicId) setSelected(e.target.value);
        }
    };

    const deleteTopicHandler = async (topicId) => {
        await axios.delete(`/api/topic/delete/${topicId}`);
        const newTopicArray = topicArray.filter(
            (searchedTopic) => searchedTopic.topicId !== parseInt(topicId)
        );
        setTopicArray(newTopicArray);
    };

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
                    {isEditingTopic ? (
                        // Show this when isEditingTopic is true
                        topicArray.map(function (topic) {
                            return (
                                <div key={topic.topicId} className="flex">
                                    <input
                                        type="text"
                                        autoFocus
                                        defaultValue={topic.title}
                                        name="new Topic"
                                        placeholder="New Topic title"
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={debounce((e) => {
                                            editTopicHandler(e, topic.topicId);
                                        }, 500)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault(); // Prevents the addition of a new line in the input when pressing 'Enter'
                                            }
                                        }}
                                    />
                                    <DeleteButton
                                        clickAction={() =>
                                            deleteTopicHandler(topic.topicId)
                                        }
                                    />
                                </div>
                            );
                        })
                    ) : (
                        // Show this when isEditingTopic is false
                        <select
                            className="select select-ghost w-full max-w-xs"
                            value={selectedTopicValue} // Set the value prop to the state variable
                            onChange={(e) => {
                                console.log(selectedTopicValue);
                                setSelectedTopicValue(e.target.value); // Update the state variable when the value changes
                                setSelected(getTopicTitle(e));
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
                    )}

                    {/* Add a New Topic input */}

                    {isAddingTopic && (
                        <input
                            type="text"
                            autoFocus
                            name="new Topic"
                            placeholder="New Topic title"
                            className="input input-bordered w-full max-w-xs"
                            // ref={inputRef}
                            onBlur={(e) => {
                                newTopicHandler(e);
                                setIsAddingTopic(false);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault(); // Prevents the addition of a new line in the input when pressing 'Enter'
                                    newTopicHandler(e);
                                    setIsAddingTopic(false);
                                }
                            }}
                        />
                    )}
                    {/* Buttons Section */}
                    <div className="flex items-center">
                        <AddButton
                            clickAction={() => {
                                setIsAddingTopic(true);
                            }}
                            title={"New Topic"}
                        />
                        <TopicOptionsButton
                            isEditingTopic={isEditingTopic}
                            clickAction={() => {
                                setIsEditingTopic(!isEditingTopic);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
