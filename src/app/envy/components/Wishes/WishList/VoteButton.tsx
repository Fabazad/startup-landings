import { Button } from "@mui/material"
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
    return (
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
    )
}