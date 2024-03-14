import { useState } from 'react';
import ModalProject from './ModalProject';

export const ProjectList = () => {
  const [editProject, setEditProject] = useState({
    title: '',
    description: '',
  });
  const [openModal, setOpenModal] = useState(false);

  function onCreateProject() {
    setEditProject({ title: '', description: '' });
    onOpenModal();
  }

  function onOpenModal() {
    setOpenModal(true);
  }
  function onCloseModal() {
    setOpenModal(false);
  }
  return (
    <div className="bg-gray-100 flex items-center flex-col justify-center p-8 min-h-screen">
      <section className=" w-full flex flex-col justify-center">
        <button
          type="button"
          onClick={onCreateProject}
          className="w-full bg-gray-300 hover:text-white hover:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center "
        >
          Add new project &nbsp;
          <svg
            className="w-4 h-4 text-gray-800 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14m-7 7V5"
            />
          </svg>
        </button>
        <article>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">
              No projects yet
            </h2>
            <p className="text-gray-600 text-lg text-center">
              Create a new project to start a new board
            </p>
          </div>
        </article>
        <article>
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Active Projects
            </h2>
            <ul className="flex flex-col gap-4">
              <li className="bg-gray-200 p-4 rounded-lg flex items-center justify-between">
                <h4 className="text-gray-600 text-lg font-bold ">Project 2</h4>
                <div>
                  <button type="button">
                    <svg
                      className="w-5 h-5 text-gray-600 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button type="button">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
          </section>
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Closed Projects
            </h2>
            <ul className="flex flex-col gap-4">
              {/* {closedProjects.map((project) => (
                <li key={project.id} className="bg-gray-200 p-4 rounded-lg">
                  <span className="text-gray-800">{project.name}</span>
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700 ml-2"
                    onClick={() => handleReopenProject(project.id)}
                  >
                    Re-open
                  </button>
                </li>
              ))} */}
              <li className="bg-gray-200 p-4 rounded-lg flex items-center justify-between">
                <h4 className="text-gray-400 text-lg font-bold line-through">
                  Project 1
                </h4>
                <button type="button">
                  <svg
                    className="w-5 h-5 text-gray-600 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 7a2 2 0 1 1 4 0v4a1 1 0 1 0 2 0V7a4 4 0 0 0-8 0v3H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V7Zm-5 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </section>
        </article>
        {openModal && (
          <ModalProject project={editProject} onCloseModal={onCloseModal} />
        )}
      </section>
    </div>
  );
};
