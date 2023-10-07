import styled from "styled-components";
import { IShowButtons } from "../models/LinkModel";
import { platforms } from "../utils/platforms";
import { FaClipboard } from "react-icons/fa";
import { BsArrowRightShort } from "react-icons/bs";
import { toast } from "react-toastify";
import { Link, Form } from "react-router-dom";

const SingleLink: React.FC<IShowButtons> = ({
  _id,
  url,
  platform,
  showButtons,
}) => {
  const findPlatform = platforms.find((p) => p.platform === platform);

  const copyToClipboard = async () => {
    if (navigator) {
      await navigator.clipboard.writeText(url);
      toast.success("Copied to clipboard!");
    } else {
      toast.error("It seems you don't have navigator utility!");
    }
  };

  return (
    <Wrapper className={platform}>
      <div className='content'>
        <header>
          {findPlatform?.icons}
          <span>{platform}</span>
        </header>
        {!showButtons && (
          <div className='button-container'>
            <a href={url} target='_blank' className='btn link-navigator'>
              <BsArrowRightShort />
            </a>
            <button
              type='button'
              className='btn link-navigator'
              onClick={copyToClipboard}
            >
              <FaClipboard />
            </button>
          </div>
        )}
      </div>
      {showButtons && (
        <div className='action-btns'>
          <Link to={`/dashboard/editLink/${_id}`} className='btn action-btn'>
            edit
          </Link>
          <Form
            method='post'
            className='form'
            action={`/dashboard/deleteLink/${_id}`}
          >
            <button type='submit' className='btn action-btn'>
              delete
            </button>
          </Form>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.article`
  margin-bottom: 1rem;
  max-width: 20rem;
  padding: 1.5rem 1rem;
  border-radius: 8px;
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  header {
    display: flex;
    align-items: center;
    gap: 1rem;

    span {
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      font-weight: 600;
    }
  }
  svg {
    font-size: 1.5rem;
  }
  .button-container {
    display: flex;
    align-items: center;
  }
  .action-btns {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    .action-btn {
      backdrop-filter: blur(5px);
      background: transparent;
      text-transform: capitalize;
      border: 1px solid transparent;
      transition: var(--transition);
    }
    .form {
      width: auto;
      border: none;
      box-shadow: none;
    }
    .action-btn:hover {
      border: 1px solid var(--white);
    }
  }
  .link-navigator {
    background-color: transparent;
    padding: 0.25rem;
    a {
      display: flex;
      align-items: center;
    }
  }
  .link-navigator:hover {
    border-color: transparent;
  }
  .link-navigator:nth-child(1) svg {
    font-size: 2rem;
    display: flex;
    align-items: center;
  }
`;

export default SingleLink;
