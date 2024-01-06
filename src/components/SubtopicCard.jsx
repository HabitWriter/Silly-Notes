import AddButton from "./buttons/AddButton.jsx";
import ArrowIcon from "./buttons/ArrowIcon.jsx";
import TopicDropdown from "./TopicDropdown.jsx";
import { useState } from "react";

export default function SubtopicCard() {
    const [isOpen, setIsOpen] = useState(true);

    if (isOpen) {
        return (
            <div className="card w-70% bg-base-300 shadow-xl my-4">
                <div className="card-body items-center text-center">
                    
                    {/* Flexbox containing title and open button */}
                    <div className="w-full flex justify-between">
                        <div className="w-12"></div>
                        <h2 className="card-title">Div</h2>
                        <ArrowIcon rotation={"-rotate-0"} isOpen={isOpen} setIsOpen={setIsOpen} />
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
                            ></textarea>
                        </div>

                        <div className="flex-col w-full mx-2">
                            <label htmlFor="code">Notes</label>
                            <textarea
                                name="code"
                                className="w-full h-48 textarea textarea-bordered"
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
    } else { 
        return (
            
            <div className="card w-70% bg-base-300 shadow-xl my-4 ">
                <div className="card-body items-center text-center">
                    
                    {/* Flexbox containing title and open button */}
                    <div className="w-full flex justify-between">
                        <div className="w-12"></div>
                        <h2 className="card-title">Div</h2>
                        <ArrowIcon rotation={"-rotate-90"} isOpen={isOpen} setIsOpen={setIsOpen} />
                    </div>
                </div>
            </div>
        )}
    }
