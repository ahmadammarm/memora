export enum CollectionColors {
    sunset = "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500",
    ocean = "bg-gradient-to-r from-green-400 via-blue-500 to-purple-500",
    forest = "bg-gradient-to-r from-green-400 via-green-500 to-green-600",
    sky = "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600",
    fire = "bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-500",
    grass = "bg-gradient-to-r from-green-400 via-green-500 to-green-600",
    water = "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600",
    earth = "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600",
    electric = "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600",
    ice = "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600",
    fighting = "bg-gradient-to-r from-red-400 via-red-500 to-red-600",
}

export type CollectionColor = keyof typeof CollectionColors