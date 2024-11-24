import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Labor {
    id?: string;
    name: string;
    skills: string;
    mobile: string;
    colony: string;
    city: string;
}

const Home: React.FC = () => {
    const [laborList, setLaborList] = useState<Labor[]>([]);
    // const [searchQuery, setSearchQuery] = useState("");
    const [skillSearch, setSkillSearch] = useState<string>("");
    const [citySearch, setCitySearch] = useState<string>("");

    useEffect(() => {
        const fetchLabors = async () => {
            try {
                const response = await fetch("https://labor-data-management-system-api.vercel.app/"); // Adjust the URL if necessary
                if (response.ok) {
                    const data = await response.json();
                    setLaborList(data);
                } else {
                    console.error("Failed to fetch labors:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching labors:", error);
            }
        };

        fetchLabors();
    }, []);

    const [formData, setFormData] = useState<Labor>({
        name: "",
        skills: "",
        mobile: "",
        colony: "",
        city: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLaborRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const newLabor = {
            name: formData.get("name") as string,
            skills: formData.get("skills") as string,
            mobile: formData.get("mobile") as string,
            colony: formData.get("colony") as string,
            city: formData.get("city") as string,
        };

        console.log("Sending data to server:", newLabor); // Log the request data

        try {
            const response = await fetch("https://labor-data-management-system-api.vercel.app/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newLabor),
            });

            if (response.ok) {
                const savedLabor = await response.json();
                setLaborList((prev) => [...prev, savedLabor]);

                setFormData({
                    name: "",
                    skills: "",
                    mobile: "",
                    colony: "",
                    city: "",
                });
            } else {
                console.error("Failed to add labor:", response.statusText);
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };

    const filteredLabor = laborList.filter((labor) => {
        return (
            labor.skills.toLowerCase().includes(skillSearch.toLowerCase()) &&
            labor.city.toLowerCase().includes(citySearch.toLowerCase())
        );
    });

    return (
        <>
            <Header />
            <main className="bg-gray-100 min-h-screen">
                <div className="container mx-auto p-6">
                    {/* Two Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Section 1: Customer Search */}
                        <section className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-bold mb-4 text-blue-600">Search for Worker</h2>
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="citySearch" className="block text-gray-700 font-medium mb-2">
                                        Enter City:
                                    </label>
                                    <input
                                        type="text"
                                        id="citySearch"
                                        placeholder="E.g., Delhi, Mumbai"
                                        value={citySearch}
                                        onChange={(e) => setCitySearch(e.target.value)}
                                        className="w-full border rounded px-4 py-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="skillSearch" className="block text-gray-700 font-medium mb-2">
                                        Enter Skill:
                                    </label>
                                    <input
                                        type="text"
                                        id="skillSearch"
                                        placeholder="E.g., Plumber, Electrician"
                                        value={skillSearch}
                                        onChange={(e) => setSkillSearch(e.target.value)}
                                        className="w-full border rounded px-4 py-2"
                                    />
                                </div>
                            </form>

                            {/* Filter Result */}
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Searched Workers:</h3>
                                <div
                                    className="max-h-64 overflow-y-auto border rounded-lg p-2 bg-gray-50"
                                    style={{ scrollbarWidth: "thin" }}
                                >
                                    {(skillSearch || citySearch) && filteredLabor.length > 0 ? ( // Only show when there's a filter applied
                                        <ul>
                                            {filteredLabor.map((labor) => (
                                                <li
                                                    key={labor.id}
                                                    className="border-b py-2 text-gray-700 flex justify-between"
                                                >
                                                    <span>
                                                        <strong>{labor.name}</strong> ({labor.skills}, {labor.colony}, {labor.city})
                                                    </span>
                                                    <span className="text-sm text-gray-500">{labor.mobile}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">Please enter a skill or city to search.</p>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Labor Registration */}
                        <section className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-bold mb-4 text-green-600">Register as a Worker</h2>
                            <form onSubmit={handleLaborRegister} id="myForm">
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                        Full Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full border rounded px-4 py-2"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="skills" className="block text-gray-700 font-medium mb-2">
                                        Skills (Mistri, Plumber, Electrician):
                                    </label>
                                    <input
                                        type="text"
                                        id="skills"
                                        name="skills"
                                        placeholder="Enter your skills"
                                        value={formData.skills}
                                        onChange={handleInputChange}
                                        className="w-full border rounded px-4 py-2"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="mobile" className="block text-gray-700 font-medium mb-2">
                                        Mobile Number (+91 ):
                                    </label>
                                    <input
                                        type="tel"
                                        id="mobile"
                                        name="mobile"
                                        placeholder="Enter your mobile number"
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                        className="w-full border rounded px-4 py-2"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="colony" className="block text-gray-700 font-medium mb-2">
                                        Colony:
                                    </label>
                                    <input
                                        type="text"
                                        id="colony"
                                        name="colony"
                                        placeholder="Enter your colony"
                                        value={formData.colony}
                                        onChange={handleInputChange}
                                        className="w-full border rounded px-4 py-2"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                                        City:
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        placeholder="Enter your city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full border rounded px-4 py-2"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
                                >
                                    Register
                                </button>
                            </form>
                        </section>
                    </div>
                </div>

                <div className="container mx-auto p-6">
                    <section className="bg-white shadow-md rounded-lg p-6">
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Recently Added Worker:</h3>
                            <div
                                className="max-h-64 overflow-y-auto border rounded-lg p-2 bg-gray-50"
                                style={{ scrollbarWidth: "thin" }}
                            >
                                <ul>
                                    {laborList.map((labor) => ( // Display real-time list without filtration
                                        <li
                                            key={labor.id}
                                            className="border-b py-2 text-gray-700 flex justify-between"
                                        >
                                            <span>
                                                <strong>{labor.name}</strong> ({labor.skills}, {labor.colony}, {labor.city})
                                            </span>
                                            <span className="text-sm text-gray-500">{labor.mobile}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Home;
