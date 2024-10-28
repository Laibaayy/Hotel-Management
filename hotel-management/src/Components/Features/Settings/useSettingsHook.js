import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../Services/apiSetting";

const useSettingsHook = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { isLoading, data };
};

export default useSettingsHook;
