'use client';

import { createContext, useContext, useCallback, useMemo, useRef, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Dialog } from '@mui/material';

// ----------------------------------------------------------------------

type ModalRegistration = {
    modalContent: React.ReactNode;
    modalName: string;
};

type UseModalContextType = {
    openModal: (modalName: string) => void;
    closeModal: () => void;
    registerModal: (registration: ModalRegistration) => void;
    currentModalName: string | null;
};

const useModalContext = createContext<UseModalContextType | undefined>(undefined);

// ----------------------------------------------------------------------

export const UseModalProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Store registered modals using ref to avoid state updates during render
    const modalsRef = useRef<Map<string, React.ReactNode>>(new Map());

    // Check which modal should be open from URL
    const currentModalName = searchParams.get('modal');

    const openModal = useCallback((modalName: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('modal', modalName);
        const newUrl = `${pathname}?${params.toString()}`;
        router.push(newUrl, { scroll: false });
    }, [pathname, router, searchParams]);

    const closeModal = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('modal');
        const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
        router.push(newUrl, { scroll: false });
    }, [pathname, router, searchParams]);

    const registerModal = useCallback(({ modalContent, modalName }: ModalRegistration) => {
        modalsRef.current.set(modalName, modalContent);
    }, []);

    const currentModalContent = currentModalName ? modalsRef.current.get(currentModalName) : null;

    const contextValue = useMemo(() => ({
        openModal,
        closeModal,
        registerModal,
        currentModalName,
    }), [openModal, closeModal, registerModal, currentModalName]);

    return (
        <useModalContext.Provider value={contextValue}>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={!!currentModalName && !!currentModalContent}
                onClose={closeModal}
            >
                {currentModalContent}
            </Dialog>
            {children}
        </useModalContext.Provider>
    );
}

// ----------------------------------------------------------------------

export function useModal({ modalContent, modalName }: { modalContent: React.ReactNode; modalName: string }) {
    const context = useContext(useModalContext);

    if (context === undefined) {
        throw new Error('useModal must be used within UseModalProvider');
    }

    const { registerModal, openModal, closeModal, currentModalName } = context;

    // Register this modal when the component mounts
    useEffect(() => {
        registerModal({ modalContent, modalName });
    }, [registerModal, modalContent, modalName]);

    const isOpen = currentModalName === modalName;

    return {
        isOpen,
        open: () => openModal(modalName),
        close: closeModal,
    };
}