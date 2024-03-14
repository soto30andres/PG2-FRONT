export const ProjectList = () => {
  return (
    <div className="bg-gray-100 flex items-center flex-col justify-center p-8">
      <section className="border border-red-100 w-full flex flex-col justify-center">
        <button
          type="button"
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
              Create a new project to start collaborating with your team
            </p>
          </div>
        </article>
      </section>
    </div>
  );
};
