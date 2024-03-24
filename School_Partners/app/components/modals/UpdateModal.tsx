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
import { usePathname } from 'next/navigation'

import { useMemo, useState } from "react";

import useUpdateModal from '@/app/hooks/useUpdateModal';

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from "../inputs/CountrySelect";
import { categories, orgCategories } from '../navbar/Categories';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Heading from '../Heading';
import { SafeListing } from '@/app/types';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

interface UpdateModalProps {
    listing: SafeListing;

  }

const UpdateModal: React.FC<UpdateModalProps>  = ({ listing }) => {

  const router = useRouter();
  const updateModal = useUpdateModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const pathname = usePathname()

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
      category: listing.category,
      typeOfOrganization: listing.typeOfOrganization,
      phoneNumber: listing.phoneNumber,
      email: listing.email,
      location: listing.locationValue,
      imageSrc: listing.imageSrc,
      price: listing.price,
      title: listing.title,
      description: listing.description,
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
  }), [location]);


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

    axios.put(`/api/listings/${listing.id}`, data)
    .then(() => {
      toast.success('Listing updated!');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY)
      updateModal.onClose();
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
      return 'Update'
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
        <CountrySelect 
          value={location} 
          onChange={(value) => setCustomValue('location', value)} 
        />
        <Map center={location?.latlng} />
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
        Submit?
      </div>
    )
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={updateModal.isOpen}
      title="Update Your Community"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={updateModal.onClose}
      body={bodyContent}
    />
  );
}

export default UpdateModal;
