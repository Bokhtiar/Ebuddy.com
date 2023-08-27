import * as actionTypes from './actionTypes';

export const address = (address) => {
    return {
        type: actionTypes.ADDRESS,
        address: address
    }
}

export const addressHelp = (addressHelp) => {
    return {
        type: actionTypes.ADDRESS_HELP,
        addressHelp: addressHelp
    }
}
