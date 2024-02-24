import { useCallback, useEffect, useMemo, useState } from 'react';
import { ColumnContainer } from './ColumnContainer';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import debounce from 'just-debounce-it';
import { createPortal } from 'react-dom';
import TaskCard from './TaskCard';
import { useLocation } from 'wouter';
import toast, { Toaster } from 'react-hot-toast';
import {
  createTask as createTaskService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
  getTasksByUser,
} from '../services/tasks';

const defaultCols = [
  {
    id: 'TODO',
    title: 'To Do',
  },
  {
    id: 'PROGRESS',
    title: 'In Progress',
  },
  {
    id: 'DONE',
    title: 'Done',
  },
];

export default function KanbanBoard() {
  const [columns, setColumns] = useState(defaultCols);
  const [tasks, setTasks] = useState([]);
  const [, setLocation] = useLocation();
  const [activeColumn, setActiveColumn] = useState(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeTask, setActiveTask] = useState(null);

  const sucessAlert = ({ message }) => toast.success(message);

  useEffect(() => {
    if (!localStorage.getItem('userToken')) setLocation('/');

    async function getTasks() {
      try {
        const tasks = await getTasksByUser();
        setTasks(tasks);
      } catch (error) {
        console.log(error);
      }
    }
    getTasks();
  }, [tasks.length, setLocation]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  function onDragStart(event) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === 'Column';
    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        //change column or status
        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === 'Column';

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;

        debouncedUpdateTask(
          tasks[activeIndex].id,
          tasks[activeIndex].content,
          overId
        );
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  const createTask = async (columnId) => {
    try {
      const dataTask = await createTaskService({
        columnId,
        content: `Task ${tasks.length + 1}`,
      });
      setTasks([...tasks, dataTask]);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedUpdateTask = useCallback(
    debounce((id, content, columnId) => {
      updateTaskService(id, {
        content,
        columnId,
      });
      sucessAlert({ message: 'Task updated successfully' });
    }, 300),
    []
  );

  async function deleteTask(id) {
    try {
      await deleteTaskService(id);
      const newTasks = tasks.filter((task) => task.id !== id);
      sucessAlert({ message: 'Task deleted successfully' });
      setTasks(newTasks);
    } catch (error) {
      console.log(error);
    }
  }

  const updateTask = async (id, content) => {
    try {
      const newTasks = tasks.map((task) => {
        if (task.id !== id) return task;
        return { ...task, content };
      });
      const task = newTasks.find((task) => task.id === id);
      setTasks(newTasks);
      debouncedUpdateTask(id, content, task.columnId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <Toaster />
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
