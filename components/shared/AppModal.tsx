import { X } from "lucide-react-native";
import { Button, ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../ui/modal";
import { Text } from "../ui/text";

interface AppModalProps {
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  heading?: string;
  bodyText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  rejectText?: string;
  confirmText?: string;
  size?: "sm" | "md" | "lg";
}

const AppModal: React.FC<AppModalProps> = ({
  showModal,
  setShowModal,
  heading = "",
  bodyText = "",
  onCancel,
  onConfirm,
  size = "md",
  rejectText = "",
  confirmText = "",
}) => {
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size={size}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            {heading}
          </Heading>
          <ModalCloseButton>
            <X
              size={24}
              className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
            />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text size="sm" className="text-typography-500">
            {bodyText}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            action="secondary"
            onPress={() => {
              setShowModal(false);
              if (onCancel) onCancel();
            }}
          >
            <ButtonText>{rejectText}</ButtonText>
          </Button>
          <Button
            onPress={() => {
              setShowModal(false);
              if (onConfirm) onConfirm();
            }}
          >
            <ButtonText>{confirmText}</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AppModal;
