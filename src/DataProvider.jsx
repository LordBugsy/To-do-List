import React, { createContext, useState } from "react";

//we call "DataContext" the variable that will hold all of the variables created in DataProvider. If the program wants to consume the selected values, then you will have
//to write: const {whateverYouWantToNameThis} = useContext(DataContext);
export const DataContext = createContext();


//this file is the most important, without it, passing datas would had to be done through props. It does work if you had to pass it through props but this is very tedious
const DataProvider = ({ children }) => {
    const [descriptionVisible, setDescriptionVisible] = useState(false);
    const [taskBeingAdded, setTaskBeingAdded] = useState(false);
    const [currentTaskName, setCurrentTaskName] = useState("");
    const [currentTaskDescription, setCurrentTaskDescription] = useState("");
    const [taskArray, updateTaskArray] = useState([{name: "Do the dishes", description: "Make sure the cat doesn't eat the pineapple"}, {name: "Find the One Piece", description: "I'm bored so why not?"}, {name: "Clone LordBugsy's Git Repository", description: "Thank you for using my To do list! It took me a lot of time to do this! Also, I added comments in my code to help you understand why I did this and not that.. And even if you still can't understand with the comments, you are allowed to use ChatGPT or ask someone else! Anyway, have a good day! :)"}, {name: "Meet Cristiano Ronaldo", description: "Meet Messi too"}]);
    const [taskIndex, updateCurrentTaskIndex] = useState(0);

    return (
        <DataContext.Provider value={{ descriptionVisible, setDescriptionVisible, taskBeingAdded, setTaskBeingAdded, currentTaskName, setCurrentTaskName, currentTaskDescription, setCurrentTaskDescription, taskArray, updateTaskArray, taskIndex, updateCurrentTaskIndex }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;