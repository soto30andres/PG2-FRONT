import KanbanBoard from '../components/KanbanBoard';
import { useLocation } from 'wouter';
import { ProjectList } from '../components/ProjectList';
import NoSelectProject from '../components/NoSelectProject';
import { useState } from 'react';

export function Tasks() {
  const [, setLocation] = useLocation();
  const [projectId, setProjectId] = useState(null);

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
          {projectId ? (
            <KanbanBoard projectId={projectId} />
          ) : (
            <NoSelectProject />
          )}
        </div>
      </article>
    </div>
  );
}
