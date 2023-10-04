import logo from "../assets/logo.png";
import logoWhite from "../assets/whitelogo.png";
interface ILogo {
  white?: boolean;
}
const Logo: React.FC<ILogo> = ({ white }) => {
  return white ? (
    <img className='logo' src={logoWhite} alt='logo' />
  ) : (
    <img className='logo' src={logo} alt='logo' />
  );
};
export default Logo;
