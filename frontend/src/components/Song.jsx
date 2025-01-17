import React from 'react';
import { Card } from 'react-bootstrap';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function Song(props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    backgroundColor: props.backgroundColor,
    color: props.textColor,
    padding: '2px',
    margin: '0px',
    // borderRadius: '0px',
    // border: '0.5px solid black',
    // outline: '0.5px solid black',
    textAlign: 'center',
    wordWrap: 'break-word',
    boxShadow: '0 0 0 0.5px black',
  };

  const titleStyle = {
    fontSize: '12px', // Adjust the size of the text here
    fontWeight: 'bold', // Optional: to make the text bold
  };

  return (
    <Card ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card.Body>
        <Card.Title style={titleStyle}>
          <strong>{props.title}</strong>
        </Card.Title>
      </Card.Body>
    </Card>
  );
}
