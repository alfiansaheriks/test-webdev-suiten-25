import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { useFormSubmit } from "@/stores/form-submit";

export default function CreateActionButton() {
  const { submitForm, isSubmitting } = useFormSubmit();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!submitForm) return;
    try {
      await submitForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="flex gap-2">
      <Button
        className="bg-white text-black border border-gray-200"
        size="sm"
        onClick={handleCancel}
      >
        Batal
      </Button>
      <Button
        onClick={handleSubmit}
        disabled={!submitForm || isSubmitting}
        size="sm"
      >
        {isSubmitting ? "Menyimpan..." : "Tambah"}
      </Button>
    </div>
  );
}
