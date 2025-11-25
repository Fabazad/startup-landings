import { SimpleLayout } from 'src/layouts/simple';
import { AddButton } from 'src/sections/wewish/nav/AddButton';
import { MyListsButton } from 'src/sections/wewish/nav/MyListsButton';
import { NotificationsButton } from 'src/sections/wewish/nav/NotificationsButton';
import { AddModalProvider } from 'src/sections/wewish/AddModal/provider';

export const WeWishLayout = ({ children }: {
    children: React.ReactNode;
}) => {
    return <AddModalProvider>
        <SimpleLayout menuButtons={[<MyListsButton />, <AddButton />, <NotificationsButton />]}>{children}</SimpleLayout>
    </AddModalProvider>;
}