import type { StackProps } from '@mui/material/Stack';

import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
// ----------------------------------------------------------------------

type PostItemSkeletonProps = StackProps & {
    variant?: 'vertical' | 'horizontal';
};

export const WishListItemSkeleton = ({
    sx,
    ...other
}: PostItemSkeletonProps) => {

    return (
        <Stack
            sx={{
                borderRadius: 2,
                bgcolor: 'background.paper',
                border: (theme) => `solid 1px ${theme.vars.palette.divider}`,
                ...sx,
            }}
            {...other}
        >
            <Stack sx={{ p: 1 }}>
                <Skeleton sx={{ pt: '100%' }} />
            </Stack>

            <Stack spacing={2} direction="row" alignItems="center" sx={{ p: 3, pt: 1, pb: 3 }}>
                <Skeleton variant="circular" sx={{ width: 40, height: 40, flexShrink: 0 }} />
                <Stack flexGrow={1} spacing={1}>
                    <Skeleton sx={{ height: 10 }} />
                    <Skeleton sx={{ width: 0.5, height: 10 }} />
                </Stack>
            </Stack>
        </Stack>
    );
}