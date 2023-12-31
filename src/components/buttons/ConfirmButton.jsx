export default function ConfirmButton({clickAction}) {
    return (
        <button title="Confirm" className="btn btn-square btn-ghost" onClick={clickAction}>
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
                <defs>
                    <clipPath id="fb17c8df98">
                        <path
                            d="M 0 10.78125 L 374.980469 10.78125 L 374.980469 364.03125 L 0 364.03125 Z M 0 10.78125 "
                            clipRule="nonzero"
                        />
                    </clipPath>
                </defs>
                <g clipPath="url(#fb17c8df98)">
                    <path
                        fill="#737373"
                        d="M 371.054688 11.136719 C 317.90625 40.136719 207.964844 130.414062 120.257812 274.015625 C 117.40625 278.683594 111.3125 280.171875 106.628906 277.335938 L 106.589844 277.308594 C 104.171875 275.824219 101.804688 274.273438 99.488281 272.632812 C 70.902344 252.457031 8.394531 216.957031 8.394531 216.957031 C 4.484375 214.761719 0.445312 217.703125 0.0898438 221.320312 C -0.03125 221.558594 -0.0273438 221.945312 0.0976562 222.46875 C 0.199219 223.273438 0.492188 224.085938 1.011719 224.863281 C 6.234375 236.054688 31.089844 270.085938 54.59375 301.765625 C 80.875 337.199219 104.136719 357.335938 107.875 360.480469 C 108.011719 360.601562 108.152344 360.71875 108.300781 360.832031 C 108.367188 360.890625 108.410156 360.925781 108.410156 360.925781 L 108.410156 360.921875 C 115.488281 366.597656 126.425781 364.84375 131.109375 356.445312 C 166.820312 292.429688 282.410156 92.425781 374.011719 15.460938 C 376.453125 13.410156 373.855469 9.609375 371.054688 11.136719 "
                        fillOpacity="1"
                        fillRule="nonzero"
                    />
                </g>
            </svg>
        </button>
    );
}
