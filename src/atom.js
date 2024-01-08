import { atom } from "jotai";
import axios from "axios";

export const subtopicArrayAtom = atom(
  async get => {
    const res = await axios.get("http://localhost:4090/all");
    return res.data;
  }
);

export const topicArrayAtom = atom(
  
  async get => {
    const res = await axios.get("http://localhost:4090/api/topic/all");
    return res.data;
  }
);

export const isAddingNoteAtom = atom(false)
export const isAddingTopic = atom(false) 
