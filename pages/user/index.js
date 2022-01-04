// import { Fragment, useEffect, useState } from "react";
// import Head from "next/head";
// import Layout from "../../components/layout/Layout";
// import { isAuthenticated } from "../../api/auth/authApi";
// import Redirect from "../../Redirect";
// import Menu from "../../components/user/Menu";
 
// const User = () => {

//     const { user, token } = isAuthenticated() && isAuthenticated();

//     const RedirectUserIfNotAuthenticated = () => {
//         if (!isAuthenticated()) {
//             return <Redirect to="/auth/signin" />
//         }
//     }

//     return (
//         <Fragment>
//             <Head>
//                 <title>User Account</title>
//             </Head>
//             <Layout>
//                 <div className="user-account-page">
//                     <div className="row profile-manager">
//                         <div className="col-xl-4 col-md-12 profile-options">
//                             <Menu />
//                         </div>
//                         <div className="col-xl-8 col-md-12 profile">
//                             <div className="profile-card">
//                                 <div className="image-box">
//                                     <img src="\assets\images\avatar.png" alt="avtar" />
//                                 </div>
//                                 <div className="info-box">
//                                     <div className="name">
//                                         <p>{"Hi, " + user.firstname + " " + user.lastname}</p>
//                                     </div>
//                                     <div className="email">
//                                         <p>Email: {user.email}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {RedirectUserIfNotAuthenticated()}
//             </Layout>
//         </Fragment >
//     );
// };

// export default User;