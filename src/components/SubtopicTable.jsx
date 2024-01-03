import AddButton from "./AddButton";
import ArrowIcon from "./ArrowIcon";
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
      <div className="card w-70% bg-base-300 shadow-xl my-4">
        
        <div className="card-body items-center text-center">
            {/* Flexbox containing title and open button */}
            <div className="w-full flex justify-between">
                <div className="w-16"></div>
                <h2 className="card-title">Div</h2>
                <ArrowIcon/>
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

            <div className="w-full flex justify-around ">
                
                <div className="flex-col w-full mx-2">
                <label htmlFor="code">Code</label>
                <textarea name="code" className="w-full h-48 textarea textarea-bordered" ></textarea>
                </div>
                
                <div className="flex-col w-full mx-2">
                <label htmlFor="code">Notes</label>
                <textarea name="code" className="w-full h-48 textarea textarea-bordered"></textarea>
                </div>

            </div>

            <div className="divider"></div> 

            {/* Links Section */}
            <h3>Links</h3>
            <a className="link link-primary">google.com</a>
            <a className="link link-primary">example.com</a>
            <a className="link link-primary">test.com</a>

            <AddButton/>
        </div>
      </div>

      {/* Subtopic Note Card Open, Editable */}


    </div>
  );
}
