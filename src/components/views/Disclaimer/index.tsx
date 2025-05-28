import Modal from "@/components/ui/Modal";
import Title from "@/components/ui/Text/Title";

const Disclaimer = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose}>
      <Title>Disclaimer</Title>
      <ul className="flex flex-col gap-2 mt-5 pl-5 text-neutral-600 text-xs sm:text-sm md:text-lg list-disc list-outside">
        <li>
          This website is created solely for educational and non-commercial
          purposes.
        </li>

        <li>
          It is a personal learning project and is not affiliated with, endorsed
          by, or connected to Nike or any related brands.
        </li>
        <li>
          All product names, logos, and images used here are for demonstration
          only.
        </li>
      </ul>
    </Modal>
  );
};

export default Disclaimer;
