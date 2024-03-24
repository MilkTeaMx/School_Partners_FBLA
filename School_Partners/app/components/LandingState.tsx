'use client';

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";

const LandingState = ({}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden lg:flex">
        {/* Image Section */}
        <div className="lg:w-1/2 bg-gray-200">
          <img
            className="object-cover object-center h-full w-full"
            src="/image.jpg"
            alt="Example Image"
          />
        </div>
        {/* Information Section */}
        <div className="p-8 lg:w-1/2">
          <Heading
            title="Welcome to My App"
            subtitle="Where amazing things happen"
            center={false}
          />
          <p className="text-lg mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            ullamcorper, urna et tempor vehicula, leo nunc mollis nisl, vel
            imperdiet metus mi sed nisl.
          </p>
          <Button label={"getStarted"} onClick={() => {}}/>
        </div>
      </div>
    </div>
  );
};
export default LandingState;