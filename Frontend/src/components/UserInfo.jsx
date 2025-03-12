// import React, { useState } from 'react';

// const UserInfo = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [userInfo, setUserInfo] = useState({
//     name: 'Cristian',
//     email: 'cristian@example.com',
//     avatar: '/path/to/avatar.jpg',
//   });

//   const handleEdit = () => setIsModalOpen(true);

//   return (
//     <div>
//       <div onClick={handleEdit}>
//         <img src={userInfo.avatar} alt="User Avatar" />
//         <p>{userInfo.name}</p>
//       </div>

//       {isModalOpen && (
//         <div className="modal">
//           <form>
//             <input
//               type="text"
//               value={userInfo.name}
//               onChange={e => setUserInfo({ ...userInfo, name: e.target.value })}
//             />
//             <input
//               type="email"
//               value={userInfo.email}
//               onChange={e =>
//                 setUserInfo({ ...userInfo, email: e.target.value })
//               }
//             />
//             <input
//               type="file"
//               onChange={e =>
//                 setUserInfo({ ...userInfo, avatar: e.target.files[0] })
//               }
//             />
//             <button type="submit">Save</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserInfo;
