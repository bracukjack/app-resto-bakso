import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Button, ButtonIcon } from "../ui/button";
import { ChevronLeft } from "lucide-react-native";
import { Grid, GridItem } from "../ui/grid";

interface HeaderProps {
  onBack?: () => void;
  title?: string;
  action?: React.ReactNode;
}

const Header = ({ onBack, title, action }: HeaderProps) => {
  const router = useRouter();

  return (
    <Grid
      _extra={{ className: "grid-cols-6" }}
      className="flex-row items-center justify-between w-full gap-2 mb-5"
    >
      <GridItem
        _extra={{ className: "col-span-1" }}
        className="flex-3 items-start justify-center"
      >
        <Button
          variant="solid"
          size="xs"
          className="rounded-full"
          onPress={onBack ? onBack : () => router.back()}
        >
          <ButtonIcon as={ChevronLeft} />
        </Button>
      </GridItem>

      <GridItem
        _extra={{ className: "col-span-4" }}
        className="flex-7 items-center justify-center"
      >
        <Text className="text-lg font-medium text-primary">{title}</Text>
      </GridItem>

      <GridItem
        _extra={{ className: "col-span-1" }}
        className="flex-3 items-end justify-center"
      >
        {action}
      </GridItem>
    </Grid>
  );
};

export default Header;
