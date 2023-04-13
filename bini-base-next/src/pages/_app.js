import "@/styles/globals.css";

import Layout from "@/components/layout/Layout";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import { Inter } from "next/font/google";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/../tailwind.config";

const inter = Inter({ subsets: ["latin"] });

const fullConfig = resolveConfig(tailwindConfig);

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 6,
          colorBgBase: fullConfig.theme.colors.slate[800],
          colorBorder: fullConfig.theme.colors.gray[100],
          colorTextBase: fullConfig.theme.colors.gray[100],
          fontFamily: inter.style.fontFamily,
        },
      }}
    >
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
