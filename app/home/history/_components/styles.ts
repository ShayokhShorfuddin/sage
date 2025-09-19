import { Font, StyleSheet } from '@react-pdf/renderer';

// Register font
Font.register({
  family: 'Lato',
  src: 'http://fonts.gstatic.com/s/lato/v13/v0SdcGFAl2aezM9Vq_aFTQ.ttf',
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
  },

  logoAndQrCode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  logo: {
    width: 100,
  },

  section: {
    fontFamily: 'Lato',
  },

  heading: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 16,
  },

  subheading: {
    fontSize: 12,
    marginTop: 5,
  },

  employmentStatusImage: {
    width: 130,
    marginTop: -10,
  },

  qrcodeStyle: {
    width: 60,
    height: 60,
  },

  noConversation: {
    marginTop: 70,
    fontSize: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  conversationView: {
    marginTop: 30,
    paddingRight: 20,
  },

  individualConversationView: {
    marginTop: 16,
  },

  individualConversationSpeaker: {
    fontSize: 12,
    marginBottom: 2,
    textDecoration: 'underline',
  },

  individualConversationText: {
    fontSize: 12,
    marginTop: 4,
    lineHeight: 1.5,
  },
});

export default styles;
