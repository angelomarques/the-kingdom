import Experiencebar from "./Experiencebar";
import Navbar from "./Navbar";
import UserInfo from "./UserInfo";

function AppHeader() {
  return (
    <header className="appHeader">
      <Navbar />
      <Experiencebar />
      <UserInfo/>
    </header>
  );
}

export default AppHeader;
