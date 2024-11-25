import React from "react";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { Divider } from "../ui/divider";
import { ChevronRight } from "lucide-react-native";
import { View } from "react-native";

type MenuProps = {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
};

const MenuLink: React.FC<MenuProps> = ({ title, onPress, icon }) => (
  <>
    <Button
      size="md"
      variant="link"
      action="primary"
      className="flex flex-row gap-5 justify-between items-center"
      onPress={onPress}
    >
      <View className="flex flex-row gap-5 justify-start items-center">
        {icon && <> {icon} </>}
        <ButtonText className="text-black font-semibold text-lg">
          {title}
        </ButtonText>
      </View>

      <ButtonIcon as={ChevronRight} />
    </Button>
    <Divider className="my-0.5" />
  </>
);

export default MenuLink;
