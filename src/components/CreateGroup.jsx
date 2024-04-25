import react ,{useState} from "react";
import {colors} from ".././assets/data/color";
import styles from "./CreateGroup.module.css"

export default function CreateGroup({noteHeading, setNoteHeading, setSelectedColorIndex, handleCreateGroup, popupRef}){

    return <div ref={popupRef} className={styles.popup}>
          <h3> Create New Group</h3>
          <div className={styles.input1}>
          <label className={styles.groupName}> Group Name</label>
          <input
            type="text"
            placeholder="Enter Group name"
            value={noteHeading}
            onChange={(event)=>setNoteHeading(event.target.value)}
          />
          </div>
          <div className={styles.colorContainer}>
            <span>Choose Color</span>
            {colors.map((color, index) => (
              <div
                key={index}
                className={styles.colordivs}
                style={{ backgroundColor: colors[index] }}
                onClick={() =>{ setSelectedColorIndex(index)}}
              ></div>
            ))}
          </div>
          <br />
          <div className={styles.groupbutton}>
          <button onClick={handleCreateGroup}> Create </button>
          </div>
        
          </div>

}