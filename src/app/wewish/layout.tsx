import { SimpleLayout } from 'src/layouts/simple';
import { AddButton } from 'src/app/wewish/components/nav/AddButton';
import { MyListsButton } from 'src/app/wewish/components/nav/MyListsButton';
import { NotificationsButton } from 'src/app/wewish/components/nav/NotificationsButton';
import { AddModalProvider } from 'src/app/wewish/components/AddModal/provider';
import { getAuthUser } from 'src/auth/getAuthUser';
import { View403, View500 } from 'src/sections/error';

// ----------------------------------------------------------------------


export default async function Layout({ children }: {
  children: React.ReactNode;
}) {

  const userRes = await getAuthUser();
  if (!userRes.success) {
    if (userRes.errorCode === "unknown") return <View500 />;
    return <View500 />;
  }
  if (!userRes.user) return <View403 />;

  return (
    <AddModalProvider>
      <SimpleLayout menuButtons={[<MyListsButton />, <AddButton />, <NotificationsButton />]}>
        {children}
      </SimpleLayout>
    </AddModalProvider>
  );
}