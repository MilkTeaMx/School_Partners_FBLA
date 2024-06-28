'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Globe from 'react-globe.gl';
import Button from './Button';
import Heading from './Heading';
import useLoginModal from '../hooks/useLoginModal';
import { TypeAnimation } from 'react-type-animation';

const LandingPage = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  
  const infoSections = [
    {
      title: "Enhanced Security",
      description: "Community Connect ensures the safety of your data with advanced encryption techniques, guaranteeing the security of your account",
    },
    {
      title: "User-Friendly",
      description: "Our website features an intuitive design that simplifies navigation for users of all levels, with clearly labeled functions.",
    },
  ];

  const N = 20;

  let arcData = [];
  for (let i = 0; i < N; i++) {
    arcData.push({
      startLat: (Math.random() - 0.5) * 180,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 180,
      endLng: (Math.random() - 0.5) * 360,
      color: [
        ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
        ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
      ]
    });
  }


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto p-4 text-center"
      >
         <h2 className="text-5xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Roboto Condensed, sans-serif', fontWeight: 'bold', letterSpacing: '2px' }}>
          Welcome to  <span className="text-rose-500">Community Connect</span>
        </h2>
     
        <p className="text-lg mb-6">
          Connect with people near you or across the world. <span className="text-rose-500 font-semibold">Build your community.</span>
        </p>
        
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full flex flex-col lg:flex-row  bg-white shadow-lg rounded-lg overflow-hidden"
      >
        {/* Globe Section */}
        <div className="lg:w-1/2 p-8 mt-8 flex justify-center items-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full flex items-center justify-center"
          >
            <Globe
              width={800}
              height={600}
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              arcsData={arcData}
              arcColor={'color'}
              arcDashLength={() => Math.random()}
              arcDashGap={() => Math.random()}
              arcDashAnimateTime={() => Math.random() * 4000 + 500}
            />
          </motion.div>
        </div>
        
        {/* Info Section */}
        <div className="lg:w-1/2 p-8 bg-gray-50">
          <motion.div
            className="text-left space-y-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >

            <p className='header-shadow text-3xl font-bold text-gray-800 mb-4'>
              Explore and Connect with <TypeAnimation
              className="typeanimation header-shadow text-4xl font-bold text-rose-500 mb-4"
              sequence={[
                "Businesses",
                1000,
                "Organizations",
                1000,
                "Non-Profits",
                1000,
                "Schools",
                1000,
              ]}
              speed={5}
              style={{
                fontFamily: 'Bebas Neue, sans-serif'
              }}
              repeat={Infinity}
            />
            </p>

            <p className="text-gray-700 mb-4 pb-12">
              Community Connect allows you to <span className="text-blue-600 font-semibold">connect with your community</span> and visualize your partnerships. Access recommended top picks by <span className="text-blue-600 font-semibold"> through our recommender system</span>.
            </p>
            {infoSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  {section.title}
                </h3>
                <p className="text-gray-700">{section.description}</p>
              </div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-8"
          >
            <Button label="Get Started" onClick={loginModal.onOpen} />
            <p className="text-sm mt-4">
              Any questions? Contact us at{' '}
              <a href="mailto:info@communityconnect.com" className="text-blue-500">
                info@communityconnect.com
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
