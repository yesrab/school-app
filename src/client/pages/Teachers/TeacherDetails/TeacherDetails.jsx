import React, { Suspense } from "react";
import { useLoaderData, Await, defer } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import fetchUtils from "../../../libs/fetchUtils";

export const loader = async ({ params }) => {
  const teacherId = params.teacherId;
  const DETAIL_URL = `/api/v1/teachers/${teacherId}`;
  const teacherData = await fetchUtils(DETAIL_URL);
  console.log(teacherData);
  return defer({ teacherData });
};

const TeacherDetails = () => {
  const { teacherData } = useLoaderData();

  return (
    <div className='flex-grow p-2 bg-slate-200'>
      <h2 className='font-bold text-4xl'>Teacher Details</h2>
      <div className='p-2 bg-white rounded-md mt-1 shadow-md flex justify-evenly'>
        <div>
          <h3 className='font-thin text-2xl'>General Details</h3>
          <hr />
          <Suspense fallback={<Loader />}>
            <Await resolve={teacherData}>
              {(data) => (
                <>
                  <p className='text-xl my-1 font-mono'>
                    <span className='font-semibold'>Name: </span>
                    {data.teacherDetail.fullName}
                  </p>
                </>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
