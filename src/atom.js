import { atom } from "jotai";
import axios from "axios";

export const subtopicArrayAtom = atom(
  async get => {
    const res = await axios.get("http://localhost:4090/all");
    return res.data;
  }
);
