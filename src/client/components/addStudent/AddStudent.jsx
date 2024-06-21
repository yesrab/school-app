import React, { useState } from "react";
import { Form, useSubmit } from "react-router-dom";
import FormInput from "../formInputs/FormInput";
import GuardianInput from "../formInputs/GaurdianInput";
import toast from "react-hot-toast";

const AddStudent = ({ toggleModal, responce }) => {
  const [student, setStudent] = useState({
    fullName: "",
    gender: "",
    DOB: "",
    emailId: "",
    mobileNumber: "",
    homeAddress: "",
    guardians: [
      {
        id: 1,
        guardianName: "",
        guardianMobileNumber: "",
        guardianEmailId: "",
        isParent: false,
        guardianHomeAddress: "",
      },
    ],
    enrollmentStatus: "Inactive",
  });

  const handleChange = (e, field, index = null) => {
    if (index !== null) {
      const newGuardians = [...student.guardians];
      newGuardians[index][field] = e.target.value;
      setStudent({ ...student, guardians: newGuardians });
    } else {
      setStudent({ ...student, [field]: e.target.value });
    }
  };

  const addGuardian = () => {
    const newGuardian = {
      id: student.guardians.length + 1,
      guardianName: "",
      guardianMobileNumber: "",
      guardianEmailId: "",
      isParent: false,
      guardianHomeAddress: "",
    };
    setStudent({ ...student, guardians: [...student.guardians, newGuardian] });
  };
  const submitter = useSubmit();
  const handleSubmit = (e) => {
    e.preventDefault();
    submitter(student, {
      method: "POST",
      encType: "application/json",
    });
    // console.log("Submitting:", responce);
    if (responce.error) {
      toast.error("form error please try again later");
    }
    if (responce.success) {
      toast.success(responce.success);
      toggleModal();
    }
  };

  return (
    <Form
      method='POST'
      className='flex flex-col max-h-[90vh] overflow-y-auto p-2'
      onSubmit={handleSubmit}>
      <FormInput
        type='text'
        labelName={"Full Name"}
        placeholder={"Student Full Name"}
        value={student.fullName}
        onChange={(e) => handleChange(e, "fullName")}
      />
      <div className='flex flex-col'>
        <label className='mb-2'>Gender</label>
        <select
          className='form-select block w-full mt-1 border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md shadow-sm'
          value={student.gender}
          required
          onChange={(e) => handleChange(e, "gender")}>
          <option disabled value=''>
            Select Gender
          </option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Other'>Other</option>
        </select>
      </div>

      <FormInput
        type='date'
        labelName={"Date of Birth"}
        placeholder={"DOB"}
        value={student.DOB}
        onChange={(e) => handleChange(e, "DOB")}
      />
      <FormInput
        type='email'
        labelName={"Email"}
        placeholder={"Email Address"}
        value={student.emailId}
        onChange={(e) => handleChange(e, "emailId")}
      />
      <FormInput
        type='tel'
        labelName={"Mobile Number"}
        placeholder={"Mobile Number"}
        value={student.mobileNumber}
        onChange={(e) => handleChange(e, "mobileNumber")}
      />
      <FormInput
        type='text'
        labelName={"Home Address"}
        placeholder={"Home Address"}
        value={student.homeAddress}
        onChange={(e) => handleChange(e, "homeAddress")}
      />
      <div className='mt-5 border-2 p-2 rounded-md'>
        <button
          className='px-3 bg-gray-600 text-white rounded-lg'
          onClick={addGuardian}
          type='button'>
          Add Guardian
        </button>
        {student.guardians.map((guardian, index) => (
          <GuardianInput
            key={index}
            guardian={guardian}
            onChange={handleChange}
            index={index}
          />
        ))}
      </div>
      <div className='mt-10 flex gap-10 justify-end'>
        <button
          type='button'
          className='bg-red-500 text-white px-3 rounded-md'
          onClick={toggleModal}>
          Cancel
        </button>
        <button
          type='submit'
          className='bg-cyan-500 text-white px-3 rounded-md'>
          Submit
        </button>
      </div>
    </Form>
  );
};

export default AddStudent;
