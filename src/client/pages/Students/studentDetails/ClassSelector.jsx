import React, { Suspense, useState } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import toast from "react-hot-toast";
import fetchUtils from "../../../libs/fetchUtils";
import { Await, useRevalidator } from "react-router-dom";

const ClassSelector = ({ currentClass, listOfClass }) => {
  const validate = useRevalidator();
  const [isOpen, setIsopen] = useState(false);

  const toggel = () => {
    setIsopen((prev) => !prev);
  };
  const closeMenu = () => {
    setIsopen(false);
  };

  const ChangeEnrollment = async (status) => {
    const data = await currentClass;
    console.log(data);
    const URL = "/api/v1/students/changeClass";
    const patchReq = new Request(URL, {
      method: "PATCH",
      body: JSON.stringify({
        Classid: status,
        studentId: data.studentDetail._id,
        currentClassId: data.classesEnrolled._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = fetchUtils(patchReq);
    response.then(() => {
      validate.revalidate();
    });
    toast.promise(response, {
      loading: "Processing",
      success: `Changed Class successfully`,
      error: "Error when fetching",
    });
  };

  const menuref = useOutsideClick(closeMenu);
  return (
    <div className='bg-gray-400 rounded-md inline relative '>
      <Suspense
        fallback={
          <span className='inline-flex cursor-pointer rounded-md px-2 items-center text-white bg-gray-400'>
            Loading...
          </span>
        }>
        <Await resolve={currentClass}>
          {(data) => {
            return (
              <span
                onClick={toggel}
                className='inline-flex cursor-pointer rounded-md px-2 items-center text-white bg-gray-400'>
                {data?.classesEnrolled?.className
                  ? data?.classesEnrolled?.className
                  : "None"}
                <span className='material-symbols-outlined'>stat_minus_1</span>
              </span>
            );
          }}
        </Await>
      </Suspense>
      {isOpen && (
        <span
          ref={menuref}
          className='bg-gray-700 absolute left-0 top-[30px] rounded-md'>
          <Suspense
            fallback={
              <ul className='bg-gray-700 text-white rounded-md p-2 max-w-[150px] flex flex-col gap-2'>
                <li className='border duration-200 cursor-pointer rounded-md px-2 hover:scale-110'>
                  Loading
                </li>
              </ul>
            }>
            <Await resolve={listOfClass}>
              {(data) => {
                return (
                  <ul className='bg-gray-700 text-white rounded-md p-2 max-w-[150px] flex flex-col gap-2'>
                    {data?.classes?.map((item, id) => {
                      return (
                        <li
                          onClick={() => {
                            ChangeEnrollment(item._id);
                            toggel();
                          }}
                          className='border duration-200 cursor-pointer rounded-md px-2 hover:scale-110'
                          key={id}>
                          {item.className}
                        </li>
                      );
                    })}
                  </ul>
                );
              }}
            </Await>
          </Suspense>
        </span>
      )}
    </div>
  );
};

export default ClassSelector;
