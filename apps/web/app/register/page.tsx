'use client';

import React, { useState, useCallback } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { FormProgress } from '@/components/forms/FormProgress';
import { StepOne } from '@/components/forms/StepOne';
import { StepTwo } from '@/components/forms/StepTwo';
import { StepThree } from '@/components/forms/StepThree';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { submitRegistration } from '@/lib/api';
import { validateStep1, validateStep2, validateStep3 } from '@/lib/validation';
import type { RegistrationData } from '@/lib/types';

const FORM_STEPS = [
  { title: 'Basic Info', subtitle: 'Basic Information' },
  { title: 'Project Idea', subtitle: 'Project Idea' },
  { title: 'Skills', subtitle: 'Skills & Background' },
];

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

  const handleChange = useCallback((field: keyof RegistrationData, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const validateCurrentStep = useCallback((): boolean => {
    let validationErrors: { field: string; message: string }[] = [];

    switch (currentStep) {
      case 1:
        validationErrors = validateStep1(formData);
        break;
      case 2:
        validationErrors = validateStep2(formData);
        break;
      case 3:
        validationErrors = validateStep3(formData);
        break;
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
  }, [currentStep, formData]);

  const handleNext = useCallback(() => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [validateCurrentStep]);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    setIsSubmitting(true);
    try {
      const response = await submitRegistration(formData as RegistrationData);
      
      if (response.success && response.registrationId) {
        setRegistrationResult({
          registrationId: response.registrationId,
          name: formData.fullName || 'Builder',
        });
        setShowModal(true);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed. Please try again.';
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
              Apply to Build Africa's AI Future
            </h1>
            <p className="text-navy-600">Innovate. Build. Impact.</p>
          </div>
          
          {/* Progress indicator */}
          <FormProgress
            currentStep={currentStep}
            totalSteps={3}
            steps={FORM_STEPS}
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
            {currentStep === 1 && (
              <StepOne
                data={formData}
                errors={errors}
                onChange={handleChange}
                onNext={handleNext}
              />
            )}
            
            {currentStep === 2 && (
              <StepTwo
                data={formData}
                errors={errors}
                onChange={handleChange}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            
            {currentStep === 3 && (
              <StepThree
                data={formData}
                errors={errors}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onBack={handleBack}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
          
          {/* Footer info */}
          <p className="mt-8 text-center text-sm text-navy-500">
            By registering, you agree to participate in YPIT's hackathon and receive event-related communications.
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
