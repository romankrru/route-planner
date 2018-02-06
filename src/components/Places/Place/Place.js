import React from 'react';
import { compose } from 'recompose';
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { dndItemTypes } from '../../../constants';

import styles from './Place.css';

const placeSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    }
  },
};

const placeTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    // Time to actually perform the action
    props.onPlaceMove(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  },
};

const EnhancedPlace = compose(
  DropTarget(dndItemTypes.PLACE, placeTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource(dndItemTypes.PLACE, placeSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))
)(props => {
  return props.connectDragSource(
    props.connectDropTarget(
      <li className={styles.Place} style={{opacity: props.isDragging ? 0 : 1}}>
        <div className={styles.PlaceName}>
          {props.letterIndex}:{' '}
          {props.children}
        </div>
        <div
          className={styles.PlaceDelete}
          onClick={props.onPlaceDelete}
        >
          DELETE
      </div>
      </li>
    ),
  )
});

export default EnhancedPlace;