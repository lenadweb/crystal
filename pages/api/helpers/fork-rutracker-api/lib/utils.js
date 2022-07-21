import windows1251 from 'windows-1251';

export const decodeWindows1251 = (string) => windows1251.decode(string.toString('binary'), { mode: 'html' });

export const formatSize = (sizeInBytes) => {
    const sizeInMegabytes = sizeInBytes / (1000 * 1000 * 1000);
    return `${sizeInMegabytes.toFixed(2)} GB`;
};
