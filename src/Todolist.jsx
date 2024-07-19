//Of course, make sure to call 'useContext' to consume the values in a created context.
import React, { useContext, useState } from "react";
import styles from './Todolist.module.css';
import { DataContext } from "./DataProvider";

const Todolist = () => {
    const {setTaskBeingAdded, setDescriptionVisible, setCurrentTaskName, setCurrentTaskDescription, taskArray, updateTaskArray, updateCurrentTaskIndex} = useContext(DataContext);
    const [taskName, addTask] = useState("");

    const setDescriptionProps = (index, taskName, taskDescription) => {
        updateCurrentTaskIndex(index);
        setCurrentTaskName(taskName);
        setCurrentTaskDescription(taskDescription);
        setDescriptionVisible(true)
    }

    const deleteTask = index => {
        const updatedTasks = taskArray.filter((_element, i) => i !== index);
        updateTaskArray(updatedTasks);
    }

    const moveTaskUp = index => {
        if (index > 0) {
            const updatedTasks = [...taskArray];
            [updatedTasks[index], updatedTasks[index -1]] = [updatedTasks[index -1], updatedTasks[index]];
            updateTaskArray(updatedTasks);
        }
    }

    const moveTaskDown = index => {
        if (index < taskArray.length -1) {
            const updatedTasks = [...taskArray];
            [updatedTasks[index], updatedTasks[index +1]] = [updatedTasks[index +1], updatedTasks[index]];
            updateTaskArray(updatedTasks);
        }
    }

    return (
            <div className={styles.toDoListContainer}>
                <h1 className={styles.header}>To-Do List</h1>
                <div className={styles.toDoList}>
                    <div onClick={() => setTaskBeingAdded(true)} className={styles.addTask}>
                        <input readOnly className={styles.input} type="text" id="inputBox" value={taskName} onChange={(event) => addTask(event.target.value)} />
                        <button className={`${styles.button} ${styles.add}`}>Add</button>
                    </div>

                    {/* tasks */}
                    <hr />

                    <div className={styles.tasks}>

                        {taskArray.length === 0 && <h1 className={styles.noTasks}>No tasks added yet.</h1>}

                        <ul>
                            {taskArray.map((element, index) => 
                            <li className={styles.taskDisplay} key={index}>
                                <p className={styles.taskName}>{element.name}</p>
                                <i onClick={() => setDescriptionProps(index, element.name, element.description)} className={`ri-information-line ${styles.description}`}></i>
                                <div className={styles.controls}>
                                    <button onClick={() => setDescriptionProps(index, element.name, element.description)} className={`${styles.controlButton} ${styles.info}`}>?</button>
                                    <button onClick={() => deleteTask(index)} className={`${styles.controlButton} ${styles.delete}`}><i className="ri-delete-bin-line"></i></button>
                                    <button onClick={() => moveTaskUp(index)} className={`${styles.controlButton} ${index === 0 ? styles.invisible : styles.arrowUp}`}><i className="ri-arrow-up-line"></i></button>
                                    <button onClick={() => moveTaskDown(index)} className={`${styles.controlButton} ${index === taskArray.length -1 ? styles.invisible : styles.arrowDown}`}><i className="ri-arrow-down-line"></i></button>
                                </div>
                            </li> 
                            )}
                        </ul>
                    </div>
                </div>

                <div className='copyright'>
                    <p>Copyright © {new Date().getFullYear()} LordBugsy. All Rights Reserved.</p>
                </div>
            </div>
    );
}

export default Todolist