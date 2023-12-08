import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import piniaPersistConfig from "../utils/persist";

interface IUserState {
  firstName: string;
  lastName: string;
}
const useUserStore = defineStore(
  "user",
  () => {
    const state = reactive<IUserState>({
      firstName: "Chen",
      lastName: "Zhiyuan",
    });

    const fullName = (): string => state.firstName + " " + state.lastName;

    const updateLastName = (lastName: string) => (state.lastName = lastName);

    return {
      ...toRefs(state),
      fullName,
      updateLastName,
    };
  },
  {
    persist: piniaPersistConfig("user", ["lastName"]),
  }
);
export default useUserStore;
