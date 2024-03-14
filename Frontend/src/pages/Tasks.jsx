import KanbanBoard from '../components/KanbanBoard';
import { useLocation } from 'wouter';
import { ProjectList } from '../components/ProjectList';

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
      <article className="grid grid-cols-4 gap-4">
        <ProjectList />
        <div className="col-span-3">
          <KanbanBoard />
        </div>
      </article>
    </div>
  );
}
