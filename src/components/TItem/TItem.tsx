import React, { FC, memo } from 'react';
import prettyBytes from 'pretty-bytes';
import { motion } from 'framer-motion';
import cn from 'classnames';
import styles from './TItem.module.css';
import DownloadButton from '../DownloadButton/DownloadButton';

interface ITItem {
    id: string;
    title: string;
    seeds: number;
    category: string;
    size: number;
    delay: number;
    light?: boolean,
}

const TItem:FC<ITItem> = memo(({ id, title, seeds, category, size, delay, light = true }) => (
    <motion.div
        transition={{
            x: {
                duration: 0.4,
                ease: 'easeInOut',
            },
            y: {
                duration: 0.1,
                ease: 'easeInOut',
            },
            delay: delay / 12,
        }}
        initial={{
            x: '25rem',
        }}
        animate={{
            x: ['25rem', '0rem'],
            opacity: [0, 1],
        }}
    >
        <div className={cn(styles.wrapper, {
            [styles.wrapperDark]: !light,
        })}
        >
            <div>{title}</div>
            <div className={styles.category}>{category}</div>
            <div className={styles.center}>{prettyBytes(size)}</div>
            <div className={styles.center}>{seeds}</div>
            <DownloadButton id={id} title={title} />
        </div>
    </motion.div>
));

export default TItem;
