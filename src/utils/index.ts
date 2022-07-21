export const scrollToTop = () => {
    window.scrollTo(0, 0);
};

export const downloadFile = (urlDownload: string, filename = 'file'): void => {
    const link = document.createElement('a');
    link.href = urlDownload;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
};
