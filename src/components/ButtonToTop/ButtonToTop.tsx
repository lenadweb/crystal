import React, { FC, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { scrollToTop } from '../../utils';
import styles from './ButtonToTop.module.css';

const ButtonToTop:FC = () => {
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        const onScrollHandler = (e: any) => {
            setVisible(window.scrollY > 100);
        };
        document.addEventListener('scroll', onScrollHandler);
        return () => {
            document.removeEventListener('scroll', onScrollHandler);
        };
    }, []);

    return (
        <AnimatePresence>
            {
                isVisible && (
                    <motion.div
                        className={styles.wrapper}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={scrollToTop}
                    />
                )
            }
        </AnimatePresence>
    );
};

export default ButtonToTop;
