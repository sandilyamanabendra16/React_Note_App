import React, { useState, useEffect,useRef } from "react";
import bgimg from ".././assets/image-removebg-preview1.png";
import styles from "./dashboard.module.css";
import CreateGroup from "./CreateGroup";
import {colors} from ".././assets/data/color";
import CreateNote from "./CreateNote";
import {getFirstLetters} from ".././assets/data/firstletter";
import {formatDate} from ".././assets/data/formatDate";



function Dashboard() {
  const [group, setGroup] = useState(false);
  const [noteHeading, setNoteHeading] = useState("");
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const [groupNames, setGroupNames] = useState([]);
  const [inputTexts, setInputTexts] = useState({});
  const [notes, setNotes] = useState({});
  const [selectedGroupName, setSelectedGroupName] = useState(null);


  const submitNote = () => {
    if (!inputTexts[selectedGroupName]) return; // Prevent submitting empty notes
    const formattedDate = formatDate();
    const newNote = { text: inputTexts[selectedGroupName], dateTime: formattedDate };
    setNotes({ ...notes, [selectedGroupName]: [...(notes[selectedGroupName] || []), newNote] });
    setInputTexts({ ...inputTexts, [selectedGroupName]: '' }); // Clear input text
    localStorage.setItem("notes", JSON.stringify({ ...notes, [selectedGroupName]: [...(notes[selectedGroupName] || []), newNote] }));
  };

  const handlenote = () => {
    setGroup(true);
  };
  const handlePlusButtonClick = () => {
    setGroup(false); // Reset group state to close the popup
    handlenote(); // Show the popup again
};


  const handleCreateGroup = (e) => {
    e.preventDefault();

    if(!selectedColorIndex && !noteHeading){
      alert("Please Enter Group name and choose color");
      return;
    }
    if(!selectedColorIndex){
      alert("Please Choose Color");
      return;
    }
    if(!noteHeading){
      alert("Please Enter Group name");
      return;
    }
   

    const newGroup = {
      name: noteHeading,
      colorIndex: selectedColorIndex,
    };
    
    setGroupNames([...groupNames,newGroup]);
    setInputTexts({ ...inputTexts, [noteHeading]: '' }); // Initialize input text for the new group
    setNotes({ ...notes, [noteHeading]: [] }); // Initialize notes for the new group
    setGroup(false);
    setNoteHeading("");
    setSelectedColorIndex(null);
    localStorage.setItem("GroupNames",JSON.stringify([...groupNames,newGroup]));
  
  };

  const handleNotes = (groupName) => {
    setSelectedGroupName(groupName);
    setGroup(false);
  };
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setGroup(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

const mainmenu=()=>{
  setSelectedGroupName(null);
}

useEffect(() => {
  const storedGroups = localStorage.getItem("GroupNames");
  console.log(storedGroups);
  if (storedGroups) {
    setGroupNames(JSON.parse(storedGroups));
  }
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    setNotes(JSON.parse(storedNotes));
  }
}, []);

  return (
    <div className={styles.app}>
      <div className={selectedGroupName? styles.left1:styles.left}>
        <h1> Pocket Notes </h1>
        {groupNames.map((group, index) => (
          <div key={index} className={styles.group} onClick={() => handleNotes(group.name)}>
            <div
              className={styles.colorCircle}
              style={{ backgroundColor: colors[group.colorIndex] }}
            >
              {getFirstLetters(group.name)}
            </div>
            <div
              className={styles.groupName}
            >
              {group.name}
            </div>
          </div>
        ))}
        <button onClick={handlePlusButtonClick}> + </button>
      </div>
      {group? (
        <CreateGroup className={styles.creategroup} noteHeading={noteHeading} setNoteHeading={setNoteHeading} setSelectedColorIndex={setSelectedColorIndex} handleCreateGroup={handleCreateGroup} popupRef={popupRef}/>
      ):null}
      <div className={ selectedGroupName? styles.right1: styles.right}>
        {selectedGroupName? (
          
          <CreateNote className={styles.createNote} groupNames={groupNames} selectedGroupName={selectedGroupName} notes={notes} setInputTexts={setInputTexts} inputTexts={inputTexts} submitNote={submitNote} mainmenu={mainmenu} />
          
        ):(<div className={styles.right1}>
          <img src={bgimg} alt="bgimg" />
          <div className={styles.pocket}>
            <h1> Pocket Notes</h1>
            <p>
              Send and receive messages without keeping your phone online. Use
              Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
          </div>
          </div>)}
        
      </div>
    </div>
  );
}

export default Dashboard;
