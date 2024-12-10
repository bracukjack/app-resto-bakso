import Header from "@/components/shared/Header";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";

const BankAccount = () => {
  return (
    <SafeAreaView>
      <VStack space="xl" className="p-5">
        <Input className=" border focus:border-cyan-600">
          <InputField
            className="py-2"
            type="text"
            placeholder="Bank Account Number"
          />
        </Input>

        <Input className=" border focus:border-cyan-600">
          <InputField
            className="py-2"
            type="text"
            placeholder="Bank Account Name"
          />
        </Input>
        <Input className=" border focus:border-cyan-600">
          <InputField className="py-2" type="text" placeholder="Bank Name" />
        </Input>

        <Button className="bg-cyan-600" size="sm">
          <ButtonText>Submit</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default BankAccount;
