import { atom } from "jotai";
import axios from "axios";

// Subtopic Atoms
const subtopicArrayAtom = atom(
  async get => {
    const res = await axios.get("http://localhost:4090/all");
    return res.data;
  }
);

const subtopicArrayOrderedAtom = atom(async (get) => {
  const subtopicArray = await get(subtopicArrayAtom);
  return subtopicArray.sort((a, b) => new Date(b.timeAccessed) - new Date(a.timeAccessed));
});

const overwrittenSubtopicArrayAtom = atom(null)

export const subtopicArrayWriteableAtom = atom(
  (get) => get(overwrittenSubtopicArrayAtom) ?? get(subtopicArrayOrderedAtom),
  (get, set, newValue) => {
    const nextValue =
      typeof newValue === 'function' ? newValue(get(subtopicArrayWriteableAtom)) : newValue
    set(overwrittenSubtopicArrayAtom, nextValue)
  },
)

export const subtopicArrayLengthAtom = atom((get) => get(subtopicArrayWriteableAtom).length)


// Topic Atoms
export const topicArrayAtom = atom(
  
  async get => {
    const res = await axios.get("http://localhost:4090/api/topic/all");
    return res.data;
  }
);


export const topicFilterAtom = atom(0)
export const isAddingNoteAtom = atom(false)
export const isAddingTopicAtom = atom(false) 
export const newNoteTopicAtom = atom(0)
