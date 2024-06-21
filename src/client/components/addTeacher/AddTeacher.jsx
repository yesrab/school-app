import React, { useState } from "react";
import { Form, useSubmit } from "react-router-dom";
import FormInput from "../formInputs/FormInput";
import toast from "react-hot-toast";

const AddTeacher = ({ toggleModal, responce }) => {
  const submitter = useSubmit();
  const [teacher, setTeacher] = useState({
    fullName: "",
    gender: "",
    DOB: "",
    emailId: "",
    mobileNumber: "",
    homeAddress: "",
    salary: "",
    teacherType: "",
    KYC_Details: {
      bankName: "",
      bankAccountNumber: "",
      bankIFSC: "",
      bankBranch: "",
      PAN: "",
    },
  });

  const handleChange = (e, field, subField = null) => {
    if (subField) {
      setTeacher({
        ...teacher,
        KYC_Details: {
          ...teacher.KYC_Details,
          [field]: e.target.value,
        },
      });
    } else {
      setTeacher({
        ...teacher,
        [field]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic, e.g., sending data to a server
    submitter(teacher, {
      method: "POST",
      encType: "application/json",
    });
    toggleModal();
  };

  return (
    <Form
      method='POST'
      className='flex flex-col max-h-[90vh] overflow-y-auto p-2'
      onSubmit={handleSubmit}>
      <FormInput
        type='text'
        labelName={"Full Name"}
        placeholder={"Teacher Full Name"}
        value={teacher.fullName}
        onChange={(e) => handleChange(e, "fullName")}
      />
      <FormInput
        type='text'
        labelName={"Salary"}
        placeholder={"Teacher Salary"}
        value={teacher.salary}
        onChange={(e) => handleChange(e, "salary")}
      />
      <div className='flex flex-col'>
        <label className='mb-2'>Gender</label>
        <select
          className='form-select block w-full mt-1 border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md shadow-sm'
          value={teacher.gender}
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
        value={teacher.DOB}
        onChange={(e) => handleChange(e, "DOB")}
      />
      <FormInput
        type='email'
        labelName={"Email"}
        placeholder={"Email Address"}
        value={teacher.emailId}
        onChange={(e) => handleChange(e, "emailId")}
      />
      <FormInput
        type='tel'
        labelName={"Mobile Number"}
        placeholder={"Mobile Number"}
        value={teacher.mobileNumber}
        onChange={(e) => handleChange(e, "mobileNumber")}
      />
      <FormInput
        type='text'
        labelName={"Home Address"}
        placeholder={"Home Address"}
        value={teacher.homeAddress}
        onChange={(e) => handleChange(e, "homeAddress")}
      />
      <div className='flex flex-col mt-2'>
        <label className='mb-2'>teacher Type :</label>
        <select
          className='form-select block w-full mt-1 border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md shadow-sm'
          value={teacher.teacherType}
          required
          onChange={(e) => handleChange(e, "teacherType")}>
          <option disabled value=''>
            Select teacher Type
          </option>
          <option value='Regular'>Regular</option>
          <option value='Substitute'>Substitute</option>
          <option value='Other'>Other</option>
        </select>
      </div>
      <FormInput
        type='text'
        labelName={"Bank Name"}
        placeholder={"Bank Name"}
        value={teacher.KYC_Details.bankName}
        onChange={(e) => handleChange(e, "bankName", true)}
      />
      <FormInput
        type='text'
        labelName={"Bank Account Number"}
        placeholder={"Account Number"}
        value={teacher.KYC_Details.bankAccountNumber}
        onChange={(e) => handleChange(e, "bankAccountNumber", true)}
      />
      <FormInput
        type='text'
        labelName={"Bank IFSC"}
        placeholder={"bank IFSC"}
        value={teacher.KYC_Details.bankIFSC}
        onChange={(e) => handleChange(e, "bankIFSC", true)}
      />
      <FormInput
        type='text'
        labelName={"Bank Branch"}
        placeholder={"Branch"}
        value={teacher.KYC_Details.bankBranch}
        onChange={(e) => handleChange(e, "bankBranch", true)}
      />
      <FormInput
        type='text'
        labelName={"PAN"}
        placeholder={"PAN"}
        value={teacher.KYC_Details.PAN}
        onChange={(e) => handleChange(e, "PAN", true)}
      />
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

export default AddTeacher;
