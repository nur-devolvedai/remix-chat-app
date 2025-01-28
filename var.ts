// Server-side environment variables
const base_url = import.meta.env.VITE_BASE_URL || "https://testathena.devolvedai.com/backend";
export const llm_url = import.meta.env.VITE_LLM_URL || "";
const eos_llm_url = import.meta.env.VITE_EOS_LLM_URL || "";
const titan_llm_url = import.meta.env.VITE_TITAN_LLM_URL || "";

// Auth URLs
export const authRegister = `${base_url}/auth/register`;
export const authLogin = `${base_url}/auth/login`;
export const authSendResetPasswordMail = `${base_url}/auth/sendResetPasswordMail`;
export const authResetPassword = `${base_url}/auth/resetPassword`;
export const authLogout = `${base_url}/auth/logout`;
export const regenerateToken = `${base_url}/auth/regenerateToken`;
export const authEmail = `${base_url}/auth/authEmail`;
export const verify = `${base_url}/auth/verify`;
export const sendResetPasswordOTP = `${base_url}/auth/sendResetPasswordOTP`;

// User URLs
export const authUserValidityCheck = `${base_url}/user/validityCheck`;
export const authUserExists = `${base_url}/auth/exists`;
export const deleteUser = `${base_url}/user/deleteUser`;
export const userName = `${base_url}/user/getName`;
export const activeUsers = `${base_url}/user/totalActiveUser`;
export const signUpNewsletter = `${base_url}/user/signUpNewsletter`;
export const checkUserSubscription = `${base_url}/user/checkUserSubscription`;

// Chat URLs
export const chatCreateHistory = `${base_url}/chat/createChatHistory`;
export const getUserChatHistories = `${base_url}/chat/getUserChatHistories`;
export const getUserStandardChats = `${base_url}/chat/getUserAthenaChats`;
export const getUserAthenaChats = `${base_url}/chat/getUserAthenaChats`;
export const savePromptAnswer = `${base_url}/chat/savePromptAnswer`;
export const deleteUserChatHistory = `${base_url}/chat/deleteUserChatHistory`;
export const getUserChatHistoryAndChats = `${base_url}/chat/getUserChatHistoryAndChats`;

// Image URLs
export const imageCreateHistory = `${base_url}/chat/createImageHistory`;
export const getUserImageHistories = `${base_url}/chat/getUserImageHistories`;
export const getUserImages = `${base_url}/chat/getUserImages`;
export const solanaImage = `${base_url}/chat/solanaImage`;

// Rewards URLs
export const giveRewards = `${base_url}/reward/giveRewards`;
export const withdrawRewards = `${base_url}/reward/withdrawRewards`;
export const claimInterest = `${base_url}/reward/claimInterest`;
export const getUserFeedback = `${base_url}/chat/getUserFeedback`;
export const updateStakedInterest = `${base_url}/reward/updateStakedInterest`;

// Community discussion URLs
export const createDiscussion = `${base_url}/communityDiscussion/createDiscussion`;
export const getAllDiscussions = `${base_url}/communityDiscussion/getAllDiscussions`;
export const getDiscussionDetails = `${base_url}/communityDiscussion/getDiscussionDetails`;
export const createAnswerCommunity = `${base_url}/communityDiscussion/createAnswer`;

// Upvote/Downvote URLs
export const upvoteDiscussion = `${base_url}/communityDiscussion/upvoteDiscussion`;
export const downvoteDiscussion = `${base_url}/communityDiscussion/downvoteDiscussion`;
export const upvoteAnswer = `${base_url}/communityDiscussion/upvoteAnswer`;
export const downvoteAnswer = `${base_url}/communityDiscussion/downvoteAnswer`;

// Discussion management URLs
export const deleteDiscussion = `${base_url}/communityDiscussion/deleteDiscussion`;
export const updateDiscussion = `${base_url}/communityDiscussion/updateDiscussion`;
export const uploadDiscussionImage = `${base_url}/communityDiscussion/uploadDiscussionImage`;
export const reportDiscussion = `${base_url}/communityDiscussion/reportDiscussion`;
export const getCategoriesAndTags = `${base_url}/communityDiscussion/getCategoriesAndTags`;

// Blockchain
export const getCurrentAGCPrice = `${base_url}/blockchain/getCurrentAGCPrice`;
export const getTotalRewardsChat = `${base_url}/chat/getTotalRewardsChat`;
export const getQuestionAnswer = `${base_url}/helpCenter/getQuestionAnswer`;

// Dataset APIs
export const createDataset = `${base_url}/dataset/createDataset`;
export const getActiveDataset = `${base_url}/dataset/getActiveDataset`;
export const getUploadDataset = `${base_url}/dataset/uploadDatasetFile`;
export const getPastDataset = `${base_url}/dataset/getPastDataset`;
export const getDatasetDetails = `${base_url}/dataset/getDatasetDetails`;
export const upvoteDataset = `${base_url}/dataset/upvoteDataset`;
export const downvoteDataset = `${base_url}/dataset/downvoteDataset`;
export const searchQuestionAnswer = `${base_url}/helpCenter/searchQuestionAnswer`;
export const createContactUs = `${base_url}/helpCenter/createContactUs`;
export const userProfile = `${base_url}/user/profile`;
export const updateProfilePicture = `${base_url}/user/updateUserProfileImage`;

// Preferences
export const resetPasswordFromSetting = `${base_url}/user/resetPasswordFromSetting`;
export const updateProfileInfo = `${base_url}/user/updateProfileInfo`;
export const uploadUserImageWithAuth = `${base_url}/user/uploadUserImageWithAuth`;
export const uploadUserImageNoAuth = `${base_url}/user/uploadUserImageNoAuth`;

// Referral/Invite
export const getReferralCode = `${base_url}/invite/getReferralCode`;
export const referralCodeUsers = `${base_url}/invite/referralCodeUsers`;
export const referralStats = `${base_url}/invite/referralStats`;

// Chat models
export const currentModel = `${base_url}/chat/getCurrentModel`;
export const switchModel = `${base_url}/chat/switchModel`;

// Expose environment variables for the client
export const getClientEnvironment = () => ({
  base_url,
  llm_url,
  eos_llm_url,
  titan_llm_url,
});
