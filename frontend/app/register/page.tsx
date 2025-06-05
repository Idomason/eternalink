"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Role options
const roles = [
  {
    id: "elder",
    name: "Elder",
    description: "An elderly individual seeking connection and activities",
  },
  {
    id: "caregiver",
    name: "Caregiver",
    description: "Someone caring for an elderly individual",
  },
  {
    id: "volunteer",
    name: "Volunteer",
    description: "A youth volunteer wanting to connect with elders",
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "",
    interests: [] as string[],
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Interest options
  const interestOptions = [
    "Cooking",
    "Gardening",
    "Reading",
    "Music",
    "Crafts",
    "History",
    "Technology",
    "Health",
    "Languages",
    "Art",
    "Dance",
    "Sports",
    "Travel",
    "Writing",
    "Photography",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;

      if (name === "agreeToTerms") {
        setFormData((prev) => ({ ...prev, [name]: checkbox.checked }));
      } else if (name === "interest") {
        // Handle interests checkboxes
        if (checkbox.checked) {
          setFormData((prev) => ({
            ...prev,
            interests: [...prev.interests, value],
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            interests: prev.interests.filter((interest) => interest !== value),
          }));
        }
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateStep = (step: number) => {
    setError("");

    if (step === 1) {
      if (!formData.firstName.trim()) return "First name is required";
      if (!formData.lastName.trim()) return "Last name is required";
      if (!formData.email.trim()) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(formData.email)) return "Email is invalid";
      if (!formData.password) return "Password is required";
      if (formData.password.length < 6)
        return "Password must be at least 6 characters";
      if (formData.password !== formData.confirmPassword)
        return "Passwords do not match";
    }

    if (step === 2) {
      if (!formData.role) return "Please select a role";
      if (!formData.phoneNumber.trim()) return "Phone number is required";
    }

    if (step === 3) {
      if (formData.interests.length === 0)
        return "Please select at least one interest";
      if (!formData.agreeToTerms)
        return "You must agree to the terms and conditions";
    }

    return "";
  };

  const handleNextStep = () => {
    const validationError = validateStep(currentStep);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateStep(currentStep);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Call backend API
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
        }/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            role: formData.role,
            interests: formData.interests,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to register");
      }

      // Store token in local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  // Demo registration function (for development purposes)
  const handleDemoRegister = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const demoUser = {
        _id: "123456",
        firstName: formData.firstName || "Demo",
        lastName: formData.lastName || "User",
        email: formData.email || "demo@example.com",
        role: formData.role || "elder",
      };

      // Store demo data
      localStorage.setItem("token", "demo-token-123456");
      localStorage.setItem("user", JSON.stringify(demoUser));

      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="pt-20">
      <div className="min-h-screen bg-gradient-to-b from-accent-1/10 to-white dark:from-accent-2/20 dark:to-accent-1 py-12">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto bg-white dark:bg-accent-1 rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-foreground">
                  Join{" "}
                  <span className="text-accent-2 dark:text-primary">
                    EternaLink
                  </span>
                </h1>
                <p className="text-foreground/70 mt-2">
                  Create an account to connect with our community
                </p>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                <div className="w-full flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep >= 1
                        ? "bg-primary text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                    }`}
                  >
                    1
                  </div>
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      currentStep >= 2
                        ? "bg-primary"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  ></div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep >= 2
                        ? "bg-primary text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                    }`}
                  >
                    2
                  </div>
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      currentStep >= 3
                        ? "bg-primary"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  ></div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep >= 3
                        ? "bg-primary text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                    }`}
                  >
                    3
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-300 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-600 dark:text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-lg font-medium text-foreground mb-4">
                      Basic Information
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-foreground mb-1"
                        >
                          First Name *
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-accent-1 text-foreground"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-foreground mb-1"
                        >
                          Last Name *
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-accent-1 text-foreground"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-accent-1 text-foreground"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-foreground mb-1"
                      >
                        Password *
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-accent-1 text-foreground"
                      />
                      <p className="mt-1 text-xs text-foreground/60">
                        Must be at least 6 characters
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-foreground mb-1"
                      >
                        Confirm Password *
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-accent-1 text-foreground"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Role & Contact */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-lg font-medium text-foreground mb-4">
                      Role & Contact
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        I am a... *
                      </label>

                      <div className="grid grid-cols-1 gap-4">
                        {roles.map((role) => (
                          <div
                            key={role.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                              formData.role === role.id
                                ? "border-primary bg-primary/5 dark:bg-primary/10"
                                : "border-gray-300 dark:border-gray-700 hover:border-primary"
                            }`}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                role: role.id,
                              }))
                            }
                          >
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name="role"
                                id={`role-${role.id}`}
                                value={role.id}
                                checked={formData.role === role.id}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                              />
                              <label
                                htmlFor={`role-${role.id}`}
                                className="ml-3"
                              >
                                <span className="block text-sm font-medium text-foreground">
                                  {role.name}
                                </span>
                                <span className="block text-sm text-foreground/70">
                                  {role.description}
                                </span>
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-foreground mb-1"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-accent-1 text-foreground"
                        placeholder="+233 XX XXX XXXX"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Interests & Completion */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-lg font-medium text-foreground mb-4">
                      Interests & Completion
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        Select your interests (select at least one) *
                      </label>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {interestOptions.map((interest) => (
                          <div key={interest} className="flex items-center">
                            <input
                              id={`interest-${interest}`}
                              name="interest"
                              type="checkbox"
                              value={interest}
                              checked={formData.interests.includes(interest)}
                              onChange={handleChange}
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <label
                              htmlFor={`interest-${interest}`}
                              className="ml-2 block text-sm text-foreground/80"
                            >
                              {interest}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="agreeToTerms"
                            name="agreeToTerms"
                            type="checkbox"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="agreeToTerms"
                            className="text-foreground/80"
                          >
                            I agree to the{" "}
                            <Link
                              href="/terms"
                              className="text-primary hover:underline"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/privacy"
                              className="text-primary hover:underline"
                            >
                              Privacy Policy
                            </Link>{" "}
                            *
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="btn-outline border-gray-300 dark:border-gray-700 text-foreground"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn-primary"
                    >
                      Next
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={handleDemoRegister}
                        disabled={isLoading}
                        className="btn-outline border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Demo Register
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary flex items-center justify-center"
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Registering...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-foreground/70">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary hover:text-primary-dark font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
