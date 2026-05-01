"use client";

import { useState } from "react";
import RegistrationModal, { CourseInfo } from "./RegistrationModal";
import { useTranslations } from "next-intl";

export default function CourseRegistrationButton({ courseInfo }: { courseInfo: CourseInfo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("common");

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="block text-center w-full py-4 bg-[#002D62] text-white rounded-xl font-bold text-lg hover:bg-[#00A3C1] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {t("register")}
      </button>

      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        courseInfo={courseInfo}
      />
    </>
  );
}
