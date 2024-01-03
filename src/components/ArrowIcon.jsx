import { useState } from "react";
import { atom, useAtom } from "jotai";

export default function ArrowIcon() {
    const rotationAtom = atom(0)
    const [rotation, setRotation] = useAtom(rotationAtom)
    

    function rotateArrow() {
        rotation === 0 ? setRotation(90): setRotation(0)
    }



    return (
        <button title="Open/Close" className={"btn btn-square btn-ghost -rotate-" + rotation} onClick={rotateArrow}>
            
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16"
                zoomAndPan="magnify"
                viewBox="0 0 375 374.999991"
                height="16"
                preserveAspectRatio="xMidYMid meet"
                version="1.0"
            >
                <path
                    stroke-linecap="round"
                    transform="matrix(-0.53033, 0.53033, -0.53033, -0.53033, 384.304402, 110.415682)"
                    fill="none"
                    stroke-linejoin="miter"
                    d="M 38.498698 38.501751 L 329.211674 38.498068 "
                    stroke="#737373"
                    stroke-width="77"
                    stroke-opacity="1"
                    stroke-miterlimit="4"
                />
                <path
                    stroke-linecap="round"
                    transform="matrix(0.53033, 0.53033, -0.53033, 0.53033, 31.524271, 69.580272)"
                    fill="none"
                    stroke-linejoin="miter"
                    d="M 38.497683 38.499255 L 329.214342 38.499255 "
                    stroke="#737373"
                    stroke-width="77"
                    stroke-opacity="1"
                    stroke-miterlimit="4"
                />
            </svg>
        </button>
    );
}
