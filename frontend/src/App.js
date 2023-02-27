import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
// import DetailPost from "./component/DetailPost/DetailPost";
import DetailPage from "./pages/DetailPage/DetailPage";
import EditPostPage from "./pages/EditPostPage/EditPostPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {!isLogin && <Route path="/login" element={<LoginPage />} />}
      {!isLogin && <Route path="/signup" element={<SignUpPage />} />}

      <Route path="/detail/:postId" element={<DetailPage />} />
      <Route path="/edit/:postId" element={<EditPostPage />} />
    </Routes>
  );
}

export default App;
