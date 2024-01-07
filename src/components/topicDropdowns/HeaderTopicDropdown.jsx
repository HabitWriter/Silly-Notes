import { useState } from 'react';
import AddButton from '../buttons/AddButton';

export default function HeaderTopicDropdown() {


  return (
<div className="dropdown dropdown-end">
  <div tabIndex="0" role="button" className="btn m-1">Topics</div>
  <div tabIndex="0" className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-base-300">
    <div className="card-body flex items-center">
      <select className="select select-ghost w-full max-w-xs" defaultValue={"Topics"}>
        {/* Get values from server in the future */}
        {/* <option disabled selected>Topics</option> */}
        <option>HTML</option>
        <option>JS</option>
        <option>CSS</option>

    // </select>
    <AddButton/>
    </div>
  </div>
</div>
    
  );
}