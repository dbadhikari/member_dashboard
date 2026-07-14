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
  User,
  Clock,
  CheckCircle2,
  Download,
  CreditCard,
  BadgeCheck,
  FileText,
  ChevronRight,
  Gift,
  RefreshCw,
  History,
  Receipt,
  MapPin
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

// --- File Input Component ---
const FileUploadField = ({ label, name, formik, required = true }) => {
  const error = formik.errors[name];
  const touched = formik.touched[name];
  const file = formik.values[name];

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue(name, file);
  };

  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div 
        className={`relative border-2 border-dashed rounded-lg p-4 transition-all ${
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
        <div className="flex items-center justify-center gap-2 text-gray-600">
          {file ? (
            <>
              <File size={18} className="text-green-600" />
              <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
              <span className="text-xs text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
            </>
          ) : (
            <>
              <Upload size={18} className="text-gray-400" />
              <span className="text-sm">Click or drag to upload</span>
            </>
          )}
        </div>
      </div>
      {error && touched && (
        <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

// --- Document Viewer Component ---
const DocumentViewer = ({ files, label }) => {
  const [showFiles, setShowFiles] = useState(false);

  if (!files || files.length === 0) return null;

  const handleDownload = (file) => {
    const blob = new Blob([file], { type: file.type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name || 'document';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border-b border-gray-100 py-3">
      <button
        onClick={() => setShowFiles(!showFiles)}
        className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-2 rounded-lg transition-colors"
      >
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-green-600" />
          <span className="font-medium text-gray-700 text-sm">{label}</span>
          <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">{files.length}</span>
        </div>
        <ChevronRight size={16} className={`transition-transform ${showFiles ? 'rotate-90' : ''}`} />
      </button>
      {showFiles && (
        <div className="mt-2 ml-8 space-y-1.5">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2">
                <File size={14} className="text-gray-500" />
                <span className="text-sm text-gray-700 truncate max-w-[150px]">
                  {file.name || `Document ${index + 1}`}
                </span>
                <span className="text-xs text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
              </div>
              <button
                onClick={() => handleDownload(file)}
                className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium"
              >
                <Download size={14} />
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Membership Card Component ---
const MembershipCard = ({ memberData }) => {
  if (!memberData) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <BadgeCheck size={20} className="text-green-600" />
        <h3 className="font-semibold text-gray-800">Membership Card</h3>
      </div>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
          <User size={28} className="text-green-600" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">Member #{memberData.memberId || 'N/A'}</h4>
          <p className="text-sm text-gray-600">{memberData.name || 'Member Name'}</p>
          <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full mt-1">
            <CheckCircle2 size={12} /> Active
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-gray-500 text-xs">Joined Date</p>
          <p className="font-medium text-gray-800">{memberData.joiningDate || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Expiry Date</p>
          <p className="font-medium text-gray-800">{memberData.expiryDate || 'N/A'}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500 text-xs">Head Office</p>
          <p className="font-medium text-gray-800 flex items-center gap-1">
            <MapPin size={14} className="text-gray-400" />
            {memberData.headOffice || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Payment Tracker Component ---
const PaymentTracker = ({ payments }) => {
  if (!payments || payments.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        <CreditCard size={32} className="mx-auto mb-2 text-gray-300" />
        <p className="text-sm">No payment history</p>
      </div>
    );
  }

  return (
    <div className="max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      <div className="space-y-2">
        {payments.map((payment, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-100 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt size={14} className="text-green-600" />
                <span className="font-medium text-sm text-gray-800">
                  {payment.invoiceNumber || `INV-${String(index + 1).padStart(4, '0')}`}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-800">
                  ${payment.amount || '0.00'}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  payment.status === 'paid' ? 'bg-green-100 text-green-700' : 
                  payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-red-100 text-red-700'
                }`}>
                  {payment.status || 'Paid'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
              <span>{payment.date || 'N/A'}</span>
              <span>{payment.period || 'Annual'}</span>
              <button className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                <Download size={12} /> Invoice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Pre-payment Component ---
const PrePaymentSection = ({ onPrePay, currentExpiry }) => {
  const membershipFee = 299;
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
      <div className="flex items-center gap-2 mb-3">
        <Gift size={18} className="text-blue-600" />
        <h3 className="font-semibold text-gray-800">Pre-pay for Next Year</h3>
      </div>
      
      <div className="space-y-3">
        <div className="bg-white rounded-lg p-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">Membership Fee</span>
            <span className="text-lg font-bold text-gray-800">${membershipFee}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Valid for</span>
            <span className="text-xs font-medium text-gray-700">12 months</span>
          </div>
          {currentExpiry && (
            <div className="flex justify-between items-center mt-1 pt-1 border-t border-gray-100">
              <span className="text-xs text-gray-500">Current expiry</span>
              <span className="text-xs font-medium text-gray-700">{currentExpiry}</span>
            </div>
          )}
        </div>
        
        <button
          onClick={() => onPrePay(membershipFee)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all shadow-md hover:shadow-lg text-sm"
        >
          Pre-pay Now
        </button>
        <p className="text-xs text-center text-gray-500">
          Your membership will be extended by 12 months
        </p>
      </div>
    </div>
  );
};

// --- Main Component ---
const MemberShip = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('membershipApplication');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.status === 'pending' || parsed.status === 'approved') {
          setSubmittedData(parsed);
          if (parsed.status === 'approved') {
            // Generate multiple payment invoices for demo
            const payments = [
              {
                invoiceNumber: 'INV-2024-001',
                amount: 299,
                date: 'Jan 15, 2024',
                period: 'Annual 2024',
                status: 'paid'
              },
              {
                invoiceNumber: 'INV-2023-001',
                amount: 299,
                date: 'Jan 15, 2023',
                period: 'Annual 2023',
                status: 'paid'
              },
              {
                invoiceNumber: 'INV-2022-001',
                amount: 299,
                date: 'Jan 15, 2022',
                period: 'Annual 2022',
                status: 'paid'
              }
            ];

            setMemberData({
              memberId: 'M' + Math.floor(Math.random() * 1000000),
              name: 'John Doe',
              joiningDate: parsed.approvedAt ? new Date(parsed.approvedAt).toLocaleDateString() : 'Jan 15, 2024',
              expiryDate: parsed.expiryDate ? new Date(parsed.expiryDate).toLocaleDateString() : 'Jan 15, 2025',
              headOffice: 'Kathmandu, Nepal',
              payments: payments,
              uploadedFiles: {
                pan: parsed.pan ? [{ name: parsed.pan, size: 250000, type: 'application/pdf' }] : [],
                tax: parsed.tax ? [{ name: parsed.tax, size: 180000, type: 'application/pdf' }] : [],
                citizenship: parsed.citizenship ? [{ name: parsed.citizenship, size: 320000, type: 'image/jpeg' }] : [],
                photo: parsed.photo ? [{ name: parsed.photo, size: 150000, type: 'image/jpeg' }] : []
              }
            });
          }
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
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const submission = {
        pan: values.pan?.name || '',
        tax: values.tax?.name || '',
        citizenship: values.citizenship?.name || '',
        photo: values.photo?.name || '',
        status: 'pending',
        submittedAt: new Date().toISOString(),
      };

      localStorage.setItem('membershipApplication', JSON.stringify(submission));
      setSubmittedData(submission);
      setIsSubmitting(false);
      resetForm();
      setShowForm(false);
    },
  });

  // --- Reset Handler ---
  const handleReset = () => {
    formik.resetForm();
    localStorage.removeItem('membershipApplication');
    setSubmittedData(null);
    setMemberData(null);
    setShowForm(false);
  };

  // --- Simulate Approval ---
  const simulateApproval = () => {
    const stored = localStorage.getItem('membershipApplication');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const approvedData = {
          ...parsed,
          status: 'approved',
          approvedAt: new Date().toISOString(),
          expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
        };
        localStorage.setItem('membershipApplication', JSON.stringify(approvedData));
        setSubmittedData(approvedData);
        
        const payments = [
          {
            invoiceNumber: 'INV-2024-001',
            amount: 299,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            period: 'Annual 2024',
            status: 'paid'
          }
        ];

        setMemberData({
          memberId: 'M' + Math.floor(Math.random() * 1000000),
          name: 'John Doe',
          joiningDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          expiryDate: new Date(approvedData.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          headOffice: 'Kathmandu, Nepal',
          payments: payments,
          uploadedFiles: {
            pan: parsed.pan ? [{ name: parsed.pan, size: 250000, type: 'application/pdf' }] : [],
            tax: parsed.tax ? [{ name: parsed.tax, size: 180000, type: 'application/pdf' }] : [],
            citizenship: parsed.citizenship ? [{ name: parsed.citizenship, size: 320000, type: 'image/jpeg' }] : [],
            photo: parsed.photo ? [{ name: parsed.photo, size: 150000, type: 'image/jpeg' }] : []
          }
        });
      } catch (e) {
        console.warn('Invalid localStorage data');
      }
    }
  };

  // --- Handle Pre-payment ---
  const handlePrePay = (amount) => {
    const newInvoice = {
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      amount: amount,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      period: 'Annual Next Year',
      status: 'paid'
    };
    
    // Update member data with new payment
    setMemberData(prev => {
      const newExpiryDate = new Date(prev?.expiryDate || new Date());
      newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);
      
      return {
        ...prev,
        payments: [newInvoice, ...(prev?.payments || [])],
        expiryDate: newExpiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
    });
    
    alert(`✅ Pre-payment of $${amount} processed successfully!\nYour membership has been extended for another year.`);
  };

  // --- Render Approved Dashboard ---
  if (submittedData && submittedData.status === 'approved' && memberData) {
    const expiryDate = new Date(memberData.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Membership Dashboard</h1>
            <div className="flex gap-2">
              <button
                onClick={simulateApproval}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-md transition-all"
              >
                🔄 Simulate
              </button>
              <button
                onClick={handleReset}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-md transition-all"
              >
                <RefreshCw size={14} className="inline mr-1" />
                Reset
              </button>
            </div>
          </div>

          {/* Stats Bar - Only 4 Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-xs text-gray-500">Status</p>
              <p className="text-sm font-semibold text-green-600">✓ Active</p>
            </div>
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-xs text-gray-500">Days Remaining</p>
              <p className={`text-sm font-semibold ${daysUntilExpiry < 30 ? 'text-red-600' : 'text-gray-800'}`}>
                {daysUntilExpiry} days
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-xs text-gray-500">Member Since</p>
              <p className="text-sm font-semibold text-gray-800">{memberData.joiningDate}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-3">
              <p className="text-xs text-gray-500">Expiry Date</p>
              <p className="text-sm font-semibold text-gray-800">{memberData.expiryDate}</p>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-5">
              {/* Payment History */}
              <div className="bg-white rounded-xl shadow p-5">
                <div className="flex items-center gap-2 mb-4">
                  <History size={18} className="text-green-600" />
                  <h2 className="text-lg font-bold text-gray-800">Payment History</h2>
                  <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full ml-auto">
                    {memberData.payments?.length || 0} invoices
                  </span>
                </div>
                <PaymentTracker payments={memberData.payments} />
              </div>

              {/* Uploaded Documents */}
              <div className="bg-white rounded-xl shadow p-5">
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={18} className="text-green-600" />
                  <h2 className="text-lg font-bold text-gray-800">Your Documents</h2>
                </div>
                <div className="space-y-1">
                  {Object.entries(memberData.uploadedFiles).map(([key, files]) => {
                    const labels = {
                      pan: 'PAN Card',
                      tax: 'Tax Certificate',
                      citizenship: 'Citizenship',
                      photo: 'Passport Photo'
                    };
                    return files.length > 0 && (
                      <DocumentViewer key={key} files={files} label={labels[key]} />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <MembershipCard memberData={{
                ...memberData,
                expiryDate: `${memberData.expiryDate} (${daysUntilExpiry} days left)`
              }} />

              <PrePaymentSection 
                onPrePay={handlePrePay} 
                currentExpiry={memberData.expiryDate}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Render Pending Status ---
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
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 rounded-full p-2">
                  <Clock size={24} className="text-yellow-600" />
                </div>
                <span className="text-sm font-semibold text-yellow-700 bg-yellow-50 px-3 py-1 rounded-full">
                  Pending Review
                </span>
              </div>
              <button
                onClick={simulateApproval}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-md transition-all"
              >
                ✅ Approve
              </button>
            </div>
            
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Application Under Review
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-5 space-y-3 text-gray-700 border border-gray-100 my-5">
              <p className="text-center text-sm">
                Your membership application has been submitted successfully.
              </p>
              <p className="text-center text-sm">
                Our team is reviewing your documents.
              </p>
              <p className="text-center text-sm font-medium text-amber-700">
                Review time: ~8 hours
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 border-t border-gray-100 pt-4">
              <Calendar size={14} />
              <span>Submitted: {formattedDate}</span>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 px-4 rounded-lg transition-all text-sm"
              >
                {showForm ? 'Hide Form' : 'Edit Application'}
              </button>
              <button
                onClick={handleReset}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all text-sm"
              >
                Cancel
              </button>
            </div>

            {showForm && (
              <div className="mt-5 border-t border-gray-200 pt-5">
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <FileUploadField
                    label="PAN Card"
                    name="pan"
                    formik={formik}
                    required
                  />
                  <FileUploadField
                    label="Tax Clearance Certificate"
                    name="tax"
                    formik={formik}
                    required
                  />
                  <FileUploadField
                    label="Citizenship Certificate"
                    name="citizenship"
                    formik={formik}
                    required
                  />
                  <FileUploadField
                    label="Passport Size Photo (Optional)"
                    name="photo"
                    formik={formik}
                    required={false}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !formik.isValid || !formik.dirty}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all disabled:opacity-60 text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="inline animate-spin mr-2" />
                        Updating...
                      </>
                    ) : (
                      'Update Application'
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- Initial Form View ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 md:p-8">
          {/* Demo Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                const dummyData = {
                  pan: 'PAN_123456.pdf',
                  tax: 'TAX_2024.pdf',
                  citizenship: 'CITIZENSHIP.jpg',
                  photo: 'PHOTO.jpg',
                  status: 'approved',
                  submittedAt: new Date().toISOString(),
                  approvedAt: new Date().toISOString(),
                  expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
                };
                localStorage.setItem('membershipApplication', JSON.stringify(dummyData));
                window.location.reload();
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-md transition-all"
            >
              🚀 Quick Approve
            </button>
          </div>

          {/* Eligibility Card */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-5 mb-6 text-white shadow-lg">
            <div className="flex items-start gap-3">
              <div className="bg-white/20 rounded-full p-1.5 flex-shrink-0">
                <CheckCircle size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold mb-1">
                  You're Eligible!
                </h1>
                <p className="text-green-50 text-sm leading-relaxed opacity-95">
                  Upload the required documents below to apply for membership.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit}>
            <FileUploadField
              label="PAN Card"
              name="pan"
              formik={formik}
              required
            />
            <FileUploadField
              label="Tax Clearance Certificate"
              name="tax"
              formik={formik}
              required
            />
            <FileUploadField
              label="Citizenship Certificate"
              name="citizenship"
              formik={formik}
              required
            />
            <FileUploadField
              label="Passport Photo (Optional)"
              name="photo"
              formik={formik}
              required={false}
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                type="submit"
                disabled={isSubmitting || !formik.isValid || !formik.dirty}
                className={`flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed text-sm`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    Submit Application
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 px-5 rounded-lg transition-all text-sm"
              >
                <RefreshCw size={16} />
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MemberShip;