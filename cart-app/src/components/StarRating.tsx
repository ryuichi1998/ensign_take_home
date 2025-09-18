import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const StarRating = ({
  rating,
  maxStars = 5,
  size = "md",
  className = "",
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className={`flex items-center ${className}`}>
      {Array.from({ length: maxStars }, (_, index) => (
        <Star
          key={index}
          className={`${sizeClasses[size]} ${
            index < Math.floor(rating)
              ? "text-yellow-300 fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;
