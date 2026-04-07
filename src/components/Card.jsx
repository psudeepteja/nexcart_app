import React from 'react';
import { useSelector } from 'react-redux';
import { SkeletonCard } from '../utils/Skeleton/SkeletonCard';

const Card = ({ title, image }) => {
  const { isLoading } = useSelector(state => state.categories)
  
  
  return (
    isLoading === "pending" ? (
      <SkeletonCard />
    ) : (
      <div className=" overflow-hidden shadow-md rounded-xl bg-gray-50 cursor-pointer flex flex-col items-center justify-center">
        <img className="w-24 h-24 bg-gray-50 pt-4" src={image} alt={title} />
        <div className="py-4">
          <div className="font-semibold mb-2 text-xs truncate w-35 text-center capitalize max-w-[100px] md:max-w-[200px]">{title}</div>
        </div>
      </div>

    )
  );
};

export default Card;
