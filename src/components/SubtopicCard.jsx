import AddButton from "./buttons/AddButton.jsx";
import ArrowButton from "./buttons/ArrowButton.jsx";
import OptionsButton from "./buttons/OptionsButton.jsx";
import CardTopicDropdown from "./topicDropdowns/CardTopicDropdown.jsx";
import { useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { useAtom } from "jotai";
import { subtopicArrayWriteableAtom } from "../atom.js";

export default function SubtopicCard({ subtopic }) {
    const [isOpen, setIsOpen] = useState(false);
    const [subtopicTitle, setSubtopicTitle] = useState(subtopic.title);
    const [isAddingLink, setIsAddingLink] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [codeExample, setCodeExample] = useState(subtopic.codeExample);
    const [notes, setNotes] = useState(subtopic.notes);
    const [subtopicArray, setSubtopicArray] = useAtom(
        subtopicArrayWriteableAtom
    );

    async function subtopicChange(e, changedField) {
        let passedValue = e.target.value;
        if (changedField === "topicId") passedValue = parseInt(passedValue);
        // Find the index of the current subtopic in the array
        const subtopicIndex = subtopicArray.findIndex(
            (searchedSubtopic) =>
                searchedSubtopic.subtopicId === subtopic.subtopicId
        );
        // Make a copy of the subtopic array
        const newSubtopicArray = [...subtopicArray];
        // Update the changedField of the current subtopic in the copied array
        newSubtopicArray[subtopicIndex][changedField] = passedValue;
        // Update the state with the copied array
        setSubtopicArray(newSubtopicArray);
        return axios.post("/edit", {
            subtopicId: subtopic.subtopicId,
            changedField: changedField,
            change: passedValue,
        });
    }

    async function editBlurHandler(e) {
        setIsEditing(false);
        setSubtopicTitle(e.target.value);
        // Find the index of the current subtopic in the array
        const subtopicIndex = subtopicArray.findIndex(
            (searchedSubtopic) =>
                searchedSubtopic.subtopicId === subtopic.subtopicId
        );
        // Make a copy of the subtopic array
        const newSubtopicArray = [...subtopicArray];
        // Update the title of the current subtopic in the copied array
        newSubtopicArray[subtopicIndex].title = e.target.value;
        // Update the state with the copied array
        setSubtopicArray(newSubtopicArray);
        return await axios.patch("/edit-title", {
            subtopicId: subtopic.subtopicId,
            newTitle: e.target.value,
        });
    }

    // This is what renders if the card is open
    if (isOpen) {
        return (
            <div className="card w-70% bg-base-300 shadow-xl my-4">
                <div className="card-body items-center text-center">
                    {/* Flexbox containing title and open button */}
                    <div className="w-full flex justify-between">
                        <div className="w-24"></div>

                        {/* Ternary for isEditing */}
                        {isEditing ? (
                            <input
                                type="text"
                                defaultValue={subtopicTitle}
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                onBlur={(e) => editBlurHandler(e)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault(); // Prevents the addition of a new line in the input when pressing 'Enter'
                                        editBlurHandler(e);
                                    }
                                }}
                            />
                        ) : (
                            <h2 className="card-title">{subtopicTitle}</h2>
                        )}
                        <div className="flex justify-between">
                            <OptionsButton setIsEditing={setIsEditing} />
                            <ArrowButton
                                rotation={"-rotate-0"}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                            />
                        </div>
                    </div>

                    <div className="divider"></div>

                    <CardTopicDropdown
                        topicId={subtopic.topicId}
                        subtopicChange={subtopicChange}
                    />

                    {/* Code example and Notes Flex */}
                    <div className="w-full flex flex-col md:flex-row justify-around ">
                        <div className="flex-col w-full md:mx-2">
                            <label htmlFor="code">Code</label>
                            <textarea
                                id="code"
                                name="code"
                                className="w-full h-48 textarea textarea-bordered"
                                defaultValue={codeExample}
                                onChange={debounce((e) => {
                                    subtopicChange(e, "codeExample");
                                    setCodeExample(e.target.value);
                                }, 500)}
                            ></textarea>
                        </div>

                        <div className="flex-col w-full md:mx-2">
                            <label htmlFor="notes">Notes</label>
                            <textarea
                                id="notes"
                                name="notes"
                                className="w-full h-48 textarea textarea-bordered"
                                defaultValue={notes}
                                onChange={debounce((e) => {
                                    subtopicChange(e, "notes");
                                    setNotes(e.target.value);
                                }, 500)}
                            ></textarea>
                        </div>
                    </div>

                    <div className="divider"></div>

                    {/* Links Section */}
                    <h3>Links</h3>

                    {subtopic.urls.map(({ urlId, url, text }) => {
                        return (
                            <a
                                className="link link-primary"
                                href={url}
                                key={urlId}
                            >
                                {text}
                            </a>
                        );
                    })}

                    <AddButton />
                </div>
            </div>
        );
    }

    // This is what renders if the card is closed.
    else {
        return (
            <div className="card w-70% bg-base-300 shadow-xl my-4 ">
                <div className="card-body items-center text-center">
                    {/* Flexbox containing title and open button */}
                    <div className="w-full flex justify-between">
                        <div className="w-24"></div>
                        {/* Ternary for isEditing */}
                        {isEditing ? (
                            <input
                                type="text"
                                defaultValue={subtopicTitle}
                                placeholder="Type here"
                                className="input input-bordered w-full max-w-xs"
                                onBlur={(e) => editBlurHandler(e)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault(); // Prevents the addition of a new line in the input when pressing 'Enter'
                                        editBlurHandler(e);
                                    }
                                }}
                            />
                        ) : (
                            <h2 className="card-title">{subtopicTitle}</h2>
                        )}

                        <div className="flex justify-between">
                            <OptionsButton setIsEditing={setIsEditing} />
                            <ArrowButton
                                rotation={"-rotate-90"}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
