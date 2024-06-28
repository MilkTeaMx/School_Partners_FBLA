'use client'
import { motion } from "framer-motion";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

const FAQ = async () => {
  // Assuming you have some logic here to fetch user and reservations if needed


  return (
    <ClientOnly>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <div className="h-screen top-0 pr-8 overflow-y-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 top-0 sm:text-4xl mb-6 sticky bg-white z-10 py-6">
              Frequently Asked Questions
            </h2>
            <div className="border-t border-gray-200 pt-6">
              <dl className="space-y-8 divide-y divide-gray-200">
                {faqData.map((faq, index) => (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="pt-6"
                  >
                    <dt className="text-lg leading-6 font-medium text-gray-900">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      {faq.answer}
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="p-4">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
              Contact Us
            </h2>
            <p className="text-lg text-gray-500 mb-4">
              If you have any further questions or need assistance, please contact us at:
            </p>
            <ul className="text-lg text-gray-500 space-y-2">
              <li>Email: support@ctepartners.com</li>
              <li>Phone: (123) 456-7890</li>
              <li>Address: 123 Education Lane, School City, State, 12345</li>
            </ul>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
};


const faqData = [
  {
    question: "How can I sign up as a business partner?",
    answer: "To sign up a business partner, click on the 'Partner Up' link at the top right of the page. Fill out the required information, including details about the organization and the resources they can provide."
  },
  {
    question: "What types of resources can businesses provide?",
    answer: "Businesses can provide a variety of resources, including scholarships, apprenticeships, discounts, funding, field trips, supplies, services, and student sponsorships. If you have a unique resource that doesn't fit these categories, please describe it in detail when you sign up."
  },
  {
    question: "How do I verify a business after signing up?",
    answer: "After partnering up, you will receive an multiple forms of contact and communication. Follow the steps outlined to verify the business. If you encounter any issues, contact our support team for assistance."
  },
  {
    question: "How can I search for specific partners?",
    answer: "You can use the search bar at the top of the 'Partners' page to find specific partners. You can also filter results by resource type, location, and other criteria to narrow down your search."
  },
  {
    question: "How often is the partner information updated?",
    answer: "Partner information is updated in real-time as businesses are signed up. We also conduct periodic reviews to ensure the accuracy and relevance of the information."
  },
  {
    question: "What if I need to update my business information?",
    answer: "If you need to update a business's information, update any information on their details page."
  },
  {
    question: "How do I become eligible for student sponsorships?",
    answer: "To become eligible for student sponsorships, you must contact your school or set up meetings through the calendar functionality. Select a date or date range and set up a meeting or event with the business or organization."
  },
  {
    question: "Can I see a list of all current business partners?",
    answer: "Yes, you can view a list of all current business partners on the 'Partners' page. This page provides detailed information about each partner, including the resources they offer and their contact information."
  },
  {
    question: "How does the dynamic backup feature work?",
    answer: "The dynamic backup feature automatically saves all partner information at regular intervals to ensure that no data is lost. In case of any technical issues, the latest backup can be restored to maintain data integrity."
  },
  {
    question: "How can I get in touch with a specific partner?",
    answer: "You can find contact information for each partner on their profile page. Use the provided email or phone number to get in touch with the partner directly. If you need further assistance, our support team is here to help."
  }
];

export default FAQ;
