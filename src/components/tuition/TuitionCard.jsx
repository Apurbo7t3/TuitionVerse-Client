import { Link } from 'react-router-dom';
import image from '../../assets/tuition.webp'
const TuitionCard = ({ tuition }) => {
    return (
        <Link to={`/tuitions/${tuition.id}`}>
            <div>
                <div key={tuition.id} className="bg-white rounded-3xl shadow-md min-h-[500px] hover:shadow-xl transition overflow-hidden group">
                    <div className='px-3 pt-3'>
                        <img src={tuition.image ? tuition.image : image} alt={tuition.subject} className="h-56 w-full rounded-2xl object-cover group-hover:scale-105 transition" />
                    </div>
                    <div className="p-6">
                        <h3 className="font-semibold text-xl text-gray-800">{tuition.subject}</h3>
                        <p className="text-gray-500 mb-2">with {tuition.teacher_name}</p>
                        <p className="text-gray-500">with {tuition.description}</p>

                        <div className="flex justify-between items-center mt-6">
                            <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm">
                                {tuition.price} BDT/mo
                            </span>
                            <div className="flex items-center gap-1 text-yellow-500">
                                <button className="bg-purple-700 text-white font-bold px-4 py-2 rounded-2xl">Check Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default TuitionCard;