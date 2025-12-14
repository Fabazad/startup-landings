'use client';

import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

// ----------------------------------------------------------------------

/**
 * Client-side wrapper for scroll-based UI elements
 * Handles scroll progress bar and back-to-top button
 */
export function LandingScrollUI() {
    const pageProgress = useScrollProgress();

    return (
        <>
            <ScrollProgress
                variant="linear"
                progress={pageProgress.scrollYProgress}
                sx={{ position: 'fixed' }}
            />
            <BackToTop />
        </>
    );
}
