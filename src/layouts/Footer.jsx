import { Heart } from 'lucide-react';
import { FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-heading text-2xl mb-4">TuitionVerse</h3>
                        <p className="font-body text-white/70 mb-4">Making quality education accessible to everyone.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-white/70 hover:text-sky transition"><FaGithub className="w-5 h-5" /></a>
                            <a href="#" className="text-white/70 hover:text-sky transition"><FaTwitter className="w-5 h-5" /></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-heading text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2 font-body">
                            <li><a href="/" className="text-white/70 hover:text-sky transition">Home</a></li>
                            <li><a href="/tuitions" className="text-white/70 hover:text-sky transition">Tuitions</a></li>
                            <li><a href="/about" className="text-white/70 hover:text-sky transition">About Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-heading text-lg mb-4">Support</h4>
                        <ul className="space-y-2 font-body">
                            <li><a href="/faq" className="text-white/70 hover:text-sky transition">FAQ</a></li>
                            <li><a href="/contact" className="text-white/70 hover:text-sky transition">Contact</a></li>
                            <li><a href="/privacy" className="text-white/70 hover:text-sky transition">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-heading text-lg mb-4">Contact</h4>
                        <p className="font-body text-white/70">support@tuitionverse.com</p>
                        <p className="font-body text-white/70">+880 1234 567890</p>
                    </div>
                </div>
                <div className="border-t border-white/20 mt-8 pt-8 text-center font-body text-white/70">
                    <p>Made by Apurbo<Heart className="inline w-4 h-4 text-coral" /> and TuitionVerse Team. &copy; {new Date().getFullYear()}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;