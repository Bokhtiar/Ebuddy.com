import React from 'react';
import { Status } from '../@statics/Status';

const useQueryBuilder = (searchQuery) => {
  if (searchQuery !== Status.INITIAL) {

    let queryString = `?`;
    const keys = Object.keys(searchQuery);
    const values = Object.values(searchQuery);
    keys.forEach((key, index) => {
      queryString = queryString + `${key}=${values[index]}&`
    });
    return queryString.substring(0, queryString.length - 1);
  } else {
    return '';
  }
}

export default useQueryBuilder;
