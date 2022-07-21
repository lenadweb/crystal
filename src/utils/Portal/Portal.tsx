import { FC, ReactElement } from 'react';
import ReactDOM from 'react-dom';

interface IPortal {
    children: ReactElement;
}

const Portal:FC<IPortal> = ({ children }) => ReactDOM.createPortal(
    children,
    document.body,
);

export default Portal;
