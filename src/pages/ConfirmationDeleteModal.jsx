
import { useState } from "react";
import { X, Trash2, LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import { deleteProduct } from "../../api/products.api";

export default function ConfirmationModal({
  isOpen,
  productId,
  productName,
  onClose,
  onDeleted,
}) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await deleteProduct(productId);

      toast.success(`${productName} deleted successfully!`);

      onDeleted?.(productId);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete product. Please try again.";

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
      bg-black/60 backdrop-blur-sm p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
        className="relative w-full max-w-md rounded-2xl border
        border-[var(--border-app)] bg-[var(--bg-surface)]
        p-6 text-[var(--text-primary)] shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          aria-label="Close modal"
          className="absolute right-4 top-4 text-[var(--text-muted)]
          transition-colors hover:text-[var(--text-primary)]
          disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X size={20} />
        </button>

        <div className="mx-auto mb-4 flex h-12 w-12 items-center
          justify-center rounded-xl border border-red-500/20
          bg-red-500/10 text-red-500"
        >
          <Trash2 size={24} />
        </div>

        <div className="mb-6 text-center">
          <h2
            id="confirmation-title"
            className="mb-2 text-lg font-bold"
          >
            Delete Product
          </h2>

          <p className="text-sm text-[var(--text-secondary)]">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[var(--text-primary)]">
              {productName}
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 rounded-lg border
            border-[var(--border-app)] bg-[var(--bg-surface-secondary)]
            px-4 py-2.5 text-sm font-medium
            transition-colors hover:opacity-80
            disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="flex flex-1 items-center justify-center gap-2
            rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium
            text-white transition-colors hover:bg-red-700
            disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <LoaderCircle size={17} className="animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={17} />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
