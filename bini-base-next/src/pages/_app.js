import "@/styles/globals.css";

import Layout from "@/components/layout/Layout";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider theme={{}}>
      <StyleProvider hashPriority="high">
        <style jsx global>
          {`
            :root {
              --inter-font: ${inter.style.fontFamily};
            }
          `}
        </style>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StyleProvider>
    </ConfigProvider>
  );
}
