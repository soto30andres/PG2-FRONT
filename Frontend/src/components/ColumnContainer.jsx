import PropTypes from 'prop-types';
import PlusIcon from '../icons/PlusIcon';
import TaskCard from './TaskCard';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { useMemo } from 'react';
import { CSS } from '@dnd-kit/utilities';

export function ColumnContainer({
  column,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}) {
  ColumnContainer.propTypes = {
    column: PropTypes.object,
    createTask: PropTypes.func,
    deleteTask: PropTypes.func,
    updateTask: PropTypes.func,
    tasks: PropTypes.array,
  };

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
    bg-columnBackgroundColor
    opacity-40
    border-2
    border-gray-500
    shadow-lg
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col
    "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor shadow-lg  border-2 border-gray-400 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        className="bg-mainBackgroundColor  text-md h-[60px] cursor-grab rounded-lg rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between"
      >
        <div className="flex gap-2">
          <div className="flex justify-center items-cente bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            0
          </div>
          {column.title}
        </div>
      </div>
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      <div>
        <button
          onClick={() => {
            createTask(column.id);
          }}
          className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-gray-500 active:bg-black"
        >
          <PlusIcon />
          Add task
        </button>
      </div>
    </div>
  );
}
