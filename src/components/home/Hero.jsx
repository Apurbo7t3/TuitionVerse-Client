import { Link } from 'react-router-dom';
import image from '../../assets/hero6.png'

const Hero = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 bg-linear-to-r from-purple-400 to-purple-800 items-center'>

            <section className='py-20 px-6 text-center text-white'>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Find Your Perfect{" "}
                    <span className="text-purple-200 text-5xl md:text-7xl">
                        Tutor
                    </span>
                </h1>

                <p className="mt-6 text-lg max-w-xl mx-auto md:mx-0">
                    Personalized online tuition with expert teachers.
                </p>
                <Link to="/register"
                    className="mt-10 mx-3 inline-block bg-white text-purple-700 px-8 py-4 rounded-full shadow-lg hover:bg-purple-100 hover:scale-105 transition"
                >
                    Create Account
                </Link>

                <Link to="/tuitions"
                    className="mt-10 inline-block bg-white text-purple-700 px-8 py-4 rounded-full shadow-lg hover:bg-purple-100 hover:scale-105 transition"
                >
                    Explore Tuitions
                </Link>
            </section>

            <section className='flex justify-center px-6 pb-10 md:pb-0'>
                <img
                    src={image}
                    alt="Hero"
                    className='w-full object-contain'
                />
            </section>

        </div>
    );
};

export default Hero;