import React, { Suspense } from "react";
import Header from "../../components/header/Header";
import Chips from "../../components/infoChips/Chips";
import fetchUtils from "../../libs/fetchUtils";
import { Await, defer, useLoaderData } from "react-router-dom";
import DonutGraph from "../../components/doughnut/DonutGraph";
export const loader = async () => {
  console.log("home loader fired");
  const CHIPSURL = "/api/v1/analytics/chipsData";
  const GENDERURL = "/api/v1/analytics/gender";
  const chipsData = await fetchUtils(CHIPSURL);
  const genderData = await fetchUtils(GENDERURL);

  return defer({ chips: chipsData, gender: genderData });
};
const Home = () => {
  const { chips, gender } = useLoaderData();

  return (
    <div className='flex-grow p-2 bg-slate-200'>
      <Header headerName={"Dashboard"} />
      <main>
        <Chips chipsData={chips} />
        <div className='border-2 border-gray-500 mt-3'>
          <div className='max-w-[23vw] bg-white rounded-xl p-2 drop-shadow-md'>
            <Suspense fallback={<h1>Loading..</h1>}>
              <Await resolve={gender}>
                {(data) => {
                  return <DonutGraph gender={data} />;
                }}
              </Await>
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
