import Login from '@/Components/Auth/Login';
import Register from '@/Components/Auth/Register';
import { useStatus } from '@/context/contextStatus';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { project_name } from "@/lib/config";

const Auth = () => {

  const {tabIndex,setTabIndex} = useStatus();


  return (
    <div className="min-h-[550px] bg-gray-100 pt-32 pb-16">
      <div className=" bg-white w-[450px] xls:w-[400px] xms:w-[350px] xs:w-[300px] mx-auto rounded-md">
        {tabIndex == 0 ? (
          <p className="text-center py-8 text-xl tracking-wide text-black">
            Create your{" "}
            <span className="text-black font-semibold">{project_name}</span>{" "}
            account
          </p>
        ) : (
          <p className="text-center py-8 text-xl">
            <span className="text-gray-400 dark:text-black">Login to</span>{" "}
            <span className="font-bold pl-3 tracking-wider dark:text-black">
              {project_name}
            </span>
          </p>
        )}

        <Tabs
          className="w-full"
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
        >
          <TabList className="py-2 px-10 grid grid-cols-2 w-full">
            <Tab selectedClassName="react-tabs__tab--selected">
              <span className="flex justify-center tracking-wide text-lg cursor-pointer dark:text-black">
                Register
              </span>
            </Tab>
            <Tab selectedClassName="react-tabs__tab--selected">
              <span className="flex justify-center tracking-wide text-lg cursor-pointer dark:text-black">
                Login
              </span>
            </Tab>
          </TabList>
          <div className="px-4">
            <TabPanel>
              <Register />
            </TabPanel>
            <TabPanel>
              <Login />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default Auth