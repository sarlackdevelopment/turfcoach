import React, { FC } from 'react';
import { MdClose } from 'react-icons/md';
import './styles.scss';

interface IProps {
    children: React.ReactNode;
    show: boolean;
    onClose: () => void;
}

const Modal: FC<IProps> = ({ children, show, onClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button className="modal-close-button" onClick={ onClose }>
                    <MdClose />
                </button>
                { children }
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={ onClose }>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
