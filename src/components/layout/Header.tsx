import FeedbackForm from "../feedback/FeedbackForm";
import { BG_IMAGE, LOGO_IMAGE } from "../../lib/constants";

export default function Header() {
  return (
    <header>
      <Background />
      <Logo />
      <h1>
        Give Feedback. <i>Publicly.</i>
      </h1>
      <FeedbackForm />
    </header>
  );
}

function Background() {
  return <img src={BG_IMAGE} alt="pattern" className="pattern" />;
}

function Logo() {
  return (
    <a href="/" className="logo">
      <img src={LOGO_IMAGE} alt="logo" />
    </a>
  );
}
