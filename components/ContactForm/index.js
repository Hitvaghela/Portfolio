import React, { useContext, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import DataContext from '../../context/DataContext'
import emailjs from '@emailjs/browser'
import { Notification, validateEmail } from '../../helpers'
import { EMAILJS_TEMPLATE_ID, EMAILJS_SERVICE_ID, EMAILJS_PUBLIC_KEY } from '../../config'

const notif = new Notification(3000)

function ContactForm() {
    const { contactActive, closeContactForm } = useContext(DataContext)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validation
        if (formData.name === "") {
            return notif.error("Name cannot be blank.")
        }
        if (formData.email === "") {
            return notif.error("Email cannot be blank.")
        }
        if (formData.message === "") {
            return notif.error("Message cannot be blank.")
        }

        // Validate email format
        if (validateEmail(formData.email) === false) {
            return notif.error("Email is invalid.")
        }

        const templateParams = {
            from_name: formData.name,
            sender_email: formData.email,
            message: formData.message
        }

        // Check if EmailJS configuration is complete
        if (EMAILJS_TEMPLATE_ID === "" || EMAILJS_SERVICE_ID === "" || EMAILJS_PUBLIC_KEY === "") {
            console.error("FAILED TO SEND MESSAGE: Missing EmailJS configuration.")
            return notif.error("Failed to send message: Configuration error.")
        }

        setLoading(true)
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
            .then((response) => {
                setLoading(false)
                notif.success("Message sent successfully!")
                setFormData({ name: '', email: '', message: '' })
                closeContactForm()
                console.log('Email sent:', response)
            }, (err) => {
                setLoading(false)
                notif.error("Something went wrong, could not send message.")
                console.error('Email error:', err)
            })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    if (!contactActive) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-dark-200 rounded-lg p-6 w-full max-w-md relative">
                {/* Close button */}
                <button
                    onClick={closeContactForm}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <AiOutlineClose size={24} />
                </button>

                {/* Form header */}
                <h2 className="text-2xl font-bold text-white mb-6">Get In Touch</h2>

                {/* Contact form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-dark-100 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-400"
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 bg-dark-100 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-400"
                            placeholder="your.email@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            Message
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full px-3 py-2 bg-dark-100 border border-gray-600 rounded-md text-white focus:outline-none focus:border-green-400 resize-none"
                            placeholder="Your message..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:from-green-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Sending Message..." : "Send Message"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ContactForm 