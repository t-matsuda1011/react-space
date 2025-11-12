export type StickerDataType = {
    id: string | number;
    name: string;
    imagePath: string;
    description?: string;
};

export const stickerData: StickerDataType[] = [
    {
        id: "sticker-01",
        name: "みかん",
        imagePath: "/images/orange.png",
        description: "ミカンジュースの自販機の入れ替えに遭遇。"
    },
    {
        id: "sticker-02",
        name: "青い福耳人形",
        imagePath: "/images/blue_fukumimi.png",
        description: "雑貨屋さんで打っていた青色の福耳人形。こわい。"
    },
    {
        id: "sticker-03",
        name: "ステッカー01",
        imagePath: "/images/sticker_01.png",
        description: "謎のステッカー。"
    }
];