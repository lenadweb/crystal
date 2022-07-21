import React, { FC, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';
import { scrollToTop } from '../../utils';
import styles from './ButtonToTop.module.css';
import { useTheme } from '../../hooks/useTheme';
import ArrowIcon from '../../Icons/ArrowIcon';

const ButtonToTop:FC = () => {
    const [isVisible, setVisible] = useState(false);
    const { isLightTheme } = useTheme();

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
                        className={cn(styles.wrapper, {
                            [styles.wrapperLight]: isLightTheme,
                        })}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={scrollToTop}
                    >
                        <ArrowIcon fill={isLightTheme ? '#181818' : '#c4c4c4'} />
                    </motion.div>
                )
            }
        </AnimatePresence>
    );
};

export default ButtonToTop;
