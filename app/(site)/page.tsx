import Image from "next/image";
import AuthForm from "./components/AuthForm";

const Home = () => {
    return (
        <div className="flex flex-col justify-center h-[100vh] w-[40%] m-auto">
            <div className="flex flex-col items-center">

                <Image
                    src="/images/logo.png"
                    className="py-4"
                    alt="logo"
                    height="74"
                    width="74" />
                <h2 className="text-2xl font-bold">Sign in to your account</h2>
            </div>
            <AuthForm />
        </div>
    );
}

export default Home;