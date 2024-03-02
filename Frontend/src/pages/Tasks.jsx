import KanbanBoard from '../components/KanbanBoard';
import { useLocation } from 'wouter';

export function Tasks() {
  const [, setLocation] = useLocation();
  const signOutUser = () => {
    localStorage.removeItem('userToken');
    setLocation('/');
  };
  return (
    <div className="pa">
      <button className="text-red-500 font-bold p-3" onClick={signOutUser}>
        SignOut
      </button>
      <KanbanBoard />
    </div>
  );
}
