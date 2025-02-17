
import Layout from "@/Components/Layout/Layout";

import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "react-phone-number-input/style.css";
import { StatusProvider } from "../context/contextStatus";
import "react-tabs/style/react-tabs.css";

export default function App({ Component, pageProps }) {
  
  return (

      <StatusProvider>
    
        <main>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer
              position="top-right"
              autoClose="1000"
              hideProgressBar={false}
              closeOnClick={true}
              pauseOnHover
              draggable={true}
            />
          </Layout>
        </main>
      </StatusProvider>
 
  );
}
