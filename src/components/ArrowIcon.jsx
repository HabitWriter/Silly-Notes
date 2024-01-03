import { atom, useAtom } from "jotai";

export const rotationAtom = atom(90)


export default function ArrowIcon() {

    const [rotation, setRotation] = useAtom(rotationAtom)


    function rotateArrow() {
        if (rotation === 0) {
            setRotation(90)
        } else {
            setRotation(0)
        }
    }


    return (
        <button title="Open/Close" className={"btn btn-square btn-ghost -rotate-90"}>
            
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="16"
                zoomAndPan="magnify"
                viewBox="0 0 375 374.999991"
                height="16"
                preserveAspectRatio="xMidYMid meet"
                version="1.0"
            >
                <path
                    strokeLinecap="round"
                    transform="matrix(-0.53033, 0.53033, -0.53033, -0.53033, 384.304402, 110.415682)"
                    fill="none"
                    strokeLinejoin="miter"
                    d="M 38.498698 38.501751 L 329.211674 38.498068 "
                    stroke="#737373"
                    strokeWidth="77"
                    strokeOpacity="1"
                    strokeMiterlimit="4"
                />
                <path
                    strokeLinecap="round"
                    transform="matrix(0.53033, 0.53033, -0.53033, 0.53033, 31.524271, 69.580272)"
                    fill="none"
                    strokeLinejoin="miter"
                    d="M 38.497683 38.499255 L 329.214342 38.499255 "
                    stroke="#737373"
                    strokeWidth="77"
                    strokeOpacity="1"
                    strokeMiterlimit="4"
                />
            </svg>
        </button>
    );
}
