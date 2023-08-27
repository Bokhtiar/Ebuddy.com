export const validatePhone = (number) => {
  // if (number && (number.length === 11 && number.match(/^01+[{1,3,4,5,6,7,8,9}]+[0-9]*/g))) {
  if (number && (number.length === 11 && number.match(/\+?(88)?0?1[3456789][0-9]{8}\b/g))) {
    return true
  } else {
    return false
  }
}

export const validateEmail = (email) => {
  if (email && email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g)) {
    return true
  } else {
    return false
  }
}

export const validateAmount = (amount) => {
  if (amount.match(/^[0-9]*$/g) && amount > 0 && amount < 5001) {
    return true
  } else {
    return false
  }
}

export const validateText = (text, help) => {
  if (text && text.length >= 250) {
    return help ? 'Maximum 250 character' : 'error'
  } else {
    return ''
  }
}