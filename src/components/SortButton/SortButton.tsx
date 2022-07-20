import React, { FC } from 'react';
import cn from 'classnames';
import styles from './SortButton.module.css';

interface ISortButton {
    label: string;
    direction?: 'DESC' | 'ASC' | null;
    onClick: () => void;
}

const SortButton:FC<ISortButton> = ({ label, direction, onClick }) => (
    <button
        className={cn(styles.button, {
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
