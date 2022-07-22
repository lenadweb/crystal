import {
    motion,
} from 'framer-motion';
import { FC, memo, useRef } from 'react';
import styles from './Crystal.module.css';
import CrystalIcon from '../../Icons/CrystalIcon';

interface ICrystal {
    isLoading: boolean,
    hasError: boolean,
}

const Crystal:FC<ICrystal> = memo(({ isLoading, hasError }) => {
    const container = useRef(null);
    return (
        <div ref={container} className={styles.wrapper}>
            <motion.div
                transition={isLoading ? {
                    duration: 0.25,
                    yoyo: Infinity,
                    ease: 'easeInOut',
                } : undefined}
                initial={{
                    y: '30px',
                }}
                animate={isLoading ? {
                    y: ['30px', '0px'],
                } : undefined}
            >
                <div>
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: '-10rem',
                        }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeInOut',
                        }}
                        animate={{
                            y: ['-10rem', '0rem'],
                            opacity: [0, 1],
                        }}
                    >
                        <motion.div
                            className={styles.crystal}
                            drag={!isLoading}
                            dragPropagation
                            dragElastic={1}
                            whileDrag={{ scale: 1.2 }}
                            // dragSnapToOrigin
                            dragConstraints={container}
                        >
                            <div className={styles.crystalImage}>
                                <CrystalIcon isRed={hasError} />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
            <motion.div
                className={styles.title}
                drag={!isLoading}
                dragPropagation
                dragElastic={1}
                whileDrag={{ scale: 1.2 }}
                // dragSnapToOrigin
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: [0, 1],
                }}
                dragConstraints={container}
            >
                <div>
                    crystal
                </div>
            </motion.div>
        </div>
    );
});

export default Crystal;
