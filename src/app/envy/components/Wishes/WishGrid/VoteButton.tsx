import { Button, Tooltip } from "@mui/material"
import { Iconify } from "src/components/iconify"

export const VoteButton = ({
    isVotedByUser,
    voteCount,
    onVote,
    onRemoveVote
}: {
    isVotedByUser: boolean,
    voteCount: number;
    onVote: () => void;
    onRemoveVote: () => void;
}) => {
    return (
        <Tooltip title={isVotedByUser ? "Enlever votre vote" : "Voter pour l'envie"} placement="top" arrow slotProps={{ tooltip: { sx: { fontSize: '1rem', padding: '8px 16px' } } }}>
            <Button
                variant={isVotedByUser ? 'contained' : 'outlined'}
                color='warning'
                sx={{
                    borderRadius: 999,
                    bgcolor: !isVotedByUser ? "background.paper" : undefined,
                    '&:hover': { bgcolor: !isVotedByUser ? "background.paper" : undefined, }
                }}
                endIcon={<Iconify icon="solar:alt-arrow-up-bold-duotone" />}
                onClick={isVotedByUser ? onRemoveVote : onVote}
            >
                {voteCount}
            </Button>
        </Tooltip>
    )
}