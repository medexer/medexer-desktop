import SignupPage from '@/presentation/auth/signup-page';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../../presentation/auth/login-page';
import AuthShell from '../../presentation/shell/auth-shell';
import ResetPasswordPage from '@/presentation/auth/reset-password-page';
import ForgotPasswordPage from '@/presentation/auth/forgot-password-page';
import ForgotPasswordVerificationPage from '@/presentation/auth/forgot-password-verification-page';

export function AuthRoutes() {
  return (
    <Routes>
        <Route path="" element={<AuthShell />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/forgot-password-verification" element={<ForgotPasswordVerificationPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            <Route path="/register" element={<SignupPage />} />
            <Route path="" element={<Navigate to="/login" relative="route" />} />
            <Route path="*" element={<Navigate to="/login" relative="route" />} />
        </Route>
    </Routes>
  );
}
