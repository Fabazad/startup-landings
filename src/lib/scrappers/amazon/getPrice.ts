import { Item } from "paapi5-typescript-sdk";

export const getPrice = async (
  item: Item,
): Promise<{
  amount: number;
} | null> => {

  if (!item.Offers?.Listings?.[0]) return null;

  const merchantListing = item.Offers.Listings[0];

  if (!merchantListing || !merchantListing.Price?.Amount) return null;

  return {
    amount: merchantListing.Price.Amount,
  };
};
