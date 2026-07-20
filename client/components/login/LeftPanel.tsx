const LeftPanel = () => {
  return (
    <div className="relative hidden lg:flex items-center justify-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df"
        alt="Authentication background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-lg px-10 text-white text-center space-y-6">
        <h1 className="text-4xl font-bold leading-tight">Welcome Back 👋</h1>

        <p className="text-lg text-gray-200">
          Access your account to manage your data, track your activity, and stay
          connected with everything that matters to you.
        </p>

        <div className="flex flex-col gap-3 text-sm text-gray-300 mt-6">
          <span>✔ Secure and fast access</span>
          <span>✔ Personalized dashboard</span>
          <span>✔ Seamless experience</span>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
