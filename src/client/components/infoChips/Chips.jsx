import React, { Suspense } from "react";
import { Await, useNavigate } from "react-router-dom";

const Chips = ({ chipsData }) => {
  const nav = useNavigate();
  return (
    <div className='mt-3 flex flex-col gap-3 md:flex-row justify-evenly'>
      <span
        onClick={() => {
          nav("/students");
        }}
        className='cursor-pointer justify-between rounded-md gap-12 flex bg-orange-500 text-white p-3 ease-in-out duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50'>
        <div>
          <Suspense fallback={<h1 className='text-2xl'>Loding..</h1>}>
            <Await resolve={chipsData}>
              {(data) => {
                return <h1 className='text-2xl'>{data.studentCount}</h1>;
              }}
            </Await>
          </Suspense>
          <p>Students</p>
        </div>
        <div>
          <span className='cursor-pointer material-symbols-rounded bg-white p-3 rounded-full text-orange-500'>
            school
          </span>
        </div>
      </span>
      <span
        onClick={() => {
          nav("/teachers");
        }}
        className='ease-in-out duration-300 hover:scale-105 cursor-pointer justify-between rounded-md gap-10 flex bg-purple-500 text-white p-3'>
        <div>
          <Suspense fallback={<h1 className='text-2xl'>Loding..</h1>}>
            <Await resolve={chipsData}>
              {(data) => {
                return <h1 className='text-2xl'>{data.teacherCount}</h1>;
              }}
            </Await>
          </Suspense>
          <p>Teachers</p>
        </div>
        <div>
          <span className=' material-symbols-rounded bg-white p-3 rounded-full text-purple-500'>
            school
          </span>
        </div>
      </span>
      <span
        onClick={() => {
          nav("/classes");
        }}
        className='ease-in-out duration-300 hover:scale-105 cursor-pointer justify-between rounded-md gap-10 flex bg-cyan-500 text-white p-3'>
        <div>
          <Suspense fallback={<h1 className='text-2xl'>Loding..</h1>}>
            <Await resolve={chipsData}>
              {(data) => {
                return <h1 className='text-2xl'>{data.classCount}</h1>;
              }}
            </Await>
          </Suspense>
          <p>Classes</p>
        </div>
        <div>
          <span className='material-symbols-rounded bg-white p-3 rounded-full text-cyan-500'>
            groups
          </span>
        </div>
      </span>
      <span
        onClick={() => {
          nav("/analytics");
        }}
        className='ease-in-out duration-300 hover:scale-105 cursor-pointer justify-between rounded-md gap-10 flex bg-pink-500 text-white p-3'>
        <div>
          <Suspense fallback={<h1 className='text-2xl'>Loding..</h1>}>
            <Await resolve={chipsData}>
              {(data) => {
                return <h1 className='text-2xl'>{data.totalFees}</h1>;
              }}
            </Await>
          </Suspense>
          <p>Total Revenue</p>
        </div>
        <div>
          <span className='material-symbols-rounded bg-white p-3 rounded-full text-pink-500'>
            monetization_on
          </span>
        </div>
      </span>
    </div>
  );
};

export default Chips;
