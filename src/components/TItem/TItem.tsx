import React, { FC } from 'react';
import prettyBytes from 'pretty-bytes';
import { motion } from 'framer-motion';
import cn from 'classnames';
import { TorrentItem } from '../../types/api';
import styles from './TItem.module.css';

interface ITItem {
    item: TorrentItem;
    delay: number;
    light?: boolean,
}

const TItem:FC<ITItem> = ({ item, delay, light = true }) => (
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
            <div>{item.title}</div>
            <div>{item.category}</div>
            <div className={styles.center}>{prettyBytes(item.size)}</div>
            <div className={styles.center}>{item.seeds}</div>
            <div className={styles.center}>c</div>
        </div>
    </motion.div>
);

export default TItem;
