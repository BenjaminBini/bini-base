const MainWrapper = ({ children }) => {
  return (
    <main className="min-h-[100vh] bg-slate-900 py-10 lg:pl-72">
      <div className="px-4 sm:px-6 lg:px-8">{children}</div>
    </main>
  );
};

export default MainWrapper;
