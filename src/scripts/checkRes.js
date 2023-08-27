import * as Cookies from 'js-cookie'

export const checkRes = param => {
    if (param === 200 || param === 201 || param === 212) {
        return true
    } else {
        return false
    }
}