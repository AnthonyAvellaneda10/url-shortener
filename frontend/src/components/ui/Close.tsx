import { X } from "lucide-react";

interface CloseProps {
  onClose: () => void;
}

export const Close = ({ onClose }: CloseProps) => {
  return (
    <button
      type="button"
      onClick={onClose}
      className="absolute right-4 top-4 rounded-sm text-[#575b65] hover:text-[#222735] dark:text-[#a3a3a4] dark:hover:text-white ring-offset-background transition duration-300 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
      <X className="h-4 w-4" />
    </button>
  );
};
