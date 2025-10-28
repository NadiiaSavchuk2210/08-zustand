'use client';

import { createPortal } from 'react-dom';
import css from './Modal.module.css'
import { useEffect } from 'react';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    useLockBodyScroll(isOpen);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [onClose])

    return createPortal(
        isOpen &&
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}>
            <div className={css.modal}>
                {children}
            </div>
        </div>,
        document.body
    );
}