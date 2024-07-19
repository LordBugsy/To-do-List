import React, {useEffect, useContext} from 'react';
import styles from './Description.module.css'
import { DataContext } from "./DataProvider";

const Description = (props) => {
    const {setDescriptionVisible} = useContext(DataContext);
    const uppercaseValues = text => {
        if (text === "") return 'No informations';
        else return text.charAt(0).toUpperCase() + text.slice(1);
    }

    const closeDescription = () => {
        const descriptionContainer = document.getElementById("descriptionContainer");
        descriptionContainer.classList.remove(styles.fadeOut);
        descriptionContainer.classList.add(styles.fadeOut);
        setTimeout(() => {
            setDescriptionVisible(false);
        }, 500);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const descriptionContainer = document.getElementById("descriptionContainer");
            if (descriptionContainer && event.target === descriptionContainer) closeDescription(); //if the click is ON the descriptionContainer (not on descriptionDisplay or anything)
        }

        document.addEventListener('mousedown', handleClickOutside); //mousedown makes sure the event is triggered at THE SECOND the mouse is on its "active" state

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    return (
        <div id='descriptionContainer' className={styles.descriptionContainer}>
            <div className={styles.descriptionDisplay}>
                <h1 className={styles.header}>{props.name}</h1>
                <div className={styles.description}>
                    <h1 className={styles.descriptionInfo}>{uppercaseValues(props.description)}</h1>
                </div>
                <button onClick={closeDescription} className={`${styles.button} ${styles.remove}`}>X</button>
                <button onClick={closeDescription} className={`${styles.closeButton}`}>Close</button>
            </div>
            
        </div>
    );
}

export default Description