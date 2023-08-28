import { ConfigProvider } from "antd";
import { theme } from "antd";
const { darkAlgorithm, compactAlgorithm } = theme;

const withTheme = (node: JSX.Element) => (
  <>
    <ConfigProvider
      theme={
        {
          // algorithm: [darkAlgorithm, compactAlgorithm],
        }
      }
    >
      {node}
    </ConfigProvider>
  </>
);

export default withTheme;
