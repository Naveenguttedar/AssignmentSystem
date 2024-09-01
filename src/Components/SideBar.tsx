import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { UserContext } from "../Context";
export default function SideBar() {
  const data = useContext(UserContext);
  const UserRole = data?.userRole;
  const buttonStyle =
    "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all  active:text-blue-900 outline-none hover:bg-blue-50 hover:bg-opacity-80  hover:text-blue-900";
  const activeButton = twMerge(
    "flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all  active:text-blue-900 outline-none",
    "bg-blue-100   ",
  );
  if (UserRole == "STUDENT") {
    return (
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
            Student Dashboard
          </h5>
        </div>
        <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
          <NavLink
            to={"myAssignments"}
            className={({ isActive }) =>
              isActive ? activeButton : buttonStyle
            }
          >
            <div className="grid place-items-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"></path>
              </svg>
            </div>
            Todays's Assignments
          </NavLink>
        </nav>
      </div>
    );
  }
  return (
    <div className="relative flex flex-col bg-gray-50 bg-clip-border rounded-xl  text-gray-700 h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
          Dashboard
        </h5>
      </div>
      <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
        <NavLink
          to={"myAssignments"}
          className={({ isActive }) => (isActive ? activeButton : buttonStyle)}
        >
          <div className="grid place-items-center mr-4">
            <svg
              fill="#000000"
              className="w-5 h-5"
              viewBox="0 0 256 256"
              id="Flat"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path d="M213.65723,66.34326l-40-40A8.00076,8.00076,0,0,0,168,24H88A16.01833,16.01833,0,0,0,72,40V56H56A16.01833,16.01833,0,0,0,40,72V216a16.01833,16.01833,0,0,0,16,16H168a16.01833,16.01833,0,0,0,16-16V200h16a16.01833,16.01833,0,0,0,16-16V72A8.00035,8.00035,0,0,0,213.65723,66.34326ZM136,192H88a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Zm0-32H88a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Zm64,24H184V104a8.00035,8.00035,0,0,0-2.34277-5.65674l-40-40A8.00076,8.00076,0,0,0,136,56H88V40h76.68652L200,75.314Z"></path>{" "}
              </g>
            </svg>
          </div>
          My Assiments
        </NavLink>
        <NavLink
          to={"addAssignment"}
          role="button"
          className={({ isActive }) => (isActive ? activeButton : buttonStyle)}
        >
          <div className="grid place-items-center mr-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M21.1938 2.80624C22.2687 3.88124 22.2687 5.62415 21.1938 6.69914L20.6982 7.19469C20.5539 7.16345 20.3722 7.11589 20.1651 7.04404C19.6108 6.85172 18.8823 6.48827 18.197 5.803C17.5117 5.11774 17.1483 4.38923 16.956 3.8349C16.8841 3.62781 16.8366 3.44609 16.8053 3.30179L17.3009 2.80624C18.3759 1.73125 20.1188 1.73125 21.1938 2.80624Z"
                  fill="#000000"
                ></path>{" "}
                <path
                  d="M14.5801 13.3128C14.1761 13.7168 13.9741 13.9188 13.7513 14.0926C13.4886 14.2975 13.2043 14.4732 12.9035 14.6166C12.6485 14.7381 12.3775 14.8284 11.8354 15.0091L8.97709 15.9619C8.71035 16.0508 8.41626 15.9814 8.21744 15.7826C8.01862 15.5837 7.9492 15.2897 8.03811 15.0229L8.99089 12.1646C9.17157 11.6225 9.26191 11.3515 9.38344 11.0965C9.52679 10.7957 9.70249 10.5114 9.90743 10.2487C10.0812 10.0259 10.2832 9.82394 10.6872 9.41993L15.6033 4.50385C15.867 5.19804 16.3293 6.05663 17.1363 6.86366C17.9434 7.67069 18.802 8.13296 19.4962 8.39674L14.5801 13.3128Z"
                  fill="#000000"
                ></path>{" "}
                <path
                  d="M20.5355 20.5355C22 19.0711 22 16.714 22 12C22 10.4517 22 9.15774 21.9481 8.0661L15.586 14.4283C15.2347 14.7797 14.9708 15.0437 14.6738 15.2753C14.3252 15.5473 13.948 15.7804 13.5488 15.9706C13.2088 16.1327 12.8546 16.2506 12.3833 16.4076L9.45143 17.3849C8.64568 17.6535 7.75734 17.4438 7.15678 16.8432C6.55621 16.2427 6.34651 15.3543 6.61509 14.5486L7.59235 11.6167C7.74936 11.1454 7.86732 10.7912 8.02935 10.4512C8.21958 10.052 8.45272 9.6748 8.72466 9.32615C8.9563 9.02918 9.22032 8.76528 9.57173 8.41404L15.9339 2.05188C14.8423 2 13.5483 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355Z"
                  fill="#000000"
                ></path>{" "}
              </g>
            </svg>
          </div>
          Add assignment
        </NavLink>
        <NavLink
          to={"questionBank"}
          className={({ isActive }) => (isActive ? activeButton : buttonStyle)}
        >
          <div className="grid place-items-center mr-4">
            <svg
              fill="#000000"
              className="w-5 h-5"
              viewBox="0 0 511.998 511.998"
            >
              <g id="SVGRepo_bgCarrier"></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <g>
                    <path d="M507.968,190.186c-4.011-5.568-10.453-8.853-17.301-8.853h-21.333v-64c0-11.797-9.557-21.333-21.333-21.333H264.832 L207.083,38.25c-3.989-4.011-9.429-6.251-15.083-6.251H21.333C9.557,31.999,0,41.535,0,53.332v405.333 c0,0.32,0.149,0.597,0.171,0.917c0.085,1.984,0.405,3.925,1.045,5.803c0.107,0.32,0.149,0.661,0.256,0.981 c0.661,1.664,1.493,3.285,2.56,4.779c0.213,0.299,0.512,0.512,0.725,0.789c0.341,0.427,0.725,0.789,1.088,1.195 c1.259,1.344,2.667,2.517,4.203,3.477c0.363,0.235,0.683,0.512,1.067,0.725c1.941,1.045,4.032,1.771,6.208,2.197 c0.213,0.021,0.384,0.171,0.597,0.192c1.131,0.192,2.261,0.277,3.392,0.277h0.021h384c9.195,0,17.344-5.867,20.245-14.592 l85.333-256C513.067,202.922,511.979,195.754,507.968,190.186z M426.667,181.332h-320c-9.195,0-17.323,5.867-20.245,14.592 L42.667,327.188V74.666h140.501l57.749,57.749c4.011,4.011,9.429,6.251,15.083,6.251h170.667V181.332z"></path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
          Question Bank
        </NavLink>
        <NavLink
          to={"gradeAssignments"}
          className={({ isActive }) => (isActive ? activeButton : buttonStyle)}
        >
          <div className="grid place-items-center mr-4">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g></g>
              <g>
                <path
                  d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM14.4743 8.419C14.7952 8.68094 14.8429 9.15341 14.581 9.47428L8.86671 16.4743C8.72427 16.6488 8.51096 16.75 8.28571 16.75C8.06047 16.75 7.84716 16.6488 7.70472 16.4743L5.419 13.6743C5.15707 13.3534 5.20484 12.8809 5.52572 12.619C5.84659 12.3571 6.31906 12.4048 6.581 12.7257L8.28571 14.814L13.419 8.52572C13.6809 8.20484 14.1534 8.15707 14.4743 8.419ZM18.4743 8.41901C18.7952 8.68095 18.8429 9.15342 18.581 9.47429L12.8665 16.4743C12.7152 16.6596 12.4846 16.7617 12.2457 16.7489C12.0068 16.7362 11.7883 16.6103 11.6575 16.4099L11.3719 15.9724C11.1455 15.6256 11.2432 15.1608 11.5901 14.9344C11.7939 14.8014 12.0384 14.7803 12.2514 14.8558L17.419 8.52571C17.681 8.20484 18.1534 8.15707 18.4743 8.41901Z"
                  fill="#1C274C"
                ></path>{" "}
              </g>
            </svg>
          </div>
          Grade assignments
        </NavLink>
      </nav>
    </div>
  );
}
