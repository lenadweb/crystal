import React, { FC, memo, MouseEventHandler, useState } from 'react';
import styles from './DownloadButton.module.css';
import TApi from '../../api/api';
import { useTheme } from '../../hooks/useTheme';
import DownloadIcon from '../../Icons/DownloadIcon';
import Spinner from '../../Icons/Spinner';

interface IDownloadingButton {
    id: string;
    title: string;
}

const DownloadButton:FC<IDownloadingButton> = memo(({ id, title }) => {
    const [isDownloading, setDownloading] = useState(false);
    const { isLightTheme } = useTheme();
    const iconFill = isLightTheme ? '#777777' : '#ececec';

    const download = async () => {
        setDownloading(true);
        await TApi.download(id, title);
        setDownloading(false);
    };

    const onClickHandler:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        download();
    };

    return (
        <button type="button" className={styles.btn} onClick={onClickHandler}>
            <div className={styles.btnIcon}>
                {
                    isDownloading ? <Spinner fill={iconFill} /> : <DownloadIcon fill={iconFill} />
                }
            </div>
        </button>
    );
});

export default DownloadButton;
