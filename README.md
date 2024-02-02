# Silly Notes
 An attempt at making my life easier with notes on coding topics.

 ## About the Project

### Why did you make this?
 The whole purpose of Silly Notes is to keep track of code, notes, ideas, and relevant links about coding topics. I'd often find myself using a great resource on Sequelize and then due to a microsoft update, losing that tab and wishing I could easily find it again.

 In addition to that I wanted space to store code examples and a little spot to write notes on the example to help myself (and my future forgetful self) understand the subject.

 Then I needed a good way to organize the notes, so I created filters based on parent topics.

 ### The techy bits

 Silly Notes is built on the PERN stack. With helpful tools from lodash, jotai for global state, and sequelize as an ORM. This helped me get experience with various tools as well as get a much better grasp on state management, routing, and interacting with a database.

 ### Struggles

 I did learn a bit of the woes of global state as it became a bit tougher to track what components were making changes against my wishes.

 I also should have done a better job of compartmentalizing my components to avoid monstrous walls of code (e.g. SubtopicVard.jsx and HeaderTopicDropdown.jsx). I may fix this in the future, but that depends on the willingness of future me.

 ## How to Run Silly Notes

 Silly Notes is built on the Pern stack. You'll need to have Postgres.

 Here are some useful commands:

 ```npm run seed```

 this will seed the database.

 Other than that, use standard commands to run it in the browser.

 I may add more here in the future.

 ## How Should I Use Silly Notes

 However you like. Hopefully it helps you build your coding knowledge and keep it in one easy to access spot.

 Add notes, topics, and links to your hearts content.

 ## Next Steps

 I'd really like to implement the following features:

 **Project Workflow** - giving you the ability to pin certain notes to different projects, making it easy to switch between projects and gather up the most relevant notes to the top of the list.

 **Note Search** - As your list on notes grows longer, I think search is just a needed feature. Plus this would give me a good excuse to learn more about search algorithms (though I'll probably start with the simplest choice).
