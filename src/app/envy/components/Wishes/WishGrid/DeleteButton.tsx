import { Fab, Tooltip } from "@mui/material";
import { Iconify } from "src/components/iconify";

export const DeleteButton = ({ onDelete }: { onDelete: () => void }) => {

    const handleDelete = () => {
        confirm("Voulez-vous vraiment supprimer cette envie ?") && onDelete();
    };

    return (
        <Tooltip title="Supprimer" placement="right" arrow
            slotProps={{ tooltip: { sx: { fontSize: '1rem', padding: '8px 16px' } } }}>
            <Fab
                color="default"
                size="medium"
                className="hided-button"
                onClick={handleDelete}
                sx={{
                    opacity: 0,
                    right: 16, top: 132, zIndex: 10,
                    position: 'absolute',
                }}
            >
                <Iconify icon="solar:trash-bin-trash-bold-duotone" width={24} />
            </Fab>
        </Tooltip>
    );
}