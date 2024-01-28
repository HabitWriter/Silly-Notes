import OptionsButton from "./buttons/OptionsButton";
import ConfirmButton from "./buttons/ConfirmButton";
import XButton from "./buttons/XButton";
import { useState } from "react";
import { debounce } from "lodash";
import axios from "axios";

export default function AddLink({
    addUrlToSubtopic,
    setIsAddingLink,
    subtopicId
}) {
    const [inputUrl, setInputUrl] = useState("");
    const [inputText, setInputText] = useState("");

    async function addNewUrl(url, text, subtopicId) {
        if (url && text) {
            console.log(subtopicId);
            return axios.post("/api/url/new", { url: url, text: text, subtopicId: subtopicId });
        }
    }

    return (
        <div key={0} className="flex items-center w-[300px] sm:w-[460px] md:w-[652px]">

            <div className="flex items-center w-full justify-between">
                <div className="flex justify-center items-center">
                <div className="flex flex-wrap justify-center items-center">
                <div className="flex items-center my-1">
                    <label htmlFor={`add-url`} className="mx-2">
                        link:
                    </label>
                    <input
                        autoFocus
                        id={`add-url`}
                        type="text"
                        placeholder="Add url"
                        className="input input-bordered w-full max-w-xs"
                        onChange={debounce((e) => {
                            setInputUrl(e.target.value);
                        }, 500)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault(); // Prevents the addition of a new line in the input when pressing 'Enter'
                                // setIsAddingLink(false);
                            }
                        }}
                    />
                </div>
                <div className="flex items-center my-1">
                <label htmlFor={`add-url-text`} className="mx-2">
                    text:
                </label>
                <input
                    id={`add-url-text`}
                    type="text"
                    placeholder="Add text"
                    className="input input-bordered w-full max-w-xs"
                    onChange={debounce((e) => {
                        setInputText(e.target.value);
                    }, 500)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault(); // Prevents the addition of a new line in the input when pressing 'Enter'
                            // setIsAddingLink(false);
                        }
                    }}
                />
                </div>
                </div>
                <ConfirmButton clickAction={async () => 
                    {
                        const newUrl = await addNewUrl(inputUrl,inputText,subtopicId)
                        addUrlToSubtopic(newUrl.data)
                        setIsAddingLink(false)
                    }} />
                    </div>
                <XButton
                            clickAction={() => setIsAddingLink(false)}
                            title={"Exit adding link"}
                        />
            </div>
        </div>
    );
}
