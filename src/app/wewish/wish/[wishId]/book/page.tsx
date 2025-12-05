import { Book } from "./Book";

export default function BookPage({ params }: { params: { wishId: string } }) {
    const { wishId } = params;
    return <Book wishId={Number(wishId)} />
}