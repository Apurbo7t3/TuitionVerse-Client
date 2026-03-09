import { useEffect, useState } from 'react';
import image from '../../assets/hero4.png'

const DiscountTimer = () => {
    const target = new Date().getTime() + (1000 * 60 * 60 * 24 * 10);
    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const difference = target - now;
        return difference > 0
            ? {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            }
            : {};
    };
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 bg-linear-to-r from-purple-400 to-purple-800'>

            <section className='flex justify-center'>
                <img src={image} alt="" />
            </section>

            <section className={`flex justify-center py-20 px-10 text-white text-center`}>
                <div>
                    <h2 className="text-4xl font-bold mb-3">Join With Us And Save Upto 20% Now</h2>
                    <h2 className="text-4xl font-bold mb-3">Hurry!!</h2>
                    <h2 className="text-4xl font-bold mb-10">Offer End Soon..</h2>

                    <div className="flex justify-center gap-6 flex-wrap">
                        <div className="bg-white text-purple-700 rounded-xl p-6 w-28 shadow-lg">
                            <div className="text-3xl font-bold">{timeLeft.days}</div>
                            <div className="capitalize text-sm mt-1">Days</div>
                        </div>
                        <div className="bg-white text-purple-700 rounded-xl p-6 w-28 shadow-lg">
                            <div className="text-3xl font-bold">{timeLeft.hours}</div>
                            <div className="capitalize text-sm mt-1">Hours</div>
                        </div>
                        <div className="bg-white text-purple-700 rounded-xl p-6 w-28 shadow-lg">
                            <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                            <div className="capitalize text-sm mt-1">Minutes</div>
                        </div>
                        <div className="bg-white text-purple-700 rounded-xl p-6 w-28 shadow-lg">
                            <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                            <div className="capitalize text-sm mt-1">Seconds</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DiscountTimer;