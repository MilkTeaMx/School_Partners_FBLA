'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./navbar/MenuItem";
import Avatar from "./Avatar";
import usePartnerModal from "@/app/hooks/usePartnerModal";

interface ModalProps {
    title?: string;
    option1?: string;
    option2?: string;
    option3?: string;
    option4?: string;
    option5?: string;
    option6?: string;
    option7?: string;
    option8?: string;
    option1Action?: () => void;
    option2Action?: () => void;
    option3Action?: () => void;
    option4Action?: () => void;
    option5Action?: () => void;
    option6Action?: () => void;
    option7Action?: () => void;
    option8Action?: () => void;
}

const OpenableMenu: React.FC<ModalProps> = ({
    title,
    option1,
    option2,
    option3,
    option4,
    option5,
    option6,
    option7,
    option8,
    option1Action,
    option2Action,
    option3Action,
    option4Action,
    option5Action,
    option6Action,
    option7Action,
    option8Action
}) => {


  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px] 
            border-neutral-200 
            flex 
            flex-row 
            items-center 
            gap-3 
            rounded-full 
            cursor-pointer 
            hover:shadow-md 
            transition
            bg-white 
          "
        >
            <h1> {title} </h1>
          <AiOutlineMenu />
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            <>
            {option1 && option1Action && (
              <MenuItem
                label={option1}
                onClick={option1Action}
              />
            )}
            {option2 && option2Action && (
              <MenuItem
                label={option2}
                onClick={option2Action}
              />
            )}
            {option3 && option3Action && (
              <MenuItem
                label={option3}
                onClick={option3Action}
              />
            )}
            {option4 && option4Action && (
              <MenuItem
                label={option4}
                onClick={option4Action}
              />
            )}
            {option5 && option5Action && (
              <MenuItem
                label={option5}
                onClick={option5Action}
              />
            )}
            {option6 && option6Action && (
              <MenuItem
                label={option6}
                onClick={option6Action}
              />
            )}
            {option7 && option7Action && (
              <MenuItem
                label={option7}
                onClick={option7Action}
              />
            )}
            {option8 && option8Action && (
              <MenuItem
                label={option8}
                onClick={option8Action}
              />
            )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenableMenu;