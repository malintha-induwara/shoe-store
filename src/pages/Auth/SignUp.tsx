import { Lock, Mail } from "lucide-react";
import LoginImage from "../../assets/login.jpg";
import Logo from "../../assets/logo.svg";

const SignUp = () => {
  return (
    <div className="min-h-screen  flex flex-col-reverse md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col justify-center px-16 bg-white">
        <div className="max-w-md w-full mx-auto">
        <img className="h-12 mx-auto mb-6"  src={Logo} alt="logo" />
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join us for exclusive shoe collections and offers
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  className="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Create a password"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters long
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Retype Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  className="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Retype password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Account
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>

      <div className="w-1/2  md:w-1/2 h-48 md:h-auto bg-blue-50">
        <div className="h-full relative">
          <img
            src={LoginImage}
            alt="Luxury Shoes Collection"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
