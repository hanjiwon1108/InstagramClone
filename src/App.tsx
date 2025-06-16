import SideBar from "./components/sidebar/SideBar";
import ReelsPage from "./components/reels/Reels";

function App() {
  return (
    <div className="flex bg-black h-screen overflow-hidden">
      <SideBar />
      <div className="ml-[72px] md:ml-[244px] w-full h-screen overflow-hidden">
        <ReelsPage />
      </div>
    </div>
  );
}

export default App;
