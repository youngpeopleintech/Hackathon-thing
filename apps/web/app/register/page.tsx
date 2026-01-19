"use client";

import React, { useState, useCallback, useMemo } from "react";
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

  // Check if user selected hackathon participant
  const isHackathonParticipant = useMemo(() => {
    return formData.interests?.includes('hackathon-participant') ?? false;
  }, [formData.interests]);

  // Dynamic form steps based on interests
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
      // Clear error when field is updated
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
      // 3-step flow: 1 -> 2 (hackathon) -> 3
      if (currentStep === 2) {
        validationErrors = validateStep2(formData);
      } else if (currentStep === 3) {
        validationErrors = validateStep3(formData);
      }
    } else {
      // 2-step flow: 1 -> 2 (skills, skipping hackathon)
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
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";
      setErrors({ submit: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    // Reset form after successful registration
    setFormData({});
    setCurrentStep(1);
    setRegistrationResult(null);
  };

  // Determine which component to render based on step
  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <StepOne
          data={formData}
          errors={errors}
          onChange={handleChange}
          onNext={handleNext}
        />
      );
    }

    if (isHackathonParticipant) {
      // 3-step flow
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
      // 2-step flow (skip hackathon step)
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Hero */}
      <div className="lg:w-1/2 lg:fixed lg:left-0 lg:top-0 lg:bottom-0">
        <HeroSection />
      </div>

      {/* Right side - Form */}
      <div className="lg:w-1/2 lg:ml-[50%] min-h-screen bg-white">
        <div className="max-w-xl mx-auto px-6 py-12 lg:py-16">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-navy-900 mb-2">
              Join YPIT's The Artificial Future
            </h1>
            <p className="text-navy-600">Be part of Africa's AI revolution.</p>
          </div>

          {/* Progress indicator */}
          <FormProgress
            currentStep={currentStep}
            totalSteps={totalSteps}
            steps={formSteps}
          />

          {/* Form card */}
          <div className="card">
            {/* Submit error */}
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Step content */}
            {renderStepContent()}
          </div>

          {/* Footer info */}
          <p className="mt-8 text-center text-sm text-navy-500">
            By registering, you agree to receive event-related communications from YPIT.
          </p>
        </div>
      </div>

      {/* Confirmation Modal */}
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
