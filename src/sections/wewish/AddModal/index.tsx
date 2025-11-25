import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";

export const AddModal = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
    return <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Product Idea</DialogTitle>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose}>Add</Button>
        </DialogActions>
    </Dialog>;
}