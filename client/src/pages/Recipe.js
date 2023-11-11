import React from 'react';
import { useParams } from 'react-router-dom';

function Recipe() {
    let {id} = useParams();
  return (
    <div>{id}</div>
  )
}

export default Recipe