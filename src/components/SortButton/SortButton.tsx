import React, { FC } from 'react';
import cn from 'classnames';
import styles from './SortButton.module.css';

interface ISortButton {
    label: string;
    direction?: 'DESC' | 'ASC' | null;
    onClick: () => void;
    className?: string;
}

const SortButton:FC<ISortButton> = ({ label, direction, onClick, className = null }) => (
    <button
        className={cn(styles.button, className, {
            [styles.buttonDesc]: direction === 'DESC',
            [styles.buttonAsc]: direction === 'ASC',
        })}
        type="button"
        onClick={onClick}
    >
        {label}
    </button>
);

export default SortButton;
