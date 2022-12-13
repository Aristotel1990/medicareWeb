import React from "react";

function DatePicker() {
  return (
    <div
      x-data
      x-init="flatpickr($refs.datetimewidget, {wrap: true, enableTime: true, dateFormat: 'M j, Y h:i K'});"
      x-ref="datetimewidget"
      class="flatpickr container mx-auto col-span-6 sm:col-span-6 mt-5"
    >
      <label
        for="datetime"
        class="flex-grow  block font-medium text-sm text-gray-700 mb-1"
      >
        Date and Time
      </label>
    </div>
  );
}

export default DatePicker;
