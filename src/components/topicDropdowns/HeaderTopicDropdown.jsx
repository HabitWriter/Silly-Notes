import { useState, useRef } from "react";
import AddButton from "../buttons/AddButton";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
    topicArrayWriteableAtom,
    topicFilterAtom,
    subtopicArrayWriteableAtom,
    subtopicFilteredWriteableAtom,
} from "../../atom";
import TopicOptionsButton from "../buttons/TopicOptionsButton";
import axios from "axios";
import { debounce } from "lodash";
import DeleteButton from "../buttons/DeleteButton";

export default function HeaderTopicDropdown() {
    const [selected, setSelected] = useState("Filter Topics");
    const [isAddingTopic, setIsAddingTopic] = useState(false);
    const [isEditingTopic, setIsEditingTopic] = useState(false);
    // Atoms
    const [subtopicArray, setSubtopicArray] = useAtom(
        subtopicArrayWriteableAtom
    );
    const [subtopicFiltered, setSubtopicFiltered] = useAtom(
        subtopicFilteredWriteableAtom
    );
    const [topicArray, setTopicArray] = useAtom(topicArrayWriteableAtom);
    const setFilterAtom = useSetAtom(topicFilterAtom);
    // Refs
    const subtopicArrayRef = useRef(subtopicArray);
    const subtopicArrayLengthRef = useRef(subtopicFiltered.length);
    const newArrayLengthRef = useRef(0);

    const setFilter = async (e) => {
        const topicId = parseInt(e.target.value);
        setFilterAtom(topicId);

        subtopicArrayRef.current = subtopicArray;
        const subtopicArrayLength = subtopicFiltered.length;

        // If the array length is longer,
        // a new note has been added, and the array ref needs to update.
        // Otherwise keep it the same.
        if (subtopicArrayLength > subtopicArrayLengthRef.current) {
            setSubtopicArray(await subtopicFiltered);

            subtopicArrayRef.current = await subtopicFiltered;
            subtopicArrayLengthRef.current = subtopicArrayLength;
        }
        // If the current length is larger than the previously
        // recorded newArrayLengthRef a note has been added and the array
        // ref needs to update.
        // Otherwise, keep it the same.

        if (subtopicArrayLength > newArrayLengthRef.current) {
            const currentArray = await subtopicFiltered;

            const noteSet = new Set(subtopicArrayRef.current);
            const newNoteArray = [];
            currentArray.forEach((note) => noteSet.add(note));
            noteSet.forEach((note) => newNoteArray.push(note));
            setSubtopicArray(
                newNoteArray.sort(
                    (a, b) =>
                        new Date(b.timeAccessed) - new Date(a.timeAccessed)
                )
            );
            subtopicArrayRef.current = newNoteArray.sort(
                (a, b) => new Date(b.timeAccessed) - new Date(a.timeAccessed)
            );
        }

        // If current length is smaller than the previously recorded
        // newArrayLengthRef a note has had a filter change
        // or has been deleted.
        // If an item in the current array has had an item change its
        // set topic, and there is a filter being applied,
        // remove the item from view,
        // and update the subtopicArrayRef with the accurate information

        if (topicId != 0) {
            const filteredSubtopics = subtopicArrayRef.current.filter(
                (subtopic) => subtopic.topicId === topicId
            );
            setSubtopicFiltered(filteredSubtopics);
            newArrayLengthRef.current = filteredSubtopics.length;
        } else {
            const allSubtopics = subtopicArrayRef.current;
            setSubtopicFiltered(allSubtopics);
            newArrayLengthRef.current = allSubtopics.length;
        }
    };

    const getTopicTitle = (e) => {
        const topicId = parseInt(e.target.value);
        if (topicId !== 0) {
            const chosenTopic = topicArray.find(
                (topic) => topic.topicId === topicId
            );
            return chosenTopic.title;
        } else {
            return "Filter Topics";
        }
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
            const topicIndex = newTopicArray.findIndex((searchedTopic) => searchedTopic.topicId === parseInt(passedTopicId) )
            newTopicArray[topicIndex].title = e.target.value
            setTopicArray(newTopicArray);
        }
    };

    const deleteTopicHandler = async (topicId) => {
      await axios.delete(`/api/topic/delete/${topicId}`)
      const newTopicArray = topicArray.filter((searchedTopic) => searchedTopic.topicId !== parseInt(topicId));
      setTopicArray(newTopicArray);
    }

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex="0" role="button" className={`btn w-40 m-1`}>
                {selected}
            </div>
            <div
                tabIndex="0"
                className="dropdown-content z-[1] card card-compact w-72 p-2 shadow bg-base-300"
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
                                    <DeleteButton clickAction={() => deleteTopicHandler(topic.topicId)}/>
                                </div>
                            );
                        })
                    ) : (
                        // Show this when isEditingTopic is false
                        <select
                            className="select select-ghost w-full max-w-xs"
                            defaultValue={"Topics"}
                            onChange={(e) => {
                                setSelected(getTopicTitle(e));
                                setFilter(e);
                            }}
                        >
                            <option value="0">All</option>
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
