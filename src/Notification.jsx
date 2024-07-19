import styles from "./Notification.module.css";
import React, {useState, useEffect, useContext} from "react";
import { DataContext } from "./DataProvider";

const Notification = () => {
    const [inputValue, setInputValue] = useState("");
    const [description, setDescription] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const {setTaskBeingAdded, setCurrentTaskName, setCurrentTaskDescription, updateTaskArray} = useContext(DataContext);

    const fadeOutNotification = () => {
        const notificationContainer = document.getElementById("notificationContainer");
        notificationContainer.classList.remove(styles.fadeOut);
        notificationContainer.classList.add(styles.fadeOut);
        setTimeout(() => setTaskBeingAdded(false), 500);
    };

    const addTask = () => {
        const taskName = inputValue;
        const taskDesc = description;
        setCurrentTaskName(taskName);
        setCurrentTaskDescription(taskDesc);

        updateTaskArray(prevTasks => [...prevTasks, { name: taskName, description: taskDesc }]);
        
        setInputValue("");
        setDescription("");

        fadeOutNotification();
    }

    useEffect(() => {
        const button = document.getElementById("button");

        if (inputValue.length < 1 && inputValue.trim() === "") {
            setIsButtonDisabled(true);
            button.classList.add(styles.disabled);
            button.classList.remove(styles.add);
        } 
        
        else if (inputValue.length >= 1 && inputValue.trim() !== "") {
            setIsButtonDisabled(false);
            const uppercaseInput = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
            setInputValue(uppercaseInput);
            button.classList.remove(styles.disabled);
            button.classList.add(styles.add);
        }
    }, [inputValue]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const notificationContainer = document.getElementById("notificationContainer");
            if (notificationContainer && event.target === notificationContainer) fadeOutNotification(); //if the click is ON the descriptionContainer (not on descriptionDisplay or anything)
        }

        document.addEventListener('mousedown', handleClickOutside); //mousedown makes sure the event is triggered at THE SECOND the mouse is on its "active" state

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    const handleButtonStatus = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div id="notificationContainer" className={styles.notificationContainer}>
            <div className={styles.notification}>
                <h1 className={styles.header}>New Task</h1>

                <div className={styles.relative}>
                    <input id="name" required className={`${styles.input} ${styles.name}`} type="text" value={inputValue} onChange={handleButtonStatus} maxLength="20" />
                    <label htmlFor="name" className={styles.label}>Name</label> <br />
                </div>

                <div>
                    <textarea id="description" className={`${styles.input} ${styles.description}`} value={description} onChange={(event) => setDescription(event.target.value)} />
                    <label className={styles.descriptionLabel} htmlFor="description">Description</label> <br />
                </div>

                <div>
                    <button id="button" onClick={addTask} disabled={isButtonDisabled} className={`${styles.button} ${isButtonDisabled ? styles.disabled : styles.add}`}>Add Task</button>
                </div>
            </div>
        </div>
    );
};

export default Notification;
