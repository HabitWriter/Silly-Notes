import OptionsButton from "./buttons/OptionsButton";
import ConfirmButton from "./buttons/ConfirmButton";
import { useState } from "react";
import { debounce } from "lodash";

export default function LinkSection({
    urlId,
    url,
    text,
    subtopicChange,
    removeUrlFromSubtopic,
}) {
    const [isEditingLink, setIsEditingLink] = useState(false);
    const [shownUrl, setShownUrl] = useState(url);
    const [shownText, setShownText] = useState(text);

    return (
        <div
            key={urlId}
            className="flex justify-between items-center w-[300px] md:w-[500px]"
        >
            {isEditingLink ? (
                <div className="flex justify-center items-center mx-2">
                    <div className="flex flex-wrap justify-center items-center mx-2">
                    <div className="flex items-center my-1">
                        <label htmlFor={`url-${urlId}`} className="mx-2">
                            link:
                        </label>
                        <input
                            autoFocus
                            id={`url-${urlId}`}
                            type="text"
                            defaultValue={shownUrl}
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            onChange={debounce((e) => {
                                subtopicChange(e, "urls", "url", `${urlId}`);
                                setShownUrl(e.target.value);
                            }, 500)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault(); // Prevents the addition of a new line in the input when pressing 'Enter'
                                    setIsEditingLink(false);
                                }
                            }}
                        />
                    </div>
                    <div className="flex items-center my-1">
                        <label htmlFor={`url-text-${urlId}`} className="mx-2">
                            text:
                        </label>
                        <input
                            id={`url-text-${urlId}`}
                            type="text"
                            defaultValue={shownText}
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                            onChange={debounce((e) => {
                                subtopicChange(e, "urls", "text", `${urlId}`);
                                setShownText(e.target.value);
                            }, 500)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault(); // Prevents the addition of a new line in the input when pressing 'Enter'
                                    setIsEditingLink(false);
                                }
                            }}
                        />
                    </div>
                    </div>
                    <ConfirmButton
                        clickAction={() => setIsEditingLink(false)}
                    />
                </div>
            ) : (
                <a
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="link link-primary mx-2"
                    href={shownUrl}
                >
                    {shownText}
                </a>
            )}

            <OptionsButton
                setIsEditing={setIsEditingLink}
                deleteHandler={() => removeUrlFromSubtopic(urlId)}
            />
        </div>
    );
}
