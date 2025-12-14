import { SimpleLayout } from 'src/layouts/simple';
import { AddButton } from 'src/app/envy/components/nav/AddButton';
import { MyListsButton } from 'src/app/envy/components/nav/MyListsButton';
import { NotificationsButton } from 'src/app/envy/components/nav/NotificationsButton';
import { AddModalProvider } from 'src/app/envy/components/AddModal/provider';
import { getAuthUser } from 'src/auth/getAuthUser';
import { View403, View500 } from 'src/sections/error';
import { LandingLayout } from 'src/layouts/landing';
import { Container } from '@mui/material';

// ----------------------------------------------------------------------


export default async function Layout({ children }: {
  children: React.ReactNode;
}) {

  const userRes = await getAuthUser();
  if (!userRes.success) return <View500 />;

  const { user } = userRes;

  if (!user) return (
    <LandingLayout>
      <Container sx={{ py: { xs: 0, md: 4 }, position: 'relative' }}>
        {children}
      </Container>
    </LandingLayout>
  )

  return (
    <AddModalProvider>
      <SimpleLayout menuButtons={[<MyListsButton />, <AddButton />, <NotificationsButton />]}>
        {children}
      </SimpleLayout>
    </AddModalProvider>
  );
}