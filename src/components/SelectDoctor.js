import React from "react";
import { useNavigate } from "react-router-dom";
import { selectDoctor } from "../redux/slices/user";
import { useDispatch, useSelector } from "../redux/store";
import { PATH_PAGE } from "../routes/paths";

export default function SelectDoctor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctor } = useSelector((state) => state.user);
  const first = doctor[0];
  const second = doctor[1];
  const chooseDoctor = async (id) => {
    dispatch(selectDoctor(id));
    navigate(PATH_PAGE.dashboard);
  };

  return (
    <section className="pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
      <div className="container mx-auto ">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <h2 className="text-dark mb-4 text-3xl font-bold sm:text-4xl md:text-[40px]">
                Choose a doctor
              </h2>
              <p className="text-body-color text-base">
                You can choose one of the two doctors, and later you can fill in
                your card data.
              </p>
            </div>
          </div>
        </div>

        <div className=" flex flex-wrap 	 ">
          <div className="w-full px-4 md:w-1/2 xl:w-1/2">
            <div className="relative mb-12">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://cdn.tailgrids.com/2.0/image/marketing/images/portfolio/portfolio-01/image-01.jpg"
                  alt="portfolio"
                  className="w-full"
                />
              </div>
              <div className="relative z-10 mx-7 -mt-20 rounded-lg bg-white py-9 px-3 text-center shadow-lg">
                <span className="text-primary mb-2 block text-lg font-semibold">
                  {first?.profile}
                </span>
                <h3 className="text-dark mb-4 text-xl font-bold">
                  {first?.name}
                </h3>
                <button
                  onClick={() => chooseDoctor(1)}
                  className="text-body-color hover:bg-primary hover:border-primary inline-block rounded-md border py-3 px-7 text-xl font-semibold transition hover:bg-indigo-500"
                >
                  Select
                </button>
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 xl:w-1/2">
            <div className="relative mb-12">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://cdn.tailgrids.com/2.0/image/marketing/images/portfolio/portfolio-01/image-02.jpg"
                  alt="portfolio"
                  className="w-full"
                />
              </div>
              <div className="relative z-10 mx-7 -mt-20 rounded-lg bg-white py-9 px-3 text-center shadow-lg">
                <span className="text-primary mb-2 block text-lg font-semibold">
                  {second?.profile}
                </span>
                <h2 className="text-dark mb-4 text-xl font-bold">
                  {" "}
                  {second?.name}
                </h2>
                <button
                  onClick={() => chooseDoctor(2)}
                  className="text-body-color hover:bg-primary hover:border-primary inline-block rounded-md border py-3 px-7 text-xl font-semibold transition ring-indigo-3400 hover:bg-indigo-500"
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
