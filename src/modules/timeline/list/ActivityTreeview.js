import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import './ActivityTreeView.css'
// const treeData = [
//     {
//         title: <div className='task__div'>
//             <div className='task__div__left'>
//                 <div className='task__div__left__title'>
//                     <p>Delegated Task Name title will be here </p>
//                 </div>
//                 <div className='task__div__left__subtitle'>
//                     <p>
//                         <span className='bot-code'>ET-2459</span>
//                         <span className='bot-title'>Apr 28, 2023</span>
//                     </p>
//                 </div>
//             </div>
//             <div className='task__div__right'>
//                 <div className="activity_list__item__badge">
//                     <span className='badge-primary'>Task Delegated</span>
//                     <span className='badge-secondary'>WIP</span>
//                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                     {/* <span className='three__dot__icon'>
//                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                         </svg>
//                     </span> */}
//                 </div>
//             </div>
//         </div>,
//         key: '0-0',
//         children: [
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-0',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-1',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-2',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-1-0',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-2',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         title: <div className='task__div'>
//             <div className='task__div__left'>
//                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                 <div className='task__div__left__subtitle'>
//                     <p>
//                         <span className='bot-code'>ET-2459</span>
//                         <span className='bot-title'>Apr 28, 2023</span>
//                     </p>
//                 </div>
//             </div>
//             <div className='task__div__right'>
//                 <div className="activity_list__item__badge">
//                     <span className='badge-primary'>Task Delegated</span>
//                     <span className='badge-secondary'>WIP</span>
//                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                     {/* <span className='three__dot__icon'>
//                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                         </svg>
//                     </span> */}
//                 </div>
//             </div>
//         </div>,
//         key: '0-0',
//         children: [
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-0',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-1',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-2',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-1-0',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-2',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         title: <div className='task__div'>
//             <div className='task__div__left'>
//                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                 <div className='task__div__left__subtitle'>
//                     <p>
//                         <span className='bot-code'>ET-2459</span>
//                         <span className='bot-title'>Apr 28, 2023</span>
//                     </p>
//                 </div>
//             </div>
//             <div className='task__div__right'>
//                 <div className="activity_list__item__badge">
//                     <span className='badge-primary'>Task Delegated</span>
//                     <span className='badge-secondary'>WIP</span>
//                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                     {/* <span className='three__dot__icon'>
//                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                         </svg>
//                     </span> */}
//                 </div>
//             </div>
//         </div>,
//         key: '0-0',
//         children: [
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-0',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-1',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-2',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-1-0',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-2',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         title: <div className='task__div'>
//             <div className='task__div__left'>
//                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                 <div className='task__div__left__subtitle'>
//                     <p>
//                         <span className='bot-code'>ET-2459</span>
//                         <span className='bot-title'>Apr 28, 2023</span>
//                     </p>
//                 </div>
//             </div>
//             <div className='task__div__right'>
//                 <div className="activity_list__item__badge">
//                     <span className='badge-primary'>Task Delegated</span>
//                     <span className='badge-secondary'>WIP</span>
//                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                     {/* <span className='three__dot__icon'>
//                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                         </svg>
//                     </span> */}
//                 </div>
//             </div>
//         </div>,
//         key: '0-0',
//         children: [
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-0',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-1',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-2',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-1-0',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-2',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         title: <div className='task__div'>
//             <div className='task__div__left'>
//                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                 <div className='task__div__left__subtitle'>
//                     <p>
//                         <span className='bot-code'>ET-2459</span>
//                         <span className='bot-title'>Apr 28, 2023</span>
//                     </p>
//                 </div>
//             </div>
//             <div className='task__div__right'>
//                 <div className="activity_list__item__badge">
//                     <span className='badge-primary'>Task Delegated</span>
//                     <span className='badge-secondary'>WIP</span>
//                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                     {/* <span className='three__dot__icon'>
//                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                         </svg>
//                     </span> */}
//                 </div>
//             </div>
//         </div>,
//         key: '0-0',
//         children: [
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-0',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-1',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-2',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-1-0',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-2',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         title: <div className='task__div'>
//             <div className='task__div__left'>
//                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                 <div className='task__div__left__subtitle'>
//                     <p>
//                         <span className='bot-code'>ET-2459</span>
//                         <span className='bot-title'>Apr 28, 2023</span>
//                     </p>
//                 </div>
//             </div>
//             <div className='task__div__right'>
//                 <div className="activity_list__item__badge">
//                     <span className='badge-primary'>Task Delegated</span>
//                     <span className='badge-secondary'>WIP</span>
//                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                     {/* <span className='three__dot__icon'>
//                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                         </svg>
//                     </span> */}
//                 </div>
//             </div>
//         </div>,
//         key: '0-0',
//         children: [
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-0',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-1',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-2',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-1-0',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-2',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         title: <div className='task__div'>
//             <div className='task__div__left'>
//                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                 <div className='task__div__left__subtitle'>
//                     <p>
//                         <span className='bot-code'>ET-2459</span>
//                         <span className='bot-title'>Apr 28, 2023</span>
//                     </p>
//                 </div>
//             </div>
//             <div className='task__div__right'>
//                 <div className="activity_list__item__badge">
//                     <span className='badge-primary'>Task Delegated</span>
//                     <span className='badge-secondary'>WIP</span>
//                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                     {/* <span className='three__dot__icon'>
//                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                         </svg>
//                     </span> */}
//                 </div>
//             </div>
//         </div>,
//         key: '0-0',
//         children: [
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-0',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-1',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-2',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-1-0',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-2',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         title: <div className='task__div'>
//             <div className='task__div__left'>
//                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                 <div className='task__div__left__subtitle'>
//                     <p>
//                         <span className='bot-code'>ET-2459</span>
//                         <span className='bot-title'>Apr 28, 2023</span>
//                     </p>
//                 </div>
//             </div>
//             <div className='task__div__right'>
//                 <div className="activity_list__item__badge">
//                     <span className='badge-primary'>Task Delegated</span>
//                     <span className='badge-secondary'>WIP</span>
//                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                     {/* <span className='three__dot__icon'>
//                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                         </svg>
//                     </span> */}
//                 </div>
//             </div>
//         </div>,
//         key: '0-0',
//         children: [
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-0',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-1',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-2',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-1-0',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-2',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         title: <div className='task__div'>
//             <div className='task__div__left'>
//                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                 <div className='task__div__left__subtitle'>
//                     <p>
//                         <span className='bot-code'>ET-2459</span>
//                         <span className='bot-title'>Apr 28, 2023</span>
//                     </p>
//                 </div>
//             </div>
//             <div className='task__div__right'>
//                 <div className="activity_list__item__badge">
//                     <span className='badge-primary'>Task Delegated</span>
//                     <span className='badge-secondary'>WIP</span>
//                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                     {/* <span className='three__dot__icon'>
//                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                         </svg>
//                     </span> */}
//                 </div>
//             </div>
//         </div>,
//         key: '0-0',
//         children: [
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-0',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-1',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-2',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-1-0',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-2',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         title: <div className='task__div'>
//             <div className='task__div__left'>
//                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                 <div className='task__div__left__subtitle'>
//                     <p>
//                         <span className='bot-code'>ET-2459</span>
//                         <span className='bot-title'>Apr 28, 2023</span>
//                     </p>
//                 </div>
//             </div>
//             <div className='task__div__right'>
//                 <div className="activity_list__item__badge">
//                     <span className='badge-primary'>Task Delegated</span>
//                     <span className='badge-secondary'>WIP</span>
//                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                     {/* <span className='three__dot__icon'>
//                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                         </svg>
//                     </span> */}
//                 </div>
//             </div>
//         </div>,
//         key: '0-0',
//         children: [
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-0',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-1',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-2',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-1-0',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-2',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         title: <div className='task__div'>
//             <div className='task__div__left'>
//                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                 <div className='task__div__left__subtitle'>
//                     <p>
//                         <span className='bot-code'>ET-2459</span>
//                         <span className='bot-title'>Apr 28, 2023</span>
//                     </p>
//                 </div>
//             </div>
//             <div className='task__div__right'>
//                 <div className="activity_list__item__badge">
//                     <span className='badge-primary'>Task Delegated</span>
//                     <span className='badge-secondary'>WIP</span>
//                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                     {/* <span className='three__dot__icon'>
//                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                         </svg>
//                     </span> */}
//                 </div>
//             </div>
//         </div>,
//         key: '0-0',
//         children: [
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-0',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-1',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-2',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-1-0',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-2',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         title: <div className='task__div'>
//             <div className='task__div__left'>
//                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                 <div className='task__div__left__subtitle'>
//                     <p>
//                         <span className='bot-code'>ET-2459</span>
//                         <span className='bot-title'>Apr 28, 2023</span>
//                     </p>
//                 </div>
//             </div>
//             <div className='task__div__right'>
//                 <div className="activity_list__item__badge">
//                     <span className='badge-primary'>Task Delegated</span>
//                     <span className='badge-secondary'>WIP</span>
//                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                     {/* <span className='three__dot__icon'>
//                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                         </svg>
//                     </span> */}
//                 </div>
//             </div>
//         </div>,
//         key: '0-0',
//         children: [
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-0',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-1',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-2',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-1-0',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-2',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         title: <div className='task__div'>
//             <div className='task__div__left'>
//                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                 <div className='task__div__left__subtitle'>
//                     <p>
//                         <span className='bot-code'>ET-2459</span>
//                         <span className='bot-title'>Apr 28, 2023</span>
//                     </p>
//                 </div>
//             </div>
//             <div className='task__div__right'>
//                 <div className="activity_list__item__badge">
//                     <span className='badge-primary'>Task Delegated</span>
//                     <span className='badge-secondary'>WIP</span>
//                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                     {/* <span className='three__dot__icon'>
//                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                         </svg>
//                     </span> */}
//                 </div>
//             </div>
//         </div>,
//         key: '0-0',
//         children: [
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-0',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-1',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-2',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-1-0',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-2',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         title: <div className='task__div'>
//             <div className='task__div__left'>
//                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                 <div className='task__div__left__subtitle'>
//                     <p>
//                         <span className='bot-code'>ET-2459</span>
//                         <span className='bot-title'>Apr 28, 2023</span>
//                     </p>
//                 </div>
//             </div>
//             <div className='task__div__right'>
//                 <div className="activity_list__item__badge">
//                     <span className='badge-primary'>Task Delegated</span>
//                     <span className='badge-secondary'>WIP</span>
//                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                     {/* <span className='three__dot__icon'>
//                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                         </svg>
//                     </span> */}
//                 </div>
//             </div>
//         </div>,
//         key: '0-0',
//         children: [
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-0',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-1',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-2',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-1-0',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-2',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         title: <div className='task__div'>
//             <div className='task__div__left'>
//                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                 <div className='task__div__left__subtitle'>
//                     <p>
//                         <span className='bot-code'>ET-2459</span>
//                         <span className='bot-title'>Apr 28, 2023</span>
//                     </p>
//                 </div>
//             </div>
//             <div className='task__div__right'>
//                 <div className="activity_list__item__badge">
//                     <span className='badge-primary'>Task Delegated</span>
//                     <span className='badge-secondary'>WIP</span>
//                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                     {/* <span className='three__dot__icon'>
//                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                         </svg>
//                     </span> */}
//                 </div>
//             </div>
//         </div>,
//         key: '0-0',
//         children: [
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-0',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-1',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-2',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-1-0',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-2',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         title: <div className='task__div'>
//             <div className='task__div__left'>
//                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                 <div className='task__div__left__subtitle'>
//                     <p>
//                         <span className='bot-code'>ET-2459</span>
//                         <span className='bot-title'>Apr 28, 2023</span>
//                     </p>
//                 </div>
//             </div>
//             <div className='task__div__right'>
//                 <div className="activity_list__item__badge">
//                     <span className='badge-primary'>Task Delegated</span>
//                     <span className='badge-secondary'>WIP</span>
//                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                     {/* <span className='three__dot__icon'>
//                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                         </svg>
//                     </span> */}
//                 </div>
//             </div>
//         </div>,
//         key: '0-0',
//         children: [
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-0',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-1',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-2',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-1-0',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-2',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         title: <div className='task__div'>
//             <div className='task__div__left'>
//                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                 <div className='task__div__left__subtitle'>
//                     <p>
//                         <span className='bot-code'>ET-2459</span>
//                         <span className='bot-title'>Apr 28, 2023</span>
//                     </p>
//                 </div>
//             </div>
//             <div className='task__div__right'>
//                 <div className="activity_list__item__badge">
//                     <span className='badge-primary'>Task Delegated</span>
//                     <span className='badge-secondary'>WIP</span>
//                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                     {/* <span className='three__dot__icon'>
//                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                         </svg>
//                     </span> */}
//                 </div>
//             </div>
//         </div>,
//         key: '0-0',
//         children: [
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-0',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-1',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-2',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-1-0',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-2',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         title: <div className='task__div'>
//             <div className='task__div__left'>
//                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                 <div className='task__div__left__subtitle'>
//                     <p>
//                         <span className='bot-code'>ET-2459</span>
//                         <span className='bot-title'>Apr 28, 2023</span>
//                     </p>
//                 </div>
//             </div>
//             <div className='task__div__right'>
//                 <div className="activity_list__item__badge">
//                     <span className='badge-primary'>Task Delegated</span>
//                     <span className='badge-secondary'>WIP</span>
//                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                     {/* <span className='three__dot__icon'>
//                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                         </svg>
//                     </span> */}
//                 </div>
//             </div>
//         </div>,
//         key: '0-0',
//         children: [
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-0',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-1',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-0-2',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-1-0',
//                     },
//                 ],
//             },
//             {
//                 title: <div className='task__div'>
//                     <div className='task__div__left'>
//                         <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                         <div className='task__div__left__subtitle'>
//                             <p>
//                                 <span className='bot-code'>ET-2459</span>
//                                 <span className='bot-title'>Apr 28, 2023</span>
//                             </p>
//                         </div>
//                     </div>
//                     <div className='task__div__right'>
//                         <div className="activity_list__item__badge">
//                             <span className='badge-primary'>Task Delegated</span>
//                             <span className='badge-secondary'>WIP</span>
//                             <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                             {/* <span className='three__dot__icon'>
//                                 <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                     <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                 </svg>
//                             </span> */}
//                         </div>
//                     </div>
//                 </div>,
//                 key: '0-0-2',
//                 children: [
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-0',
//                     },
//                     {
//                         title: <div className='task__div'>
//                             <div className='task__div__left'>
//                                 <div className='task__div__left__title'>Delegated Task Name title will be here</div>
//                                 <div className='task__div__left__subtitle'>
//                                     <p>
//                                         <span className='bot-code'>ET-2459</span>
//                                         <span className='bot-title'>Apr 28, 2023</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className='task__div__right'>
//                                 <div className="activity_list__item__badge">
//                                     <span className='badge-primary'>Task Delegated</span>
//                                     <span className='badge-secondary'>WIP</span>
//                                     <span className='profile-badge'><img src="http://dmsadmindev.publicdemo.xyz/uploads/users/no-image.jpg" alt="avatar" /></span>
//                                     {/* <span className='three__dot__icon'>
//                                         <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                             <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="8" r="1.5" fill="#C4C4C4" />
//                                             <circle cx="1.5" cy="14.5" r="1.5" fill="#C4C4C4" />
//                                         </svg>
//                                     </span> */}
//                                 </div>
//                             </div>
//                         </div>,
//                         key: '0-0-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
// ];
const ActivityTreeview = ({ child_activities }) => {

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const modifiedActivities = (activities) => {
        return activities?.map((activity) => {
            return {
                title: <div className='task__div'>
                    <div className='task__div__left'>
                        <div className='task__div__left__title'>
                            <h3>{activity.title}</h3>
                        </div>
                        <div className='task__div__left__subtitle'>
                            <p>
                                <span className='bot-code'>{activity.code}</span>
                                <span className='bot-title'>{activity.due_date}</span>
                            </p>
                        </div>
                    </div>
                    <div className='task__div__right'>
                        <div className="activity_list__item__badge">
                            {
                                activity.delegated ? <span className='badge-primary'>Task Delegated</span> : null
                            }
                            <span className='badge-secondary'>{activity.status}</span>
                            <span className='profile-badge'><img src={activity?.assigned_user?.profile_pic} alt="avatar" /></span>
                        </div>
                    </div>
                </div>,
                key: activity.id,
                // If child_activities.length > 0 then call it recursively 
                children: activity?.child_activities?.length > 0 ? modifiedActivities(activity?.child_activities) : []
            }
        })
    }

    const data = modifiedActivities(child_activities);
    console.log(data)
    return (
        <Tree
            showLine
            switcherIcon={<DownOutlined />}
            defaultExpandedKeys={['0-0-0']}
            onSelect={onSelect}
            treeData={data}
        />
    );
};
export default ActivityTreeview;