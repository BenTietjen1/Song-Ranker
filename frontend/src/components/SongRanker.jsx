import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import '../index.css'
import { DndContext, closestCenter, useDroppable, DragOverlay, closestCorners } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Song from './Song';

function DroppableColumn({ id, children, className }) { // Column Object
  const { setNodeRef } = useDroppable({ id: `container-${id}` });
  
  return (
    <div ref={setNodeRef} className={`droppable-container ${className}`} data-id={`container-${id}`}>
      {children}
    </div>
  );
}

function SongRanker({songs, correct}) {

  const location = useLocation();

  const defaultColumns = {
    column1: [],
    column2: [],
    column3: [],
    column4: [],
    column5: [],
    column6: [],
    column7: [],
    column8: [],
    column9: [],
    column10: [],
  };

  const [columns, setColumns] = useState(() => {
    const savedState = sessionStorage.getItem('columns');
    return savedState ? JSON.parse(savedState) : defaultColumns;
  });

  const [activeId, setActiveId] = useState(null);
  const [includeSingles, setIncludeSingles] = useState(false);

  const columnTitles = ["F", "D", "C", "B-", "B", "B+", "A-", "A", "A+"]; // Add column

  useEffect(() => { // Gets Song json data and puts it into the song pool (column 10)
    if (Object.values(columns).every((col) => col.length === 0)) {
      setColumns((prevColumns) => ({
        ...prevColumns, 
        column10: songs, // Song Pool
      }));
    }
  }, [columns]);

  useEffect(() => {
    sessionStorage.setItem('columns', JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    sessionStorage.clear();
    setColumns(() => ({
    ...defaultColumns,
    column10: songs,
    }));
  }, [location.pathname, songs]); 

  const onDragStart = (event) => { // On drag start, set dragged object as active!
    setActiveId(event.active.id);
  };

  const onDragEnd = (event) => { // On drag end, 
    const { active, over } = event; 
    console.log("Over ID:", over?.id);

    setActiveId(null); // Reset active to nothing

    if (!over) return; // Ensure dragged object is dropped over a valid target

    const activeId = active.id; // Sets active to dragged object
    const source = findContainer(activeId); // Sets source object being dragged from

    let target; // Sets target column
    if (over.id.startsWith('container-')) {
      target = over.id.replace('container-', '');
    } else {
      target = findContainer(over.id);
    }

    if (!target || !columns[target]) return;

    if (source === target) { // If dropped in same column, reorder items in that column
      const oldIndex = columns[source].findIndex((item) => item.id === activeId); // Find old index of item in column
      const newIndex = columns[target].findIndex((item) => item.id === over.id); // Find new index of item in column
      if (oldIndex !== newIndex) {
        setColumns((prev) => ({
          ...prev,
          [source]: arrayMove(prev[source], oldIndex, newIndex),
        }));
      }
    } else { // If dropped in separate column, move item to separate column
      const activeItem = columns[source].find((item) => item.id === activeId); // Maybe ?
      const targetIndex = columns[target].findIndex((item) => item.id === over.id);
      const isBelowTarget = active.rect.current.translated.top > over.rect.top + over.rect.height / 2;
      const insertIndex = isBelowTarget ? targetIndex + 1 : targetIndex;

      setColumns((prev) => {
        const updatedSource = prev[source].filter((item) => item.id !== activeId); // Remove from source column
        const updatedTarget = [
          ...prev[target].slice(0, insertIndex), // Items before the drop position
          activeItem, // The dragged item
          ...prev[target].slice(insertIndex), // Items after the drop position
        ];
        return {
          ...prev,
          [source]: updatedSource,
          [target]: updatedTarget,
        };
      });


    }
  };

  const findContainer = (id) => { // Finds container of a certain object's ID
    for (const key of Object.keys(columns)) {
      if (columns[key].some((song) => song.id === id)) {
        return key;
      }
    }
    return null;
  };

  const resetColumns = () => {
    sessionStorage.clear(); // Clear sessionStorage
    setColumns(defaultColumns); // Reset state to default

    setColumns((prevColumns) => ({
        ...prevColumns, 
        column10: songs, // Song Pool
    }));
  };

  const correctRanking = () => {
    sessionStorage.clear();
    setColumns(defaultColumns);

    setColumns((prevColumns) => ({
      ...prevColumns,
      column1: songs.filter((song) => correct[0].includes(song.title)),
      column2: songs.filter((song) => correct[1].includes(song.title)),
      column3: songs.filter((song) => correct[2].includes(song.title)),
      column4: songs.filter((song) => correct[3].includes(song.title)),
      column5: songs.filter((song) => correct[4].includes(song.title)),
      column6: songs.filter((song) => correct[5].includes(song.title)),
      column7: songs.filter((song) => correct[6].includes(song.title)),
      column8: songs.filter((song) => correct[7].includes(song.title)),
      column9: songs.filter((song) => correct[8].includes(song.title)),
      column10: songs.filter((song) => !correct[0].includes(song.title) && 
      !correct[1].includes(song.title) && !correct[2].includes(song.title) && 
      !correct[3].includes(song.title) && !correct[4].includes(song.title) && 
      !correct[5].includes(song.title) && !correct[6].includes(song.title) && 
      !correct[7].includes(song.title) && !correct[8].includes(song.title)),
    }));
  };

  return (

    <DndContext
      collisionDetection={closestCorners} // CLOSEST CORNERS COLLISION ALGORITHM
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Container fluid className="app-container">

        <div className="button-container"> {/* Buttons */}
          <Button variant="danger" onClick={resetColumns} className="ml-2">
            Reset
          </Button>
          <Button onClick={correctRanking}>
            Correct Ranking
          </Button>
          <h3 className="instructions">
            Drag and drop a song into any column to rank it!
          </h3>
        </div>

        <div className="columns-container"> {/* Container for all columns */}
          {columnTitles.map((title, index) => (
            <DroppableColumn key={`column${index + 1}`} id={`column${index + 1}`} className="column">
              <SortableContext
                id={`container-column${index + 1}`}
                items={columns[`column${index + 1}`].map((item) => item.id)}
                strategy={rectSortingStrategy}
              >
                <h2>{title}</h2>
                {columns[`column${index + 1}`].map((song) => (
                  <Song
                  key={song.id}
                  id={song.id}
                  title={song.title}
                  backgroundColor={song.backgroundColor}
                  textColor={song.textColor}
                  nonAlbumSingle={song.nonAlbumSingle}
                  albumBackgroundColor={song.albumBackgroundColor}
                  albumTextColor={song.albumTextColor}
                  includeSingles={includeSingles}
                />
                ))}
                
              </SortableContext>
            </DroppableColumn>
          ))}
        </div>

        <div className="pool-container"> {/* Container for song pool */}
          <DroppableColumn id="column10" className="wide-pool">
            <SortableContext
              id="container-column10"
              items={columns.column10.map((item) => item.id)}
              strategy={rectSortingStrategy}
            >
              <div className="pool-grid">
                {columns.column10.map((song) => (
                  <Song
                    key={song.id}
                    id={song.id}
                    title={song.title}
                    backgroundColor={song.backgroundColor}
                    textColor={song.textColor}
                    nonAlbumSingle={song.nonAlbumSingle}
                    albumBackgroundColor={song.albumBackgroundColor}
                    albumTextColor={song.albumTextColor}
                    includeSingles={includeSingles}
                  />
                ))}
              </div>
            </SortableContext>
          </DroppableColumn>
        </div>


      </Container>

      <DragOverlay>
        {activeId ? (
          <Song
            id={activeId}
            title={columns[findContainer(activeId)].find((item) => item.id === activeId).title}
            backgroundColor={columns[findContainer(activeId)].find((item) => item.id === activeId).backgroundColor}
            textColor={columns[findContainer(activeId)].find((item) => item.id === activeId).textColor}
            nonAlbumSingle={columns[findContainer(activeId)].find((item) => item.id === activeId).nonAlbumSingle}
            albumBackgroundColor={columns[findContainer(activeId)].find((item) => item.id === activeId).albumBackgroundColor}
            albumTextColor={columns[findContainer(activeId)].find((item) => item.id === activeId).albumTextColor}
            includeSingles={includeSingles}
          />
        ) : null}
      </DragOverlay>

    </DndContext>
  );
}

export default SongRanker;
