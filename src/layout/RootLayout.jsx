import { Outlet } from "react-router-dom";
import Header from "../components/Header"

function RootLayout() {
    return (
        <>
            <div>
                {/*  className="container mx-auto"> */}
                <div className="sticky top-0 bg-white z-10 ">
                    <Header />
                </div>
                <div className="px-2 md:px-8 ">
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}

export default RootLayout;