export default function EditButton({ clickAction, title }) {
    // TODO Need to change functioning, title, and links based on props

    return (
        <div
            title={title}
            className="btn btn-square btn-ghost"
            onClick={clickAction}
        >
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
                    fill="#737373"
                    d="M 314.875 346.363281 L 28.625 346.363281 L 28.625 60.113281 L 200.375 60.113281 L 200.375 31.488281 L 28.625 31.488281 C 12.824219 31.488281 0 44.3125 0 60.113281 L 0 346.363281 C 0 362.164062 12.824219 374.988281 28.625 374.988281 L 314.875 374.988281 C 330.675781 374.988281 343.5 362.164062 343.5 346.363281 L 343.5 174.613281 L 314.875 174.613281 Z M 314.875 346.363281 "
                    fillOpacity="1"
                    fillRule="nonzero"
                />
                <path
                    fill="#737373"
                    d="M 114.5 260.945312 L 174.757812 260.945312 L 320.800781 114.902344 L 260.085938 54.1875 L 114.5 199.773438 Z M 114.5 260.945312 "
                    fillOpacity="1"
                    fillRule="nonzero"
                />
                <path
                    fill="#737373"
                    d="M 363.738281 31.488281 L 343.5 11.25 C 332.308594 0.0585938 314.1875 0.0585938 303.023438 11.25 L 280.324219 33.949219 L 341.039062 94.664062 L 363.738281 71.964844 C 374.929688 60.769531 374.929688 42.652344 363.738281 31.488281 Z M 363.738281 31.488281 "
                    fillOpacity="1"
                    fillRule="nonzero"
                />
            </svg>
        </div>
    );
}
