// src/components/modals/ReceiptModal.tsx
import { FC, useRef } from 'react';
import { 
  FaDownload, 
  FaPrint, 
  FaShareAlt, 
  FaTimes, 
  FaCheckCircle 
} from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { TransactionPayload } from '../../types/tsxTypes';
import { toast } from 'react-toastify';


interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: TransactionPayload | null;
}

const ReceiptModal: FC<ReceiptModalProps> = ({ isOpen, onClose, transaction }) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !transaction) return null;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handlePrint = () => {
    if (!receiptRef.current) return;

    const printContent = receiptRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // restore state (simple but effective)
  };

  const handleDownloadPDF = async () => {
    if (!receiptRef.current) return;

    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      }as any);
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a5', // receipt-like size (can change to a4)
      });

      const canvasWidthPx  = canvas.width;
    const canvasHeightPx = canvas.height;

    // Convert to PDF units (mm)
    const pdfPageWidthMm = pdf.internal.pageSize.getWidth();  // e.g. 148 mm for A5

    // Maintain aspect ratio
    const ratio          = canvasWidthPx / canvasHeightPx;
    const pdfImageWidth  = pdfPageWidthMm;                     // full width
    const pdfImageHeight = pdfImageWidth / ratio;

    if (pdfImageHeight > pdf.internal.pageSize.getHeight()) {
      // For now we assume receipt fits on 1 page (A5 is tall enough)
      // If not → implement multi-page logic in future
    }

     pdf.addImage(
      imgData,
      'PNG',
      0,                    // x
      0,                    // y (top margin = 0 for full-bleed receipt)
      pdfImageWidth,
      pdfImageHeight,
      undefined,            // alias (optional)
      'FAST'                // compression: 'FAST' | 'MEDIUM' | 'SLOW'
    );
      pdf.save(`Receipt_${transaction.receipt || transaction.id}.pdf`);

      toast.success('PDF downloaded successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate PDF');
    }
  };

  const handleShare = async () => {
    const text = `Water Token Receipt\n\n` +
      `Reference: ${transaction.receipt}\n` +
      `Meter: ${transaction.serial}\n` +
      `Token: ${transaction.token || '—'}\n` +
      `Units: ${transaction.units || '—'} | Amount: ${transaction.amount.toLocaleString()} TZS\n` +
      `Date: ${formatDate(transaction.createdAt)}\n` +
      `Thank you for your payment!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Water Token Receipt',
          text,
          url: window.location.href, // or generate short link later
        });
        toast.success('Shared successfully');
      } catch (err) {
        toast.error('Share failed');
      }
    } else {
      navigator.clipboard.writeText(text);
      toast.success('Receipt copied to clipboard');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-md shadow-md max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FaTimes className="text-gray-600" />
          </button>
        </div>

        {/* Receipt Content - this is what gets printed / downloaded */}
        <div ref={receiptRef} className="p-6 bg-white print:p-8 print:shadow-none">
          {/* Company / Brand Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-blue-700 uppercase font-oswald">NYIRENDAS</h1>
            <p className="text-md text-gray-500 mt-1 uppercase font-oswald font-semibold">Prepaid Water Token System</p>
          </div>

          {/* Receipt Info */}
          <div className="space-y-2 text-sm font-poppins">
            <div className="flex justify-between border-b pb-2">
              <span className="font-sm text-gray-700">Reference:</span>
              <span className="font-mono">{transaction.receipt}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-gray-700">Meter Serial:</span>
              <span className="font-mono">{transaction.serial}</span>
            </div>

            {transaction?.subscriber?.name && (
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-700">Customer:</span>
                <span>{transaction?.subscriber?.name}</span>
              </div>
            )} 

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-gray-700">Token:</span>
              <span className="font-bold text-lg text-green-600 font-mono -tracking-normal">
                {transaction.token || '—'}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-medium text-gray-700">Units / Liters:</span>
              <span>
                {transaction.units ?? '—'} units 
                {transaction.units ? ` (${transaction.units} L)` : ''}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2 text-lg font-bold">
              <span className="text-gray-800">Amount Paid:</span>
              <span className="text-blue-700">
                {transaction.amount.toLocaleString()} TZS
              </span>
            </div>

            <div className="flex justify-between pb-2">
              <span className="font-medium text-gray-700">Date:</span>
              <span>{formatDate(transaction.createdAt)}</span>
            </div>

            <div className="flex justify-between text-xs text-gray-500 pt-4 border-t">
              <span>Method: {transaction.method}</span>
              <span>Status: {transaction.status}</span>
            </div>
          </div>

          {/* Footer Message */}
          <div className="text-center mt-8 text-xs text-gray-500">
            <p>Thank you for choosing Nyirendas Company</p>
            <p className="mt-1">Support: main@nyirendas.com | +255 755 481 857</p>
            {/* <p className="mt-2 font-mono text-gray-400">Ref: {transaction.id.slice(0, 8)}</p> */}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex gap-3 justify-end print:hidden">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaShareAlt /> Share
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaPrint /> Print
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <FaDownload /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;