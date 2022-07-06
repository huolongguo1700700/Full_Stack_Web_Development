import React from 'react';

interface Props {
  courseName: string
}

const Header = ({ courseName }: Props) => <h1>{courseName}</h1>

export default Header;