export type StickerDataType = {
    id: string;
    name: string;
    imagePath: string;
    imagePathThum?: string;
    description?: string;
};

export const stickerData: StickerDataType[] = [
    {
        id: "sticker01",
        name: "みかん",
        imagePath: "/images/orange.png",
        imagePathThum: "/images/orange_thum.jpeg",
        description: "ミカンジュースの自販機の入れ替えに遭遇"
    },
    {
        id: "sticker-02",
        name: "青い福耳人形",
        imagePath: "/images/blue_fukumimi.png",
        imagePathThum: "/images/blue_fukumimi_thum.jpeg",
        description: "雑貨屋さんで売ってた"
    },
    {
        id: "sticker-03",
        name: "ぞうの滑り台",
        imagePath: "/images/zou.png",
        imagePathThum: "/images/zou_thum.jpeg",
        description: "こわ！"
    },
    {
        id: "sticker-04",
        name: "ステッカー01",
        imagePath: "/images/sticker_01.png",
        description: "謎のステッカー"
    }
];