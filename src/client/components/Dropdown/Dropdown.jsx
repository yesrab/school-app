import React, { useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import fetchUtils from "../../libs/fetchUtils";
import { useRevalidator } from "react-router-dom";

const Dropdown = ({ cls, ClassesData }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const validator = useRevalidator();
  const assignTeacher = async (classId, teacherId, method) => {
    const assignTeacher_URL = "/api/v1/class/setTeacher";
    const teacherReq = new Request(assignTeacher_URL, {
      method: method,
      body: JSON.stringify({ classId, teacherId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await fetchUtils(teacherReq);
    validator.revalidate();
  };

  const toggleDropdown = () => {
    if (!ClassesData.allTeachers.length) {
      console.log("skipped");
      return;
    }
    setDropdownOpen((prev) => !prev && !dropdownOpen);
  };
  const closeMenu = () => {
    setDropdownOpen(false);
  };
  const menuRef = useOutsideClick(closeMenu);

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown();
        }}
        className='bg-gray-200 rounded-md p-2'>
        {cls?.classTeacher?.name || "Select Teacher"}
      </button>
      {dropdownOpen ? (
        <ul
          ref={menuRef}
          className='absolute z-10 mt-3 bg-white border border-gray-300 rounded-md w-[200px]'>
          <li
            className={`p-2 ${!cls.classTeacher.name ? "bg-gray-400 opacity-55 cursor-not-allowed " : "hover:bg-gray-100 cursor-pointer"}  `}
            onClick={(e) => {
              e.stopPropagation();
              if (!cls.classTeacher.name) {
                closeMenu();
                return;
              }
              assignTeacher(cls._id, null, "DELETE");
              console.log("none");
              closeMenu();
            }}>
            None
          </li>
          {ClassesData?.allTeachers?.map((teacher) => (
            <li
              key={teacher._id}
              className='p-2 hover:bg-gray-100 cursor-pointer'
              onClick={(e) => {
                e.stopPropagation();
                assignTeacher(cls._id, teacher._id, "PATCH");
                setDropdownOpen(false);
              }}>
              {teacher.fullName}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default Dropdown;
