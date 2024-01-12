import { useState, useRef } from "react";
import AddButton from "../buttons/AddButton";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { topicArrayAtom, topicFilterAtom, subtopicArrayLengthAtom, subtopicArrayWriteableAtom} from "../../atom";

export default function HeaderTopicDropdown() {
    const [selected, setSelected] = useState("Filter Topics");
    const [subtopicArray, setSubtopicArray] = useAtom(subtopicArrayWriteableAtom);
    // Atom Hooks
    // const subtopicArrayLength = useAtomValue(subtopicArrayLengthAtom)
    const topicArray = useAtomValue(topicArrayAtom);
    const setFilterAtom = useSetAtom(topicFilterAtom)
    // Refs
    const subtopicArrayRef = useRef(subtopicArray)
    const subtopicArrayLengthRef = useRef(subtopicArray.length)
    const newArrayLengthRef = useRef(0)
    

    const setFilter = async (e) => {
      const topicId = parseInt(e.target.value);
      setFilterAtom(topicId)
      
      const subtopicArrayLength = subtopicArray.length
      
      
      // console.log("Ref Max length: " + subtopicArrayLengthRef.current);
      
      // If the array length is longer, 
      // a new note has been added, and the array ref needs to update. 
      // Otherwise keep it the same.
      if (subtopicArrayLength > subtopicArrayLengthRef.current) {
        subtopicArrayRef.current = await subtopicArray
        console.log(subtopicArrayRef.current);
        console.log("Changed Refs!");
        subtopicArrayLengthRef.current = subtopicArrayLength 
      }
      // If the current length is different than the previously
      // recorded newArrayLengthRef a note has been added and the array
      // ref needs to update.
      // Otherwise, keep it the same.
      console.log("initial array length: " + subtopicArrayLength);
      console.log("New Length: " + newArrayLengthRef.current);

      if (subtopicArrayLength > newArrayLengthRef.current) {
        console.log("Added while filtering");
        const currentArray = await subtopicArray
        const noteSet = new Set(subtopicArrayRef.current)
        const newNoteArray =[]
        currentArray.forEach((note) => noteSet.add(note));
        noteSet.forEach((note) => newNoteArray.push(note));
        subtopicArrayRef.current = newNoteArray.sort((a, b) => new Date(b.timeAccessed) - new Date(a.timeAccessed));
      }



      if (topicId != 0) {
        const filteredSubtopics = subtopicArrayRef.current.filter(subtopic => subtopic.topicId === topicId);
        setSubtopicArray(filteredSubtopics);
        newArrayLengthRef.current = filteredSubtopics.length
        // console.log("New Length: " + newArrayLengthRef.current);
      } else {
        const allSubtopics = subtopicArrayRef.current
        setSubtopicArray(allSubtopics)
        newArrayLengthRef.current = allSubtopics.length
        // console.log("New Length: " + newArrayLengthRef.current);
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
