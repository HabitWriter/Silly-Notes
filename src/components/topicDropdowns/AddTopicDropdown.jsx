import { useState } from "react";
import AddButton from "../buttons/AddButton";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import {
    topicArrayAtom,
    newNoteTopicAtom,
    topicFilterAtom,
    topicArrayWriteableAtom,
} from "../../atom";
import TopicOptionsButton from "../buttons/TopicOptionsButton";
import DeleteButton from "../buttons/DeleteButton";
import { debounce } from "lodash";
import axios from "axios";

export default function AddTopicDropdown() {
    let filteredTopic = useAtomValue(topicFilterAtom);
    let initialTopic = "Choose Topic";
    let initialColor = "btn btn-warning";
    if (parseInt(filteredTopic) !== 0) {
        console.log(filteredTopic);
        initialTopic = parseInt(filteredTopic);
        initialColor = "btn";
    }
    const [buttonColor, setButtonColor] = useState(initialColor);
    // const topicArray = useAtomValue(topicArrayAtom);
    const setNewNoteTopic = useSetAtom(newNoteTopicAtom);
    const [topicArray, setTopicArray] = useAtom(topicArrayWriteableAtom);

    const getTopicTitleInitial = (topicId) => {
        if (parseInt(filteredTopic) !== 0) {
            const chosenTopic = topicArray.find(
                (topic) => topic.topicId == topicId
            );
            setNewNoteTopic(parseInt(filteredTopic));
            return chosenTopic.title;
        } else {
            return topicId;
        }
    };

    const [selected, setSelected] = useState(
        getTopicTitleInitial(initialTopic)
    );
    const [isAddingTopic, setIsAddingTopic] = useState(false);
    const [isEditingTopic, setIsEditingTopic] = useState(false);

    const getTopicTitle = (e) => {
        const chosenTopic = topicArray.find(
            (topic) => topic.topicId == e.target.value
        );
        return chosenTopic.title;
    };

    const newTopicHandler = async (e) => {
        if (e.target.value) {
            const topic = await axios.post("/api/topic/new", {
                title: e.target.value,
            });
            console.log(topic.data);
            const newTopicArray = [...topicArray];
            newTopicArray.push(topic.data);
            setTopicArray(newTopicArray);
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
            <div tabIndex="0" role="button" className={`${buttonColor} m-1`}>
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
                        defaultValue={parseInt(filteredTopic)}
                        onChange={(e) => {
                            setSelected(getTopicTitle(e));
                            setButtonColor("btn");
                            setNewNoteTopic(e.target.value);
                        }}
                    >
                        <option value="0" disabled>
                            Choose Topic...
                        </option>
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
                        <option value="0" disabled>
                            Choose Topic...
                        </option>
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
