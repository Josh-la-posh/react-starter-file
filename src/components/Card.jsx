import React from 'react';

const Card = ({ title, value, icon, color, color2 }) => {
    return (
        <div className='p-3 md:p-2 md:mb-2 rounded-[8px] border border-[#E4E7EC] text-white bg-priColor bg-opacity-5 flex flex-col justify-between'>
            <div className={`h-12 w-12 rounded-full ${color || 'bg-priColor'} flex justify-center items-center md:hidden mb-2`}>
                <div className="text-[#1761D9] text-xl flex justify-center items-center">{icon}</div>
            </div>
            <h2 className="text-[#1D2739] text-[28px] lg:text-[32px] font-semibold">{value}</h2>
            <div className="flex gap-2 items-center">
                {color2 && <div className={`${color2} w-[15px] h-[15px] rounded-md hidden md:block`}></div>}
                <p className="text-xs xl:text-sm font-[500] text-[#667185] flex-1">{title}</p>
            </div>
        </div>
    );
};

export default Card;