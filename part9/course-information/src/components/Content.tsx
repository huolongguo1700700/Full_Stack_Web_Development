import React from 'react';

interface Course {
  name: string,
  exerciseCount: number
}

interface Props {
  courseParts: Array<Course>
}

const Content = ({ courseParts }: Props) => <>
  {courseParts.map(
    (course, index) => (<p key={index}>
      {course.name} {course.exerciseCount}
    </p>)
  )}
</>

export default Content;