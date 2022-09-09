import React from 'react';

function Spinner({ fill }: {fill: string}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 100 100"
        >
            <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke={fill}
                strokeDasharray="164.93361431346415 56.97787143782138"
                strokeWidth="10"
            >
                <animateTransform
                    attributeName="transform"
                    dur="0.47393364928909953s"
                    keyTimes="0;1"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 50 50;360 50 50"
                />
            </circle>
        </svg>
    );
}

export default Spinner;
