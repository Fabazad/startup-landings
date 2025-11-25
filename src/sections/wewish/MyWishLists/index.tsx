'use client';

import { useMyWishLists } from "../hooks/useMyWishLists";
import Link from "next/link";

export const MyWishLists = () => {

    const { data: wishLists } = useMyWishLists();

    return <div>
        <h1>My Wish Lists</h1>
        <ul>
            {wishLists?.map((list) => (
                <li key={list.id}>
                    <Link href={`/wewish/wish-list/${list.id}`}>
                        {list.name}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
}