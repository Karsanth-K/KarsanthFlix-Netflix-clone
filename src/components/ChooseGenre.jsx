import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getDataByGenre } from '../store';

export default function ChooseGenre({genres,type}) {
  const dispatch = useDispatch()
  return (
    <OptStyle className='flex' onChange={e=>{
      dispatch(getDataByGenre({genre:e.target.value,type}));
    }}>
      {genres.map((genre)=>{
        return(
          <option value = {genre.id} key={genre.id}>{genre.name}</option>
        );
      })}
    </OptStyle>
  );
}
const OptStyle = styled.select`
margin-left: 5rem;
cursor: pointer;
font-size: 1.4rem;
background-color: rgba(10, 40, 50, 0.25);
color: white;
`;