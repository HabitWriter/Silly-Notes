import TopicDropdown from "./TopicDropdown";

export default function SubtopicTable() {
  return (
    <div className="w-full p-10">
      {/* Subtopic Note Card closed */}

      <div className="card w-70% bg-base-300 shadow-xl my-4">
        
        <div className="card-body items-center text-center">
            {/* Flexbox containing title and open button */}
            <div className="w-full flex justify-between">
                <div className="w-16"></div>
                <h2 className="card-title">Div</h2>
                <button className=" w-16 btn btn-ghost">Open</button>
            </div>

        </div>
      </div>

      {/* Subtopic Note Card Open */}

      <div className="card w-70% bg-base-300 shadow-xl my-4">
        
        <div className="card-body items-center text-center">
            
            {/* Flexbox containing title and open button */}
            <div className="w-full flex justify-between">
                <div className="w-16"></div>
                <h2 className="card-title">Div</h2>
                <button className=" w-16 btn btn-ghost">Close</button>
            </div>

            <div className="divider"></div> 

            <TopicDropdown />

            {/* Code example and Notes Flex */}

            <div className="w-full flex justify-around">
                <textarea className="w-full h-48 mx-2 textarea textarea-bordered" placeholder="Code"></textarea>
                <textarea className="w-full h-48 mx-2 textarea textarea-bordered" placeholder="Notes"></textarea>

            </div>

            <div className="divider"></div> 

            <textarea className="w-full h-48 mx-2 textarea textarea-bordered" placeholder="Links"></textarea>


        </div>
      </div>

      {/* Subtopic Note Card Open, Editable */}


    </div>
  );
}
