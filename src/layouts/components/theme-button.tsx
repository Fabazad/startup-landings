'use client';

import { useColorScheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Iconify } from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';


export const ThemeButton = () => {

    const { mode, setMode, systemMode } = useColorScheme();
    const { onUpdateField, colorScheme } = useSettingsContext();


    const handleToggleTheme = () => {
        const newMode =
            mode === 'dark' || (mode === 'system' && systemMode === 'dark') ? 'light' : 'dark';
        onUpdateField('colorScheme', newMode);
        setMode(newMode);
    };

    return (
        <IconButton aria-label="toggle theme" onClick={handleToggleTheme}>
            <Iconify
                icon={
                    mode === 'dark' || (mode === 'system' && systemMode === 'dark')
                        ? 'solar:sun-bold-duotone'
                        : 'solar:moon-bold-duotone'
                }
            />
        </IconButton>
    )
}