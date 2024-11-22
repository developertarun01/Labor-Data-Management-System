import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LaborCard from "../components/LaborCard";

const Search: React.FC = () => {
    const laborers = [
        { name: "John Doe", skills: ["Plumbing", "Carpentry"], location: "New York", rating: 4.5 },
        { name: "Jane Smith", skills: ["Electrician", "Welding"], location: "Los Angeles", rating: 4.0 },
    ];

    return (
        <>
            <Header />
            <main className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Find Laborers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {laborers.map((laborer, index) => (
                        <LaborCard key={index} {...laborer} />
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Search;
