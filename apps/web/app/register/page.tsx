"use client";

import React, { useState, useCallback } from "react";
import "@/components/af-register/ypit-af-register.css";
import { HeroSection } from "@/components/HeroSection";
import { StepOne } from "@/components/forms/StepOne";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { submitRegistration } from "@/lib/api";
import { validateStep1 } from "@/lib/validation";
import type { RegistrationData } from "@/lib/types";

export default function RegisterPage() {
  const [formData, setFormData] = useState<Partial<RegistrationData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [registrationResult, setRegistrationResult] = useState<{ registrationId: string; name: string } | null>(null);

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

  const handleSubmit = useCallback(async () => {
    const validationErrors = validateStep1(formData);
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((err) => { errorMap[err.field] = err.message; });
      setErrors(errorMap);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: RegistrationData = {
        ...(formData as RegistrationData),
        interests: ['hackathon-participant'],
        gender: 'prefer-not-to-say',
      };
      const response = await submitRegistration(payload);
      if (response.success && response.registrationId) {
        setRegistrationResult({ registrationId: response.registrationId, name: formData.fullName || "Builder" });
        setShowModal(true);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Registration failed. Please try again.";
      setErrors({ submit: message });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const handleModalClose = () => {
    setShowModal(false);
    setFormData({});
    setRegistrationResult(null);
  };

  return (
    <div className="ypitAfRegister min-h-screen flex flex-col lg:flex-row">
      <div className="lg:w-1/2 lg:fixed lg:left-0 lg:top-0 lg:bottom-0">
        <HeroSection />
      </div>

      <div className="af-reg-form-column lg:w-1/2 lg:ml-[50%] w-full">
        <div className="af-reg-form-inner">
          <div className="mb-8">
            <p className="af-reg-page-label">Hackathon Registration</p>
            <h1 className="af-reg-page-title">Join the Hackathon</h1>
            <p className="af-reg-page-sub">May 30 – June 6, 2026 · Lagos + Virtual · Free</p>
          </div>

          <div className="af-reg-form-card">
            {errors.submit && (
              <div className="af-reg-error-banner">
                <p>{errors.submit}</p>
              </div>
            )}
            <StepOne data={formData} errors={errors} onChange={handleChange} onNext={handleSubmit} />
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
