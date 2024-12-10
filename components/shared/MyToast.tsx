import { RefreshCcw } from "lucide-react-native";
import { Alert, AlertText } from "../ui/alert";
import { Box } from "../ui/box";
import { Toast, ToastDescription, ToastTitle } from "../ui/toast";
import { VStack } from "../ui/vstack";
import { Button, ButtonGroup, ButtonText } from "../ui/button";
import { HStack } from "../ui/hstack";
import { useState } from "react";

type MyToastProps = {
  title?: string;
  message?: string;
  button1?: string;
  button2?: string;
  onclick1?: () => void;
  onclick2?: () => void;
};

const MyToast: React.FC<MyToastProps> = ({
  title,
  message,
  button1,
  button2,
  onclick1,
  onclick2,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <Toast
      action={"success"}
      variant={"solid"}
      className="absolute top-4 gap-4 w-full max-w-[386px] bg-background-0 shadow-hard-2"
    >
      <VStack space="xl">
        <ToastTitle className="text-green-500 text-xl font-bold text-center">
          {title}
        </ToastTitle>
        <ToastDescription className="text-black text-sm text-center">
          {message}
        </ToastDescription>
      </VStack>

      <HStack className="gap-2 items-center">
        {button1 && (
          <Button
            action="secondary"
            variant="outline"
            size="sm"
            className="flex-grow"
            onPress={onclick1}
          >
            <ButtonText>{button1}</ButtonText>
          </Button>
        )}

        {button2 && (
          <Button
            action="secondary"
            variant="outline"
            size="sm"
            className="flex-grow"
            onPress={onclick2}
          >
            <ButtonText>{button2}</ButtonText>
          </Button>
        )}
      </HStack>
    </Toast>
  );
};

export default MyToast;
