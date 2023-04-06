import React from 'react'
import styled from 'styled-components';
export default function NotAvailable() {
  return (
    <My_style>
    <h1 className='not-Available'>No Results Found !</h1>
    </My_style>
  );
}

const My_style = styled.div`
.not-Available{
    width:max-content;
    position:absolute;
    top:40%;
    left:40%;
}
`;