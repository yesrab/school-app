import React, { useState } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import toast from "react-hot-toast";
import fetchUtils from "../../../libs/fetchUtils";
import { useRevalidator } from "react-router-dom";

const EnrollemtSelector = ({ enrollment, studentId }) => {
  const validate = useRevalidator();
  const [isOpen, setIsopen] = useState(false);
  const Enrollments = [
    "Active",
    "Suspended",
    "Expired",
    "Inactive",
    "Pending Approval",
    "Graduated",
    "Withdrawn",
    "On Leave",
    "Probation",
    "Dismissed",
  ];
  const toggel = () => {
    setIsopen((prev) => !prev);
  };
  const closeMenu = () => {
    setIsopen(false);
  };

  const ChangeEnrollment = (status) => {
    console.log(status, studentId);
    const URL = "/api/v1/students/status";
    const patchReq = new Request(URL, {
      method: "PATCH",
      body: JSON.stringify({
        status,
        studentId,
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
      success: `set status to ${status}`,
      error: "Error when fetching",
    });
  };

  const menuref = useOutsideClick(closeMenu);
  return (
    <div className='bg-gray-400 rounded-md inline relative '>
      <span
        onClick={toggel}
        className='inline-flex cursor-pointer rounded-md px-2 items-center text-white bg-gray-400'>
        {enrollment}
        <span className='material-symbols-outlined'>stat_minus_1</span>
      </span>
      {isOpen && (
        <span
          ref={menuref}
          className='bg-gray-700 absolute left-0 top-[30px] rounded-md'>
          <ul className='bg-gray-700 text-white rounded-md p-2 max-w-[150px] flex flex-col gap-2'>
            {Enrollments.map((item, id) => {
              return (
                <li
                  onClick={() => {
                    ChangeEnrollment(item);
                    toggel();
                  }}
                  className='border duration-200 cursor-pointer rounded-md px-2 hover:scale-110'
                  key={id}>
                  {item}
                </li>
              );
            })}
          </ul>
        </span>
      )}
    </div>
  );
};

export default EnrollemtSelector;
