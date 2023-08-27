import React, { useCallback } from 'react'
import { async } from 'react-shimmer'
import { DEPARTMENT_LIST } from '../../scripts/api';
import { useEffect } from 'react';
import { getData } from '../../scripts/api-service';
import { useState } from 'react';

export default function TodoList() {

  const [data, setData] = useState([])

  const fetchData = useCallback(async () =>{
      try {
        let url = DEPARTMENT_LIST;
        let res = await getData(url);
        setData(res.data.data)
        console.log("data", res.data.data);
      } catch (error) {
        console.log(error);
      }
  },[])


  useEffect(()=> {
    fetchData()
  })


  

  return (
    <div>
      <table id="customers">
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
        {
          data.map((d, i)=> {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{d.name}</td>
                <td>
                  <a href="https://www.w3schools.com">Edit</a> &nbsp;
                  <a href="https://www.w3schools.com">Delete</a>
                </td>
              </tr>
            );
          })
        }
        
        
      </table>
    </div>
  );
}
