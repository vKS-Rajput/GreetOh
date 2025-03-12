import { atom, useAtom} from "jotai"

const modelState = atom(false);

export const useCreateChannelModel = () => {
    return useAtom(modelState)
}