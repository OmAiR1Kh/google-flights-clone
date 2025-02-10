import { store } from "./store";
import { Provider } from "react-redux";

interface IProvider {
  children: React.ReactNode;
}

const Providers: React.FC<IProvider> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
