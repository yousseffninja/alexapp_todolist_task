import { Outlet } from "react-router-dom"

const LayoutOutlet = () => {
    return (
        <main className="App">
            <Outlet />
        </main>
    )
}

export default LayoutOutlet