"use client";

import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="dark:bg-neutral-800 border-t-4 border-[#00d748] rounded-2xl py-10">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

                {/* Company Info */}
        <div>
                    <h2 className="text-2xl font-bold text-[#ff3d57]">Souhait Travel Advisors</h2>
                    <p className="mt-3 ">
                        Helping you travel smart and secure your future abroad with expert visa and job consultation.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold ">Quick Links</h3>
                    <ul className="mt-3 space-y-2">
                        <li><a href="/" className="hover:text-blue-500">Home</a></li>
                        <li><a href="/" className="hover:text-blue-500">About Us</a></li>
                        <li><a href="/" className="hover:text-blue-500">Services</a></li>
                        <li><a href="/" className="hover:text-blue-500">Contact</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-xl font-semibold text-white">Contact Us</h3>
                    <ul className="mt-3 space-y-2">
                        <li className="flex items-center gap-2"><MapPin size={18} /> 123 Main Street, Accra, Ghana</li>
                        <li className="flex items-center gap-2"><Phone size={18} /> {"+233 553-143-196"}</li>
                        <li className="flex items-center gap-2"><Mail size={18} /> contact@souhaittraveladvisors.com</li>
                    </ul>
                </div>

            </div>

            {/* Social Media & Copyright */}
            <div className="mt-10 border-t border-gray-700 pt-6 text-center">
                <div className="flex justify-center space-x-6 mb-4">
                    <a href="/" className="text-gray-400 hover:text-blue-500"><Facebook size={24} /></a>
                    <a href="/" className="text-gray-400 hover:text-blue-500"><Twitter size={24} /></a>
                    <a href="/" className="text-gray-400 hover:text-blue-500"><Instagram size={24} /></a>
                </div>
                <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Souhait Travel Advisors. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
