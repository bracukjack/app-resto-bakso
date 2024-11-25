import { Alert, AlertText } from "../ui/alert";

type MyAlertProps = {
  title?: string;
  message?: string;
};

const MyAlert: React.FC<MyAlertProps> = ({ title, message }) => {
  return (
    <Alert
      action={"success"}
      variant={"solid"}
      className="flex flex-col gap-5 bg-white rounded-lg justify-center items-center shadow-lg"
    >
      <AlertText className="text-green-500 text-xl font-bold">
        {title}
      </AlertText>
      <AlertText className="text-black text-sm">{message}</AlertText>
    </Alert>
  );
};

export default MyAlert;
