import {
    Star,
} from "lucide-react";
import image from '../../assets/tuition.webp'
import { Link } from "react-router-dom";
const BestTuitionsCard = ({ tuition }) => {
    return (
        <Link to={`/tuitions/${tuition.id}`}>
            <div>
                <div key={tuition.id} className="bg-white p-3 max-w-2xl rounded-3xl shadow-2xl hover:shadow-xl transition overflow-hidden group">
                    <img src={tuition.image ? tuition.image : image} alt={tuition.subject} className="h-56 rounded-lg w-full object-cover group-hover:scale-105 transition" />
                    <div className="p-6">
                        <h3 className="font-semibold text-xl text-gray-800">{tuition.subject}</h3>
                        <p className="text-gray-500">with {tuition.teacher_name}</p>

                        <div className="flex justify-between items-center mt-6">
                            <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm">
                                {tuition.price} BDT/mo
                            </span>
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-4 h-4 fill-yellow-400" />
                                {tuition.reviews[1].rating}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BestTuitionsCard;