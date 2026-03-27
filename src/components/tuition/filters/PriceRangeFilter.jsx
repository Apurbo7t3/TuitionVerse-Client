import { useState } from 'react';

const PriceRangeFilter = ({ priceRange, onPriceRangeChange }) => {
    const [localMin, setLocalMin] = useState(priceRange[0]);
    const [localMax, setLocalMax] = useState(priceRange[1]);

    const handleMinChange = (e) => {
        let value = Number(e.target.value);
        value = Math.min(value, localMax - 10);
        value = Math.max(0, value);
        setLocalMin(value);
        onPriceRangeChange([value, localMax]);
    };

    const handleMaxChange = (e) => {
        let value = Number(e.target.value);
        value = Math.max(value, localMin + 10);
        value = Math.min(10000, value);
        setLocalMax(value);
        onPriceRangeChange([localMin, value]);
    };

    const getMinPercent = () => ((localMin - 0) / (10000 - 0)) * 100;
    const getMaxPercent = () => ((localMax - 0) / (10000 - 0)) * 100;

    return (
        <div>
            <label className="text-xs font-medium text-gray-500 block mb-1">Price Range</label>
            <div className='relative h-8 w-full mb-2'>
                <div className='absolute top-1/2 -translate-y-1/2 w-full h-2 bg-gray-200 rounded-full'></div>
                <div className='absolute top-1/2 -translate-y-1/2 h-2 bg-purple-600 rounded-full'
                    style={{ left: `${getMinPercent()}%`, right: `${100 - getMaxPercent()}%` }}></div>
                <input type="range" min={0} max={10000} step={10} value={localMin} onChange={handleMinChange}
                    className='absolute top-1/2 -translate-y-2 w-full appearance-none bg-transparent
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 
                        [&::-webkit-slider-thumb]:border-purple-600 [&::-webkit-slider-thumb]:shadow-sm
                        [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform
                        [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:rounded-full 
                        [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-purple-600
                        [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:bg-transparent' />
                <input type="range" min={0} max={10000} step={10} value={localMax} onChange={handleMaxChange}
                    className='absolute top-1/2 -translate-y-2 w-full appearance-none bg-transparent
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 
                        [&::-webkit-slider-thumb]:border-purple-600 [&::-webkit-slider-thumb]:shadow-sm
                        [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform
                        [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:rounded-full 
                        [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-purple-600
                        [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:bg-transparent' />
            </div>
            <div className="flex items-center justify-between gap-2 text-xs">
                <span className="text-gray-500">${localMin}</span>
                <div className="h-px flex-1 bg-gray-200"></div>
                <span className="text-gray-500">${localMax}</span>
            </div>
        </div>
    );
};

export default PriceRangeFilter;