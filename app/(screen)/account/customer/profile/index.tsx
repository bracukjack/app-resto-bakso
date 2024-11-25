import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import Header from "@/components/shared/Header";
import { Input, InputField } from "@/components/ui/input";

const ProfileEdit = () => {
  return (
    <SafeAreaView>
      <VStack space="xl" className="p-5">
        <Header title="Edit Profile" />
        <Input className=" border focus:border-cyan-600">
          <InputField className="py-2" type="text" placeholder="Name" />
        </Input>

        <Input className=" border focus:border-cyan-600">
          <InputField className="py-2" type="text" placeholder="Address" />
        </Input>
        <Input className=" border focus:border-cyan-600">
          <InputField className="py-2" type="text" placeholder="Email" />
        </Input>

        <Button className="bg-cyan-600" size="sm">
          <ButtonText>Submit</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default ProfileEdit;
