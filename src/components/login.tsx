// import React, { useState } from 'react';
// import { Eye, EyeOff, Rocket } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Checkbox } from '@/components/ui/checkbox';
// import { supabase } from '@/lib/supabaseClient';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) return setError(error.message);

//     // Admin Email Check
//     const ADMIN_EMAIL = data.user?.email;

//     if (data?.user?.email !== ADMIN_EMAIL) {
//       setError('Access Denied. Only admin can login.');
//       return;
//     }

//     // Save session and navigate
//     Cookies.set('session', JSON.stringify(data), {
//       expires: rememberMe ? 7 : 1, // 7 days if remember me, otherwise 1 day
//       secure: true,
//       sameSite: 'strict',
//     });

//     navigate('/');
//   };

//   const handlecahnge = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.name === 'email') {
//       setEmail(e.target.value);
//     } else if (e.target.name === 'password') {
//       setPassword(e.target.value);
//     }
//   };

//   return (
//     <div className='min-h-screen bg-[#090E1A] flex items-center justify-center p-4'>
//       <div className='absolute inset-0 overflow-hidden pointer-events-none'>
//         <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl'></div>
//         <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl'></div>
//       </div>

//       <div className='relative w-full max-w-md'>
//         <div className='bg-[#090E1A] border border-gray-800/50 rounded-2xl shadow-2xl p-8'>
//           <div className='flex flex-col items-center mb-8'>
//             <div className='w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20'>
//               <Rocket className='w-8 h-8 text-white' />
//             </div>
//             <h1 className='text-2xl font-bold text-white mb-1'>
//               BEVVY BULLET site
//             </h1>
//             <p className='text-gray-400 text-sm'>Campaign Command Center</p>
//           </div>

//           <div className='space-y-6'>
//             <div className='space-y-2'>
//               <Label htmlFor='email' className='text-white'>
//                 Email Address
//               </Label>
//               <Input
//                 id='email'
//                 name='email'
//                 type='email'
//                 value={email}
//                 onChange={handlecahnge}
//                 className='bg-[#090E1A] border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500'
//                 placeholder='admin@bevvybullet.com'
//               />
//             </div>

//             {/* Password Input */}
//             <div className='space-y-2'>
//               <Label htmlFor='password' className='text-white'>
//                 Password
//               </Label>
//               <div className='relative'>
//                 <Input
//                   id='password'
//                   name='password'
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className='bg-[#090E1A] border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:ring-cyan-500 pr-10'
//                   placeholder='••••••••'
//                 />
//                 <Button
//                   type='button'
//                   variant='ghost'
//                   size='sm'
//                   onClick={() => setShowPassword(!showPassword)}
//                   className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-gray-300'
//                 >
//                   {showPassword ? (
//                     <EyeOff className='w-4 h-4' />
//                   ) : (
//                     <Eye className='w-4 h-4' />
//                   )}
//                 </Button>
//               </div>
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className='flex items-center justify-between'>
//               <div className='flex items-center space-x-2'>
//                 <Checkbox
//                   id='remember'
//                   checked={rememberMe}
//                   onCheckedChange={(checked) =>
//                     setRememberMe(checked as boolean)
//                   }
//                   className='border-gray-700 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500'
//                 />
//                 <Label
//                   htmlFor='remember'
//                   className='text-sm text-gray-400 cursor-pointer'
//                 >
//                   Remember me
//                 </Label>
//               </div>
//               <Button
//                 variant='link'
//                 className='text-sm text-cyan-400 hover:text-cyan-300 p-0 h-auto'
//               >
//                 Forgot password?
//               </Button>
//             </div>

//             <Button
//               onClick={handleSubmit}
//               className='w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/20'
//             >
//               Sign In
//             </Button>
//           </div>
//           {error && <p>{error}</p>}
//           {/* Sign Up Link */}
//           {/* <div className='mt-6 text-center'>
//             <p className='text-sm text-gray-400'>
//               Don't have an account?{' '}
//               <Button
//                 variant='link'
//                 className='text-cyan-400 hover:text-cyan-300 font-medium p-0 h-auto'
//               >
//                 Sign up
//               </Button>
//             </p>
//           </div> */}
//         </div>

//         {/* Bottom Text */}
//         <div className='text-center mt-6 text-gray-500 text-xs'>
//           <p className='text-white/50'>
//             © 2024 Bevvy Bullet. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
