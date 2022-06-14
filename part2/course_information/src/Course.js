import React from 'react';

const Header = ({ header }) => <h2>{header}</h2>

const Total = ({ sum }) => <b>Total of {sum} exercises</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {
      parts.map(part => <Part part={part} key={part.id} />)
    }
  </>

const Course = ({ course }) => {

  const total = course.parts.reduce((s, p) => s + p.exercises, 0);

  return (
    <>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </>
  )
};

export default Course;