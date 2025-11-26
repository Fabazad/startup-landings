import { ImageData, ImageSize, Item } from "paapi5-typescript-sdk";

type Variants = Array<{
  [KK in ImageSize]?: ImageData;
}>;

export const getImages = (item: Item): Array<string> => {
  const primaryUrls = item.Images?.Primary?.Large?.URL
    ? [item.Images.Primary.Large.URL]
    : [];

  console.log("item.Images", item.Images)
  const variants = item.Images?.Variant as Variants | undefined;
  const variantsUrls = variants
    ? variants.map((v) => v?.Large?.URL).filter<string>((u) => typeof u === "string")
    : [];

  return [...primaryUrls, ...variantsUrls];
};
