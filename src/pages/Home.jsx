import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import BestTuitionsCarousel from "../components/home/BestTuitionsCarousel";
import DiscountTimer from "../components/home/DiscountTimer";
import ReviewCarousel from "../components/home/ReviewCarousel";
import Questions from "../components/home/Questions";
import NewsLatter from "../components/home/NewsLatter";
import Loading from "../components/Loading";
import ErrorAlert from "../components/ErrorAlert";
import useBestTuitionsAndReviews from "../hooks/useBestTuitionsAndReviews";
import ChatBot from "../components/ChatBot";

const Home = () => {

    const { loading, error, bestTuitions, topReviews } = useBestTuitionsAndReviews();
    return (
        <main className="">
            <Hero />
            <Features />
            {loading ? <div className="bg-purple-50 h-60 flex justify-center items-center"><Loading /></div>
                : error ?
                    <div className="bg-purple-50 h-60 flex justify-center items-center"><ErrorAlert error={error} /></div>
                    : <BestTuitionsCarousel tutions={bestTuitions} />
            }
            <DiscountTimer />
            {loading ? <div className="bg-purple-50 h-60 flex justify-center items-center"><Loading /> </div>
                : error ?
                    <div className="bg-purple-50 h-60 flex justify-center items-center"><ErrorAlert error={error} /></div>
                    : <ReviewCarousel reviews={topReviews} />
            }
            <Questions />
            <NewsLatter />
            <ChatBot />
        </main>
    );
};
export default Home;