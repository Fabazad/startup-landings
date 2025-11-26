'use client';

import { useAuthContext } from 'src/auth/hooks';
import { useRouter } from 'next/navigation';
import { SimpleLayout } from 'src/layouts/simple';
import { AddButton } from 'src/app/wewish/components/nav/AddButton';
import { MyListsButton } from 'src/app/wewish/components/nav/MyListsButton';
import { NotificationsButton } from 'src/app/wewish/components/nav/NotificationsButton';
import { AddModalProvider } from 'src/app/wewish/components/AddModal/provider';
import { UseModalProvider } from 'src/app/wewish/hooks/useModal';

// ----------------------------------------------------------------------


export default function Layout({ children }: {
  children: React.ReactNode;
}) {

  const { unauthenticated } = useAuthContext();
  const router = useRouter();

  if (unauthenticated) router.push("/")

  return (
    <AddModalProvider>
      <UseModalProvider>
        <SimpleLayout menuButtons={[<MyListsButton />, <AddButton />, <NotificationsButton />]}>{children}</SimpleLayout>
      </UseModalProvider>
    </AddModalProvider>
  );
}