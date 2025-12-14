"use client";

import { Box } from "@mui/material"
import { m } from "framer-motion";
import { useTheme } from "@mui/material/styles";

export const RotatingBackground = () => {
    const theme = useTheme();
    return (
        <Box
            component={m.span}
            animate={{ rotate: 360 }}
            transition={{
                duration: 8,
                ease: 'linear',
                repeat: Infinity,
            }}
            sx={{
                top: 0,
                left: 0,
                width: 1,
                height: 1,
                position: 'absolute',
                borderRadius: 'inherit',
                background: `conic-gradient(${theme.vars.palette.primary.main}, ${theme.vars.palette.warning.main}, ${theme.vars.palette.primary.main})`,
                mask: 'linear-gradient(#FFF 0 0) content-box, linear-gradient(#FFF 0 0)',
                WebkitMask: 'linear-gradient(#FFF 0 0) content-box, linear-gradient(#FFF 0 0)',
                maskComposite: 'exclude',
                WebkitMaskComposite: 'xor',
                p: `2px`,
            }}
        />
    )
}