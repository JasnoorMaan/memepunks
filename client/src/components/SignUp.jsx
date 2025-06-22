// import React, { useState } from "react";

// const SignUp = () => {
//   const [signUp, setSignUp] = useState({
//     email: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setSignUp({
//       ...signUp,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//   };

//   return (
//     <>
//       <section>
//         <h1>CREATE AN ACCOUNT</h1>
//         <section>
//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col gap-4 items-center justify-center"
//           >
//             <div>
//               <label className="block text-cyberpink mb-2 orbitron text-cyber-sm">
//                 EMAIL
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email..."
//                 value={signUp.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none transition-colors"
//                 disabled={isSubmitting}
//               />
//             </div>
//             <div>
//               <label className="block text-cyberpink mb-2 orbitron text-cyber-sm">
//                 USERNAME
//               </label>
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="Enter your username..."
//                 value={signUp.username}
//                 onChange={handleChange}
//                 required
//                 disabled={isSubmitting}
//                 minLength={6}
//                 className="w-full px-4 py-3 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none transition-colors"
//               />
//             </div>
//             <div>
//               <label className="block text-cyberpink mb-2 orbitron text-cyber-sm">
//                 PASSWORD
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email..."
//                 value={signUp.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-3 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none transition-colors"
//                 disabled={isSubmitting}
//               />
//             </div>
//             <div>
//               <label className="block text-cyberpink mb-2 orbitron text-cyber-sm">
//                 CONFIRM PASSWORD
//               </label>
//               <input
//                 type="password"
//                 name="confirm password"
//                 placeholder="Confirm your password..."
//                 value={signUp.confirmPassword}
//                 onChange={handleChange}
//                 required
//                 disabled={isSubmitting}
//                 minLength={6}
//                 className="w-full px-4 py-3 bg-black/50 border-2 border-cyberyellow/30 text-white rounded focus:border-cyberyellow focus:outline-none transition-colors"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full py-4 bg-gradient-to-r from-cyberpink to-cyberyellow text-black font-bold text-lg orbitron rounded hover:opacity-80 transition-opacity disabled:opacity-50"
//             >
//               {isSubmitting ? "AUTHENTICATING..." : "ENTER MATRIX"}
//             </button>
//           </form>
//         </section>
//       </section>
//     </>
//   );
// };

// export default SignUp;
