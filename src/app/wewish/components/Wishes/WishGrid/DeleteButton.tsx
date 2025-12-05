import { Fab, Tooltip } from "@mui/material";
import { Iconify } from "src/components/iconify";

export const DeleteButton = ({ onDelete }: { onDelete: () => void }) => {

    const handleDelete = () => {
        confirm("Voulez-vous vraiment supprimer cette envie ?") && onDelete();
    };

    return (
        <Tooltip title="Supprimer" placement="top" arrow
            slotProps={{ tooltip: { sx: { fontSize: '1rem', padding: '8px 16px' } } }}>
            <Fab
                color="default"
                size="medium"
                className="hided-button"
                onClick={handleDelete}
                sx={{
                    opacity: 0,
                    left: 16, top: 16, zIndex: 10,
                    position: 'absolute',
                }}
            >
                <Iconify icon="material-symbols:delete-rounded" width={24} />
            </Fab>
        </Tooltip>
    );
}