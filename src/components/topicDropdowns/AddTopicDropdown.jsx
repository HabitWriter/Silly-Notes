import { useState } from "react";
import AddButton from "../buttons/AddButton";

export default function AddTopicDropdown() {
    const [selected, setSelected] = useState("Choose Topic");
    const [buttonColor, setButtonColor] = useState("btn btn-warning")
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
                    
                    {/* The Select Box */}
                    <select
                        className="select select-ghost w-full max-w-xs"
                        autoFocus
                        defaultValue={"Topics"}
                        onChange={(e) => {setSelected(e.target.value); setButtonColor("btn");}}
                    >
                        {/* Get values from server in the future */}
                        {/* <option disabled selected>Topics</option> */}
                        <option>HTML</option>
                        <option>JS</option>
                        <option>CSS</option>
                        
                    </select>
                    <AddButton />
                </div>
            </div>
        </div>
    );
}
