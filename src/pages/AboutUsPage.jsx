import { Link } from 'react-router-dom';
import {
    FaGraduationCap,
    FaChalkboardTeacher,
    FaUsers,
    FaHeart,
    FaStar,
    FaClock,
    FaRocket,
    FaShieldAlt,
    FaHandsHelping,
    FaQuoteRight
} from 'react-icons/fa';
import { GiTeacher, GiGraduateCap, GiBookshelf } from 'react-icons/gi';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const AboutUsPage = () => {
    const stats = [
        { icon: FaUsers, value: '10,000+', label: 'Happy Students' },
        { icon: GiTeacher, value: '500+', label: 'Expert Teachers' },
        { icon: FaGraduationCap, value: '50+', label: 'Subjects' },
        { icon: FaStar, value: '4.8', label: 'Average Rating' },
    ];

    const features = [
        {
            icon: FaRocket,
            title: 'Learn at Your Pace',
            description: 'Access recorded sessions and materials anytime, anywhere. Perfect for busy students.',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: FaShieldAlt,
            title: 'Secure Payments',
            description: 'All transactions are secured with SSLCommerz. Your money is always safe.',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: FaHandsHelping,
            title: '1-on-1 Attention',
            description: 'Small class sizes ensure every student gets personalized attention from teachers.',
            color: 'from-green-500 to-teal-500'
        },
        {
            icon: FaClock,
            title: 'Flexible Scheduling',
            description: 'Choose class times that fit your schedule. Learn when it\'s convenient for you.',
            color: 'from-orange-500 to-red-500'
        },
    ];

    const teamMembers = [
        {
            name: 'Dr. Sarah Johnson',
            role: 'Founder & CEO',
            bio: 'Former university professor with 15+ years of teaching experience. Passionate about making quality education accessible to all.',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            color: 'purple'
        },
        {
            name: 'Prof. Michael Chen',
            role: 'Head of Academics',
            bio: 'PhD in Mathematics from MIT. Dedicated to creating innovative teaching methods that make complex subjects easy to understand.',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            color: 'pink'
        },
        {
            name: 'Emily Rodriguez',
            role: 'Student Success Manager',
            bio: 'Former student who transformed through our platform. Now helps others achieve their academic goals.',
            image: 'https://randomuser.me/api/portraits/women/63.jpg',
            color: 'blue'
        },
        {
            name: 'David Kim',
            role: 'Lead Teacher',
            bio: 'Award-winning educator specializing in STEM subjects. Believes in making learning fun and engaging.',
            image: 'https://randomuser.me/api/portraits/men/75.jpg',
            color: 'green'
        },
    ];

    const testimonials = [
        {
            name: 'Priya Sharma',
            role: 'Student',
            content: 'TuitionVerse transformed my learning experience. The teachers are incredibly supportive and the platform is so easy to use!',
            rating: 5,
            image: 'https://randomuser.me/api/portraits/women/17.jpg'
        },
        {
            name: 'Rahul Verma',
            role: 'Parent',
            content: 'My daughter\'s grades improved dramatically after joining. The personalized attention makes all the difference.',
            rating: 5,
            image: 'https://randomuser.me/api/portraits/men/52.jpg'
        },
        {
            name: 'Anjali Patel',
            role: 'Teacher',
            content: 'Teaching on TuitionVerse has been amazing. The platform provides all the tools I need to help my students succeed.',
            rating: 5,
            image: 'https://randomuser.me/api/portraits/women/79.jpg'
        },
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-purple-50 via-white to-pink-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-linear-to-r from-purple-600 to-pink-600 text-white">
                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                            About{' '}
                            <span className="bg-linear-to-r from-white to-indigo-800 text-transparent bg-clip-text">
                                TuitionVerse
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-8">
                            Empowering students and teachers to connect, learn, and grow together.
                            We're revolutionizing the way education happens in Bangladesh.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link
                                to="/register"
                                className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition transform hover:scale-105 shadow-lg"
                            >
                                Join Us Today
                            </Link>
                            <Link
                                to="/tuitions"
                                className="bg-purple-500/30 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-500/40 transition transform hover:scale-105 border border-white/30"
                            >
                                Explore Tuitions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-xl p-6 text-center border border-purple-100 hover:shadow-2xl transition transform hover:-translate-y-1"
                        >
                            <stat.icon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                            <div className="text-sm text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Our Story Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">
                            Our{' '}
                            <span className="bg-linear-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                                Story
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                            TuitionVerse was born from a simple observation: students in Bangladesh needed a better way to find quality tuition, and talented teachers needed a platform to reach them.
                        </p>
                        <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                            Founded in 2024, we've grown from a small idea to a thriving community of over 10,000 students and 500 teachers across the country. Our platform makes it easy for students to find the perfect tutor, and for teachers to build their practice.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            We believe that every student deserves access to quality education, and every teacher deserves the opportunity to share their knowledge. That's what drives us every day.
                        </p>

                        {/* Quote */}
                        <div className="mt-8 bg-purple-50 rounded-2xl p-6 border-l-4 border-purple-600">
                            <FaQuoteRight className="text-purple-400 w-8 h-8 mb-2" />
                            <p className="text-gray-700 italic">
                                "Education is the most powerful weapon which you can use to change the world."
                            </p>
                            <p className="text-gray-500 mt-2">— Nelson Mandela</p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30"></div>
                        <img
                            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                            alt="Students learning"
                            className="relative rounded-3xl shadow-2xl"
                        />
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-linear-to-b from-white to-purple-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
                        Why Choose{' '}
                        <span className="bg-linear-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                            TuitionVerse?
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        We're not just another tuition platform. Here's what makes us different.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-2xl transition group"
                            >
                                <div className={`w-16 h-16 rounded-xl bg-linear-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
                    Meet Our{' '}
                    <span className="bg-linear-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                        Team
                    </span>
                </h2>
                <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Passionate educators and technologists working to transform education.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-purple-100 hover:shadow-2xl transition group"
                        >
                            <div className={`h-32 bg-linear-to-r from-${member.color}-500 to-${member.color}-600 relative`}>
                                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-24 h-24 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition"
                                    />
                                </div>
                            </div>
                            <div className="pt-16 p-6 text-center">
                                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                                <p className={`text-${member.color}-600 font-semibold mb-3`}>{member.role}</p>
                                <p className="text-gray-600 text-sm">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonials */}
            <div className="bg-linear-to-r from-purple-600 to-pink-600 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center text-white mb-4">
                        What People Say
                    </h2>
                    <p className="text-xl text-purple-100 text-center mb-12 max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what our community has to say.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white border border-white/20 hover:bg-white/20 transition"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full border-2 border-white"
                                    />
                                    <div>
                                        <h4 className="font-bold">{testimonial.name}</h4>
                                        <p className="text-sm text-purple-200">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-purple-100 mb-4">"{testimonial.content}"</p>
                                <div className="flex gap-1">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FaStar key={i} className="text-yellow-400" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100">
                    <div className="grid md:grid-cols-2">
                        <div className="p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
                            <p className="text-gray-600 mb-8">
                                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                        <FiMail className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-semibold text-gray-800">support@tuitionverse.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                                        <FiPhone className="w-6 h-6 text-pink-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="font-semibold text-gray-800">+880 1234 567890</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <FiMapPin className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Address</p>
                                        <p className="font-semibold text-gray-800">Dhaka, Bangladesh</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-linear-to-r from-purple-600 to-pink-600 p-8 md:p-12">
                            <h3 className="text-2xl font-bold text-white mb-4">Join Our Community</h3>
                            <p className="text-purple-100 mb-6">
                                Whether you're a student looking to learn or a teacher wanting to share your knowledge, we'd love to have you.
                            </p>
                            <div className="space-y-4">
                                <Link
                                    to="/register"
                                    className="block w-full bg-white text-purple-600 text-center px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition transform hover:scale-105"
                                >
                                    Sign Up as Student
                                </Link>
                                <Link
                                    to="/register"
                                    className="block w-full bg-purple-500/30 backdrop-blur-sm text-white text-center px-6 py-3 rounded-xl font-semibold hover:bg-purple-500/40 transition transform hover:scale-105 border border-white/30"
                                >
                                    Become a Teacher
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;