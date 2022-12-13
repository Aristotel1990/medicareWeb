import React, { useEffect, useState } from "react";
import user, {
  deleteAppointment,
  getAllppointment,
  reRender,
} from "../redux/slices/user";
import { useSelector, useDispatch } from "../redux/store";
import { formatInterval } from "../utils/jwt";
import DeleteAppointment from "./DeleteAppointment";

function ListAppointment() {
  const dispatch = useDispatch();

  const {
    myAppointment: list,
    user,
    status,
  } = useSelector((state) => state.user);

  const handleSelect = async (id) => {
    try {
      await deleteAppointment(id);
      dispatch(reRender());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(getAllppointment());
  }, [status]);
  return (
    <div class=" p-4 mb-4 bg-white shadow-lg rounded-2xl dark:bg-gray-800">
      <div class="py-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl mb-10">
          My Appointments
        </h1>
        <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Patient
                  </th>
                  <th
                    scope="col"
                    class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Doctor
                  </th>
                  <th
                    scope="col"
                    class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Date Of Appointment
                  </th>
                  <th
                    scope="col"
                    class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Interval
                  </th>
                  <th
                    scope="col"
                    class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {list?.map((person) => (
                  <tr>
                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <div class="flex items-center">
                        <div class="ml-3">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {person?.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p class="text-gray-900 whitespace-no-wrap">
                        {user.dactorName}
                      </p>
                    </td>
                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p class="text-gray-900 whitespace-no-wrap">
                        {person.day}/{person.month}/{person.year}
                      </p>
                    </td>
                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <span class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                        <span
                          aria-hidden="true"
                          class="absolute inset-0 bg-green-200 rounded-full opacity-50"
                        ></span>
                        <span class="relative">
                          {formatInterval(person.interval)}
                        </span>
                      </span>
                    </td>
                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <span class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                        <span
                          aria-hidden="true"
                          class="absolute inset-0 bg-green-200 rounded-full opacity-50"
                        ></span>
                        <span class="relative">active</span>
                      </span>
                    </td>
                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <DeleteAppointment
                        onSubmit={() => handleSelect(person.nr)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListAppointment;
