'use client';

import { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { AddModal } from '.';

// ----------------------------------------------------------------------

type AddModalContextType = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

const AddModalContext = createContext<AddModalContextType | undefined>(undefined);

// ----------------------------------------------------------------------

export const AddModalProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Check if modal param is in URL
    const modalParam = searchParams.get('modal');
    const isOpen = modalParam === 'add-modal';

    const setIsOpen = useCallback((open: boolean) => {
        const params = new URLSearchParams(searchParams.toString());

        if (open) {
            params.set('modal', 'add-modal');
        } else {
            params.delete('modal');
        }

        const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
        router.push(newUrl, { scroll: false });
    }, [pathname, router, searchParams]);

    return (
        <AddModalContext.Provider value={{ isOpen, setIsOpen }}>
            <AddModal open={isOpen} onClose={() => setIsOpen(false)} />
            {children}
        </AddModalContext.Provider>
    );
}

// ----------------------------------------------------------------------

export function useAddModal() {
    const context = useContext(AddModalContext);

    if (context === undefined) {
        throw new Error('useAddModal must be used within AddModalProvider');
    }

    return context;
}
