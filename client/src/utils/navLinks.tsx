import { IoMdAdd } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiFileEditFill } from "react-icons/ri";

export const navLinks = [
  {
    id: 1,
    path: ".",
    text: "home",
    icon: <AiOutlineHome />,
  },
  {
    id: 2,
    path: "addLink",
    text: "Add link",
    icon: <IoMdAdd />,
  },
  {
    id: 3,
    path: "links",
    text: "Customize ",
    icon: <RiFileEditFill />,
  },
  {
    id: 4,
    path: "profile",
    text: "profile",
    icon: <FaUser />,
  },
  {
    id: 5,
    path: "admin",
    text: "Admin",
    icon: <MdAdminPanelSettings />,
  },
];
