import React, { FC, memo, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';
import { scrollToTop } from '../../utils';
import styles from './ButtonToTop.module.css';
import ArrowIcon from '../../Icons/ArrowIcon';

interface IButtonToTop {
    isLightTheme: boolean;
}

const ButtonToTop:FC<IButtonToTop> = memo(({ isLightTheme }) => {
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
});

export default ButtonToTop;
