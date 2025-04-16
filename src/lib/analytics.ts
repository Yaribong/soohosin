import { analytics } from './firebase';
import { logEvent } from 'firebase/analytics';

interface InvestmentFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  investment_range: string;
  interest_reason: string;
  experience: string;
  preferred_sector: string;
  frequency: string;
  min_expected_return: string;
  like_reward: string;
  want_store: string;
  message: string;
  agreeToTerms: string;
}

interface LoanFormData {
  owner_name: string;
  phone: string;
  email: string;
  store_name: string;
  biz_type: string;
  biz_location: string;
  biz_start_year: string;
  monthly_card_sales: string;
  has_existing_loan: string;
  existing_loan_amount: string;
  existing_loan_interest: string;
  loan_purpose: string;
  desired_loan_amount: string;
  repayment_plan: string;
  interested_in_subscribe: string;
  message: string;
  agreeToTerms: string;
}

export const logPageView = (pageTitle: string, pagePath: string) => {
  if (!analytics) return;
  logEvent(analytics, 'page_view', {
    page_title: pageTitle,
    page_path: pagePath
  });
};

export const logFormSubmit = (formName: string, formData: InvestmentFormData | LoanFormData) => {
  if (!analytics) return;
  logEvent(analytics, 'form_submit', {
    form_name: formName,
    ...formData
  });
};

export const logButtonClick = (buttonName: string, pagePath: string) => {
  if (!analytics) return;
  logEvent(analytics, 'button_click', {
    button_name: buttonName,
    page_path: pagePath
  });
}; 