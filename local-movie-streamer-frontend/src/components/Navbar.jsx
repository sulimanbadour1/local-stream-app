import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

let NotAuthUser = [
  {
    id: "home",
    name: "Home",
    url: "/",
  },
  {
    id: "movies",
    name: "Movies & Series",
    url: "/movie_series",
  },
  {
    id: "login",
    name: "Login",
    url: "/login",
  },
  {
    id: "register",
    name: "Register",
    url: "/register",
  },
];

const AthUserTabs = [
  {
    id: "home",
    name: "Home",
    url: "/",
  },
  {
    id: "movies",
    name: "Movies & Series",
    url: "/movie_series",
  },
  {
    id: "profile",
    name: "Profile",
    url: "/profile",
  },
];
const NavBar1 = () => {
  const tabsRef = useRef([]);
  const [activeTabIndex, setActiveTabIndex] = useState(null);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const { user, logout } = useContext(UserContext);
  useEffect(() => {
    if (activeTabIndex === null) {
      return;
    }

    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    };

    setTabPosition();
  }, [activeTabIndex]);
  return (
    <div>
      <div
        className="relative mx-auto flex h-12 
      flex-row justify-center items-center w-fit mt-6 mb-12
      rounded-3xl border border-black/40 bg-neutral-800 px-2 backdrop-blur-sm"
      >
        <span
          className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-3xl py-2 transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        >
          <span className="h-full w-full rounded-3xl bg-gray-200/30" />
        </span>
        {user ? (
          <>
            {AthUserTabs.map((tab, index) => {
              const isActive = activeTabIndex === index;

              return (
                <Link to={tab.url} key={index}>
                  <button
                    ref={(el) => (tabsRef.current[index] = el)}
                    className={`${
                      isActive ? `` : `hover:text-neutral-300`
                    } my-auto cursor-pointer select-none text-xs md:text-base
                    rounded-full px-4 text-center font-light text-white`}
                    onClick={() => setActiveTabIndex(index)}
                  >
                    {tab.name}
                  </button>
                </Link>
              );
            })}
            <div
              className="hover:text-neutral-300 text-xs md:text-base
                     my-auto cursor-pointer select-none rounded-full px-4 text-center font-light text-white"
              onClick={logout}
            >
              Logout
            </div>
          </>
        ) : (
          <>
            {NotAuthUser.map((tab, index) => {
              const isActive = activeTabIndex === index;

              return (
                <Link to={tab.url} key={index}>
                  <button
                    ref={(el) => (tabsRef.current[index] = el)}
                    className={`${
                      isActive ? `` : `hover:text-neutral-300`
                    } my-auto cursor-pointer select-none text-xs md:text-base
                     rounded-full px-4 text-center font-light text-white`}
                    onClick={() => setActiveTabIndex(index)}
                  >
                    {tab.name}
                  </button>
                </Link>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar1;
