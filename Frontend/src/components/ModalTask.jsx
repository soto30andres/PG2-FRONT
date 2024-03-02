import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

ModalTask.propTypes = {
  task: PropTypes.object,
  onCloseModal: PropTypes.func,
  updateTask: PropTypes.func,
};

export default function ModalTask({ task, onCloseModal, updateTask }) {
  ErrorMessage.propTypes = {
    field: PropTypes.string,
  };

  const { content: title, description } = task;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function ErrorMessage({ field }) {
    return <small className="text-red-400">{errors[field].message}</small>;
  }

  const onSubmit = async ({ title, description }) => {
    try {
      await updateTask(task.id, title, description);
      onCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      aria-hidden="true"
      className="bg-gray-400 overflow-y-auto flex bg-opacity-80 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">Task Detail</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
              onClick={onCloseModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  {...register('title', {
                    required: 'This field is required',
                    minLength: {
                      value: 5,
                      message: 'Min length is 5',
                    },
                    maxLength: {
                      value: 50,
                      message: 'Max length is 50',
                    },
                  })}
                  defaultValue={title}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type task title"
                  required=""
                />
                {errors.title && <ErrorMessage field="title" />}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  defaultValue={description}
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write task description here"
                  {...register('description')}
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="text-white  inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
