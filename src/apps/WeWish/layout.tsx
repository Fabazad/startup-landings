import { SimpleLayout } from 'src/layouts/simple';



export const WeWishLayout = ({ children }: {
    children: React.ReactNode;
}) => {
    return <SimpleLayout>{children}</SimpleLayout>;
}