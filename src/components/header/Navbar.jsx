import styles from "../../styles/components/Navbar.module.scss";

import { IconButton } from "@material-ui/core";
import {
  Menu,
  Map,
  MenuBook,
  AlarmOn,
  SettingsOutlined,
} from "@material-ui/icons";

function Navbar({ currentPage }) {
  return (
    <nav className={styles.navbar}>
      <IconButton classes={{ root: styles.navbar__link }} aria-label="menu">
        <Menu classes={{ root: "buttonIcons" }} />
      </IconButton>

      <IconButton classes={{ root: styles.navbar__link }} aria-label="settings">
        <SettingsOutlined classes={{ root: "buttonIcons" }} />
      </IconButton>

      <IconButton classes={{ root: styles.navbar__link }} aria-label="mapHistory" >
        <Map classes={{ root: "buttonIcons" }} />
      </IconButton>

      <IconButton classes={{ root: styles.navbar__link }} aria-label="to-doApp">
        <MenuBook classes={{ root: "buttonIcons" }} />
      </IconButton>

      <IconButton classes={{ root: styles.navbar__link }} aria-label="pomodoro">
        <AlarmOn classes={{ root: "buttonIcons" }} />
      </IconButton>
    </nav>
  );
}

export default Navbar;
