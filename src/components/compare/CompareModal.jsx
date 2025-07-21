import ModalBase from "../ui/ModalBase";
import Compare from "./Compare";

const CompareModal = ({ open, onClose }) => {
  return (
    <ModalBase open={open} onClose={onClose} title="Compare Pokemons">
      <Compare className="w-full"/>
    </ModalBase>
  );
}

export default CompareModal;
