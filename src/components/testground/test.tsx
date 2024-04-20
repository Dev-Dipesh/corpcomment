import { useState } from "react";

type GreetingProps = {
  messages: string[];
};

export default function Greeting(props: GreetingProps) {
  const messages = props.messages;
  let holder = "";
  const randomMessage = () => {
    if (holder.length > 0) {
      messages.push(holder);
    }

    const greeting = messages.shift();
    if (greeting) {
      holder = greeting;
      return holder;
    }
    return "No more greetings!";
  };

  const [greeting, setGreeting] = useState<string>(messages[0] || "");

  return (
    <div>
      <h3>{greeting}! Thank you for visiting!</h3>
      <button
        className="rounded bg-amber-500 px-1 text-white focus:bg-sky-500"
        onClick={() => setGreeting(randomMessage())}
      >
        New Greeting
      </button>
    </div>
  );
}
