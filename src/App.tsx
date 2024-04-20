import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";
import HashTagsList from "./components/HashTagsList";
import useFetchFeedbacks from "./hooks/useFetchFeedbacks";
import { GET_FEEDBACKS_API } from "./lib/constants";

function App() {
  useFetchFeedbacks(GET_FEEDBACKS_API);

  return (
    <div className="app">
      <Footer />
      <Container />
      <HashTagsList />
    </div>
  );
}

export default App;
