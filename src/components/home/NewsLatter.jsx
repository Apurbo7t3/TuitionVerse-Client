import { Mail } from 'lucide-react';
import image from '../../assets/hero3.png';
const NewsLatter = () => {
    return (
        <div className='flex flex-col md:flex-row justify-center items-center bg-gradient-to-br from-purple-600 to-purple-800'>
            <section>
                <img src={image} alt="" />
            </section>
            <section className="py-20  text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Stay Updated
                    </h2>
                    <p className="text-xl text-purple-100 mb-8">
                        Get notified about new tuitions and offers – no spam.
                    </p>

                    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 rounded-full border-2 border-white/30 bg-white/10 text-white placeholder-white/70 outline-none focus:border-yellow-300 transition"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-semibold px-8 py-4 rounded-full transition flex items-center justify-center gap-2"
                        >
                            <Mail className="w-5 h-5" />
                            Subscribe
                        </button>
                    </form>

                    <p className="text-sm text-purple-200 mt-6">
                        You can unsubscribe anytime you want.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default NewsLatter;