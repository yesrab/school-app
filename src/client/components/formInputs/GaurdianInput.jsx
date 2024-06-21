import React from "react";

const GuardianInput = ({ guardian, onChange, index }) => {
  return (
    <>
      <label htmlFor={`GuardianName-${guardian.id}`} className='flex flex-col '>
        <p className='my-2'>{`Guardian ${guardian.id} Name`} :</p>
        <input
          type='text'
          value={guardian.guardianName}
          onChange={(e) => onChange(e, "guardianName", index)}
          id={`GuardianName-${guardian.id}`}
          className='border-2 rounded-md px-2 py-1 border-gray-300'
          placeholder={`Guardian ${guardian.id} Name`}
        />
        {/* <p className='text-red-500 text-sm'>Error</p> */}
      </label>
      <label htmlFor={`guardian-${guardian.id}`} className='flex flex-col '>
        <p className='my-2'>{`Guardian ${guardian.id} Number`} :</p>
        <input
          type='tel'
          value={guardian.guardianMobileNumber}
          onChange={(e) => onChange(e, "guardianMobileNumber", index)}
          id={`guardian-${guardian.id}`}
          className='border-2 rounded-md px-2 py-1 border-gray-300'
          placeholder={`Guardian ${guardian.id} Number`}
        />
        {/* <p className='text-red-500 text-sm'>Error</p> */}
      </label>
      <label
        htmlFor={`GuardianEmail-${guardian.id}`}
        className='flex flex-col '>
        <p className='my-2'>{`Guardian ${guardian.id} Email Id`} :</p>
        <input
          type='email'
          value={guardian.guardianEmailId}
          onChange={(e) => onChange(e, "guardianEmailId", index)}
          id={`GuardianEmail-${guardian.id}`}
          className='border-2 rounded-md px-2 py-1 border-gray-300'
          placeholder={`Guardian ${guardian.id} Email Id`}
        />
        {/* <p className='text-red-500 text-sm'>Error</p> */}
      </label>
      <label
        htmlFor={`GuardianAddress-${guardian.id}`}
        className='flex flex-col '>
        <p className='my-2'>{`Guardian ${guardian.id} address`} :</p>
        <input
          type='text'
          value={guardian.guardianHomeAddress}
          onChange={(e) => onChange(e, "guardianHomeAddress", index)}
          id={`GuardianEmail-${guardian.id}`}
          className='border-2 rounded-md px-2 py-1 border-gray-300'
          placeholder={`Guardian ${guardian.id} address `}
        />
        {/* <p className='text-red-500 text-sm'>Error</p> */}
      </label>
      <label htmlFor={`GuardianRelationship-${guardian.id}`}>
        {`Guardian ${guardian.id} Relationship`} :
      </label>

      <label htmlFor={`GuardianIsParent-${guardian.id}`}> Parent</label>
      <div className='flex gap-3'>
        <label
          htmlFor={`GuardianIsParentYes-${guardian.id}`}
          className='inline-flex items-center'>
          <input
            type='radio'
            id={`GuardianIsParentYes-${guardian.id}`}
            name={`GuardianIsParent-${guardian.id}`}
            checked={guardian.isParent === "on"}
            onChange={(e) => onChange(e, "isParent", index)}
          />
          Yes
        </label>
        <label
          htmlFor={`GuardianIsParentNo-${guardian.id}`}
          className='inline-flex items-center'>
          <input
            type='radio'
            id={`GuardianIsParentNo-${guardian.id}`}
            name={`GuardianIsParent-${guardian.id}`}
            value='no'
            checked={guardian.isParent === "no"}
            onChange={(e) => onChange(e, "isParent", index)}
          />
          No
        </label>
      </div>
    </>
  );
};

export default GuardianInput;
