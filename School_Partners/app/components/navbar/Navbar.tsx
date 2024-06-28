import { SafeUser } from "@/app/types";

import Categories from "./Categories";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import ToggleListGrid from "./ToggleListGrid";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {

  const currentDate = new Date();
  const options = {
    weekday: 'long' as const,
    year: 'numeric' as const,
    month: 'long' as const,
    day: 'numeric' as const
    };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);


  return ( 
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-1
          border-b-[1px]
        "
      >
      <Container>
        <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
        >
          <Logo />
          <h2>
            Welcome Back! Today is - {formattedDate}
          </h2>
        
          <Search />
        
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
    </div>

    {currentUser && <Categories currentUser={currentUser} />}

  </div>
  );
}


export default Navbar;