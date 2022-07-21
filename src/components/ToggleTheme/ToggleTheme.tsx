import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';
import { useTheme } from '../../hooks/useTheme';
import homeStyles from '../../../styles/Home.module.css';

import styles from './ToggleTheme.module.css';
import MoonIcon from '../../Icons/MoonIcon';
import SunIcon from '../../Icons/SunIcon';

const ToggleTheme = () => {
    const { isLightTheme, toggleTheme } = useTheme();

    useEffect(() => {
        if (isLightTheme) document.body.classList.add(homeStyles.bodyLight);
        else document.body.classList.add(homeStyles.bodyDark);

        return () => {
            if (isLightTheme) document.body.classList.remove(homeStyles.bodyLight);
            else document.body.classList.remove(homeStyles.bodyDark);
        };
    }, [isLightTheme]);

    return (
        <div className={styles.wrapper}>
            <button
                className={cn(styles.button, {
                    [styles.buttonDark]: !isLightTheme,
                })}
                type="button"
                onClick={toggleTheme}
            >
                <AnimatePresence exitBeforeEnter>
                    <motion.div
                        className={styles.icon}
                        key={isLightTheme ? 'moon' : 'sun'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.2,
                        }}
                    >
                        {isLightTheme ? <MoonIcon /> : <SunIcon />}
                    </motion.div>
                </AnimatePresence>
            </button>
        </div>
    );
};

export default ToggleTheme;
