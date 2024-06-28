import WorkInProgressSvg from '../assets/workInprogress.svg'; // Import the SVG file directly

const WorkInProgress = () => {
  return (
    <div className=" flex h-full w-full items-center justify-center">
    <div className="flex flex-col items-center">
          <img src={WorkInProgressSvg} alt="Work in Progress" className="w-36 h-36" /> {/* Use the imported SVG directly */}
       <h1 className="text-xl font-semibold">Work in Progress</h1>
        <p className="text-ll">This page is under construction</p>
    </div>
    </div>
  )
}

export default WorkInProgress