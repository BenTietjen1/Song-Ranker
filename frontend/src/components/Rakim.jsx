import React, { useEffect, useState } from 'react';
import '../index.css'
import { DndContext, closestCenter, useDroppable, DragOverlay } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import SongRanker from './SongRanker';

function Rakim () {

  const [songs, setSongs] = useState([]);
  const [correct, setCorrect] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/rakim')
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setSongs(data);
      })
    fetch('http://localhost:3000/correctRakim')
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setCorrect(data);
      })
  }, []);

  return (
      <SongRanker
        songs={songs}
        correct={correct}
      />
  )
}

export default Rakim;