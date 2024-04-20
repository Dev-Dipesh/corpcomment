import FeedbackList from "../feedback/FeedbackList";
import Header from "./Header";
import Greeting from "../testground/test";

const messages = [
  "Hello",
  "Hi",
  "Hey",
  "Hola",
  "Bonjour",
  "Ciao",
  "Namaste",
  "Salaam",
  "Konnichiwa",
  "Guten Tag",
  "Shalom",
  "Merhaba",
  "Aloha",
  "Jambo",
  "Zdravstvuyte",
  "Hej",
  "Hei",
  "Hallo",
  "Salut",
  "Olá",
  "Kamusta",
  "Hej",
  "Sawubona",
  "Marhaba",
  "Nǐ hǎo",
  "Salam",
  "Sveiki",
  "Szia",
  "Salve",
  "Dobrý den",
  "Hoi",
  "Ahoj",
  "Tere",
  "Saluton",
  "Hei",
  "Terve",
  "Moïen",
  "Salut",
  "Hei",
  "Moi",
  "Salut",
  "Hallo",
];

export default function Container() {
  return (
    <main className="container">
      <Greeting messages={messages} />
      <Header />
      <FeedbackList />
    </main>
  );
}
