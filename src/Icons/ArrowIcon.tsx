import React from 'react';

function ArrowIcon({ fill }: {fill: string}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 512 512"
            viewBox="0 0 240.835 240.835"
        >
            <g xmlns="http://www.w3.org/2000/svg">
                <path
                    fill={fill}
                    d="M129.007 57.819c-4.68-4.68-12.499-4.68-17.191 0L3.555 165.803c-4.74 4.74-4.74 12.427 0 17.155 4.74 4.74 12.439 4.74 17.179 0l99.683-99.406 99.671 99.418c4.752 4.74 12.439 4.74 17.191 0 4.74-4.74 4.74-12.427 0-17.155L129.007 57.819z"
                    data-original="#000000"
                />
            </g>
        </svg>
    );
}

export default ArrowIcon;
