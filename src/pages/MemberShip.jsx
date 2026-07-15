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
  MapPin,
  Plus,
  Eye,
  X,
  Building,
  Award,
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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

  const handlePreview = (file) => {
    if (file.type && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setIsPreviewOpen(true);
    } else {
      handleDownload(file);
    }
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
              <div className="flex items-center gap-2">
                {file.type && file.type.startsWith('image/') && (
                  <button
                    onClick={() => handlePreview(file)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Eye size={14} />
                    Preview
                  </button>
                )}
                <button
                  onClick={() => handleDownload(file)}
                  className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {isPreviewOpen && selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">{selectedFile.name}</h3>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-center min-h-[300px]">
              {selectedFile.type && selectedFile.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt={selectedFile.name}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />
              ) : (
                <div className="text-center py-12">
                  <File size={48} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-600">Preview not available for this file type</p>
                  <button
                    onClick={() => handleDownload(selectedFile)}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Download File
                  </button>
                </div>
              )}
            </div>
          </div>
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
const PaymentTracker = ({ payments, onPrePay }) => {
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
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  payment.status === 'paid' ? 'bg-green-100 text-green-700' : 
                  payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-red-100 text-red-700'
                }`}>
                  {payment.status || 'Paid'}
                </span>
                {payment.status === 'pending' && (
                  <button
                    onClick={() => onPrePay && onPrePay(payment.amount || 299)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-lg font-medium transition-colors"
                  >
                    Pay Now
                  </button>
                )}
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
    <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
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

// --- Branches Component ---
const BranchesSection = ({ branches, onAddBranch }) => {
  const [showAll, setShowAll] = useState(false);

  if (!branches || branches.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-5 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Building size={18} className="text-green-600" />
            <h2 className="text-lg font-bold text-gray-800">Branches</h2>
          </div>
        </div>
        <div className="text-center py-8">
          <Building size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm">No branches added yet</p>
          <button
            onClick={onAddBranch}
            className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2"
          >
            <Plus size={16} />
            Add Branch
          </button>
        </div>
      </div>
    );
  }

  const displayBranches = showAll ? branches : branches.slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow p-5 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Building size={18} className="text-green-600" />
          <h2 className="text-lg font-bold text-gray-800">Branches</h2>
          <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">{branches.length}</span>
        </div>
        <button
          onClick={onAddBranch}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1"
        >
          <Plus size={14} />
          Add
        </button>
      </div>

      <div className="space-y-3">
        {displayBranches.map((branch, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Building size={18} className="text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-800 text-sm">{branch.name || `Branch ${index + 1}`}</h4>
                <p className="text-xs text-gray-500">{branch.location || 'Location not specified'}</p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                {branch.status || 'Active'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {branches.length > 3 && (
        <Link
          to="/branches"
          className="w-full mt-3 text-center text-sm text-green-600 hover:text-green-700 font-medium py-2 border-t border-gray-100 block"
        >
          View All {branches.length} Branches →
        </Link>
      )}
    </div>
  );
};

// --- Certificate Component ---
const CertificateCard = ({ memberData }) => {
  if (!memberData) return null;

  return (
    <div className="bg-white rounded-xl shadow p-5 border border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <Award size={18} className="text-green-600" />
        <h3 className="font-semibold text-gray-800">Certificate</h3>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
        <div className="mb-2">
          <Award size={32} className="mx-auto text-green-600" />
        </div>
        <h4 className="font-bold text-gray-800 text-sm">Certificate of Membership</h4>
        <p className="text-xs text-gray-500 mt-1">Member #{memberData.memberId}</p>
        <p className="text-xs text-gray-500">{memberData.name}</p>
        <button className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition-colors inline-flex items-center gap-1">
          <Download size={12} />
          Download Certificate
        </button>
      </div>
    </div>
  );
};

// --- Uploaded Documents Component ---
const UploadedDocuments = ({ files }) => {
  if (!files || Object.keys(files).length === 0) return null;

  const hasFiles = Object.values(files).some(arr => arr && arr.length > 0);
  if (!hasFiles) return null;

  const labels = {
    pan: 'PAN Card',
    tax: 'Tax Certificate',
    citizenship: 'Citizenship',
    photo: 'Passport Photo'
  };

  return (
    <div className="bg-white rounded-xl shadow p-5 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <FileText size={18} className="text-green-600" />
        <h2 className="text-lg font-bold text-gray-800">Uploaded Documents</h2>
      </div>
      <div className="space-y-1">
        {Object.entries(files).map(([key, fileList]) => {
          if (!fileList || fileList.length === 0) return null;
          return (
            <DocumentViewer key={key} files={fileList} label={labels[key] || key} />
          );
        })}
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
  const [branches, setBranches] = useState([]);
  const [userData, setUserData] = useState(null);

  // Check localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('membershipApplication');
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
      } catch (e) {
        console.warn('Invalid user data');
      }
    }

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.status === 'pending' || parsed.status === 'approved') {
          setSubmittedData(parsed);
          if (parsed.status === 'approved') {
            // Load branches from localStorage
            const storedBranches = localStorage.getItem('branches');
            if (storedBranches) {
              try {
                setBranches(JSON.parse(storedBranches));
              } catch (e) {
                setBranches([]);
              }
            }

            // Generate invoices
            const currentDate = new Date();
            const expiryDate = new Date(parsed.approvedAt || currentDate);
            expiryDate.setFullYear(expiryDate.getFullYear() + 1);

            const payments = [
              {
                invoiceNumber: `INV-${currentDate.getFullYear()}-001`,
                date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                period: 'Annual 2025',
                status: 'paid',
                amount: 299
              },
              {
                invoiceNumber: `INV-${currentDate.getFullYear() + 1}-001`,
                date: expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                period: 'Annual 2026',
                status: 'pending',
                amount: 299
              }
            ];

            setMemberData({
              memberId: parsed.memberId || 'M' + Math.floor(Math.random() * 1000000),
              name: parsed.name || 'John Doe',
              joiningDate: parsed.approvedAt ? new Date(parsed.approvedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              expiryDate: expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
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
        name: userData?.fullName || 'John Doe',
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
    localStorage.removeItem('branches');
    setSubmittedData(null);
    setMemberData(null);
    setShowForm(false);
    setBranches([]);
  };

  // --- Update User Level Helper ---
  const updateUserLevel = (level) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        parsedUser.level = level;
        localStorage.setItem('user', JSON.stringify(parsedUser));
        setUserData(parsedUser);
      } catch (e) {
        console.warn('Could not update user level');
      }
    }
  };

  // --- Simulate Approval ---
  const simulateApproval = () => {
    const stored = localStorage.getItem('membershipApplication');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const currentDate = new Date();
        const expiryDate = new Date(currentDate);
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);

        const approvedData = {
          ...parsed,
          status: 'approved',
          approvedAt: currentDate.toISOString(),
          expiryDate: expiryDate.toISOString(),
          memberId: 'M' + Math.floor(Math.random() * 1000000),
          name: parsed.name || 'John Doe',
        };
        localStorage.setItem('membershipApplication', JSON.stringify(approvedData));
        setSubmittedData(approvedData);
        
        // Update user level to 'member'
        updateUserLevel('member');
        
        // Initialize branches with some default data
        const defaultBranches = [
          { name: 'Kathmandu Main', location: 'Kathmandu, Nepal', status: 'Active' },
          { name: 'Pokhara', location: 'Pokhara, Nepal', status: 'Active' },
          { name: 'Lalitpur', location: 'Lalitpur, Nepal', status: 'Active' },
        ];
        localStorage.setItem('branches', JSON.stringify(defaultBranches));
        setBranches(defaultBranches);

        const payments = [
          {
            invoiceNumber: `INV-${currentDate.getFullYear()}-001`,
            date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            period: 'Annual 2025',
            status: 'paid',
            amount: 299
          },
          {
            invoiceNumber: `INV-${currentDate.getFullYear() + 1}-001`,
            date: expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            period: 'Annual 2026',
            status: 'pending',
            amount: 299
          }
        ];

        setMemberData({
          memberId: approvedData.memberId,
          name: approvedData.name,
          joiningDate: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          expiryDate: expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          headOffice: 'Kathmandu, Nepal',
          payments: payments,
          uploadedFiles: {
            pan: parsed.pan ? [{ name: parsed.pan, size: 250000, type: 'application/pdf' }] : [],
            tax: parsed.tax ? [{ name: parsed.tax, size: 180000, type: 'application/pdf' }] : [],
            citizenship: parsed.citizenship ? [{ name: parsed.citizenship, size: 320000, type: 'image/jpeg' }] : [],
            photo: parsed.photo ? [{ name: parsed.photo, size: 150000, type: 'image/jpeg' }] : []
          }
        });

          window.location.reload();

      } catch (e) {
        console.warn('Invalid localStorage data');
      }
    }
  };

  // --- Handle Pre-payment ---
  const handlePrePay = (amount) => {
    const currentDate = new Date();
    const newInvoice = {
      invoiceNumber: `INV-${currentDate.getFullYear() + 1}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      amount: amount,
      date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      period: 'Annual Next Year',
      status: 'paid'
    };
    
    // Update member data with new payment
    setMemberData(prev => {
      if (!prev) return prev;
      const newExpiryDate = new Date(prev.expiryDate || new Date());
      newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);
      
      // Update the pending invoice to paid and add new pending
      const updatedPayments = prev.payments.map(p => {
        if (p.status === 'pending') {
          return { ...p, status: 'paid' };
        }
        return p;
      });

      // Add new pending invoice for next year
      const nextYear = new Date(newExpiryDate);
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      updatedPayments.push({
        invoiceNumber: `INV-${nextYear.getFullYear()}-001`,
        date: nextYear.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        period: `Annual ${nextYear.getFullYear()}`,
        status: 'pending',
        amount: 299
      });

      return {
        ...prev,
        payments: updatedPayments,
        expiryDate: newExpiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
    });
    
    alert(`✅ Pre-payment of $${amount} processed successfully!\nYour membership has been extended for another year.`);
  };

  // --- Handle Add Branch ---
  const handleAddBranch = () => {
    const branchName = prompt('Enter branch name:');
    if (branchName) {
      const branchLocation = prompt('Enter branch location:');
      const newBranch = {
        name: branchName,
        location: branchLocation || 'Location not specified',
        status: 'Active'
      };
      const updatedBranches = [...branches, newBranch];
      setBranches(updatedBranches);
      localStorage.setItem('branches', JSON.stringify(updatedBranches));
    }
  };

  // --- Render Approved Dashboard ---
  if (submittedData && submittedData.status === 'approved' && memberData) {
    const expiryDate = new Date(memberData.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Membership Dashboard</h1>
            <div className="flex gap-2">
              <button
                onClick={simulateApproval}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow transition-all"
              >
                🔄 Simulate
              </button>
              <button
                onClick={handleReset}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow transition-all"
              >
                <RefreshCw size={14} className="inline mr-1" />
                Reset
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
              <p className="text-xs text-gray-500">Status</p>
              <p className="text-sm font-semibold text-green-600">✓ Active</p>
            </div>
            <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
              <p className="text-xs text-gray-500">Days Remaining</p>
              <p className={`text-sm font-semibold ${daysUntilExpiry < 30 ? 'text-red-600' : 'text-gray-800'}`}>
                {daysUntilExpiry} days
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
              <p className="text-xs text-gray-500">Member Since</p>
              <p className="text-sm font-semibold text-gray-800">{memberData.joiningDate}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
              <p className="text-xs text-gray-500">Expiry Date</p>
              <p className="text-sm font-semibold text-gray-800">{memberData.expiryDate}</p>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-5">
              {/* User Info Box */}
              <div className="bg-white rounded-xl shadow p-5 border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={32} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{memberData.name}</h3>
                    <p className="text-sm text-gray-600">Member #{memberData.memberId}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>
                      <span className="text-xs text-gray-500">• {memberData.headOffice}</span>
                    </div>
                  </div>
                  <button className="ml-auto text-sm text-green-600 hover:text-green-700 font-medium">
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Uploaded Documents - Added before Branches */}
              <UploadedDocuments files={memberData.uploadedFiles} />

              {/* Branches Section */}
              <BranchesSection branches={branches} onAddBranch={handleAddBranch} />

              {/* Invoice Section */}
              <div className="bg-white rounded-xl shadow p-5 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <History size={18} className="text-green-600" />
                  <h2 className="text-lg font-bold text-gray-800">Invoices</h2>
                  <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full ml-auto">
                    {memberData.payments?.length || 0} invoices
                  </span>
                </div>
                <PaymentTracker payments={memberData.payments} onPrePay={handlePrePay} />
              </div>
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-5">
              {/* Certificate */}
              <CertificateCard memberData={memberData} />

              {/* Membership Card */}
              <MembershipCard memberData={{
                ...memberData,
                expiryDate: `${memberData.expiryDate} (${daysUntilExpiry} days left)`
              }} />

              {/* Pre-pay Section */}
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
      <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex items-center justify-center">
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
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow transition-all"
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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex items-center justify-center">
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
                  expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
                  memberId: 'M' + Math.floor(Math.random() * 1000000),
                  name: 'John Doe'
                };
                localStorage.setItem('membershipApplication', JSON.stringify(dummyData));
                // Update user level to member
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                  try {
                    const parsedUser = JSON.parse(storedUser);
                    parsedUser.level = 'member';
                    localStorage.setItem('user', JSON.stringify(parsedUser));
                  } catch (e) {}
                }
                window.location.reload();
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow transition-all"
            >
              🚀 Quick Approve
            </button>
          </div>

          {/* Eligibility Card */}
          <div className="bg-green-600 rounded-xl p-5 mb-6 text-white shadow-lg">
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