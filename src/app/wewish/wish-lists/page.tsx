import { Container } from "@mui/material";
import { MyLists } from "./MyLists";
import {Profile} from "./profile"

export default function ListsPage() {
    return (
        <Container>
            <Profile />
            <MyLists />
        </Container>
    );
}