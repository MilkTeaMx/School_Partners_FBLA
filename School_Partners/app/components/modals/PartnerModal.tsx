'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from 'react-hook-form';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
import { useMemo, useState } from "react";

import usePartnerModal from '@/app/hooks/usePartnerModal';

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from "../inputs/CountrySelect";
import { categories, orgCategories } from '../navbar/Categories';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Heading from '../Heading';
import LocationSelect from '../inputs/LocationSelect';
import { APIProvider } from '@vis.gl/react-google-maps';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const PartnerModal = () => {
  const router = useRouter();
  const partnerModal = usePartnerModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const [coordinates, setLocation] = useState<any>({lat: 43.45, lng: -80.49 });

  const handleLocationSelect = (value: any) => {
    setLocation({lat: value.lat, lng: value.lng})
    setCustomValue('location', value.address)
    setCustomValue('lat', value.lat)
    setCustomValue('lng', value.lng)
  }
  

  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      typeOfOrganization: '',
      phoneNumber: '',
      email: '',
      location: null,
      imageSrc: '',
      price: 1,
      lat: 0,
      lng: 0,
      title: '',
      description: '',
    }
  });


  const location = watch('location');
  const category = watch('category');
  const email = watch('email');
  const phoneNumber = watch('phoneNumber');
  const orgCategory = watch('typeOfOrganization');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [coordinates]);


  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    
    setIsLoading(true);

    axios.post('/api/listings', data)
    .then(() => {
      toast.success('Partnership created!');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY)
      partnerModal.onClose();
    })
    .catch(() => {
      toast.error('Something went wrong.');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes the offer?"
        subtitle="Pick a category"
      />
      <div 
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => 
                setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is the organization located?"
          subtitle="Help us find it!"
        />

          <APIProvider apiKey={""}>
              
          <LocationSelect values={{lat: 43.45, lng: -80.49 }} onChange={handleLocationSelect}/>
              
          </APIProvider>

       
        <Map position={coordinates} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some Contact Information"
          subtitle="Where can we reach them?"
        />
        <Input
          id="phoneNumber"
          label="Phone Number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of their organization"
          subtitle="What can we expect?"
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Short Description?"
          subtitle="Concise works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <div 
        className="
          grid 
          grid-cols-1 
          md:grid-cols-3 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {orgCategories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(orgCategory) => 
                setCustomValue('typeOfOrganization', orgCategory)}
              selected={orgCategory === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
      
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="items-center flex flex-col gap-8 font-bold">
        <div className="flex items-center gap-8 font-normal">
          <label> Make Public? </label>
          <input
            type="checkbox"
            onChange={(e) => setCustomValue('price', e.target.checked ? 1 : 0)}
            className="mr-2" // Add some margin to the right for spacing
          />
        </div>
        Submit?
      </div>
      
    )
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={partnerModal.isOpen}
      title="Create a Community"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={partnerModal.onClose}
      body={bodyContent}
    />
  );
}

export default PartnerModal;
