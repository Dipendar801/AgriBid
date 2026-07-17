import { useEffect, useState } from "react";

function AuctionTimer({ endTime }) {
  const calculateTimeLeft = () => {
    const difference = new Date(endTime) - new Date();

    if (difference <= 0) {
      return "Auction Ended";
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (difference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor(
      (difference % (1000 * 60)) / 1000
    );

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-3">
      <p className="font-semibold text-red-600">
        ⏳ {timeLeft}
      </p>
    </div>
  );
}

export default AuctionTimer;