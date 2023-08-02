export function getUUID(item) {
    return item?.getNBT()?.toObject()?.tag?.ExtraAttributes?.uuid
}

export function getID(item) {
    return item?.getNBT()?.toObject()?.tag?.ExtraAttributes?.id
}