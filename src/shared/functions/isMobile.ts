import {useMediaQuery} from "react-responsive";

function useIsMobile() {
    return useMediaQuery({query: '(max-width: 600px)'});
}
export default useIsMobile;