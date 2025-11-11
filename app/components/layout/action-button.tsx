import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
import { useActionHandler } from "@/stores/action-submit";
import { useFormSubmit } from "@/stores/form-submit";

export default function ActionButton() {
  const { actions } = useActionHandler();
  const { submitForm, isSubmitting } = useFormSubmit();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!actions.submit) return;
    try {
      await actions.submit();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async () => {
    if (!actions.delete) return;
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await actions.delete();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="flex gap-2 tracking-wide">
      <Button
        className="bg-white text-black border border-gray-200 p-4"
        size="sm"
        onClick={handleCancel}
      >
        Batal
      </Button>
      <Button
        className="bg-red-500 text-white p-4"
        size="sm"
        onClick={handleDelete}
        disabled={!actions.delete}
      >
        Hapus
      </Button>
      <Button
        className="bg-[#155EEF] text-white p-4"
        size="sm"
        onClick={handleSubmit}
        disabled={!submitForm || isSubmitting}
      >
        {isSubmitting ? "Menyimpan..." : "Update"}
      </Button>
    </div>
  );
}
