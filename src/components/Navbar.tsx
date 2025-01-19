import { useState, useEffect } from "react";

const formatDate = (date: Date): string => {
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month: string = months[date.getMonth()];
  const day: number = date.getDate();
  const year: number = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    second: undefined,
  });
};

function Navbar() {
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-4 lg:px-8">
      <div className="flex items-center gap-3 text-lg">
        <span className="font-medium text-gray-900">
          {formatDate(currentDateTime)}
        </span>
        <span className="text-gray-600">{formatTime(currentDateTime)}</span>
      </div>
    </div>
  );
}

export default Navbar;
