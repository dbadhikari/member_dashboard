import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Lock,
  Play,
  FileText,
  Award,
  CreditCard,
  BookOpen,
  ClipboardCheck,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  GraduationCap,
  ShieldCheck,
  Star,
  ArrowRight,
  Circle,
  Loader2,
  FileCheck,
  Medal,
  Sparkles,
  TrendingUp,
  Brain,
  Target,
  Trophy,
  Video,
  PlayCircle,
  BadgeCheck,
} from "lucide-react";

const Eligible = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [examAnswers, setExamAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examResult, setExamResult] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateNumber, setCertificateNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // PASSING SCORE CONFIGURATION
  const PASSING_PERCENTAGE = 80; // 80% to pass

  // Sample questions - You can add/remove questions freely
  const questions = [
    {
      id: 1,
      question: "What is the eligibility requirement for membership?",
      options: [
        "Complete all training modules",
        "Pass the eligibility exam",
        "Both A and B",
        "None of the above",
      ],
      correct: 2,
    },
    {
      id: 2,
      question: "How many questions are in the eligibility exam?",
      options: ["10", "15", "20", "25"],
      correct: 2,
    },
    {
      id: 3,
      question: "What is the passing score for the exam?",
      options: ["14/20", "15/20", "16/20", "17/20"],
      correct: 2,
    },
    {
      id: 4,
      question: "Which of the following is NOT a benefit of the program?",
      options: [
        "Eligibility Course",
        "Training Resources",
        "Free Membership",
        "Digital Certificate",
      ],
      correct: 2,
    },
    {
      id: 5,
      question: "What happens after completing all steps?",
      options: [
        "You become eligible",
        "You get a certificate",
        "Both A and B",
        "You need to restart",
      ],
      correct: 2,
    },
  ];

  // Calculate passing score dynamically based on question count
  const calculatePassingScore = () => {
    const totalQuestions = questions.length;
    const requiredCorrect = Math.ceil(
      (PASSING_PERCENTAGE / 100) * totalQuestions,
    );
    return requiredCorrect;
  };

  const PASSING_SCORE = calculatePassingScore();

  // Videos data
  const videos = [
    {
      id: 1,
      title: "Introduction to Eligibility Program",
      duration: "12:34",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      embedId: "dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "Understanding Membership Benefits",
      duration: "18:22",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      embedId: "dQw4w9WgXcQ",
    },
    {
      id: 3,
      title: "Preparing for the Eligibility Exam",
      duration: "15:47",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      embedId: "dQw4w9WgXcQ",
    },
  ];

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Determine current step
      if (parsedUser.certificateGenerated) {
        setCurrentStep(4);
        setShowCertificate(true);
        setCertificateNumber(
          parsedUser.certificateNumber ||
            `CERT-${Date.now().toString().slice(-8)}`,
        );
      } else if (parsedUser.examPassed) {
        setCurrentStep(4);
      } else if (parsedUser.videosCompleted) {
        setCurrentStep(3);
      } else if (parsedUser.paymentDone) {
        setCurrentStep(2);
      } else {
        setCurrentStep(1);
      }
    } else {
      // Redirect to login if no user
      navigate("/login");
    }
  }, [navigate]);

  // Save user to localStorage
  const saveUser = (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  // Handle payment
  const handlePayment = (method) => {
    setSelectedPayment(method);
    setShowPaymentModal(true);
  };

  const confirmPayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      const updatedUser = { ...user, paymentDone: true };
      saveUser(updatedUser);
      setShowPaymentModal(false);
      setCurrentStep(2);
      setIsLoading(false);
    }, 1500);
  };

  // Handle learning completion
  const handleLearningComplete = () => {
    const updatedUser = { ...user, videosCompleted: true };
    saveUser(updatedUser);
    setCurrentStep(3);
  };

  // Handle exam
  const handleAnswerSelect = (questionId, optionIndex) => {
    setExamAnswers({ ...examAnswers, [questionId]: optionIndex });
  };

  const handleSubmitExam = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (examAnswers[q.id] === q.correct) correct++;
    });

    const passed = correct >= PASSING_SCORE;
    setExamResult({
      correct,
      total: questions.length,
      passed,
      passingScore: PASSING_SCORE,
      passingPercentage: PASSING_PERCENTAGE,
    });
    setExamSubmitted(true);

    if (passed) {
      const updatedUser = { ...user, examPassed: true };
      saveUser(updatedUser);
      setCurrentStep(4);
      generateCertificate();
      
      // Reload the page after passing the exam
      window.location.reload();
    }
  };

  const handleRetakeExam = () => {
    setExamAnswers({});
    setCurrentQuestion(0);
    setExamSubmitted(false);
    setExamResult(null);
  };

  // Generate certificate
  const generateCertificate = () => {
    const certNum = `CERT-${Date.now().toString().slice(-8)}`;
    setCertificateNumber(certNum);
    const updatedUser = {
      ...user,
      level: "eligible",
      examPassed: true,
      certificateGenerated: true,
      certificateNumber: certNum,
      certificateDate: new Date().toISOString(),
    };
    saveUser(updatedUser);
  };

  // Navigation checks
  const canAccessStep = (step) => {
    if (step === 1) return true;
    if (step === 2) return user?.paymentDone;
    if (step === 3) return user?.paymentDone && user?.videosCompleted;
    if (step === 4)
      return user?.paymentDone && user?.videosCompleted && user?.examPassed;
    return false;
  };

  // Progress calculation
  const calculateProgress = () => {
    let progress = 0;
    if (user?.paymentDone) progress += 25;
    if (user?.videosCompleted) progress += 25;
    if (user?.examPassed) progress += 25;
    if (user?.certificateGenerated) progress += 25;
    return progress;
  };

  const progress = calculateProgress();

  const progressWidth = {
    0: "0%",
    25: "16.67%",
    50: "50%",
    75: "83.33%",
    100: "100%",
  };

  // Steps data
  const steps = [
    { id: 1, label: "Payment", icon: CreditCard },
    { id: 2, label: "Learning", icon: BookOpen },
    { id: 3, label: "Exam", icon: ClipboardCheck },
    { id: 4, label: "Certificate", icon: Award },
  ];

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 min-w-[400px] ">
      {/* Progress Tracker */}
      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6 md:mb-8 border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
              Eligibility Program
            </h2>
            <p className="text-sm text-gray-500">
              Complete all steps to become eligible
            </p>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-xl w-full sm:w-auto">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-gray-700">
              {progress}% Complete
            </span>
          </div>
        </div>

        {/* Progress Bar - FIXED VERSION */}
        <div className="relative pt-4">
          {/* Progress Bar Background - Centered with circles */}
          <div className="absolute left-0 right-0 top-2/5 -translate-y-1/2">
            <div className="w-full h-1 bg-gray-200 rounded-full" />
          </div>

          {/* Progress Bar Fill */}
          <div
            className="absolute left-0 top-2/5 -translate-y-1/2 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-700"
            style={{ width: progressWidth[progress] }}
          />

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = progress >= (index + 1) * 25;
              const isCurrent =
                progress >= index * 25 && progress < (index + 1) * 25;
              const isLocked = !canAccessStep(index + 1);

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center"
                  style={{ flex: 1 }}
                >
                  <button
                    onClick={() => {
                      if (canAccessStep(index + 1)) {
                        setCurrentStep(index + 1);
                      }
                    }}
                    disabled={isLocked}
                    className={`
                      w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 relative z-10
                      ${
                        isCompleted
                          ? "bg-gradient-to-r from-green-400 to-green-500 shadow-lg shadow-green-200"
                          : isCurrent
                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200 animate-pulse"
                            : isLocked
                              ? "bg-gray-200 cursor-not-allowed"
                              : "bg-gray-200 hover:bg-gray-300"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    ) : isLocked ? (
                      <Lock className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                    ) : (
                      <Icon
                        className={`w-4 h-4 md:w-5 md:h-5 ${isCurrent ? "text-white" : "text-gray-500"}`}
                      />
                    )}
                  </button>

                  {/* Step Label */}
                  <span
                    className={`mt-2 text-xs font-medium ${isCompleted ? "text-green-600" : isCurrent ? "text-indigo-600" : "text-gray-400"}`}
                  >
                    {step.label}
                  </span>

                  {/* Status Badge - Fixed with proper spacing */}
                  <div className="h-5 mt-1">
                    {isCurrent && (
                      <span className="text-[10px] text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                        Current
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[10px] text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                        ✓ Done
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Area */}
        <div className="lg:col-span-2">
          {/* Step 1: Payment */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
                  <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">
                    Payment
                  </h3>
                  <p className="text-sm text-gray-500">
                    Complete payment to unlock the program
                  </p>
                </div>
              </div>

              {user?.paymentDone ? (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-green-700">
                        Payment Completed ✅
                      </h4>
                      <p className="text-sm text-green-600">
                        You have successfully completed the payment.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 md:p-6 border border-indigo-100">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-indigo-500" />
                        Program Benefits
                      </h4>
                      <ul className="space-y-2">
                        {[
                          "Eligibility Course",
                          "Training Resources",
                          "MCQ Examination",
                          "Digital Certificate",
                        ].map((benefit, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <CheckCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 md:p-6 border border-blue-100 flex flex-col items-center justify-center">
                      <p className="text-sm text-gray-500">Program Fee</p>
                      <p className="text-2xl md:text-3xl font-bold text-gray-800">
                        Rs. 500
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        One-time payment
                      </p>
                      <div className="mt-3 flex items-center gap-1 text-xs text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        <ShieldCheck className="w-3 h-3" />
                        Secure Payment
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handlePayment("eSewa")}
                      className="flex-1 py-3 px-6 bg-[#60BB46] hover:bg-[#4EA63A] text-white rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" />
                      Pay with eSewa
                    </button>
                    <button
                      onClick={() => handlePayment("Khalti")}
                      className="flex-1 py-3 px-6 bg-[#5C2D91] hover:bg-[#4A2475] text-white rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" />
                      Pay with Khalti
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 2: Learning */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
                  <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">
                    Learning Resources
                  </h3>
                  <p className="text-sm text-gray-500">
                    Watch videos and study materials
                  </p>
                </div>
              </div>

              {/* Videos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all group"
                  >
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="w-6 h-6 text-indigo-600 ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-800 line-clamp-2">
                        {video.title}
                      </p>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.embedId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600 hover:text-indigo-800 mt-1 inline-flex items-center gap-1"
                      >
                        <PlayCircle className="w-3 h-3" />
                        Watch on YouTube
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Study Notes */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-200 mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <FileText className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      Study Notes (PDF)
                    </p>
                    <p className="text-xs text-gray-500">
                      Comprehensive study material for the exam
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              </div>

              {user?.videosCompleted ? (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                    <div>
                      <h4 className="font-semibold text-green-700">
                        Learning Completed ✅
                      </h4>
                      <p className="text-sm text-green-600">
                        You've finished all learning materials.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleLearningComplete}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />I Have Finished Learning
                </button>
              )}
            </div>
          )}

          {/* Step 3: Exam */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-indigo-100">
                  <ClipboardCheck className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">
                    MCQ Examination
                  </h3>
                  <p className="text-sm text-gray-500">
                    Answer {questions.length} questions • Need {PASSING_SCORE}{" "}
                    correct to pass ({PASSING_PERCENTAGE}%)
                  </p>
                </div>
              </div>

              {examSubmitted ? (
                <div
                  className={`rounded-xl p-6 ${
                    examResult.passed
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                      : "bg-gradient-to-r from-red-50 to-rose-50 border-red-200"
                  } border`}
                >
                  <div className="text-center">
                    {examResult.passed ? (
                    
                      <>
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                          <Trophy className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
                        </div>
                        <h4 className="text-xl md:text-2xl font-bold text-green-700 mb-2">
                           Congratulations!
                        </h4>
                        <p className="text-green-600">
                          You passed the Eligibility Examination!
                        </p>
                        <p className="text-sm text-green-500 mt-2">
                          Score: {examResult.correct}/{examResult.total} (
                          {Math.round(
                            (examResult.correct / examResult.total) * 100,
                          )}
                          %)
                        </p>
                        <p className="text-xs text-green-400 mt-1">
                          Required: {examResult.passingScore}/{examResult.total}{" "}
                          ({examResult.passingPercentage}%)
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                          <Target className="w-8 h-8 md:w-10 md:h-10 text-red-600" />
                        </div>
                        <h4 className="text-xl md:text-2xl font-bold text-red-700 mb-2">
                          Not Passed
                        </h4>
                        <p className="text-red-600">
                          You did not achieve the passing score.
                        </p>
                        <p className="text-sm text-red-500 mt-2">
                          Score: {examResult.correct}/{examResult.total} (
                          {Math.round(
                            (examResult.correct / examResult.total) * 100,
                          )}
                          %)
                        </p>
                        <p className="text-xs text-red-400 mt-1">
                          Need {examResult.passingScore}/{examResult.total} to
                          pass ({examResult.passingPercentage}%)
                        </p>
                        <button
                          onClick={handleRetakeExam}
                          className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                        >
                          Retake Exam
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">
                        Question {currentQuestion + 1} of {questions.length}
                      </span>
                      <span className="text-gray-600">
                        {Math.round(
                          ((currentQuestion + 1) / questions.length) * 100,
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-6">
                    <p className="text-base md:text-lg font-semibold text-gray-800 mb-4">
                      {questions[currentQuestion].question}
                    </p>
                    <div className="space-y-3">
                      {questions[currentQuestion].options.map(
                        (option, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleAnswerSelect(
                                questions[currentQuestion].id,
                                index,
                              )
                            }
                            className={`w-full text-left p-3 rounded-xl border transition-all ${
                              examAnswers[questions[currentQuestion].id] ===
                              index
                                ? "border-indigo-500 bg-indigo-50 shadow-md"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <span className="text-sm">
                              {String.fromCharCode(65 + index)}. {option}
                            </span>
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={() =>
                        setCurrentQuestion(Math.max(0, currentQuestion - 1))
                      }
                      disabled={currentQuestion === 0}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    {currentQuestion === questions.length - 1 ? (
                      <button
                        onClick={handleSubmitExam}
                        disabled={
                          Object.keys(examAnswers).length < questions.length
                        }
                        className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Submit Exam
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          setCurrentQuestion(
                            Math.min(questions.length - 1, currentQuestion + 1),
                          )
                        }
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 4: Certificate */}
          {currentStep === 4 && user?.examPassed && showCertificate && (
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500">
                  <Award className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">
                    Certificate
                  </h3>
                  <p className="text-sm text-gray-500">
                    Your eligibility certificate
                  </p>
                </div>
              </div>

              {/* Smaller Certificate Box */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border-2 border-amber-200 p-4 md:p-5 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Medal className="w-6 h-6 md:w-7 md:h-7 text-amber-500" />
                    <span className="text-base md:text-lg font-bold text-gray-800">
                      Certificate of Eligibility
                    </span>
                    <Medal className="w-6 h-6 md:w-7 md:h-7 text-amber-500" />
                  </div>
                  <div className="border-t-2 border-amber-300 w-16 mx-auto mb-2" />
                  <p className="text-gray-600 text-xs">
                    This is to certify that
                  </p>
                  <p className="text-lg md:text-xl font-bold text-gray-800 my-2">
                    {user?.fullName}
                  </p>
                  <p className="text-gray-600 text-xs">
                    has successfully completed the Eligibility Program
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-3">
                    <div className="text-center">
                      <p className="text-[10px] text-gray-500">
                        Certificate Number
                      </p>
                      <p className="font-semibold text-gray-800 text-xs">
                        {certificateNumber}
                      </p>
                    </div>
                    <div className="w-px h-6 bg-amber-300" />
                    <div className="text-center">
                      <p className="text-[10px] text-gray-500">Date</p>
                      <p className="font-semibold text-gray-800 text-xs">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Membership Application Box */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200 p-4 md:p-5">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <BadgeCheck className="w-5 h-5 text-indigo-600" />
                      <h4 className="font-semibold text-gray-800">
                        You're Eligible
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Congratulations! You've successfully completed all
                      requirements. You can now apply for membership to unlock
                      all benefits.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      // Update user level to 'eligible' before navigating
                      const storedUser = localStorage.getItem('user');
                      if (storedUser) {
                        try {
                          const parsedUser = JSON.parse(storedUser);
                          parsedUser.level = 'eligible';
                          localStorage.setItem('user', JSON.stringify(parsedUser));
                        } catch (e) {}
                      }
                      navigate("/membership");
                    }}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                  >
                    <BadgeCheck className="w-4 h-4" />
                    Apply for Membership
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Progress Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100 sticky top-6">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-500" />
              Your Progress
            </h4>

            <div className="space-y-3">
              {steps.map((step, index) => {
                const isCompleted = progress >= (index + 1) * 25;
                const isCurrent =
                  progress >= index * 25 && progress < (index + 1) * 25;
                const isLocked = !canAccessStep(index + 1);
                const Icon = step.icon;

                return (
                  <div
                    key={step.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
                  >
                    <div
                      className={`p-1.5 rounded-lg ${
                        isCompleted
                          ? "bg-green-100"
                          : isCurrent
                            ? "bg-indigo-100"
                            : isLocked
                              ? "bg-gray-200"
                              : "bg-gray-100"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : isLocked ? (
                        <Lock className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Icon
                          className={`w-4 h-4 ${isCurrent ? "text-indigo-600" : "text-gray-500"}`}
                        />
                      )}
                    </div>
                    <span
                      className={`text-sm flex-1 ${
                        isCompleted
                          ? "text-green-700 font-medium"
                          : isCurrent
                            ? "text-indigo-700 font-medium"
                            : isLocked
                              ? "text-gray-400"
                              : "text-gray-600"
                      }`}
                    >
                      {step.label}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? "bg-green-100 text-green-600"
                          : isCurrent
                            ? "bg-indigo-100 text-indigo-600"
                            : isLocked
                              ? "bg-gray-100 text-gray-400"
                              : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {isCompleted
                        ? "✓ Done"
                        : isCurrent
                          ? "Current"
                          : isLocked
                            ? "🔒 Locked"
                            : "Pending"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Overall Progress</span>
                <span className="font-semibold text-gray-800">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {progress === 100 && (
              <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                <div className="flex items-center gap-2 text-sm font-semibold text-amber-700">
                  <Trophy className="w-4 h-4" />
                  You're Eligible!
                </div>
                <p className="text-xs text-amber-600 mt-1">
                  Congratulations! You've completed all steps.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-slideDown">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                {isLoading ? (
                  <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
                ) : (
                  <CreditCard className="w-8 h-8 text-green-600" />
                )}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                {isLoading ? "Processing Payment..." : "Confirm Payment"}
              </h3>
              {!isLoading && (
                <>
                  <p className="text-gray-600 mb-4">
                    You are about to pay{" "}
                    <span className="font-semibold">Rs. 500</span> via{" "}
                    <span className="font-semibold">{selectedPayment}</span>
                  </p>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={confirmPayment}
                      className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Confirm Payment
                    </button>
                    <button
                      onClick={() => setShowPaymentModal(false)}
                      className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
              {isLoading && (
                <p className="text-gray-500 text-sm">
                  Please wait while we process your payment...
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Eligible;