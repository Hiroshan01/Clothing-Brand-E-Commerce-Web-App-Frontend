function Home() {
    return (
        <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center overflow-hidden">
            <div className="w-full h-[70%] flex items-center justify-center relative">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">

                    <div className="flex flex-col justify-center space-y-6">
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            ZIARA FASHION HOUSE
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Discover timeless elegance and contemporary style with our curated collection of premium clothing and accessories.
                        </p>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            From casual wear to formal attire, we bring you the latest fashion trends that blend comfort, quality, and sophistication for the modern wardrobe.
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


                    <div className="flex justify-center items-center mt-2">
                        <img
                            src="./public/images/hero.jpg"
                            alt="Hero illustration"
                            className="max-w-[700px] h-[600px] rounded-lg shadow-1xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
