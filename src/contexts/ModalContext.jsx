import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';


const ModalContext = createContext();

export const useModal = () => {
    return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const showModal = (content) => {
        setModalContent(content);
        setIsOpen(true);
    };

    const closeModal = () => {
      setModalContent(null);
      setIsOpen(false);
    };


    return (
        <ModalContext.Provider value={{ showModal, closeModal, isOpen }}>
            {children}
            { isOpen === true && modalContent !== null && modalContent}
        </ModalContext.Provider>
    );
};

ModalProvider.propTypes = {
    children: PropTypes.node.isRequired,
}