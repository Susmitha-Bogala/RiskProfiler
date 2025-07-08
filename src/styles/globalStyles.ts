import { StyleSheet } from 'react-native';
import colors from './colors';

const { primary, background, cardBackground, textPrimary, descriptionText, shadowColor, optionSelectedColor, radioCircleColor, questionContainerColor, questionTextColor, scoreTextColor } = colors;

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      card: {
        width: '100%',
        backgroundColor: cardBackground,
        padding: 28,
        borderRadius: 16,
        alignItems: 'center',
        elevation: 3,
      },
      title: {
        fontSize: 22,
        fontWeight: '600',
        color: textPrimary,
        marginBottom: 12,
      },
      lottie: {
        width: 150,
        height: 150,
        marginBottom: 12,
      },
      score: {
        fontSize: 18,
        color: scoreTextColor,
        marginBottom: 4,
      },
      riskType: {
        fontSize: 20,
        fontWeight: '700',
        marginVertical: 4,
      },
      description: {
        fontSize: 15,
        color: descriptionText,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 22,
      },
      retakeButton: {
        marginTop: 20,
        backgroundColor: primary,
        paddingVertical: 14,
        paddingHorizontal: 26,
        borderRadius: 30,
      },
      retakeText: {
        color: cardBackground,
        fontSize: 16,
        fontWeight: 'bold',
      },

      questionContainer: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: questionContainerColor,
      },
      progressText: {
        alignSelf: 'flex-start',
        fontSize: 16,
        color: descriptionText,
        marginBottom: 12,
      },
      questionCard: {
        width: '100%',
        backgroundColor: cardBackground,
        padding: 24,
        borderRadius: 16,
        shadowColor: shadowColor,
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 6,
      },
      questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: questionTextColor,
        marginBottom: 20,
      },
      option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 12,
      },
      optionSelected: {
        borderColor: primary,
        backgroundColor: optionSelectedColor,
      },
      optionText: {
        fontSize: 16,
        color: questionTextColor,
      },
      radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: radioCircleColor,
        marginRight: 14,
        alignItems: 'center',
        justifyContent: 'center',
      },
      radioSelected: {
        borderColor: primary,
        backgroundColor: primary,
      },
});

export default globalStyles;
