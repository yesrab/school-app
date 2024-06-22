import React, { Suspense } from "react";
import fetchUtils from "../../../libs/fetchUtils";
import {
  Await,
  defer,
  useLoaderData,
  useNavigate,
  useParams,
  useRevalidator,
} from "react-router-dom";
import EnrollemtSelector from "./EnrollemtSelector";
import Layer from "express/lib/router/layer";
import Loader from "../../../components/Loader/Loader";
import ClassSelector from "./ClassSelector";
import toast from "react-hot-toast";
export const loader = ({ request, params }) => {
  const id = params.studentId;
  const DETAIL_URL = `/api/v1/students/${id}`;
  const ALL_CLASSES = "/api/v1/class/allClass";
  const ClassesData = fetchUtils(ALL_CLASSES);
  const studentData = fetchUtils(DETAIL_URL);
  return defer({ studentData, ClassesData });
};
const StudentDetails = () => {
  const { studentData, ClassesData } = useLoaderData();
  const reval = useRevalidator();
  let { studentId } = useParams();
  const navigator = useNavigate();
  function formatDate(dateString) {
    let date = new Date(dateString);
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function DeleteStudent() {
    console.log("deleted");
    const deleteUrl = `/api/v1/students/delete/${studentId}`;
    const req = new Request(deleteUrl, {
      method: "delete",
    });
    const response = fetchUtils(req);
    toast.promise(response, {
      loading: "Loading....",
      success: "Deleted Student",
      error: "Error when Deleting",
    });
    navigator("/students", { replace: true });
    reval.revalidate();
  }

  return (
    <div className='flex-grow p-2 bg-slate-200'>
      <span className='flex justify-between px-2'>
        <h2 className='font-bold text-4xl'>Student Details</h2>
        <button
          onClick={DeleteStudent}
          className='border border-red-700 p-1 rounded-md hover:bg-red-700 hover:text-white'>
          Remove Student
        </button>
      </span>
      <div className='p-2 bg-white rounded-md mt-1 shadow-md flex justify-evenly'>
        <div>
          <h3 className='font-thin text-2xl'>General Details</h3>
          <hr />
          <Suspense fallback={<Loader />}>
            <Await resolve={studentData}>
              {(data) => {
                return (
                  <p className='text-xl my-1 font-mono'>
                    <span className='font-semibold'>Name: </span>
                    {data.studentDetail.fullName}
                  </p>
                );
              }}
            </Await>
          </Suspense>
          <Suspense fallback={<Loader />}>
            <Await resolve={studentData}>
              {(data) => {
                return (
                  <p className='text-xl my-1 font-mono'>
                    <span className='font-semibold'>Gender: </span>
                    {data.studentDetail.gender}
                  </p>
                );
              }}
            </Await>
          </Suspense>
          <Suspense fallback={<Loader />}>
            <Await resolve={studentData}>
              {(data) => {
                return (
                  <p className='text-xl my-1 font-mono'>
                    <span className='font-semibold'>Date of birth: </span>
                    {formatDate(data.studentDetail.DOB)}
                  </p>
                );
              }}
            </Await>
          </Suspense>
        </div>
        <div>
          <h3 className='font-thin text-2xl'>Contact Details</h3>
          <hr />
          <Suspense fallback={<Loader />}>
            <Await resolve={studentData}>
              {(data) => {
                return (
                  <p className='text-xl my-1 font-mono'>
                    <span className='font-semibold'>Email Address: </span>
                    {data.studentDetail.emailId}
                  </p>
                );
              }}
            </Await>
          </Suspense>
          <Suspense fallback={<Loader />}>
            <Await resolve={studentData}>
              {(data) => {
                return (
                  <p className='text-xl my-1 font-mono'>
                    <span className='font-semibold'>Mobile Number: </span>
                    {data.studentDetail.mobileNumber}
                  </p>
                );
              }}
            </Await>
          </Suspense>
          <Suspense fallback={<Loader />}>
            <Await resolve={studentData}>
              {(data) => {
                return (
                  <p className='text-xl my-1 font-mono'>
                    <span className='font-semibold'>Address: </span>
                    {data.studentDetail.homeAddress}
                  </p>
                );
              }}
            </Await>
          </Suspense>
        </div>
        <div>
          <h3 className='font-thin text-2xl'>Enrollment Details</h3>
          <hr />
          <Suspense fallback={<Loader />}>
            <Await resolve={studentData}>
              {(data) => {
                return (
                  <p className='text-xl my-1 font-mono'>
                    <span className='font-semibold'>Total Fee ($): </span>
                    {data.studentDetail.totalFeePaid}
                  </p>
                );
              }}
            </Await>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <Await resolve={studentData}>
              {(data) => {
                return (
                  <span className='text-xl my-1 font-mono'>
                    <span className='font-semibold'>Enrollment Status: </span>
                    <EnrollemtSelector
                      studentId={data.studentDetail._id}
                      enrollment={data.studentDetail.enrollmentStatus}
                    />
                  </span>
                );
              }}
            </Await>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <Await resolve={studentData}>
              {(data) => {
                return (
                  <p className='text-xl my-1 font-mono'>
                    <span className='font-semibold'>Date of Joining: </span>
                    {formatDate(data.studentDetail.createdAt)}
                  </p>
                );
              }}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className='p-2 bg-white rounded-md mt-1 shadow-md flex gap-4 justify-start'>
        <div>
          <h3 className='font-thin text-2xl'>Guardian Details</h3>
          <hr />
          <Suspense fallback={<Loader />}>
            <Await resolve={studentData}>
              {(data) => {
                return (
                  <>
                    {data?.studentDetail?.guardians
                      ?.toSorted((a, b) => {
                        if (a.isParent) {
                          return -1;
                        } else if (b.isParent) {
                          return 1;
                        }
                        return 0;
                      })
                      ?.map((guardian, key) => {
                        return (
                          <div
                            key={guardian._id}
                            className='border p-1 rounded-md mt-2'>
                            {guardian.isParent && (
                              <span className='bg-green-600 text-white px-3 rounded-xl'>
                                Parent
                              </span>
                            )}
                            <p className='text-xl my-1 font-mono'>
                              <span className='font-semibold'>
                                Guardian Name:{" "}
                              </span>
                              {guardian.guardianName}
                            </p>
                            <p className='text-xl my-1 font-mono'>
                              <span className='font-semibold'>
                                Guardian Mobile Number:
                              </span>
                              {guardian.guardianMobileNumber}
                            </p>
                            <p className='text-xl my-1 font-mono'>
                              <span className='font-semibold'>
                                Guardian Email Id:{" "}
                              </span>
                              {guardian.guardianEmailId}
                            </p>
                            <p className='text-xl my-1 font-mono'>
                              <span className='font-semibold'>
                                Guardian Home Address:{" "}
                              </span>
                              {guardian.guardianHomeAddress}
                            </p>
                          </div>
                        );
                      })}
                  </>
                );
              }}
            </Await>
          </Suspense>
        </div>
        <div>
          <h3 className='font-thin text-2xl'>Enrolled Class</h3>
          Select Class :{" "}
          <ClassSelector currentClass={studentData} listOfClass={ClassesData} />
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
