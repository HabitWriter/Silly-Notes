import AddButton from "./buttons/AddButton.jsx";
import ArrowButton from "./buttons/ArrowButton.jsx";
import OptionsButton from "./buttons/OptionsButton.jsx";
import CardTopicDropdown from "./topicDropdowns/CardTopicDropdown.jsx";
import { useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { useAtom } from "jotai";
import {
    subtopicArrayWriteableAtom,
    subtopicFilteredWriteableAtom,
} from "../atom.js";
import LinkSection from "./LinkSection.jsx";
import AddLink from "./AddLink.jsx";

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
    const [subtopicFiltered, setSubtopicFiltered] = useAtom(
        subtopicFilteredWriteableAtom
    );

    async function subtopicChange(
        e,
        changedField,
        urlField = null,
        urlId = null
    ) {
        let passedValue;
    // If e is a number, set passedValue to e
    if (typeof e === 'number') {
        passedValue = e;
    } else {
        passedValue = e.target.value;
        if (changedField === "topicId") passedValue = parseInt(passedValue);
    }

    // console.log("passed value: " + passedValue);
    // console.log("changed field: " + changedField);


        // Find the index of the current subtopic in the array
        const subtopicIndex = subtopicArray.findIndex(
            (searchedSubtopic) =>
                searchedSubtopic.subtopicId === subtopic.subtopicId
        );
        // Make a copy of the subtopic array
        const newSubtopicArray = [...subtopicArray];
        // Update the changedField of the current subtopic in the copied array
        if (urlField && urlId) {
            // Find the index of the URL with the matching urlId
            const id = parseInt(urlId)
            const urlIndex = newSubtopicArray[subtopicIndex][
                changedField
            ].findIndex((url) => url.urlId === id);
            // Update the URL field
                newSubtopicArray[subtopicIndex][changedField][urlIndex][urlField] = passedValue;
                setSubtopicArray(newSubtopicArray);
            
            return axios.post("/api/url/edit", {
                subtopicId: subtopic.subtopicId,
                changedField: changedField,
                urlId : urlId,
                urlField: urlField,
                change: passedValue,
            });
        } else {
            console.log(newSubtopicArray);
            newSubtopicArray[subtopicIndex][changedField] = passedValue;
            // Update the state with the copied array
            setSubtopicArray(newSubtopicArray);
            return axios.post("/edit", {
                subtopicId: subtopic.subtopicId,
                changedField: changedField,
                change: passedValue,
            });
        }
    }

    async function addUrlToSubtopic(newUrl) {
        // Find the index of the current subtopic in the array
        
        console.log(newUrl);

        const subtopicIndex = subtopicArray.findIndex(
            (searchedSubtopic) =>
                searchedSubtopic.subtopicId === subtopic.subtopicId
        );
    
        // Make a copy of the subtopic array
        const newSubtopicArray = [...subtopicArray];
    
        // Add the new URL to the urls field of the current subtopic
        newSubtopicArray[subtopicIndex].urls.push(newUrl);
    
        // Update the state with the copied array
        setSubtopicArray(newSubtopicArray);
    }

    async function removeUrlFromSubtopic(urlIdToRemove) {
        // Find the index of the current subtopic in the array
        const subtopicIndex = subtopicArray.findIndex(
            (searchedSubtopic) =>
                searchedSubtopic.subtopicId === subtopic.subtopicId
        );
    
        // Make a copy of the subtopic array
        const newSubtopicArray = [...subtopicArray];
    
        // Remove the URL with the given urlId from the urls field of the current subtopic
        newSubtopicArray[subtopicIndex].urls = newSubtopicArray[subtopicIndex].urls.filter(url => url.urlId !== urlIdToRemove);
    
        // Update the state with the copied array
        setSubtopicArray(newSubtopicArray);
    
        // Send a request to the server to remove the URL
        return axios.delete(`/api/url//delete/${urlIdToRemove}`);
    }

    async function editBlurHandler(e) {
        setIsEditing(false);
        setSubtopicTitle(e.target.value);
        // Find the index of the current subtopic in the array
        const subtopicIndex = subtopicArray.findIndex(
            (searchedSubtopic) =>
                searchedSubtopic.subtopicId === subtopic.subtopicId
        );

        console.log(subtopicIndex);
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

    async function deleteHandler() {

        if (confirm(`Are you sure you want to delete ${subtopic.title}`)) {
            // Filter out the subtopic with the matching subtopicId from both atoms
            let newSubtopicArray = subtopicArray;
            let newSubtopicFiltered = subtopicFiltered;

            // console.log(subtopic.subtopicId);

            newSubtopicArray = newSubtopicArray.filter(
                (allSubtopic) => allSubtopic.subtopicId !== subtopic.subtopicId
            );
            newSubtopicFiltered = newSubtopicFiltered.filter(
                (allSubtopic) => allSubtopic.subtopicId !== subtopic.subtopicId
            );

            // Update the atoms
            setSubtopicArray(newSubtopicArray);
            setSubtopicFiltered(newSubtopicFiltered);

            return await axios.delete(`/delete/${subtopic.subtopicId}`);
        }
    }

    return (
        <div className="card w-70% bg-base-300 shadow-xl my-4">
            <div className="card-body items-center text-center">
                {/* Flexbox containing title and open button */}
                <div className="w-full flex justify-between">
                    <div className="w-24"></div>

                    {/* Ternary for isEditing */}
                    {isEditing ? (
                        <input
                            autoFocus
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
                        <OptionsButton
                            setIsEditing={setIsEditing}
                            subtopicId={subtopic.subtopicId}
                            deleteHandler={deleteHandler}
                        />
                        <ArrowButton
                            rotation={() => {
                                if (isOpen) return "-rotate-90";
                                else return "-rotate-0";
                            }}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                    </div>
                </div>

                {/* This is what renders if the card is open */}
                {isOpen && (
                    <>
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
                                <div
                                    key={urlId}
                                    className="flex justify-center items-center"
                                >
                                    <LinkSection
                                        urlId={urlId}
                                        url={url}
                                        text={text}
                                        subtopicChange={subtopicChange}
                                        removeUrlFromSubtopic={removeUrlFromSubtopic}
                                    />
                                </div>
                            );
                        })}
                        {isAddingLink && <AddLink setIsAddingLink={setIsAddingLink} subtopicId = {subtopic.subtopicId} addUrlToSubtopic= {addUrlToSubtopic}/>}
                        <AddButton clickAction={() => setIsAddingLink(true)} title={"Add new link"}/>
                    </>
                )}
            </div>
        </div>
    );
}
