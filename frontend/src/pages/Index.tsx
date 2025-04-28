
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage";

const Index = () => {
  const navigate = useNavigate();
  
  // Redirect to homepage
  navigate("/");
  
  return <HomePage />;
};

export default Index;
