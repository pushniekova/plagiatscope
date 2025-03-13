
import { Translations } from "../languageTypes";

const enTranslations: Translations = {
  nav: {
    home: 'Home',
    check: 'Check',
    about: 'About',
    checkText: 'Check plagiarism',
  },
  footer: {
    rights: 'All rights reserved',
    language: 'Language',
    description: 'ForgenHub - an intelligent tool for detecting and preventing plagiarism in your texts',
    navigation: 'Navigation',
    legal: 'Legal',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    cookies: 'Cookie Policy',
    copyright: '© {year} ForgenHub. All rights reserved.',
    tagline: 'Made with love'
  },
  common: {
    title: 'ForgenHub',
    description: 'Powerful AI-driven plagiarism checker',
    back: 'Back',
    submit: 'Submit',
    loading: 'Loading...',
    success: 'Success!',
    error: 'Error!',
  },
  language: {
    en: 'English',
    uk: 'Ukrainian',
    cs: 'Czech',
  },
  textInput: {
    placeholder: 'Enter text to check...',
    characters: 'characters',
  },
  auth: {
    welcome: 'Welcome to ForgenHub',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signInDescription: 'Sign in to access your account',
    signUpDescription: 'Create an account to get started',
    account: 'My Account',
    email: 'Email',
    password: 'Password',
    phoneNumber: 'Phone Number',
    forgotPassword: 'Forgot password?',
    verificationCode: 'Verification code',
    verify: 'Verify',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: 'Don\'t have an account?',
    or: 'or',
    continue: 'Continue',
    continueWithGoogle: 'Continue with Google',
  },
  hero: {
    badge: 'AI-powered Tool',
    title: 'Plagiarism Checking with <span>ForgenHub</span>',
    description: 'A powerful online tool that helps detect plagiarism and ensure the originality of your content',
    checkButton: 'Check Text',
    learnMore: 'Learn More'
  },
  feature: {
    analysis: {
      title: 'Deep Analysis',
      description: 'Detailed scanning of text to identify potential matches'
    },
    fast: {
      title: 'Fast Checking',
      description: 'Get results in seconds'
    },
    reports: {
      title: 'Detailed Reports',
      description: 'Clear reports with highlighted problem areas'
    }
  },
  howItWorks: {
    badge: 'How It Works',
    title: 'Simple Three-Step Process',
    description: 'Quickly check the originality of your text using advanced AI technology',
    step1: {
      number: '1',
      title: 'Upload Text',
      description: 'Enter or upload the text you want to check for plagiarism'
    },
    step2: {
      number: '2',
      title: 'AI Analysis',
      description: 'Our AI system will analyze the text and compare it with numerous sources'
    },
    step3: {
      number: '3',
      title: 'Get Results',
      description: 'Receive a detailed report with originality percentage and detected matches'
    },
    tryItNow: 'Try It Now'
  },
  features: {
    badge: 'Features',
    title: 'Advanced Features for Accurate Checking',
    description: 'ForgenHub provides the tools needed to effectively combat plagiarism',
    upload: {
      title: 'Easy Upload',
      description: 'Enter text or upload files for quick checking'
    },
    analysis: {
      title: 'Smart Analysis',
      description: 'Our AI checks your text against millions of sources'
    },
    reports: {
      title: 'Detailed Reports',
      description: 'Get clear reports with highlighted matches and source references'
    },
    languages: {
      title: 'Multilingual Support',
      description: 'Check texts in English, Ukrainian, and Czech'
    }
  },
  stats: {
    accuracy: '99.8%',
    accuracyLabel: 'accuracy',
    documents: '10M+',
    documentsLabel: 'documents checked',
    checkTime: '<3 sec',
    checkTimeLabel: 'check time',
    support: '24/7',
    supportLabel: 'support'
  },
  cta: {
    title: 'Ready to Check Your Text?',
    description: 'Start using ForgenHub today and ensure the originality of your content',
    button: 'Check Now'
  },
  check: {
    badge: 'AI Check',
    title: 'Check Text for Plagiarism',
    description: 'Paste your text or upload a file to check for plagiarism',
    pasteText: 'Paste Text',
    uploadFile: 'Upload File',
    textPlaceholder: 'Paste your text to check...',
    noticeTitle: 'Important Information',
    noticeText: 'For best results, please use texts with at least 300 words',
    checkButton: 'Check Now',
    analyzing: 'Analyzing...',
    resultsTitle: 'Check Results',
    featuresTitle: 'Our Checking Features',
    featuresDescription: 'ForgenHub offers advanced tools for detecting plagiarism in texts',
    feature1: {
      title: 'Deep Analysis',
      description: 'Detailed scanning of text to identify potential matches'
    },
    feature2: {
      title: 'Language Support',
      description: 'Check texts in different languages with the same accuracy'
    },
    feature3: {
      title: 'Detailed Report',
      description: 'Get a complete report with references to sources'
    },
    fileUploaded: 'File Uploaded',
    fileLoadedMessage: 'Text from file successfully loaded',
    emptyText: 'Empty Text',
    enterTextMessage: 'Please enter text to check or upload a file',
  },
  results: {
    title: 'Check Results',
    similarityScore: 'Similarity Score',
    tabs: {
      highlighted: 'Highlighted Text',
      sources: 'Sources',
      summary: 'Summary'
    },
    noPlagiarism: 'No plagiarism detected in the text.',
    noSources: 'No matching sources were found for this text.',
    match: 'match',
    matchedText: 'Matched text',
    characters: 'characters',
    sourcesFound: 'Sources Found',
    charactersAnalyzed: 'Characters Analyzed',
    analysisSummary: 'Analysis Summary',
    summary: {
      low: 'The text has a low similarity score, suggesting high originality. Few or no matches were found with existing sources.',
      medium: 'The text has a moderate similarity score. Some portions may need to be reviewed and cited properly.',
      high: 'The text has a high similarity score. Significant portions match existing sources and should be reviewed carefully.'
    },
    recommendations: 'Recommendations',
    recommendation1: 'Cite all sources properly using appropriate citation format',
    recommendation2: 'Use quotation marks for direct quotes',
    recommendation3: 'Paraphrase content in your own words while still citing the source',
    recommendation4: 'Consider revising sections with high similarity scores'
  },
  about: {
    badge: 'About ForgenHub',
    title: 'Our Mission and Values',
    description: 'Learn more about our technology and approach to combating plagiarism',
    mission: {
      label: 'Our Mission',
      title: 'Supporting Academic and Creative Integrity',
      description1: 'We created ForgenHub to help authors, students, and researchers protect their work and verify the originality of texts.',
      description2: 'Our goal is to provide an accessible and accurate plagiarism detection tool that helps make the intellectual environment more honest and transparent.',
      button: 'Try Checking'
    },
    values: {
      title: 'Our Values',
      integrity: {
        title: 'Integrity',
        description: 'We believe in the importance of originality and intellectual honesty'
      },
      accuracy: {
        title: 'Accuracy',
        description: 'We strive to provide the most accurate verification results'
      },
      innovation: {
        title: 'Innovation',
        description: 'We continuously improve our algorithms and approaches'
      }
    },
    technology: {
      label: 'Technology',
      title: 'How Our System Works',
      description: 'ForgenHub uses advanced machine learning and artificial intelligence algorithms to analyze texts and detect plagiarism'
    },
    textProcessing: {
      title: 'Text Processing',
      step1: 'Semantic text analysis to understand context',
      step2: 'Breaking into meaningful fragments to improve accuracy',
      step3: 'Noise removal and text normalization',
      step4: 'Creation of digital fingerprints for comparison'
    },
    comparison: {
      title: 'Comparison Process',
      step1: 'Search in the database of academic and internet sources',
      step2: 'Comparison with millions of documents in real-time',
      step3: 'Detection of both direct and paraphrased borrowings',
      step4: 'Generation of a detailed report with percentage of matches'
    },
    languages: {
      title: 'Language Support',
      description: 'Our system can analyze texts in different languages, ensuring accuracy of verification regardless of the original language'
    },
    cta: {
      title: 'Ready to Check Your Text?',
      description: 'Start using ForgenHub today and ensure the originality of your content',
      button: 'Check Now'
    }
  },
  legal: {
    terms: {
      title: 'Terms of Service',
      description: 'Please read these terms carefully before using our service.',
      section1: {
        title: 'Acceptance of Terms',
        paragraph1: 'By using ForgenHub, you agree to comply with these Terms of Service, our Privacy Policy, and Cookie Policy. If you do not agree with these terms, please do not use our service.',
        paragraph2: 'We reserve the right to change these terms at any time. By continuing to use ForgenHub after such changes, you accept them.'
      },
      section2: {
        title: 'Use of Service',
        paragraph1: 'ForgenHub provides tools for checking texts for plagiarism. Our service is designed to help ensure the originality of content, but does not guarantee the detection of all possible instances of plagiarism.',
        paragraph2: 'By using our service, you agree to:',
        bullet1: 'Not use the service for illegal purposes',
        bullet2: 'Not infringe upon the intellectual property rights of third parties',
        bullet3: 'Not attempt to gain unauthorized access to our system',
        bullet4: 'Not distribute malicious software through our service'
      },
      section3: {
        title: 'User Account',
        paragraph1: 'Using some features of our service may require creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
        paragraph2: 'We reserve the right to delete or block any account that, in our opinion, violates these terms.'
      },
      section4: {
        title: 'Intellectual Property',
        paragraph1: 'All content provided through ForgenHub, including but not limited to logos, texts, graphics, code, and software, is protected by copyright, trademark, and other intellectual property laws.',
        paragraph2: 'You receive a limited, non-exclusive license to use our service in accordance with these terms. This license does not include the right to copy or modify our materials or create derivative works based on them.'
      },
      section5: {
        title: 'Disclaimer of Liability',
        paragraph1: 'ForgenHub is provided "as is" and "as available" without warranties of any kind, express or implied. We do not guarantee that our service will be uninterrupted, secure, or error-free.',
        paragraph2: 'We are not liable for any direct, indirect, incidental, special, or consequential damages that may arise in connection with the use or inability to use our service.'
      },
      lastUpdated: 'Last Updated: July 17, 2023'
    },
    privacy: {
      title: 'Privacy Policy',
      description: 'We take the protection of your personal data seriously. Learn how we collect, use, and protect your information.',
      section1: {
        title: 'Information Collection',
        paragraph1: 'We collect information that you provide directly when using our service, including registration data, texts that you submit for verification, and other information that you voluntarily provide.',
        paragraph2: 'We also automatically collect certain information about your use of our service, including IP address, browser type, operating system, visit time, and other usage data.'
      },
      section2: {
        title: 'Use of Information',
        paragraph1: 'We use the collected information for:',
        bullet1: 'Providing and maintaining our service',
        bullet2: 'Improving and developing our service',
        bullet3: 'Communicating with you regarding your account or changes to our terms',
        bullet4: 'Protection against fraudulent or illegal actions',
        bullet5: 'Analysis of usage trends and activity on our service'
      },
      section3: {
        title: 'Information Sharing',
        paragraph1: 'We do not sell, exchange, or transfer your personal data to third parties without your consent, except in cases described in this policy.',
        paragraph2: 'We may share information with service providers who help us in our operations, with law enforcement agencies if required by law, or in the event of reorganization of our business.'
      },
      section4: {
        title: 'Data Security',
        paragraph1: 'We take reasonable measures to protect your personal data from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or method of electronic storage is absolutely secure.',
        paragraph2: 'You are also responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device.'
      },
      section5: {
        title: 'Your Rights',
        paragraph1: 'Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, delete your information, or limit processing.',
        paragraph2: 'To exercise these rights or if you have questions about our Privacy Policy, please contact us at the address below.'
      },
      lastUpdated: 'Last Updated: July 17, 2023'
    },
    cookies: {
      title: 'Cookie Policy',
      description: 'This policy explains how we use cookies and similar technologies on our website.',
      section1: {
        title: 'What Are Cookies',
        paragraph1: 'Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit websites. They are widely used to make websites work or work more efficiently.',
        paragraph2: 'Cookies also allow websites to remember your preferences and provide you with a personalized experience.'
      },
      section2: {
        title: 'Types of Cookies We Use',
        paragraph1: 'We use different types of cookies for various purposes:',
        bullet1: 'Necessary cookies: These cookies are essential for the operation of our website and cannot be turned off in our systems.',
        bullet2: 'Analytical cookies: These cookies allow us to track and analyze the use of our website so that we can measure and improve its performance.',
        bullet3: 'Functional cookies: These cookies allow our website to remember choices you make and provide enhanced, more personalized features.',
        bullet4: 'Advertising cookies: These cookies are used to display advertising that is likely to interest you based on your browsing habits.'
      },
      section3: {
        title: 'Managing Cookies',
        paragraph1: 'Most web browsers allow you to control cookies through their preference settings. However, if you limit our ability to set cookies, this may impact your overall experience with the website and limit access to some features.',
        paragraph2: 'Instructions for managing cookies in popular browsers can be found on the official websites of the respective browsers.'
      },
      section4: {
        title: 'Third-Party Cookies',
        paragraph1: 'We may also use third-party cookies that are owned and managed by other parties, such as Google Analytics. These companies may use cookies to track your activity over time and across different websites.',
        paragraph2: 'We do not control third-party cookies, and you should check the privacy and cookie policies of these third parties if you need additional information about their practices.'
      },
      lastUpdated: 'Last Updated: July 17, 2023'
    }
  }
};

export default enTranslations;
