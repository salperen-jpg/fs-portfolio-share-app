import { IUser } from "../models/UserModels";
import { LuImagePlus } from "react-icons/lu";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
interface IProfileInfo {
  user: IUser | undefined;
}

const ProfileInfo: React.FC<IProfileInfo> = ({ user }) => {
  return (
    <div className='profile'>
      <div className='img-container'>
        {user?.avatar ? (
          <img src={user?.avatar} className='image' alt={user?.name} />
        ) : (
          <FaUserAlt className='image' />
        )}
        <Link to='profile' className='add-image'>
          <LuImagePlus />
        </Link>
      </div>
      <h5>
        {user?.name} {user?.lastName}
      </h5>
      <span>{user?.devRole}</span>
    </div>
  );
};
export default ProfileInfo;
