import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Profile: React.FC = () => {
    return (
        <>
            <Header />
            <main className="container mx-auto p-4 text-center">
                <h2 className="text-3xl font-bold mb-4">Laborer Profile</h2>
                <p className="text-lg">Coming Soon...</p>
            </main>
            <Footer />
        </>
    );
};

export default Profile;
