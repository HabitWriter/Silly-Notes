import { useState, } from "react";
import AddButton from "../buttons/AddButton";
import { useAtomValue } from "jotai";
import { topicArrayAtom } from "../../atom";

export default function HeaderTopicDropdown() {
  const [selected, setSelected] = useState("Filter Topics");
  
  const topicArray = useAtomValue(topicArrayAtom);
  
  const getTopicTitle = (e) => {
    const chosenTopic = topicArray.find((topic) => topic.topicId == e.target.value)
    return chosenTopic.title           
    
  }
  
  
  return (
      <div className="dropdown dropdown-end">
          <div tabIndex="0" role="button" className={`btn w-40 m-1`}>
              {selected}
          </div>
          <div
              tabIndex="0"
              className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-base-300"
          >
              <div className="card-body flex items-center">
                  
                  {/* The Select Box */}
                  <select
                      className="select select-ghost w-full max-w-xs"
                      defaultValue={"Topics"}
                      onChange={(e) => {setSelected(getTopicTitle(e))}}
                  >
                      {topicArray.map(function (topic) {
                        return (
                          <option key={topic.topicId} value={topic.topicId}>{topic.title}</option>
                        )
                      })}
                      
                  </select>
                  <AddButton />
              </div>
          </div>
      </div>
  );
}