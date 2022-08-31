import { query, where, getDocs, orderBy } from 'firebase/firestore';
import { todosRef, auth } from '../db';
import { Todo, useTodosStore } from '../store/useTodosStore';

export const getTodos = async () => {
  const store = useTodosStore();

  const todosQuery = query(
    todosRef,
    where('userId', '==', auth.currentUser?.uid),
    orderBy('createdAt', 'asc')
  );

  const todosSnapshot = await getDocs(todosQuery);

  let newTodos: Todo[] = [];

  todosSnapshot.forEach((doc) => {
    newTodos = [
      {
        id: doc.id,
        ...(doc.data() as Pick<
          Todo,
          'completed' | 'text' | 'userId' | 'createdAt'
        >),
      },
      ...newTodos,
    ];
  });

  store.updateTodos(newTodos);
};
