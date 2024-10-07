import { Outlet } from "react-router-dom"
import Header from "./Header"

const AppLayout = () => {
  return (
    <div className="px-4 md:px-8 flex flex-col min-h-screen">
        <Header/>
        <hr className="mt-1 sm:mt-6" />
        <Outlet/>    {/**Applayout ke child components ko render karega based on which path matched */}
    </div>
  )
}

export default AppLayout
