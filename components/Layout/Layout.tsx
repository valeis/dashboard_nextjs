import {
    AvatarInline,
    Icon,
    Layout,
    Sidebar,
  } from "ebs-design";
  import { ReactNode, useContext, useEffect, useReducer, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import * as BiIcons from "react-icons/bi";
  
  import AuthContext from "../../store/auth-context";
  
  import './Layout'
import { useRouter } from "next/router";
  
  type LayoutProps = {
    children: ReactNode;
  };
  
  const paths = [
    {
      pathName: "/dashboard",
      text: "Home",
      prefix: <Icon type="chart" model="bold" />,
    },
    {
      pathName: "/users",
      text:"Users",
      prefix: <Icon type="users" model="bold" />,
    },
    {
      pathName: "/posts",
      text: "Posts",
      prefix: <Icon type="globe" model="bold" />
    },
  ];
  
  const LayoutDashboard = ({ children }: LayoutProps) => {
  
    const authCtx = useContext(AuthContext);
    const router = useRouter();
  
  
    const logoutHandler = () => {
      authCtx.logout();
      router.push('/login');
    };
  
    const  [ activeTab, setActiveTab ] = useState(" ");
  
    useEffect(() => {
      const firstPath = "/" + router.pathname.split("/").filter(i=>i)[0]
      setActiveTab(firstPath);
    }, [router.pathname])
  
    return (
      <Layout>
        <Layout.Topbar>
          <Layout.Topbar.Toggler />
          <Layout.Topbar.Title>Dashboard_EBS</Layout.Topbar.Title>
          <Layout.Topbar.RightSide>
            <AvatarInline alt={authCtx.currentUser?.name} status="active" reversed />
          </Layout.Topbar.RightSide>
        </Layout.Topbar>
  
        <Sidebar>
          <Sidebar.TopMenu >
            {paths.map(({ pathName, ...rest }) => (
              <Sidebar.Item
                key={pathName}
                onClick={() => router.push(pathName)}
                active={activeTab === pathName}
                {...rest}
              />
            ))}       
          </Sidebar.TopMenu>
  
          <Sidebar.BottomMenu>
            <Sidebar.Item prefix={<div className="icon_layout"><BiIcons.BiLogOut/></div>} text="Logout" onClick={logoutHandler} />
          </Sidebar.BottomMenu>
        </Sidebar>
        <Layout.Content>
          <main>{children}</main>
        </Layout.Content>
  
      </Layout>
    );
  };
  
  export default LayoutDashboard;
  
  