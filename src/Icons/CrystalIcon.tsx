import React from 'react';

function CrystalIcon({ isRed = false }: {isRed?: boolean}) {
    const fill = isRed
        ? ['#cf0001', '#f5292a', '#b10102', '#900001', '#fa5051', '#7c0000']
        : ['#00c3ff', '#87daff', '#00aaf0', '#a5e9ff', '#87daff', '#0096dc'];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 512 512"
            viewBox="0 0 512 512"
        >
            <path
                xmlns="http://www.w3.org/2000/svg"
                fill={fill[0]}
                d="M406.069 52.966L105.931 52.966 0 158.897 256 459.034 512 158.897z"
            />
            <path
                xmlns="http://www.w3.org/2000/svg"
                fill={fill[1]}
                d="M406.069 52.966L256 459.034 512 158.897z"
            />
            <path
                xmlns="http://www.w3.org/2000/svg"
                fill={fill[2]}
                d="M105.931 52.966L145.084 158.897 0 158.897z"
            />
            <path
                xmlns="http://www.w3.org/2000/svg"
                fill={fill[3]}
                d="M256 52.966L145.084 158.897 366.916 158.897z"
            />
            <path
                xmlns="http://www.w3.org/2000/svg"
                fill={fill[4]}
                d="M366.916 158.897L512 158.897 406.069 52.966z"
                data-original="#a5e9ff"
            />
            <path
                xmlns="http://www.w3.org/2000/svg"
                fill={fill[5]}
                d="M0 158.897L145.084 158.897 256 459.034z"
            />
        </svg>

    );
}

export default CrystalIcon;
