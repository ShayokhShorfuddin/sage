// // // TODO: Bring the "Selected/Rejected" Image

// import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
// import darkLogo from "@/public/images/logo-dark.png";
// import styles from "./styles";

// export default function PdfStructureClient({
//   interviewer,
//   candidate,
//   date,
//   qrcodeSrc,
//   conversation,
// }: {
//   interviewer: string;
//   candidate: string;
//   date: string;
//   qrcodeSrc: string;
//   conversation: { role: string; text: string }[];
// }) {
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <Text>Hello</Text>
//         {/* <View style={styles.section}>
//           <Text>{interviewer}</Text>
//           <View style={styles.logoAndQrCode}>
//             <View>
//               <Image
//                 style={styles.logo}
//                 src={window.location.origin + darkLogo.src}
//               />
//               <Text style={styles.heading}>Interview script</Text>
//             </View>

//             <Image style={styles.qrcodeStyle} src={qrcodeSrc} />
//           </View>
//           <Text style={styles.subheading}>
//             Interviewer: {"  "}
//             {interviewer}
//           </Text>
//           <Text style={styles.subheading}>
//             Candidate: {"  "}
//             {candidate}
//           </Text>
//           <Text style={styles.subheading}>
//             Date: {"  "} {date}
//           </Text>

//           <View style={styles.conversationView}>
//             {conversation.map((sentence, index) => (
//               // biome-ignore lint/suspicious/noArrayIndexKey: <We won't be reordering or deleting items>
//               <View key={index} style={styles.individualConversationView}>
//                 <Text style={styles.individualConversationSpeaker} wrap>
//                   {sentence.role === "user" ? candidate : interviewer}:
//                 </Text>

//                 <Text style={styles.individualConversationText} wrap>
//                   {sentence.text}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View> */}
//       </Page>
//     </Document>
//   );
// }

// // import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
// // import styles from "./styles";

// // export default function PdfStructure({
// //   interviewer,
// //   candidate,
// //   date,
// //   logoBuffer,
// //   qrcodeSrc,
// //   conversation,
// // }: {
// //   interviewer: string;
// //   candidate: string;
// //   date: string;
// //   logoBuffer: string;
// //   qrcodeSrc: string;
// //   conversation: { role: string; text: string }[];
// // }) {
// //   return (
// //     <Document>
// //       <Page size="A4" style={styles.page}>
// //         <View style={styles.section}>
// //           <View style={styles.logoAndQrCode}>
// //             <View>
// //               <Image style={styles.logo} src={logoBuffer} />
// //               <Text style={styles.heading}>Interview script</Text>
// //             </View>

// //             <Image style={styles.qrcodeStyle} src={qrcodeSrc} />
// //           </View>
// //           <Text style={styles.subheading}>
// //             Interviewer: {"  "}
// //             {interviewer}
// //           </Text>
// //           <Text style={styles.subheading}>
// //             Candidate: {"  "}
// //             {candidate}
// //           </Text>
// //           <Text style={styles.subheading}>
// //             Date: {"  "} {date}
// //           </Text>

// //           <View style={styles.conversationView}>
// //             {conversation.map((sentence, index) => (
// //               // biome-ignore lint/suspicious/noArrayIndexKey: <We won't be reordering or deleting items>
// //               <View key={index} style={styles.individualConversationView}>
// //                 <Text style={styles.individualConversationSpeaker} wrap>
// //                   {sentence.role === "user" ? candidate : interviewer}:
// //                 </Text>

// //                 <Text style={styles.individualConversationText} wrap>
// //                   {sentence.text}
// //                 </Text>
// //               </View>
// //             ))}
// //           </View>
// //         </View>
// //       </Page>
// //     </Document>
// //   );
// // }
