import { View } from "react-native";
import { Text } from "../ui/text";
import { Card } from "../ui/card";

type OngkirComponentProps = {
  city?: string;
  price?: string;
};

const OngkirComponent: React.FC<OngkirComponentProps> = ({ city, price }) => {
  return (
    <Card className="flex flex-col items-center justify-center p-1 w-full bg-slate-200 rounded-2xl shadow-sm">
      <Text className="text-black font-bold uppercase">{city}</Text>
      <Text className="text-black text-sm font-bold">{price}</Text>
    </Card>
  );
};

export default OngkirComponent;
