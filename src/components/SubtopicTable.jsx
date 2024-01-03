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


      {/* Subtopic Note Card closed */}

      <div className="card w-70% bg-base-300 shadow-xl my-4">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Div</h2>
          <TopicDropdown />
          <div className="card-actions"></div>
        </div>
      </div>
    </div>
  );
}
