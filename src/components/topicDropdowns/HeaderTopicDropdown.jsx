import { useState, useRef } from "react";
import AddButton from "../buttons/AddButton";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { topicArrayAtom, topicFilterAtom, subtopicArrayWriteableAtom, subtopicFilteredWriteableAtom} from "../../atom";

export default function HeaderTopicDropdown() {
    const [selected, setSelected] = useState("Filter Topics");
    const [subtopicArray, setSubtopicArray] = useAtom(subtopicArrayWriteableAtom);
    const [subtopicFiltered, setSubtopicFiltered] = useAtom(subtopicFilteredWriteableAtom);

    // Atom Hooks
    const topicArray = useAtomValue(topicArrayAtom);
    const setFilterAtom = useSetAtom(topicFilterAtom)
    // Refs
    // const subtopicArrayRef = useRef(subtopicFiltered)
    const subtopicArrayRef = useRef(subtopicFiltered)
    const subtopicArrayLengthRef = useRef(subtopicFiltered.length)
    const newArrayLengthRef = useRef(0)
    

    const setFilter = async (e) => {
      const topicId = parseInt(e.target.value);
      setFilterAtom(topicId)
      
      const subtopicArrayLength = subtopicFiltered.length
      
      // If the array length is longer, 
      // a new note has been added, and the array ref needs to update. 
      // Otherwise keep it the same.
      if (subtopicArrayLength > subtopicArrayLengthRef.current) {
        
        setSubtopicArray(await subtopicFiltered)
        
        subtopicArrayRef.current = await subtopicFiltered
        subtopicArrayLengthRef.current = subtopicArrayLength 
      }
      // If the current length is larger than the previously
      // recorded newArrayLengthRef a note has been added and the array
      // ref needs to update.
      // Otherwise, keep it the same.

      if (subtopicArrayLength > newArrayLengthRef.current) {
        const currentArray = await subtopicFiltered
        // const noteSet = new Set(subtopicArrayRef.current)
        const noteSet = new Set(subtopicArrayRef.current)
        const newNoteArray =[]
        currentArray.forEach((note) => noteSet.add(note));
        noteSet.forEach((note) => newNoteArray.push(note));
        setSubtopicArray(newNoteArray.sort((a, b) => new Date(b.timeAccessed) - new Date(a.timeAccessed)));
        subtopicArrayRef.current = newNoteArray.sort((a, b) => new Date(b.timeAccessed) - new Date(a.timeAccessed));
      }

      // If current length is smaller than the previously recorded
      // newArrayLengthRef a note has had a filter change
      // or has been deleted.
      // If an item in the current array has had an item change its
      // set topic, and there is a filter being applied,
      // remove the item from view, 
      // and update the subtopicArrayRef with the accurate information


      if (topicId != 0) {
        const filteredSubtopics = subtopicArrayRef.current.filter(subtopic => subtopic.topicId === topicId);
        setSubtopicFiltered(filteredSubtopics);
        newArrayLengthRef.current = filteredSubtopics.length

      } else {
        const allSubtopics = subtopicArrayRef.current
        setSubtopicFiltered(allSubtopics)
        newArrayLengthRef.current = allSubtopics.length

      }

    }

    const getTopicTitle = (e) => {
      const topicId = parseInt(e.target.value);
      if (topicId !== 0) {  
        const chosenTopic = topicArray.find(
            (topic) => topic.topicId === topicId);
        return chosenTopic.title;
      
      } else {
        return "Filter Topics"
      }
    };

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
                        onChange={(e) => {
                            setSelected(getTopicTitle(e));
                            setFilter(e);
                        }}
                    > 
                      <option value="0">All</option>
                        {topicArray.map(function (topic) {
                            return (
                                <option
                                    key={topic.topicId}
                                    value={topic.topicId}
                                >
                                    {topic.title}
                                </option>
                            );
                        })}
                    </select>
                    <AddButton
                        clickAction={() => {
                            return;
                        }}
                        title={"New Topic"}
                    />
                </div>
            </div>
        </div>
    );
}
