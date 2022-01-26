import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MenuBar from "./components/MenuBar";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";
import SinglePost from "./pages/SinglePost";
import MessagingScene from "./pages/MessagingScene";
import { MessageProvider } from "./context/message";


// Edgar se la come

function App() {
  return (
    <AuthProvider>
      <MessageProvider>
        <Router>
          <Container className="pt-5">
            <MenuBar />
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <Route exact path="/posts/:postId" component={SinglePost} />
            <Route exact path="/messages" component={MessagingScene} />
          </Container>
        </Router>
      </MessageProvider>
    </AuthProvider>
  );
}

export default App;
