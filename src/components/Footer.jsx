import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-8 px-4">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Brand & Info */}
                <div className="flex flex-col space-y-4">
                    <h2 className="text-3xl font-bold text-white">ZIARA</h2>
                    <p className="text-gray-400">
                        We are passionate about creating exceptional products. Join us on our journey to make a difference.<pre></pre>
                        From casual wear to formal attire, we bring you the latest fashion trends that blend comfort, quality, and sophistication for the modern wardrobe.
                    </p>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                            <FaFacebook size={24} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                            <FaInstagram size={24} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                            <FaLinkedin size={24} />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                            <FaGithub size={24} />
                        </a>
                    </div>
                </div>

                {/* Links */}
                <div className="flex flex-col space-y-4">
                    <h3 className="text-xl font-semibold text-white">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="/" className="text-gray-400 hover:text-white">Home</a>
                        </li>
                        <li>
                            <a href="/about" className="text-gray-400 hover:text-white">About Us</a>
                        </li>
                        <li>
                            <a href="/services" className="text-gray-400 hover:text-white">Services</a>
                        </li>
                        <li>
                            <a href="/contact" className="text-gray-400 hover:text-white">Contact</a>
                        </li>
                        <li>
                            <a href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</a>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col space-y-4">
                    <h3 className="text-xl font-semibold text-white">Contact Info</h3>
                    <p className="text-gray-400">
                        <span className="font-semibold">Email: </span>ziara@brandname.com
                    </p>
                    <p className="text-gray-400">
                        <span className="font-semibold">Phone: </span>+94 (77) 046-2389
                    </p>
                    <p className="text-gray-400">
                        <span className="font-semibold">Address: </span>A12, Galle, Sri Lanaka
                    </p>
                </div>

                {/* Newsletter */}
                <div className="flex flex-col space-y-4">
                    <h3 className="text-xl font-semibold text-white">Newsletter</h3>
                    <p className="text-gray-400">Stay updated with our latest news and offers. Subscribe to our newsletter.</p>
                    <form action="#" className="flex flex-col space-y-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="p-3 bg-gray-700 text-white rounded-md focus:outline-none"
                        />
                        <button type="submit" className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-400 transition-all duration-300">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="text-center text-gray-400 mt-8">
                <p>&copy; 2025 ZIARA. All rights reserved.</p>
                <p>&copy; Created By Hiroshan.</p>
            </div>
        </footer>
    );
}
