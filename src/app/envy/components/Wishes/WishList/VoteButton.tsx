import { Button, Tooltip, Box } from "@mui/material"
import { Iconify } from "src/components/iconify"

export const VoteButton = ({
    isVotedByUser,
    voteCount,
    onVote,
    onRemoveVote,
    disabled
}: {
    isVotedByUser: boolean,
    voteCount: number;
    onVote: () => void;
    onRemoveVote: () => void;
    disabled: boolean;
}) => {
    const title = disabled ? "Vous devez être connecté pour voter" : isVotedByUser ? "Enlever votre vote" : "Voter pour l'envie";

    return (
        <Tooltip title={title} placement="top" arrow slotProps={{ tooltip: { sx: { fontSize: '1rem', padding: '8px 16px' } } }}>
            <Box component="span">
                <Button
                    variant={isVotedByUser ? 'contained' : 'outlined'}
                    color='warning'
                    sx={{
                        borderRadius: 999,
                        minWidth: 0,
                        py: 0.5,
                        px: 1,
                        bgcolor: !isVotedByUser ? "background.paper" : undefined,
                        '&:hover': { bgcolor: !isVotedByUser ? "background.paper" : undefined, }
                    }}
                    endIcon={<Iconify icon="solar:alt-arrow-up-bold-duotone" />}
                    onClick={isVotedByUser ? onRemoveVote : onVote}
                    disabled={disabled}
                >
                    {voteCount}
                </Button>
            </Box>
        </Tooltip>
    )
}