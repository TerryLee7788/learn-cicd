const Loading = () => (
  <div className="flex justify-center items-center h-40 bg-white">
    <div className="relative w-12 h-12">
      <div className="absolute w-12 h-12 rounded-full animate-spin border-4 border-primary border-t-transparent"></div>
      <div className="absolute w-12 h-12 rounded-full animate-ping border-4 border-primary opacity-25"></div>
    </div>
  </div>
);

export default Loading;
