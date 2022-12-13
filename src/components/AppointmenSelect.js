import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "../redux/store";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { getAppointmentByDate, newAppointmen } from "../redux/slices/user";
import Modal from "./Modal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function AppointmenSelect({ date }) {
  const dispatch = useDispatch();

  const [interval, setInterval] = useState(1);
  const { appointmenList } = useSelector((state) => state.user);

  const [selected, setSelected] = useState(appointmenList[0]);

  const onselect = (value) => {
    setSelected(value);
    setInterval(value.id);
  };

  const handleSelect = () => {
    const { day, year, month } = date;
    dispatch(newAppointmen({ day, year, month, interval }));
  };
  return (
    <>
      <Listbox value={selected} onChange={onselect}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-gray-700 mt-10">
              Click to see all available appointments
            </Listbox.Label>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">{selected.name}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {appointmenList.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-indigo-600" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center justify-between ">
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {person.name}
                            </span>
                            <div>
                              {!person.active ? (
                                <span class="relative  px-3 py-1 font-semibold leading-tight text-green-900">
                                  <span
                                    aria-hidden="true"
                                    class="absolute inset-0 bg-green-200 rounded-full opacity-50"
                                  ></span>
                                  <span class="relative">Available</span>
                                </span>
                              ) : (
                                <span class="relative  px-3 py-1 font-semibold leading-tight text-green-900">
                                  <span
                                    aria-hidden="true"
                                    class="absolute inset-0 bg-red-300 rounded-full opacity-50"
                                  ></span>
                                  <span class="relative">Not Available</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      <div className="mt-10">
        <Modal onSubmit={handleSelect} />
      </div>
    </>
  );
}

export default AppointmenSelect;
