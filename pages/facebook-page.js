// components/FacebookPage.js

import request from '@/lib/request';
import { useEffect, useState } from 'react';

const FacebookPage = () => {

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getData = async () => {
      const res = await request(`setting/view`);
  
      setLoading(false);
      setData(res?.data);
    };
    getData();
  }, []);

  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, [loading]);

  return (
    loading ? <></>: <div className="max-w-7xl xls:max-w-[25rem] xs:max-w-[20rem] md:max-w-[62rem] xxl:max-w-[110rem] mx-auto pt-10 md:pt-20 mb-2">
    <div className=" flex flex-col">
      <div className="fb-page flex-grow" 
        data-tabs="timeline,messages"
        data-href={data?.socialLinks?.facebook}
        data-width="380"
        data-height="700"
        data-small-header="true"
        data-show-facepile="true">
      </div>      
    </div>
  </div>
  );
}

export default FacebookPage;  
