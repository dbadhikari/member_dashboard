import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  CheckCircle, 
  Upload, 
  File, 
  Loader2, 
  AlertCircle,
  Calendar,
  ArrowLeft,
  User,
  Award,
  Clock,
  CheckCircle2
} from 'lucide-react';

// --- Validation Schema ---
const validationSchema = Yup.object({
  pan: Yup.mixed()
    .required('PAN Card is required')
    .test('fileType', 'Only PDF, JPG, JPEG, PNG are allowed', (value) => {
      if (!value) return false;
      const file = value;
      return ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
    }),
  tax: Yup.mixed()
    .required('Tax Clearance Certificate is required')
    .test('fileType', 'Only PDF, JPG, JPEG, PNG are allowed', (value) => {
      if (!value) return false;
      const file = value;
      return ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
    }),
  citizenship: Yup.mixed()
    .required('Citizenship Certificate is required')
    .test('fileType', 'Only PDF, JPG, JPEG, PNG are allowed', (value) => {
      if (!value) return false;
      const file = value;
      return ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
    }),
  photo: Yup.mixed()
    .nullable()
    .test('fileType', 'Only PDF, JPG, JPEG, PNG are allowed', (value) => {
      if (!value) return true;
      const file = value;
      return ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
    }),
});

// --- File Input Component with Custom Styling ---
const FileUploadField = ({ label, name, formik, icon: Icon, required = true }) => {
  const error = formik.errors[name];
  const touched = formik.touched[name];
  const file = formik.values[name];

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue(name, file);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div 
        className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 hover:shadow-md ${
          error && touched ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-green-400'
        }`}
      >
        <input
          type="file"
          name={name}
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="flex items-center justify-center gap-3 text-gray-600">
          {file ? (
            <>
              <File size={20} className="text-green-600" />
              <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
              <span className="text-xs text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
            </>
          ) : (
            <>
              <Upload size={20} className="text-gray-400" />
              <span className="text-sm">Click or drag to upload</span>
            </>
          )}
        </div>
      </div>
      {error && touched && (
        <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

// --- Main Component ---
const MemberShip = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('membershipApplication');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.status === 'pending') {
          setSubmittedData(parsed);
        }
      } catch (e) {
        console.warn('Invalid localStorage data');
      }
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      pan: null,
      tax: null,
      citizenship: null,
      photo: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      // Simulate async submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const submission = {
        pan: values.pan?.name || '',
        tax: values.tax?.name || '',
        citizenship: values.citizenship?.name || '',
        photo: values.photo?.name || '',
        status: 'pending',
        submittedAt: new Date().toISOString(),
      };

      console.log('✅ Application Submitted:', submission);
      localStorage.setItem('membershipApplication', JSON.stringify(submission));
      setSubmittedData(submission);
      setIsSubmitting(false);
      resetForm();
    },
  });

  // --- Reset Handler ---
  const handleReset = () => {
    formik.resetForm();
    localStorage.removeItem('membershipApplication');
    setSubmittedData(null);
  };

  // --- If pending review exists, show status card ---
  if (submittedData && submittedData.status === 'pending') {
    const submittedDate = new Date(submittedData.submittedAt);
    const formattedDate = submittedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100">
          <div className="p-8 md:p-10">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle2 size={56} className="text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              ✅ Application Submitted Successfully
            </h2>
            <div className="flex justify-center my-6">
              <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 text-sm font-medium px-5 py-2 rounded-full shadow-sm">
                <Clock size={18} />
                🟡 Pending Review
              </span>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 space-y-4 text-gray-700 border border-gray-100">
              <p className="text-center">
                Your membership application has been submitted successfully.
              </p>
              <p className="text-center">
                Our verification team is currently reviewing your documents.
              </p>
              <p className="text-center font-medium text-amber-700">
                The review process may take up to <span className="font-bold">8 hours</span>.
              </p>
              <p className="text-center text-sm text-gray-500">
                You will receive a notification once your application has been approved or rejected.
              </p>
              <p className="text-center text-sm text-gray-500">
                Thank you for your patience.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500 border-t border-gray-100 pt-4">
              <Calendar size={16} />
              <span>Submitted: {formattedDate}</span>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => window.location.href = '#'}
                className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-sm"
              >
                <ArrowLeft size={18} />
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Form ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100">
        <div className="p-6 md:p-10">
          {/* --- Eligibility Card --- */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 md:p-8 mb-10 text-white shadow-lg">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 rounded-full p-2 flex-shrink-0">
                <CheckCircle size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  🎉 You are Eligible to Apply for Membership
                </h1>
                <p className="text-green-50 text-sm md:text-base leading-relaxed opacity-95">
                  Congratulations! Based on your assessment results, you are eligible to apply for membership in NC Digital School. 
                  Please upload the required verification documents below. Your application will be reviewed by our verification team before approval.
                </p>
              </div>
            </div>
          </div>

          {/* --- Form --- */}
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <FileUploadField
              label="PAN Card"
              name="pan"
              formik={formik}
              icon={File}
              required
            />
            <FileUploadField
              label="Tax Clearance Certificate"
              name="tax"
              formik={formik}
              icon={File}
              required
            />
            <FileUploadField
              label="Citizenship Certificate"
              name="citizenship"
              formik={formik}
              icon={File}
              required
            />
            <FileUploadField
              label="Passport Size Photo (Optional)"
              name="photo"
              formik={formik}
              icon={User}
              required={false}
            />

            {/* --- Buttons --- */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !formik.isValid || !formik.dirty}
                className={`flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    Submit Application
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
              >
                <File size={20} />
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MemberShip;