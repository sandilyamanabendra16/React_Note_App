import vector from ".././assets/Vector.png";
import styles from "./CreateNote.module.css"
import {colors} from ".././assets/data/color";
import {getFirstLetters} from ".././assets/data/firstletter";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function CreateNote({groupNames ,selectedGroupName, notes, setInputTexts, inputTexts, submitNote, mainmenu}){

    
    const [color,setcolor]=useState(false);
    useEffect(()=>{
        if (!inputTexts[selectedGroupName]){
            setcolor(true);
        }
        else{
            setcolor(false);
        }
    },[inputTexts[selectedGroupName]])

    return <div className={styles.note}>
    <header>
    <FaArrowLeft className={styles.arrow} onClick={mainmenu} />
      <div className={styles.group}>
        <div
          className={styles.colorCircle}
          style={{
            backgroundColor:
              colors[
                groupNames.find(
                  (group) => group.name === selectedGroupName
                ).colorIndex
              ],
          }}
        >
          {getFirstLetters(selectedGroupName)}
        </div>
        <div className={styles.groupName}>{selectedGroupName}</div>
      </div>
    </header>
    <div className={styles.mid}>
      {notes[selectedGroupName] && notes[selectedGroupName].map((note, index) => (
        <div key={index} className={styles.notes1}>
          <p>{note.text}</p>
          <p className={styles.dateTime}>{note.dateTime}</p>
        </div>
      ))}
    
    </div>
    <footer>
      <textarea
        value={inputTexts[selectedGroupName] || ''}
        onChange={(e) =>
          setInputTexts({
            ...inputTexts,
            [selectedGroupName]: e.target.value,
          })
        }
        placeholder={'Type your note here'}
      />
      <button className={color ? styles.submit2:styles.submit} onClick={submitNote}>
        <img src={vector} alt="submit button" />
      </button>
      </footer>
  </div>
}