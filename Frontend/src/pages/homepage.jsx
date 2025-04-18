import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlay, FiSearch } from "react-icons/fi";

const HomePage = () => {
    // Color scheme from nextxrgroup.com.au
    const themeColors = {
        primaryDark: "#0A1A2F",
        darkPurple: "#2B1A5D",   // Dark blue background
        primaryPurple: "#6C5CE7",  // Main purple
        secondaryCyan: "#00C2CB",  // Accent cyan
        accentPink: "#FF6B6B",     // Accent pink
        textLight: "#FFFFFF",      // White text
        textMuted: "#A8A8A8"       // Gray text
    };

    const [searchQuery, setSearchQuery] = useState("");

    // Sample AR experiences
    const featuredExperiences = [
        {
            id: 1,
            title: "Product Showcase",
            category: "Retail",
            previewImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
            views: "12.5K"
        },
        {
            id: 2,
            title: "Virtual Try-On",
            category: "Fashion",
            previewImage: "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05",
            views: "8.2K"
        },
        {
            id: 3,
            title: "Interactive Manual",
            category: "Education",
            previewImage: "https://images.unsplash.com/photo-1581094271901-8022df4466f9",
            views: "5.7K"
        }
    ];

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: themeColors.darkPurple, color: themeColors.textLight }}>
            {/* Header - Inspired by mywebar.com */}
            <header className="py-4 px-6 lg:px-12 flex justify-between items-center" style={{ backgroundColor: themeColors.darkPurple }}>
                <div className="flex items-center">
                    <Link to="/" className="text-2xl font-bold" style={{ color: themeColors.secondaryCyan }}>
                        WEBAR
                    </Link>
                    <nav className="hidden md:flex ml-12 space-x-8">
                        <Link to="/features" className="hover:opacity-80" style={{ color: themeColors.textLight }}>Features</Link>
                        <Link to="/solutions" className="hover:opacity-80" style={{ color: themeColors.textLight }}>Solutions</Link>
                        <Link to="/pricing" className="hover:opacity-80" style={{ color: themeColors.textLight }}>Pricing</Link>
                        <Link to="/resources" className="hover:opacity-80" style={{ color: themeColors.textLight }}>Resources</Link>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to="/login" className="px-4 py-2 hover:opacity-80" style={{ color: themeColors.textLight }}>Log In</Link>
                    <Link
                        to="/register"
                        className="px-6 py-2 rounded-full font-medium"
                        style={{
                            backgroundColor: themeColors.primaryPurple,
                            color: themeColors.textLight
                        }}
                    >
                        Get Started
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {/* Hero Section - Simplified like mywebar.com */}
                <section className="relative py-20 px-6 lg:px-12 text-center" style={{ backgroundColor: themeColors.primaryDark }}>
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Create <span style={{ color: themeColors.secondaryCyan }}>Augmented Reality</span> Without Code
                        </h1>
                        <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: themeColors.textMuted }}>
                            Build immersive AR experiences for web and mobile in minutes with our intuitive platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/create"
                                className="px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                                style={{ backgroundColor: themeColors.primaryPurple }}
                            >
                                Start Creating <FiArrowRight />
                            </Link>
                            <button
                                className="px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                                style={{
                                    backgroundColor: 'transparent',
                                    color: themeColors.textLight,
                                    border: `2px solid ${themeColors.primaryPurple}`
                                }}
                            >
                                <FiPlay /> Watch Demo
                            </button>
                        </div>
                    </div>
                </section>

                {/* Featured Experiences - Grid layout like mywebar.com */}
                <section className="py-16 px-6 lg:px-12" style={{ backgroundColor: themeColors.primaryDark }}>
                    <div className="max-w-6xl mx-auto">
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-3xl font-bold">Featured AR Experiences</h2>
                            <Link
                                to="/explore"
                                className="flex items-center gap-2 hover:underline"
                                style={{ color: themeColors.secondaryCyan }}
                            >
                                View all <FiArrowRight />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredExperiences.map((experience) => (
                                <div
                                    key={experience.id}
                                    className="rounded-xl overflow-hidden transition-transform hover:scale-[1.02]"
                                    style={{
                                        backgroundColor: themeColors.primaryPurple + '15',
                                        border: `1px solid ${themeColors.primaryPurple + '30'}`
                                    }}
                                >
                                    <div className="relative pt-[56.25%] overflow-hidden">
                                        <img
                                            src={experience.previewImage}
                                            alt={experience.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4">
                                            <span className="px-3 py-1 rounded-full text-sm font-medium"
                                                style={{
                                                    backgroundColor: themeColors.secondaryCyan,
                                                    color: themeColors.primaryDark
                                                }}>
                                                {experience.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">{experience.title}</h3>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm" style={{ color: themeColors.textMuted }}>
                                                {experience.views} views
                                            </span>
                                            <button
                                                className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                                                style={{ backgroundColor: themeColors.primaryPurple }}
                                            >
                                                <FiPlay size={14} /> Try Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-6 lg:px-12 text-center" style={{ backgroundColor: themeColors.primaryPurple + '10' }}>
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business with AR?</h2>
                        <p className="text-xl mb-10" style={{ color: themeColors.textMuted }}>
                            Join thousands of creators and businesses building immersive experiences with our platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/signup"
                                className="px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                                style={{ backgroundColor: themeColors.primaryPurple }}
                            >
                                Get Started Free
                            </Link>
                            <Link
                                to="/demo"
                                className="px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90"
                                style={{
                                    backgroundColor: 'transparent',
                                    color: themeColors.textLight,
                                    border: `2px solid ${themeColors.primaryPurple}`
                                }}
                            >
                                Request Demo
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer - Simplified like mywebar.com */}
            <footer className="py-12 px-6 lg:px-12" style={{ backgroundColor: themeColors.primaryDark }}>
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <h3 className="text-xl font-bold mb-4" style={{ color: themeColors.secondaryCyan }}>WEBAR</h3>
                            <p className="text-sm" style={{ color: themeColors.textMuted }}>
                                The easiest way to create and share augmented reality experiences.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li><Link to="/features" className="hover:underline" style={{ color: themeColors.textMuted }}>Features</Link></li>
                                <li><Link to="/pricing" className="hover:underline" style={{ color: themeColors.textMuted }}>Pricing</Link></li>
                                <li><Link to="/templates" className="hover:underline" style={{ color: themeColors.textMuted }}>Templates</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li><Link to="/blog" className="hover:underline" style={{ color: themeColors.textMuted }}>Blog</Link></li>
                                <li><Link to="/tutorials" className="hover:underline" style={{ color: themeColors.textMuted }}>Tutorials</Link></li>
                                <li><Link to="/docs" className="hover:underline" style={{ color: themeColors.textMuted }}>Documentation</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Company</h4>
                            <ul className="space-y-2">
                                <li><Link to="/about" className="hover:underline" style={{ color: themeColors.textMuted }}>About</Link></li>
                                <li><Link to="/careers" className="hover:underline" style={{ color: themeColors.textMuted }}>Careers</Link></li>
                                <li><Link to="/contact" className="hover:underline" style={{ color: themeColors.textMuted }}>Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t" style={{ borderColor: themeColors.primaryPurple + '30' }}>
                        <p className="text-sm text-center" style={{ color: themeColors.textMuted }}>
                            © {new Date().getFullYear()} WEBAR Platform. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;