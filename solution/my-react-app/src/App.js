import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeNavbar from "./components/generalComponents/HomeNavbar";
import HomeScreen from "./screens/HomeScreen";
import PlayersScreen from "./screens/PlayersScreen";
import ClubsScreen from "./screens/ClubsScreen";
import GamesScreen from "./screens/GamesScreen";
import GamesDetailsScreen from "./screens/GamesDetailsScreen";
import CompetitionsScreen from "./screens/CompetitionsScreen";
import ChatScreen from "./screens/ChatScreen";
import ErrorPage from "./screens/ErrorPage";

function App() {
  // 2. Wrap NextUIProvider at the root of your app
  return (
      <Router className="App">
        <HomeNavbar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/players" element={<PlayersScreen />} />
          <Route path="/clubs/:paramClubName?" element={<ClubsScreen />} />
          <Route path="/games" element={<GamesScreen />} />
          <Route path="/gamesDetails/:paramGame?" element={<GamesDetailsScreen/>} />
          <Route path="/competitions/:paramCompName?" element={<CompetitionsScreen />}/>
          <Route path="/chat" element={<ChatScreen />} /> 
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
  );
}

export default App;