import React, { useState } from "react";
import { Form, useSubmit, useActionData } from "react-router-dom";
import FormInput from "../formInputs/FormInput";
import toast from "react-hot-toast";

const AddClass = ({ toggleModal }) => {
  const submitter = useSubmit();
  const [formData, setFormData] = useState({
    standard: "",
    section: "",
    studentMemberFee: 0,
    classCapacity: 0,
    duration: "",
    frequency: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      classDetails: {
        standard: parseInt(formData.standard),
        section: formData.section,
      },
      studentMemberFee: parseInt(formData.studentMemberFee),
      classCapacity: parseInt(formData.classCapacity),
      duration: formData.duration,
      frequency: formData.frequency,
      startDate: formData.startDate,
      endDate: formData.endDate,
    };
    // console.log(data);
    submitter(data, {
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
      <div className='flex mt-5 border-2 p-2 rounded-md justify-between px-5'>
        <div>
          <label className='mb-2'>Class Standard :</label>
          <select
            name='standard'
            className='form-select block w-full mt-1 border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md shadow-sm'
            required
            value={formData.standard}
            onChange={handleChange}>
            <option disabled value=''>
              Select Class Standard
            </option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((data, key) => (
              <option key={key} value={data}>
                {data}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className='mb-2'>Class Section :</label>
          <select
            name='section'
            className='form-select block w-full mt-1 border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md shadow-sm'
            required
            value={formData.section}
            onChange={handleChange}>
            <option disabled value=''>
              Select Class Section
            </option>
            {[
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H",
              "I",
              "J",
              "K",
              "L",
              "M",
              "N",
              "O",
              "P",
              "Q",
              "R",
              "S",
              "T",
              "U",
              "V",
              "W",
              "X",
              "Y",
              "Z",
            ].map((data, key) => (
              <option key={key} value={data}>
                {data}
              </option>
            ))}
          </select>
        </div>
      </div>
      <FormInput
        type='number'
        name='studentMemberFee'
        labelName={"Class Fee in US dollars"}
        placeholder={"Ex: 100"}
        value={formData.studentMemberFee}
        onChange={handleChange}
      />
      <FormInput
        type='number'
        name='classCapacity'
        labelName={"Class Max Capacity"}
        placeholder={"Ex: 40"}
        value={formData.classCapacity}
        onChange={handleChange}
      />
      <FormInput
        type='text'
        name='duration'
        labelName={"Class Duration"}
        placeholder={"Ex: 1hr | 2hrs | 90min"}
        value={formData.duration}
        onChange={handleChange}
      />
      <div className=' mt-5 border-2 p-2 rounded-md justify-between px-5'>
        <label className='mb-2'>Class Frequency :</label>
        <select
          name='frequency'
          className='form-select block w-full mt-1 border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 rounded-md shadow-sm'
          required
          value={formData.frequency}
          onChange={handleChange}>
          <option disabled value=''>
            Select Frequency
          </option>
          <option value='daily'>Daily</option>
          <option value='weekly'>Weekly</option>
          <option value='bi-weekly'>Bi-weekly</option>
        </select>
      </div>
      <FormInput
        type='date'
        name='startDate'
        labelName={"Class Start Date"}
        value={formData.startDate}
        onChange={handleChange}
      />
      <FormInput
        type='date'
        name='endDate'
        labelName={"Class End Date"}
        value={formData.endDate}
        onChange={handleChange}
      />
      <button
        type='submit'
        className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Submit
      </button>
    </Form>
  );
};

export default AddClass;
