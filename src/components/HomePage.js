import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getTowDoctors } from "../redux/slices/user";
import { useDispatch } from "../redux/store";

function HomePage() {
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTowDoctors());
  }, []);
  return (
    <div className="isolate bg-white">
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
            <div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight  text-blue-600 sm:text-center sm:text-6xl mb-5">
                  Hello {user.firstName}
                </h1>
                <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                  Welcome to Medicare
                </h1>
                <p className="mt-6  text-2xl leading-8 text-gray-600 sm:text-center">
                  You can proceed to choose one of our doctors, who will assist
                  you during your appointments
                </p>
                <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <Link
                    to={"/select"}
                    className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                  >
                    Select a Doctor
                    <span className="text-indigo-200" aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
