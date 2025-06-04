function InfoCard({ title, value, icon }) {
  return (
    <div className="flex flex-col border-2 border-[#5F9E19] rounded-md items-center p-4">
      <div className="p-2 mr-3 rounded-full ">{icon}</div>
      <h3 className="text-sm font-medium text-white">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

export default InfoCard;
