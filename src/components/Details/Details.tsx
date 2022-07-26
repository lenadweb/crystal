import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './Details.module.css';
import { useDescription } from '../../hooks/useDescription';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import Spinner from '../../Icons/Spinner';
import CloseIcon from '../../Icons/CloseIcon';
import Accordion from '../Accordion/Accordion';

interface IDetails {
    id: string | null;
    isLightTheme: boolean;
    setSelectItemId: (id: string | null) => void;
}

const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const Details:FC<IDetails> = memo(({ id, isLightTheme, setSelectItemId }) => {
    const { isLoading, isComplete, data } = useDescription(id);
    const [isExpanded, setExpanded] = useState(false);
    const ref = useRef(null);

    const toggleExpanded = useMemo(() => ({
        on: () => setExpanded(true),
        off: () => {
            setExpanded(false);
            setSelectItemId(null);
        },
    }), [setExpanded, id]);

    useOutsideClick(ref, toggleExpanded.off);

    useEffect(() => {
        if (id) setExpanded(true);
    }, [id]);

    return (
        <AnimatePresence initial={false}>
            {
                isExpanded && (
                    <motion.div
                        className={styles.wrapper}
                        layout
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <motion.div
                            className={cn(styles.container, {
                                [styles.containerLight]: isLightTheme,
                            })}
                            initial={{ opacity: 0, y: '-7rem', scale: 0.92 }}
                            animate={{ opacity: 1, y: '0rem', scale: 1 }}
                            exit={{ opacity: 0, y: '7rem', scale: 0.92 }}
                            transition={{ duration: 0.3 }}
                            ref={ref}
                        >
                            <div className={cn(styles.scroll, {
                                [styles.scrollLoading]: isLoading,
                            })}
                            >
                                {
                                    isLoading ? (
                                        <div className={styles.spinner}>
                                            <Spinner fill={isLightTheme ? '#b0b0b0' : '#ececec'} />
                                        </div>
                                    ) : (
                                        <motion.div
                                            className={styles.description}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0, 1] }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            {
                                                !!data?.description?.length && (
                                                    <div dangerouslySetInnerHTML={{
                                                        __html: data?.description,
                                                    }}
                                                    />
                                                )
                                            }
                                            {
                                                data?.collapses?.map((item: any, index: number) => <Accordion key={index} header={item.header} content={item.content} />)
                                            }
                                        </motion.div>
                                    )
                                }
                            </div>
                            <button className={styles.close} type="button" onClick={toggleExpanded.off}>
                                <CloseIcon fill="#b0b0b0" />
                            </button>
                        </motion.div>
                    </motion.div>
                )
            }
        </AnimatePresence>

    );
});

export default Details;
