import AddButton from './buttons/AddButton'
import SubtopicTable from './SubtopicTable'
import HeaderTopicDropdown from './topicDropdowns/HeaderTopicDropdown'
import { useSetAtom } from 'jotai'
import { isAddingNoteAtom } from '../atom'

export default function HeaderDrawer() {
    
    const setIsAddingNote = useSetAtom(isAddingNoteAtom)

    return (
      <>
      
      <div className="drawer">
    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
    <div className="drawer-content flex flex-col">

      {/* <!-- Navbar --> */}
      <div className="w-full navbar bg-base-300">
        <div className="flex-none">
          <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div> 
        <div className="flex-1 px-2 mx-2 text-xl">Silly Notes</div>
        <div className="flex justify-end">
            
            <HeaderTopicDropdown/>
            
            <input type="text" placeholder="Search Notes" className="input input-bordered w-full max-w-xs mx-4" />
            
            <AddButton clickAction={() => setIsAddingNote(true)}/>
        </div>
      </div>

      {/* <!-- Page content here --> */}
      <SubtopicTable/>
    </div> 


    <div className="drawer-side">
      <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
      <ul className="menu p-4 w-80 min-h-full bg-base-200">

        {/* <!-- Sidebar content here --> */}
        <li><a>Project 1</a></li>
        <li><a>Project 2</a></li>
      </ul>
    </div>
  </div>
  </>
  )
}