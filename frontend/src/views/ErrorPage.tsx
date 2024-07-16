import Panel from "../components/Panel";
import { WIDTH_RELATIVE_TO_SCREEN } from "../utils/utils";

export default function ErrorPage({message}: {message: string}) {
  return (
    <Panel width={WIDTH_RELATIVE_TO_SCREEN} margin={'0 auto'}>
      <h2>{message}</h2>
    </Panel>
  );
}
