import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { SiGoogleplay } from "react-icons/si";
import { AiFillApple } from "react-icons/ai";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-700">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Your Account Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Your Account</h3>
                        <ul className="space-y-2">
                            <li><Link to="/settings" className="hover:text-indigo-400 transition-colors">Settings</Link></li>
                            <li><Link to="/logout" className="hover:text-indigo-400 transition-colors">Log out</Link></li>
                            <li><Link to="/help" className="hover:text-indigo-400 transition-colors">Help</Link></li>
                        </ul>
                    </div>

                    {/* Discover Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Discover</h3>
                        <ul className="space-y-2">
                            <li><Link to="/groups" className="hover:text-indigo-400 transition-colors">Groups</Link></li>
                            <li><Link to="/calendar" className="hover:text-indigo-400 transition-colors">Calendar</Link></li>
                            <li><Link to="/topics" className="hover:text-indigo-400 transition-colors">Topics</Link></li>
                            <li><Link to="/cities" className="hover:text-indigo-400 transition-colors">Cities</Link></li>
                            <li><Link to="/online-events" className="hover:text-indigo-400 transition-colors">Online Events</Link></li>
                            <li><Link to="/local-guides" className="hover:text-indigo-400 transition-colors">Local Guides</Link></li>
                            <li><Link to="/make-friends" className="hover:text-indigo-400 transition-colors">Make Friends</Link></li>
                        </ul>
                    </div>

                    {/* Follow Us Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Follow us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-indigo-400 transition-colors"><FaFacebook size={20} /></a>
                            <a href="#" className="hover:text-indigo-400 transition-colors"><FaTwitter size={20} /></a>
                            <a href="#" className="hover:text-indigo-400 transition-colors"><FaInstagram size={20} /></a>
                            <a href="#" className="hover:text-indigo-400 transition-colors"><FaYoutube size={20} /></a>
                        </div>
                    </div>

                    {/* Meetup Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Meetup</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="hover:text-indigo-400 transition-colors">About</Link></li>
                            <li><Link to="/blog" className="hover:text-indigo-400 transition-colors">Blog</Link></li>
                            <li><Link to="/pro" className="hover:text-indigo-400 transition-colors">Meetup Pro</Link></li>
                            <li><Link to="/careers" className="hover:text-indigo-400 transition-colors">Careers</Link></li>
                            <li><Link to="/apps" className="hover:text-indigo-400 transition-colors">Apps</Link></li>
                            <li><Link to="/podcast" className="hover:text-indigo-400 transition-colors">Podcast</Link></li>
                        </ul>
                    </div>
                </div>

                {/* App Download Section */}
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6 mb-6">
                    <div className="flex items-center mb-4 md:mb-0">
                        <span className="font-bold text-lg mr-2 text-white">GETTOR!</span>
                        <div className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded transition-colors cursor-pointer">
                            <SiGoogleplay className="mr-2" />
                            <span>Google Play</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="font-bold text-lg mr-2 text-white">Save to Live</span>
                        <div className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded transition-colors cursor-pointer">
                            <AiFillApple className="mr-2" />
                            <span>App Store</span>
                        </div>
                    </div>
                </div>

                {/* Search and Legal Section */}
                <div className="border-t border-gray-700 pt-6">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Type here to search"
                            className="w-full md:w-1/3 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 mb-4 md:mb-0">
                            © 2025 Meetup
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link>
                            <Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
                            <Link to="/cookies" className="hover:text-indigo-400 transition-colors">Cookie Policy</Link>
                            <Link to="/license" className="hover:text-indigo-400 transition-colors">License Attribution</Link>
                            <Link to="/help" className="hover:text-indigo-400 transition-colors">Help</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;