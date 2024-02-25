import { API_URL } from '../config';

export const createTask = async ({ content, columnId }) => {
  try {
    const response = await fetch(`${API_URL}task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
      body: JSON.stringify({ name: content, state: columnId }),
    });
    const data = await response.json();
    return { id: data.id, title: data.name, columnId: data.state };
  } catch (error) {
    console.log(error);
    throw new Error('Cannot create task');
  }
};

export const updateTask = async (
  taskId,
  { content, columnId, description }
) => {
  try {
    const response = await fetch(`${API_URL}task/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
      body: JSON.stringify({ name: content, state: columnId, description }),
    });
    const data = await response.json();
    return { id: data.id, title: data.name, columnId: data.state };
  } catch (error) {
    console.log(error);
    throw new Error('Cannot update task');
  }
};

export const deleteTask = async (taskId) => {
  try {
    await fetch(`${API_URL}task/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
      body: JSON.stringify({ id: taskId }),
    });
    return {};
  } catch (error) {
    console.log(error);
    throw new Error('Cannot create task');
  }
};

export const getTasksByUser = async () => {
  const token = localStorage.getItem('userToken');

  try {
    const response = await fetch(`${API_URL}task`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    const data = await response.json();
    const listData = data.map((item) => ({
      id: item.id,
      content: item.name,
      columnId: item.state,
      description: item.description,
    }));
    return listData;
  } catch (error) {
    throw new Error('Cannot get tasks');
  }
};
