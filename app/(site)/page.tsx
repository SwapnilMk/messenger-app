import Image from "next/image";
import AuthForm from "./components/AuthForm";

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center h-full">
            <Image
                src="/images/logo.png"
                className="py-4"
                alt="logo"
                height="84"
                width="84"
            />
            <h2 className="text-2xl font-bold">Sign in to your account</h2>
            <AuthForm />
        </div>
    );
}

export default Home;