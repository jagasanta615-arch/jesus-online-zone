import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  CheckCircle,
  ShoppingCart,
  UploadCloud,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { servicesData } from "../data/servicesData";
import { useAddOrder } from "../hooks/useOrders";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService: string | null;
}

const sortedServices = [...servicesData].sort((a, b) =>
  a.name.localeCompare(b.name),
);

export function OrderModal({
  isOpen,
  onClose,
  initialService,
}: OrderModalProps) {
  const addOrder = useAddOrder();

  const [serviceName, setServiceName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Sync initial service selection
  useEffect(() => {
    if (isOpen && initialService) {
      setServiceName(initialService);
    }
  }, [isOpen, initialService]);

  // Reset on close
  function resetForm() {
    setServiceName("");
    setCustomerName("");
    setPhone("");
    setEmail("");
    setFiles([]);
    setIsDragging(false);
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selected]);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...dropped]);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function uploadFiles(): Promise<string[]> {
    if (files.length === 0) return [];
    // Return file names as identifiers — actual file delivery handled via WhatsApp/UPI workflow
    return files.map((f) => f.name);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!serviceName) return;

    try {
      const fileUrls = await uploadFiles();
      await addOrder.mutateAsync({
        serviceName,
        customerName,
        phone,
        email,
        fileUrls,
      });

      handleClose();
      toast.success("Order Received!", {
        description: "We will contact you shortly.",
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        duration: 3000,
        position: "bottom-right",
      });
    } catch (_err) {
      toast.error("Failed to place order. Please try again.");
    }
  }

  if (!isOpen) return null;

  const isSubmitting = addOrder.isPending;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleOverlayClick}
      onKeyDown={(e) => e.key === "Escape" && handleClose()}
      data-ocid="order-modal-overlay"
    >
      <div className="bg-card rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden relative">
        {/* Header */}
        <div className="gradient-hero px-5 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold flex items-center gap-2 text-primary-foreground">
            <ShoppingCart className="h-5 w-5" />
            Order Service
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="hover:bg-white/10 p-1 rounded-full transition-smooth text-primary-foreground"
            aria-label="Close modal"
            data-ocid="order-modal-close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto scrollbar-thin">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="order-form"
          >
            {/* Service Selection */}
            <div className="space-y-1.5">
              <Label htmlFor="modal-service" className="text-sm font-medium">
                Select Service <span className="text-destructive">*</span>
              </Label>
              <select
                id="modal-service"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                required
                className="w-full p-2.5 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
                data-ocid="service-select"
              >
                <option value="">-- Choose a Service --</option>
                {sortedServices.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="modal-name">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="modal-name"
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  data-ocid="name-input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="modal-phone">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="modal-phone"
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  data-ocid="phone-input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="modal-email">Email Address</Label>
              <Input
                id="modal-email"
                type="email"
                placeholder="yourname@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-ocid="email-input"
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="file-upload">Upload Documents / Photos</Label>
              <label
                htmlFor="file-upload"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-smooth ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border bg-muted/30 hover:bg-muted/50 hover:border-primary/50"
                }`}
                data-ocid="file-upload-area"
              >
                <input
                  id="file-upload"
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <UploadCloud
                  className={`h-8 w-8 mx-auto mb-2 transition-smooth ${
                    isDragging ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <p className="text-sm font-medium text-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Images, PDFs, Docs (Max 10MB each)
                </p>
                {files.length > 0 && (
                  <p
                    className="text-sm font-semibold text-primary mt-2"
                    data-ocid="file-count"
                  >
                    {files.length} file{files.length !== 1 ? "s" : ""} selected
                  </p>
                )}
              </label>

              {/* File list */}
              {files.length > 0 && (
                <ul className="space-y-1.5 mt-2">
                  {files.map((f, i) => (
                    <li
                      key={`${f.name}-${f.size}-${f.lastModified}`}
                      className="flex items-center justify-between bg-muted/40 rounded-md px-3 py-1.5 text-sm"
                    >
                      <span className="truncate min-w-0 text-foreground">
                        {f.name}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(i);
                        }}
                        className="ml-2 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                        aria-label={`Remove ${f.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Payment Preview */}
            <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                <span className="text-base">💳</span> Payment
              </h4>
              <p className="text-sm text-muted-foreground">
                After submission, you will receive a payment link via{" "}
                <span className="font-medium text-foreground">WhatsApp</span>,
                or pay directly using UPI below.
              </p>
              <div className="flex items-center gap-4">
                {/* QR placeholder */}
                <div className="bg-card border border-border rounded-lg p-2.5 shrink-0 flex items-center justify-center w-16 h-16">
                  <div className="grid grid-cols-3 gap-0.5">
                    {["tl", "tm", "tr", "ml", "mm", "mr", "bl", "bm", "br"].map(
                      (pos, i) => (
                        <div
                          key={pos}
                          className={`w-3 h-3 rounded-sm ${
                            [0, 2, 4, 6, 8].includes(i)
                              ? "bg-foreground"
                              : "bg-transparent"
                          }`}
                        />
                      ),
                    )}
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-bold text-foreground">
                    UPI ID: jesuszone@upi
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    GPay · PhonePe · Paytm
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-1">
              <Button
                type="button"
                variant="ghost"
                onClick={handleClose}
                disabled={isSubmitting}
                data-ocid="order-cancel-btn"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !serviceName}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
                data-ocid="order-submit-btn"
              >
                {isSubmitting ? (
                  "Processing…"
                ) : (
                  <>
                    Place Order <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
