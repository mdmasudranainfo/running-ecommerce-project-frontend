import React from 'react'

const Advertise = () => {
  return (
    <div className="grid grid-cols-3 gap-x-3 mt-2">
      <div className="h-44 w-full">
        <img
          src="/image/slides-1.jpg"
          className="rounded-md h-full w-full object-cover"
        />
      </div>
      <div className="h-44 w-full">
        <img
          src="/image/slides-2.jpg"
          className="rounded-md h-full w-full object-cover"
        />
      </div>
      <div className="h-44 w-full">
        <img
          src="/image/slides-3.jpg"
          className="rounded-md h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

export default Advertise