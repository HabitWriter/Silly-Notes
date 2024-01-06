import { useAtomValue } from "jotai";
import { subtopicArrayAtom } from "../atom.js";

import SubtopicCard from "./SubtopicCard.jsx";


export default function SubtopicTable() {

    let data = useAtomValue(subtopicArrayAtom)
    console.log(data);
//   const [subtopicArray, setSubtopicArray] = useAtom(subtopicArrayAtom)

//   console.log(subtopicArray);


  return (
    <div className="w-full p-10 2xl:px-96">
        <SubtopicCard/>
    </div>
  );
}
