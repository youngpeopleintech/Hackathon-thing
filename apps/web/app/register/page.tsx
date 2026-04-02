"use client";

import React, { useState, useCallback, useMemo } from "react";
import "@/components/af-register/ypit-af-register.css";
import { HeroSection } from "@/components/HeroSection";
import { FormProgress } from "@/components/forms/FormProgress";
import { StepOne } from "@/components/forms/StepOne";
import { StepTwo } from "@/components/forms/StepTwo";
import { StepThree } from "@/components/forms/StepThree";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { submitRegistration } from "@/lib/api";
import { validateStep1, validateStep2, validateStep3 } from "@/lib/validation";
import type { RegistrationData } from "@/lib/types";

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegistrationData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [registrationResult, setRegistrationResult] = useState<{
    registrationId: string;
    name: string;
  } | null>(null);

  const isHackathonParticipant = useMemo(() => {
    return formData.interests?.includes("hackathon-participant") ?? false;
  }, [formData.interests]);

  const formSteps = useMemo(() => {
    if (isHackathonParticipant) {
      return [
        { title: "Basic Info", subtitle: "Basic Information & Interests" },
        { title: "Project Idea", subtitle: "Project Idea" },
        { title: "Skills", subtitle: "Skills & Background" },
      ];
    }
    return [
      { title: "Basic Info", subtitle: "Basic Information & Interests" },
      { title: "Skills", subtitle: "Skills & Background" },
    ];
  }, [isHackathonParticipant]);

  const totalSteps = formSteps.length;

  const handleChange = useCallback(
    (field: keyof RegistrationData, value: string | boolean | number | string[]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const validateCurrentStep = useCallback((): boolean => {
    let validationErrors: { field: string; message: string }[] = [];

    if (currentStep === 1) {
      validationErrors = validateStep1(formData);
    } else if (isHackathonParticipant) {
      if (currentStep === 2) {
        validationErrors = validateStep2(formData);
      } else if (currentStep === 3) {
        validationErrors = validateStep3(formData);
      }
    } else {
      if (currentStep === 2) {
        validationErrors = validateStep3(formData);
      }
    }

    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((err) => {
        errorMap[err.field] = err.message;
      });
      setErrors(errorMap);
      return false;
    }

    setErrors({});
    return true;
  }, [currentStep, formData, isHackathonParticipant]);

  const handleNext = useCallback(() => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [validateCurrentStep, totalSteps]);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    try {
      const response = await submitRegistration(formData as RegistrationData);

      if (response.success && response.registrationId) {
        setRegistrationResult({
          registrationId: response.registrationId,
          name: formData.fullName || "Builder",
        });
        setShowModal(true);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Registration failed. Please try again.";
      setErrors({ submit: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFormData({});
    setCurrentStep(1);
    setRegistrationResult(null);
  };

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <StepOne data={formData} errors={errors} onChange={handleChange} onNext={handleNext} />
      );
    }

    if (isHackathonParticipant) {
      if (currentStep === 2) {
        return (
          <StepTwo
            data={formData}
            errors={errors}
            onChange={handleChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      }
      if (currentStep === 3) {
        return (
          <StepThree
            data={formData}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        );
      }
    } else {
      if (currentStep === 2) {
        return (
          <StepThree
            data={formData}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        );
      }
    }

    return null;
  };

  return (
    <div className="ypitAfRegister min-h-screen flex flex-col lg:flex-row">
      <div className="lg:w-1/2 lg:fixed lg:left-0 lg:top-0 lg:bottom-0">
        <HeroSection />
      </div>

      <div className="af-reg-form-column lg:w-1/2 lg:ml-[50%] w-full">
        <div className="af-reg-form-inner">
          <div className="mb-2">
            <p className="af-reg-page-label">Register</p>
            <h1 className="af-reg-page-title">Join The Artificial Future</h1>
            <p className="af-reg-page-sub">Be part of Africa&apos;s AI revolution — hackathon, workshops, and conference.</p>
          </div>

          <FormProgress currentStep={currentStep} totalSteps={totalSteps} steps={formSteps} />

          <div className="af-reg-form-card">
            {errors.submit && (
              <div className="af-reg-error-banner">
                <p>{errors.submit}</p>
              </div>
            )}

            {renderStepContent()}
          </div>

          <p className="af-reg-footer-note">
            By registering, you agree to receive event-related communications from YPIT.
          </p>
        </div>
      </div>

      {registrationResult && (
        <ConfirmationModal
          isOpen={showModal}
          onClose={handleModalClose}
          registrationId={registrationResult.registrationId}
          name={registrationResult.name}
        />
      )}
    </div>
  );
}
