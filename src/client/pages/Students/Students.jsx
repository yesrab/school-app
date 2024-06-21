import React, { Suspense, useState } from "react";
import Header from "../../components/header/Header";
import ModelWrapper from "../../modal/ModalWrapper";
import AddStudent from "../../components/addStudent/AddStudent";
import fetchUtils from "../../libs/fetchUtils";
import { Await, defer, useActionData, useLoaderData } from "react-router-dom";
export const loader = async () => {
  const STUDENT_COUNT = "/api/v1/students/studentCount";
  const ALL_STUDENTS = "/api/v1/students/allStudents";
  const count = fetchUtils(STUDENT_COUNT);
  const students = await fetchUtils(ALL_STUDENTS);
  return defer({ count, students });
};
export const action = async ({ request, params }) => {
  const ADD_STUDENT_URL = "/api/v1/students/addStudent";
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
  return responce;
};
const Students = () => {
  const { count, students } = useLoaderData();
  const data = useActionData();
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className='flex-grow p-2 bg-slate-200'>
      <Header headerName={"students"} />
      <main className='mt-3'>
        <div className='flex justify-between px-3'>
          <button
            className='flex border-2 border-gray-600 px-3 gap-3 items-center rounded-xl bg-white'
            onClick={toggleModal}>
            <span className='material-symbols-rounded'>add</span> Add student
          </button>
          <span className='flex border-2 border-gray-600 px-3 gap-3 items-center rounded-xl bg-white'>
            Number of Students Enrolled :
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
            <h1 className='text-2xl'>Add student</h1>
            <AddStudent responce={data} toggleModal={toggleModal} />
          </div>
        </ModelWrapper>
        <div className='p-2 mt-3'>
          <table className='min-w-full divide-y rounded-md divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Name
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Gender
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Date of Birth
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Total Fee Paid
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Enrollment Status
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Enrolled Class
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {students?.studentData.map((student) => (
                <tr key={student._id}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {student.fullName}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {student.gender}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {new Date(student.DOB).toLocaleDateString()}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {student.totalFeePaid}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {student.enrollmentStatus}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {student.enrolledClass}
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

export default Students;
