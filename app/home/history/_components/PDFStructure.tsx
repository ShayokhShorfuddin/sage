import rejectedBase64 from "@/lib/rejected-base64";
import sageBase64 from "@/lib/sage-base64";
import selectedBase64 from "@/lib/selected-base64";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import styles from "./styles";

export default function PdfStructure({
  date,
  conversation,
  qrcodeSrc,
  isHired,
  interviewer,
  candidate,
}: {
  isHired: true | false | "pending";
  interviewer: string;
  candidate: string;
  date: string;
  qrcodeSrc: string;
  conversation: { role: string; text: string }[];
}) {
  console.log("isHired in PDFStructure:", isHired);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.logoAndQrCode}>
            <View>
              <Image style={styles.logo} src={sageBase64} />
              <Text style={styles.heading}>Interview script</Text>
            </View>

            {isHired !== "pending" && isHired && (
              <Image
                style={styles.employmentStatusImage}
                src={selectedBase64}
              />
            )}

            {isHired !== "pending" && !isHired && (
              <Image
                style={styles.employmentStatusImage}
                src={rejectedBase64}
              />
            )}

            <Image style={styles.qrcodeStyle} src={qrcodeSrc} />
          </View>
          <Text style={styles.subheading}>
            Interviewer: {"  "}
            {interviewer}
          </Text>
          <Text style={styles.subheading}>
            Candidate: {"  "}
            {candidate}
          </Text>
          <Text style={styles.subheading}>
            Date: {"  "} {date}
          </Text>

          <View style={styles.conversationView}>
            {conversation.length === 0 && (
              <View style={styles.noConversation}>
                <Text>[No conversation occurred]</Text>
              </View>
            )}

            {conversation.length > 0 &&
              conversation.map((sentence, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <We won't be reordering or deleting items>
                <View key={index} style={styles.individualConversationView}>
                  <Text style={styles.individualConversationSpeaker} wrap>
                    {sentence.role === "user" ? candidate : interviewer}:
                  </Text>

                  <Text style={styles.individualConversationText} wrap>
                    {sentence.text}
                  </Text>
                </View>
              ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
