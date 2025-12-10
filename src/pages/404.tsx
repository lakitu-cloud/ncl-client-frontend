import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8"
        >
          <h2 className="text-4xl font-semibold dark:text-gray-100 text-gray-900 font-oswald mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-10 font-poppins">
            Oops! The page you're looking for seems to have vanished into the void.
            It might have been moved, deleted, or never existed.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <div  className="bg-blue-600 hover:bg-blue-700 dark:text-white px-3 py-2 rounded-lg shadow-sm text-gray-200">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </div>

          <div  className="border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg shadow-sm">
            <Link to="/" onClick={() => window.history.back()} className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Link>
          </div>
        </motion.div>

        {/* Optional Search Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 text-sm text-gray-500 flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          Try searching or use the navigation above
        </motion.p>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}