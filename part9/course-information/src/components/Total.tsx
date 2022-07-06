import React from 'react';

interface Props {
  total: number
}

const Total = ({ total }: Props) => <>
    Number of exercises{" "}
    {total}
</>

export default Total;