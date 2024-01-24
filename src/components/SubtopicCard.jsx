import AddButton from "./buttons/AddButton.jsx";
import ArrowButton from "./buttons/ArrowButton.jsx";
import CardTopicDropdown from "./topicDropdowns/CardTopicDropdown.jsx";
import { useState } from "react";
import axios from "axios";
import { debounce } from "lodash";

export default function SubtopicCard({ subtopic }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isAddingLink, setIsAddingLink] = useState(false);

    const [codeExample, setCodeExample] = useState(subtopic.codeExample);
    const [notes, setNotes] = useState(subtopic.notes);

    async function subtopicChange(e,changedField) {
        let passedValue = e.target.value
        
        if (changedField === "topicId") passedValue = parseInt(passedValue)
        return axios.post('/edit', {subtopicId : subtopic.subtopicId, changedField : changedField, change : passedValue})
    }


    // This is what renders if the card is open
    if (isOpen) {
        return (
            <div className="card w-70% bg-base-300 shadow-xl my-4">
                <div className="card-body items-center text-center">
                    {/* Flexbox containing title and open button */}
                    <div className="w-full flex justify-between">
                        <div className="w-12"></div>
                        <h2 className="card-title">{subtopic.title}</h2>
                        <ArrowButton
                            rotation={"-rotate-0"}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                    </div>

                    <div className="divider"></div>

                    <CardTopicDropdown topicId = {subtopic.topicId} subtopicChange = {subtopicChange}/>

                    {/* Code example and Notes Flex */}
                    <div className="w-full flex flex-col md:flex-row justify-around ">
                        <div className="flex-col w-full md:mx-2">
                            <label htmlFor="code">Code</label>
                            <textarea
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
                            <label htmlFor="code">Notes</label>
                            <textarea
                                name="code"
                                className="w-full h-48 textarea textarea-bordered"
                                defaultValue={notes}
                                onChange={debounce((e) => {
                                    subtopicChange(e, "codeExample");
                                    setNotes(e.target.value);
                                  }, 500)}
                            ></textarea>
                        </div>
                    </div>

                    <div className="divider"></div>

                    {/* Links Section */}
                    <h3>Links</h3>
                    
                    {subtopic.urls.map(({url, text}) => {
                        return <a className="link link-primary" href={url}>{text}</a>
  
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
                        <div className="w-12"></div>
                        <h2 className="card-title">{subtopic.title}</h2>
                        <ArrowButton
                            rotation={"-rotate-90"}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
