import { useState } from "react";
import {
    ChevronDown,
    ChevronUp,
} from "lucide-react";
const Questions = () => {
    const faqItems = [
        { question: "How do I find a tutor?", answer: "Browse tuitions and apply instantly." },
        { question: "can I took multiple tuitions?", answer: "Yes. you can take multiple tuitions based on your need." },
        { question: "Is payment secure?", answer: "We use encrypted secure payment gateways." },
        { question: "Can I track my tuition task progress?", answer: "Yes, anytime in account dashboard." },
    ];

    const [openFaq, setOpenFaq] = useState(null);
    return (
        <div>
            <section className="py-20 bg-purple-100">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12 text-purple-800">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {faqItems.map((item, i) => (
                            <div key={i} className="border border-purple-200 rounded-xl bg-white">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex justify-between items-center p-5 text-left font-medium text-gray-700"
                                >
                                    {item.question}
                                    {openFaq === i ? <ChevronUp className="text-purple-600" /> : <ChevronDown className="text-purple-600" />}
                                </button>
                                {openFaq === i && (
                                    <div className="px-5 pb-5 text-gray-500">
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Questions;