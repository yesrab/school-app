import React, { useState, Suspense } from "react";
import { Await, defer, useActionData, useLoaderData } from "react-router-dom";
import ModelWrapper from "../../modal/ModalWrapper";
import Header from "../../components/header/Header";
import AddTeacher from "../../components/addTeacher/AddTeacher";
import fetchUtils from "../../libs/fetchUtils";
import toast from "react-hot-toast";
export const loader = async () => {
  const COUNT_URL = "/api/v1/teachers/count";
  const ALL_Teachers = "/api/v1/teachers/allTeachers";
  const count = fetchUtils(COUNT_URL);
  const teacher = await fetchUtils(ALL_Teachers);
  return defer({ count, teacher });
};

export const action = async ({ request, params }) => {
  const ADD_STUDENT_URL = "/api/v1/teachers/addTeacher";
  const data = await request.json();
  let serverRequest;
  if (request.method === "POST") {
    serverRequest = new Request(ADD_STUDENT_URL, {
      method: request.method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const responce = await fetchUtils(serverRequest);
  console.log(responce);
  if (responce.error) {
    toast.error("adding teacher failed");
  } else {
    toast.success("teacher added");
  }
  return responce;
};

const Teachers = () => {
  const { count, teacher } = useLoaderData();
  const data = useActionData();
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className='flex-grow p-2 bg-slate-200'>
      <Header headerName={"Teachers"} />
      <main className='mt-3'>
        <div className='flex justify-between px-3'>
          <button
            className='flex border-2 border-gray-600 px-3 gap-3 items-center rounded-xl bg-white'
            onClick={toggleModal}>
            <span className='material-symbols-rounded'>add</span> Add Teacher
          </button>
          <span className='flex border-2 border-gray-600 px-3 gap-3 items-center rounded-xl bg-white'>
            Number of Teachers Appointed :
            <Suspense fallback={<p>Loading..</p>}>
              <Await resolve={count}>
                {(data) => {
                  return <p>{data.count}</p>;
                }}
              </Await>
            </Suspense>
          </span>
        </div>
        <ModelWrapper toggleModal={toggleModal} open={open}>
          <div className='min-w-[50vw] min-h-[50vh] rounded-lg p-3'>
            <h1 className='text-2xl'>Add Teacher :</h1>
            <AddTeacher responce={data} toggleModal={toggleModal} />
          </div>
        </ModelWrapper>
        <div className='p-2 mt-3'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Teacher ID
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Teacher Name
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Assigned Classes
                </th>

                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Salary
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Catagory
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {teacher.map((t) => (
                <tr key={t._id}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {t._id}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {t.fullName}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {t.assignedClasses.length}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {t.salary} $
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {t.teacherType}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Teachers;
