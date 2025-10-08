import { LandingLayout } from 'src/layouts/main';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <LandingLayout>{children}</LandingLayout>;
}
