import Link from "next/link"
import { Facebook, Youtube, Instagram } from "lucide-react"

const socialLinks = [
  { platform: "Facebook", icon: Facebook, url: "https://www.facebook.com/sakecfestpratishtha/" },
  { platform: "Youtube", icon: Youtube, url: "https://www.youtube.com/@sakecprathistha" },
  { platform: "Instagram", icon: Instagram, url: "https://www.instagram.com/pratishtha_sakecfest/" },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Pratishtha 2025</h2>
            <p className="text-gray-300 mb-4">
              Experience the future of education and entertainment at our Annual College Symposium.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ platform, icon: Icon, url }) => (
                <Link
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label={`Follow us on ${platform}`}
                >
                  <Icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Pratishtha. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

