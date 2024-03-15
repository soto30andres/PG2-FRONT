import { API_URL } from '../config';

export const createBoard = async ({ name, description }) => {
  try {
    const response = await fetch(`${API_URL}board`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
      body: JSON.stringify({ name, description }),
    });
    const data = await response.json();
    return { id: data.id, title: data.name, description: data.description };
  } catch (error) {
    console.log(error);
    throw new Error('Cannot create board');
  }
};

export const updateBoard = async (boardId, { name, description }) => {
  try {
    const response = await fetch(`${API_URL}board/${boardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('userToken'),
      },
      body: JSON.stringify({ name, description }),
    });
    const data = await response.json();
    return { id: data.id, title: data.name, description: data.description };
  } catch (error) {
    console.log(error);
    throw new Error('Cannot update board');
  }
};

export const getBoardsByUser = async () => {
  const token = localStorage.getItem('userToken');

  try {
    const response = await fetch(`${API_URL}board`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    const data = await response.json();
    const listData = data.map((item) => ({
      id: item.id,
      title: item.name,
      description: item.description,
    }));
    return listData;
  } catch (error) {
    throw new Error('Cannot get boards');
  }
};
