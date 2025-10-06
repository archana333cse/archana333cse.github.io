// src/components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-lg font-bold mb-4">About Us</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Company Info</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-bold mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Affiliate</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Offers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} My Retail Website. All rights reserved.</p>
        <p className="mt-1">
          <a href="#" className="hover:text-white underline">Privacy Policy</a> |{" "}
          <a href="#" className="hover:text-white underline">Terms & Conditions</a>
        </p>
      </div>
    </footer>
  );
}
