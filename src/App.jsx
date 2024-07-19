import Notification from "./Notification"
import Todolist from "./Todolist"
import Description from "./Description"
import DataProvider, { DataContext } from "./DataProvider"
import React, {useContext} from "react"

function App() {
  return (
    <>
    {/*in order to pass the datas from DataProvider to the App, i have to create another component and use it as the "default" App that will be rendered */}
      <DataProvider>
        <MainApp />
      </DataProvider>
    </>
  )
}

function MainApp() {
  const {descriptionVisible, taskBeingAdded, taskIndex, taskArray} = useContext(DataContext);

  return (
    <>
      <Todolist />
      {/* since a Component will always return true, I use a boolean value to control how the page will look like. Below, if "taskBeingAdded" is equal to true, then  the <Notification /> component will be rendered! */}
      {taskBeingAdded && <Notification />}
      {descriptionVisible && <Description index={taskIndex} name={taskArray[taskIndex].name} description={taskArray[taskIndex].description} />}
    </>
  );
}

export default App
