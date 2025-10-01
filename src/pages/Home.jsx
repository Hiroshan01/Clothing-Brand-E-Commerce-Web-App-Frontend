function Home() {
    return (
        <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center overflow-hidden">
            <div className="w-full h-[70%] flex items-center justify-center relative">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                    {/* Text Section */}
                    <div className="flex flex-col justify-center space-y-6">
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            Build Something Amazing
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Create beautiful websites and applications with our modern tools and components.
                        </p>
                        <div className="flex space-x-4">
                            <button className="bg-[#781D7D] hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                                Get Started
                            </button>
                            <button className="border-2 border-[#781D7D] text-bg-[#781D7D] hover:bg-purple-700 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="flex justify-center lg:justify-end">
                        <img
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                            alt="Hero illustration"
                            className="max-w-full h-auto rounded-lg shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
