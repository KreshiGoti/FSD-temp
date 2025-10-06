import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Auth App</h1>
      <div className="flex justify-center gap-4">
        <Link to="/signup" className="btn">Sign Up</Link>
        <Link to="/login" className="btn">Login</Link>
      </div>
    </div>
  );
};

export default Home;
