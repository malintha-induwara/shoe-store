const DashboardOverview = () => {
    const metrics = ['Total Sales', 'Active Users', 'New Orders', 'Revenue'];
  
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((title) => (
            <div key={title} className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
              <p className="text-2xl font-semibold mt-2">1,234</p>
              <p className="text-green-600 text-sm mt-2">+12.5% from last month</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to Dashboard!</h2>
          <p className="text-gray-600">
            This is your main dashboard area. Add your content here.
          </p>
        </div>
      </div>
    );
  };
  
  export default DashboardOverview;
  