export enum CollectionColors {
    Fire = "bg-gradient-to-r from-yellow-500 to-red-600",
    Forest = "bg-gradient-to-r from-green-500 to-green-800",
    Lavender = "bg-gradient-to-r from-purple-400 to-pink-400",
    Sky = "bg-gradient-to-r from-cyan-500 to-cyan-900",
    Earth = "bg-gradient-to-r from-blue-500 to-green-800",
    Water = "bg-gradient-to-r from-blue-500 to-blue-800",
}


export type CollectionColor = keyof typeof CollectionColors;