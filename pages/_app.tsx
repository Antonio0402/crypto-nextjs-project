import type { AppProps } from "next/app";
import { StyleProvider } from "@ant-design/cssinjs";
import { Provider } from "react-redux";
import store from "../src/store";
import withTheme from "@/theme";
import Layout from "@/src/components/Layout";
import "@/styles/globals.css";
import "../public/antd.min.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <StyleProvider>
        {withTheme(
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </StyleProvider>
    </Provider>
  );
}
