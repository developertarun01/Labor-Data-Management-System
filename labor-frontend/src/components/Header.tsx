import React, { useState, useEffect } from "react";

const Header: React.FC = () => {
    const [isTranslateReady, setTranslateReady] = useState(false);

    useEffect(() => {
        const checkTranslateLoaded = () => {
            const googleFrame = document.querySelector('iframe.goog-te-menu-frame');
            if (googleFrame) {
                setTranslateReady(true);
            } else {
                setTimeout(checkTranslateLoaded, 500); // Retry every 500ms until the iframe loads
            }
        };

        checkTranslateLoaded();
    }, []);

    const translatePageToHindi = () => {
        const googleFrame = document.querySelector('iframe.goog-te-menu-frame') as HTMLIFrameElement | null;
        if (!googleFrame) {
            alert("Translation service is not yet loaded. Please try again.");
            return;
        }

        const frameDoc = googleFrame.contentDocument || googleFrame.contentWindow?.document;
        if (!frameDoc) {
            alert("Unable to access translation frame. Please try again.");
            return;
        }

        const hindiOption = Array.from(frameDoc.querySelectorAll(".goog-te-menu2-item span.text")).find(
            (el) => el.textContent?.includes("Hindi")
        );

        if (hindiOption) {
            (hindiOption as HTMLElement).click();
        } else {
            alert("Hindi translation option is not available.");
        }
    };

    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">FindWorker</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        {/* <li><a href="/search" className="hover:underline">Search</a></li> */}
                        {/* <li><a href="/profile" className="hover:underline">Profile</a></li> */}
                        {/* <li><a className="hover:underline" onClick={translatePageToHindi}>Hindi</a></li> */}
                        <li><a href="https://api.whatsapp.com/send/?phone=918630739687&text=I%20need%20help%20about%20FindWorker&type=phone_number&app_absent=0" className="hover:underline" target="_blank" rel="noopener noreferrer">Help</a></li>
                        <button
                            onClick={translatePageToHindi}
                            disabled={!isTranslateReady}
                            style={{
                                padding: "8px 16px",
                                background: isTranslateReady ? "white" : "#ccc",
                                color: isTranslateReady ? "#007bff" : "#999",
                                border: "1px solid #007bff",
                                borderRadius: "4px",
                                cursor: isTranslateReady ? "pointer" : "not-allowed",
                            }}
                        ></button>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
