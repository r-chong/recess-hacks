// import { Configuration, OpenAIApi } from 'openai-edge';
// import { OpenAIStream, StreamingTextResponse } from 'ai';
// import { useChat } from 'ai/react';
// // import React from 'react'
// // import styles from './chat.module.css'

// const config = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(config);
// export const runtime = 'edge';
// const { messages } = {};
// const response = await openai.createChatCompletion({
//     model: 'gpt-4',
//     stream: true,
//     messages,
// });
// const stream = OpenAIStream(response);
// new StreamingTextResponse(stream);

// export default function Chat() {
//     const { messages, input, handleInputChange, handleSubmit } = useChat();
//     return (
//         <div className={styles.container}>
//             <div className={styles.messages}>
//                 {messages.map((m) => (
//                     <div key={m.id} className={styles.message}>
//                         <span className={styles.role}>{m.role}:</span>
//                         <span className={styles.content}>{m.content}</span>
//                     </div>
//                 ))}
//             </div>
//             <form className={styles.form} onSubmit={handleSubmit}>
//                 <input
//                     className={styles.input}
//                     value={input}
//                     placeholder="Say something..."
//                     onChange={handleInputChange}
//                 />
//             </form>
//         </div>
//     );
// }
