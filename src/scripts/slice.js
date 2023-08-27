export const slice_5 = text => {
    return text.length > 5 ? `${text.slice(0,5)}...` : text
}

export const slice_15 = text => {
    return text.length > 15 ? `${text.slice(0,15)}...` : text
}

export const slice_20 = text => {
    return text.length > 20 ? `${text.slice(0,20)}...` : text
}

export const slice_30 = text => {
    return text.length > 30 ? `${text.slice(0,30)}...` : text
}

export const _slice_ = (text, number) => {
    return text && text.length > number ? `${text.slice(0, number)}...${text.slice(-2)}` : text
}