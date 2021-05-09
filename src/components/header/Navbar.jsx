import { IconButton } from "@material-ui/core";
import { useState } from "react";
import { RiSettingsLine } from "react-icons/ri";
import { VscMenu } from "react-icons/vsc";
import { IoMapOutline, IoCloseOutline } from "react-icons/io5";
import { CgAlarm, CgNotes } from "react-icons/cg";

import {useModalContext} from '../../contexts/ModalContext'

import styles from "../../styles/components/Navbar.module.scss";

function Navbar() {
  const [currentSection, setCurrentSection] = useState("pomodoro");
  const [isVisble, setIsVisible] = useState(false);
  const { settingsModalClass, setSettingsModalClass } = useModalContext();

  const iconClass = (section) => {
    if (section == currentSection) {
      return `${styles.navbar__link} ${styles.isActive}`;
    }
    if (isVisble) {
      return `${styles.navbar__link} fade-in`;
    }
    return `${styles.navbar__link} ${styles.isNotVisible}`;
  };

  function toggleMenu() {
    setIsVisible(!isVisble);

    if (!isVisble) {
      animateNavbar(true);
      return;
    }
    animateNavbar(false);
  }

  const [navClass, setNavClass] = useState(styles.navbar);

  function animateNavbar(growing) {
    if (growing) {
      setNavClass(`${styles.navbar} ${styles.resizeGrow}`);
      setTimeout(() => {
        setNavClass(`${styles.navbar} ${styles.resized}`);
      }, 200);
      return;
    }
    
    setNavClass(`${styles.navbar} ${styles.resizeShrink}`);
      setTimeout(() => {
        setNavClass(styles.navbar);
      }, 200);
  }

  function toggleSettings(){
    if(settingsModalClass == 'fade-in modal'){
      setSettingsModalClass("fade-out modal");
      return;
    }
    setSettingsModalClass('fade-in modal')
  }

  return (
    <nav className={navClass}>
      <div className={styles.navbar__content}>
        <IconButton
          onClick={toggleMenu}
          classes={{ root: styles.navbar__link }}
          aria-label="menu"
          title="menu"
        >
          {isVisble ? (
            <IoCloseOutline className="buttonIcons" />
          ) : (
            <VscMenu className="buttonIcons" />
          )}
        </IconButton>

        <IconButton
          onClick={toggleSettings}
          classes={{ root: iconClass("settings") }}
          aria-label="settings"
          title="settings"
        >
          <RiSettingsLine className="buttonIcons" />
        </IconButton>

        <IconButton
          classes={{ root: iconClass("mapHistory") }}
          aria-label="mapHistory"
          title="mapHistory"
        >
          <IoMapOutline className="buttonIcons" />
        </IconButton>

        <IconButton
          classes={{ root: iconClass("todo-app") }}
          aria-label="todo-app"
          title="todo-app"
        >
          <CgNotes className="buttonIcons" />
        </IconButton>

        <IconButton
          classes={{ root: iconClass("pomodoro") }}
          aria-label="pomodoro"
          title="pomodoro"
        >
          <CgAlarm className="buttonIcons" />
        </IconButton>
      </div>
    </nav>
  );
}

export default Navbar;
