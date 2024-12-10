import { Alert, AlertText } from "../ui/alert";
import { VStack } from "../ui/vstack";

type MyAlertProps = {
  title?: string;
  message?: string;
};

const MyAlert: React.FC<MyAlertProps> = ({ title, message }) => {
  return (
    <Alert
      action={"success"}
      variant={"solid"}
      className=" gap-5 bg-white rounded-lg justify-center items-center shadow-md"
    >
      <VStack space="xs">
        <AlertText className="text-green-500 text-xl font-bold">
          {title}
        </AlertText>
        <AlertText className="text-black text-sm">{message}</AlertText>
      </VStack>
    </Alert>
  );
};

export default MyAlert;
