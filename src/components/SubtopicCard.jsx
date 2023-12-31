import AddButton from "./buttons/AddButton.jsx";
import ArrowButton from "./buttons/ArrowButton.jsx";
import TopicDropdown from "./topicDropdowns/HeaderTopicDropdown.jsx";
import { useState } from "react";

export default function SubtopicCard({subtopic}) {
    const [isOpen, setIsOpen] = useState(false);

    
    // This is what renders if the card is open
    if (isOpen) {
        return (
            <div className="card w-70% bg-base-300 shadow-xl my-4">
                <div className="card-body items-center text-center">
                    
                    {/* Flexbox containing title and open button */}
                    <div className="w-full flex justify-between">
                        <div className="w-12"></div>
                        <h2 className="card-title">{subtopic.title}</h2>
                        <ArrowButton rotation={"-rotate-0"} isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>

                    <div className="divider"></div>

                    <TopicDropdown />

                    {/* Code example and Notes Flex */}
                    <div className="w-full flex justify-around ">
                        <div className="flex-col w-full mx-2">
                            <label htmlFor="code">Code</label>
                            <textarea
                                name="code"
                                className="w-full h-48 textarea textarea-bordered"
                                defaultValue={subtopic.codeExample}
                            ></textarea>
                        </div>

                        <div className="flex-col w-full mx-2">
                            <label htmlFor="code">Notes</label>
                            <textarea
                                name="code"
                                className="w-full h-48 textarea textarea-bordered"
                                defaultValue={subtopic.notes}
                            ></textarea>
                        </div>
                    </div>

                    <div className="divider"></div>

                    {/* Links Section */}
                    <h3>Links</h3>
                    <a className="link link-primary">google.com</a>
                    <a className="link link-primary">example.com</a>
                    <a className="link link-primary">test.com</a>

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
                        <ArrowButton rotation={"-rotate-90"} isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>
                </div>
            </div>
        )}
    }
