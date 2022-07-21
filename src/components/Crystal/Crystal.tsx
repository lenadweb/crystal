import {
    motion,
} from 'framer-motion';
import { useContext, useRef } from 'react';
import styles from './Crystal.module.css';
import { RootContext } from '../../../pages';

const Crystal = () => {
    const container = useRef(null);
    const { isLoading } = useContext(RootContext);
    console.log(isLoading);
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
                        }}
                        transition={{
                            duration: 0.2,
                            ease: 'easeInOut',
                        }}
                        animate={{
                            opacity: [0, 1],
                            y: ['-10rem', '0rem'],
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
                            <div className={styles.crystalImage} />
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
};

export default Crystal;
