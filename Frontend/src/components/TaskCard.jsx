import PropTypes from 'prop-types';
import TrashIcon from '../icons/TrashIcon';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

TaskCard.propTypes = {
  task: PropTypes.object,
  deleteTask: PropTypes.func,
  updateTask: PropTypes.func,
  onOpenModal: PropTypes.func,
};

export default function TaskCard({
  task,
  deleteTask,
  updateTask,
  onOpenModal,
}) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode] = useState(true);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: false,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-gray-500  cursor-pointer relative"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      //onClick={toggleEditMode}
      onDoubleClick={() => onOpenModal(task)}
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-gray-500 cursor-pointer relative task"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>

      <button
        onClick={() => {
          deleteTask(task.id);
        }}
        className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded :hover:bg-red-500 transition-colors duration-300 ease-in-out"
      >
        <TrashIcon />
      </button>
    </div>
  );
}
