import { Box } from "@mui/material"
import { Iconify } from "src/components/iconify"

export const WishListLabel = ({ name }: { name: string }) => {
    return (
        <Box sx={{
            cursor: "unset",
            maxWidth: { xs: "90%", sm: "80%" },
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            height: 24,
            px: 0.75,
            borderRadius: 0.75,
            fontSize: (theme) => theme.typography.pxToRem(12),
            fontWeight: (theme) => theme.typography.fontWeightBold,
            color: (theme) => theme.palette.secondary.dark,
            backgroundColor: (theme) => `${theme.palette.secondary.main}29`,
            flexShrink: 1,
            minWidth: 0,
        }}>
            <Iconify icon="icon-park-outline:link" sx={{ flexShrink: 0, width: 16, height: 16 }} />
            <Box component="span" sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                minWidth: 0,
            }}>
                {name}
            </Box>
        </Box>
    )
}